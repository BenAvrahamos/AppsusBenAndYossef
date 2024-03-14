const { useState } = React

import { ColorModal } from "./ColorModal.jsx"

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [isColorModalOpen, setIsColorModalOpen] = useState(false)

    function onRemove(noteId) {
        onRemoveNote(noteId)
    }

    return (<section className="note" style={note.style}>
        {note.type === 'NoteTxt' && <p> {note.info.txt}</p>}
        {note.type === "NoteImg" && <img src={note.info.url} alt={note.info.title} />}
        {note.type === "NoteVideo" && <iframe width="420" height="315" src={note.info.url}> </iframe>}
        {/* {note.type === "NoteTodo"&&} */}


        {/* <button className="edit-txt" onClick={()=> onChangeTxt(note)}>Edit</button> */}

        <div className='note-icons-container'>

            <button className="color-btn" onClick={() => setIsColorModalOpen(isColorModalOpen => !isColorModalOpen)}><span className="fa-solid fa-palette color-icon"></span></button>


            <button className="remove-btn" id="remove" onClick={() => onRemove(note.id)}><span className="fa-solid fa-trash-can remove-icon"></span></button>
        </div>
        {isColorModalOpen && <ColorModal setIsColorModalOpen={setIsColorModalOpen} onUpdateNote={onUpdateNote} note={note} />}
    </section >)
}
