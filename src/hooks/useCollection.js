import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'


export const useCollection = (collections, _q, _o) => {
    // reusable:
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    
    // unique to project:
    const [filterBtn, setFilterBtn] = useState([]) 
    const [sideBarData, setSideBarData] = useState(false)
    const [docsPlaceHolder, setDocsPlaceHolder] = useState("You don't have any docs yet, click the add button to start writting")
    const [sidebarPlaceholder, setSidebarPlaceholder] = useState("You don't have any folders yet.")

    // order query
    const order = useRef(_o).current
    // setup query
    const q = useRef(_q).current
    // first you make a reference to the current state of the uid from home.js
    // if the uid reference gets changed from home.js, the state gets re-evaluated 
    // and the firestore query below runs to match the new uid content 

    useEffect(() => {
        let ref = collection(db, collections)

        if (q) {
            ref = query(ref, where(...q))
            // we make a reference to the firestore collection (ref) and we only want to see 
            // items in that collection "where" the items are query'd with the following condition:
            // ["uid", "==", user.uid]))
        }

        if (order) {
            ref = query(ref, orderBy(...order))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id })
                if (doc.exists()) {
                    setDocsPlaceHolder('')
                    setSidebarPlaceholder('')
                    setSideBarData(true)
                  } 
            })
            setFilterBtn(results)
            setDocuments(results)
        })

        // unsubscribe on unmount
        return () => unsub()
        
    }, [collections, q, order])


    return { documents, filterBtn, error, docsPlaceHolder, sidebarPlaceholder, sideBarData }
}
