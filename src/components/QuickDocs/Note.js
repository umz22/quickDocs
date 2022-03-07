import React from 'react'

// styles
import './Note.css'


export default function Note({note}) {
  return (
    <div>
        {/* {note} */}
        <div className='note-card'>
            <h3 className='note-title'>Title</h3>
            <div className="note">{note}</div>
        </div>
    </div>
  )
}
