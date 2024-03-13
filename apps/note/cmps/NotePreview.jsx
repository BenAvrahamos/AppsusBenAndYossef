import { NoteBtn } from "./NoteBtn.jsx"

const { useState } = React





export function NotePreview({ note, onRemoveNote, onUpdateNote }) {




    return <div className="note" style={note.style}>
        {note.type === 'NoteTxt' && <p> {note.info.txt}</p>}
        {note.type === "NoteImg" && <img src={note.info.url} alt={note.info.title} />}
        {/* {note.type === "NoteTodos" &&} */}
        {/* {note.type === "NoteVideo"&&} */}

        {/* <button>Color</button>
        <button>Pin</button> */}
        {/* <button className="edit-txt" onClick={()=> onChangeTxt(note)}>Edit</button> */}
        {/* <NoteBtn onRemoveNote={onRemoveNote} note={note}/> */}
        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>

    </div >
}