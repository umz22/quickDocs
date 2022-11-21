import { useState } from 'react'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import DocModal from './DocModal';
import Note from './Note';
import parse from 'html-react-parser';

// styles
import './Document.css'
import deleteIcon from '../../img/delete_icon.svg'


export default function QuickDocs({ documents, filterSearch, docsPlaceHolder }) {
    const [showModal, setShowModal] = useState(false)
    const [note, setNote ] = useState('')
    const [title, setTitle] = useState('')
    const [noteId, setNoteId] = useState('')

    const clickHandle = (n, t) => {
        setNote(n)
        setTitle(t)
        setShowModal(true)
        console.log(note, title)
    }

    const idHandle = (e) => {
        setNoteId(e)
        console.log(noteId)
    }


    const handleClose = () => {
        setShowModal(false)
      }  

    return (
        <div>
            <div className="placeholder-text">{docsPlaceHolder}</div>

            {showModal && <DocModal note={note} handleClose={handleClose}>
                <Note
                    title={title}
                    note={note}
                    handleClose={handleClose}
                    noteId={noteId}
                    // noteEdit={noteEdit}
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
                        <p style={{textAlign: 'center'}}>{docs.folder}</p>
                        <div onClick={(e) => idHandle(docs.id)}>
                        <div 
                            className="card-note"
                            onClick={(e) => clickHandle(docs.notes, docs.title)} >
                           {parse(docs.notes).length > 100 ? `${parse(docs.notes).substring(0, 100)}...` : parse(docs.notes)}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
