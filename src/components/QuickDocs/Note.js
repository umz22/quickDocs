import { useState } from 'react'
import { EditText, EditTextarea } from 'react-edit-text';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import parse from 'html-react-parser';

// styles
import './Note.css'
import closeIcon from '../../img/close.svg'
import { setDoc } from 'firebase/firestore';



export default function Note({ note, title, noteId, handleClose }) {
  const [noteEdit, setNoteEdit] = useState('')
  const [titleEdit, setTitleEdit] = useState('')

  console.log(noteEdit)
  // console.log(titleEdit)


  const Update = async () => {
    await setDoc(doc(db, 'documents', noteId), {
      notes: noteEdit.value
    }, { merge: true })
    console.log('edit successful')
    // handleClose()
  }

  return (
    <div>
      {/* {note} */}
      <div className='note-card'>
        <img
          className='close'
          src={closeIcon}
          alt="close"
          onClick={handleClose} />
        <h3 className='note-title'>{title}</h3>
        
        <div
          className="note"
          defaultValue={parse(note)}
          onSave={setNoteEdit}>
          {parse(note)}
        </div>

        {/* {noteEdit.value && <div className='save-changes' onClick={Update}>Save your changes</div>} */}

      </div>
    </div>
  )
}
