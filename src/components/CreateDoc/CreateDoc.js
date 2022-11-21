import { useState } from 'react'
import { motion } from 'framer-motion'
import NoteEditor from './NoteEditor'

// hooks
import { useFirestore } from '../../hooks/useFirestore'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Createdoc.css'

export default function CreateDoc({ handleClose, uid }) {
    const [folder, setFolder] = useState([])
    const [addNew, setAddNew] = useState(false)
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const { addDocument, response } = useFirestore('documents')
    const { user } = useAuthContext()
    const { filterBtn } = useCollection('documents', ["uid", "==", user.uid], ["createdAt", "desc"])

    console.log(filterBtn)

    const resetForm = () => {
        setFolder('')
        setTitle('')
        setNotes('')
      }
    
    const addFilter = (e) => {
        const newFilter = {
            folder: folder,
            title: title,
            id: Math.floor(Math.random() * 1000)
        }
        // addNewFilters(newFilter)
        console.log(newFilter)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid: uid,
            folder: folder,
            title: title,
            notes, notes,
            id: Math.floor(Math.random() * 1000)
        })

        // const newFilter = {
        //     folder: folder,
        //     title: title,
        //     id: Math.floor(Math.random() * 1000)
        // }
        // console.log(addDocuments)
        // filters(newFilter)
        resetForm()
        handleClose()
    }

    const addNewHandle = (e) => {
        console.log('addNew selected')
        setAddNew(true)
    }
    
 
    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 6 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='create-doc'
        >
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Folder:</span>
                    <select name="folders" onChange={(e) => setFolder(e.target.value)}>
                        {filterBtn && filterBtn.map((docs) => (
                            <option id={docs.id} value={docs.title}>{docs.title}</option>
                        ))}
                        <option onInput={addNewHandle} value='Add New'>Add New</option>
                    </select>
                   {addNew && <input type="text"
                        onChange={(e) => setFolder(e.target.value)}
                        value={folder}
                    />}
                </label>
                <label>
                    <span>Title:</span>
                    <input type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                {/* <label>
                    <span>Notes:</span>
                    <textarea
                        className='notes'
                        type="text"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        rows="20"
                    >
                    </textarea>
                </label> */}

                <span>Notes:</span>
                <NoteEditor
                    details={notes}
                    setDetails={setNotes}
                />
                
                <button onClick={addFilter} className='submit-button'>Submit</button>
                <button
                    className='button'
                    onClick={handleClose}>
                    Close
                </button>
            </form>
        </motion.div>
    )

    }