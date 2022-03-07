import { onSnapshot, collection, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'


export const useCollection = (collections) => {
    const [documents, setDocuments] = useState(null)
    const [filterBtn, setFilterBtn] = useState([])
    const [error, setError] = useState(null)    
    const [sideBarData, setSideBarData] = useState(false)
    const [docsPlaceHolder, setDocsPlaceHolder] = useState("You don't have any docs yet, click the add button to start writting")
    const [sidebarPlaceholder, setSidebarPlaceholder] = useState("You don't have any folders yet.")


    useEffect(() => {
        let ref = collection(db, collections)

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
            
            

            
            // setFilterBtn(results)
        })

        // unsubscribe on unmount
        return () => unsub()
        
    }, [collections])


    return { documents, filterBtn, error, docsPlaceHolder, sidebarPlaceholder, sideBarData }
}
