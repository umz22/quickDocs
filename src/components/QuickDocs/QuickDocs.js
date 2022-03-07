import { useState } from 'react'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import DocModal from './DocModal';
import Note from './Note';

// styles
import './Document.css'
import deleteIcon from '../../img/delete_icon.svg'


export default function QuickDocs({ documents, filterSearch, docsPlaceHolder }) {
    const [showModal, setShowModal] = useState(false)
    const [note, setNote ] = useState('')

    const clickHandle = (e) => {
        setNote(e)
        setShowModal(true)
        console.log(note)
    }

    const handleClose = () => {
        setShowModal(false)
      }  

    return (
        <div>
            <div className="placeholder-text">{docsPlaceHolder}</div>

            {showModal && <DocModal note={note} handleClose={handleClose}>
                <Note
                    note={note}
                    handleClose={handleClose}
                />
            </DocModal>}

            <div className="card">
                {documents.filter((docs) => {
                    if (filterSearch == "") {
                        return docs} 
                    else
                        if (filterSearch == docs.folder) {
                            // console.log(filterSearch)
                        return docs}
                }).map(docs => (
                    <div className="card-div" key={docs.id}>
                        <img
                            className='delete'
                            src={deleteIcon}
                            onClick={() => (deleteDoc(doc(db, 'documents', docs.id)))}/>
                        <h3 className='card-title'>{docs.title}</h3>
                        <p className='card-p'>{docs.folder}</p>
                        <div 
                            className="card-note"
                            onClick={(e) => clickHandle(docs.notes)} >
                            {docs.notes.length > 250 ? `${docs.notes.substring(0, 250)}...` : docs.notes}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
