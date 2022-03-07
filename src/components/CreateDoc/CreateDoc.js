import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Createdoc.css'

export default function CreateDoc({ handleClose, uid }) {
    const [folder, setFolder] = useState([])
    // const [newFilter, setNewFilter] = useState('')
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const { addDocument, response } = useFirestore('documents')


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

        const newFilter = {
            folder: folder,
            title: title,
            id: Math.floor(Math.random() * 1000)
        }

        // console.log(addDocuments)
        // filters(newFilter)
        resetForm()
        handleClose()
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
                    <input type="text"
                    onChange={(e) => setFolder(e.target.value)}
                    value={folder}
                    />
                </label>
                <label>
                    <span>Title:</span>
                    <input type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Notes:</span>
                    <textarea
                        className='notes'
                        type="text"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        rows="20"
                    >
                    </textarea>
                </label>
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