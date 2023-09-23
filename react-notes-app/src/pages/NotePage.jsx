import React from 'react'
import { Link, useParams } from 'react-router-dom';
import notes from '../assests/data';
import {ReactComponent as  LeftArrorw} from '../assests/left-arrow.svg'
const NotePage = ({match}) => {
    let noteId = useParams();
    // console.log(noteId)
    let note = notes.find(note => note.id === Number(noteId.id));
  return (
    <div className='note'>
        <div className="note-header">
            <h3>
                <Link to="/">
                    <LeftArrorw/>
                </Link>
            </h3>
        </div>
        <textarea value={note?.body}></textarea>
    </div>
  )
}

export default NotePage