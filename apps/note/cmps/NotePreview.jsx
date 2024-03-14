const { useState } = React

import { ColorModal } from "./ColorModal.jsx"

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [isColorModalOpen, setIsColorModalOpen] = useState(false)

    return <div className="note" style={note.style}>
        {note.type === 'NoteTxt' && <p> {note.info.txt}</p>}
        {note.type === "NoteImg" && <img src={note.info.url} alt={note.info.title} />}
        {note.type === "NoteVideo" && <iframe width="420" height="315" src={note.info.url}> </iframe>}
        {/* {note.type === "NoteTodo"&&} */}


        {/* <button className="edit-txt" onClick={()=> onChangeTxt(note)}>Edit</button> */}
        {/* <NoteBtn onRemoveNote={onRemoveNote} note={note}/> */}
        <button onClick={() => setIsColorModalOpen(true)}>color</button>
        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>

        {isColorModalOpen && <ColorModal setIsColorModalOpen={setIsColorModalOpen} onUpdateNote={onUpdateNote} note={note} />}
    </div >
}