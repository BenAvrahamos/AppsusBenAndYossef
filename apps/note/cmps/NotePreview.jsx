const { useState } = React

import { ColorModal } from "./ColorModal.jsx"
import { EditModal } from "./EditModal.jsx"

import { noteService } from "../../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [isColorModalOpen, setIsColorModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    function onRemove(noteId) {
        onRemoveNote(noteId)
    }

    function getEmbedUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : ''
    }


    // function onSaveNote(duplicateNote) {
    //     noteService.save(duplicateNote)
    //         .then(() => {
    //             alert('Note saved')
    //         })
    //         .catch(err => alert(`Could not save note: ${err}`))
    // }

    function onDuplicateNote(note) {
        const duplicateNote = { ...note, id: '', createdAt: Date.now() }
        onUpdateNote(duplicateNote)

    }

    return (<section className="note" style={note.style}>
        {note.type === 'NoteTxt' && <p> {note.info.txt}</p>}
        {note.type === "NoteImg" && <img src={note.info.url} alt={note.info.title} />}
        {/* {note.type === "NoteTodo"&&} */}
        {note.type === "NoteVideo" && (
            <iframe
                width="200"
                height="200"
                src={getEmbedUrl(note.info.url)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        )}



        <div className='note-icons-container'>
            <button className="clone-btn" onClick={() => onDuplicateNote(note)}><span className="fa-regular fa-copy clone-icon"></span></button>
            <button className="color-btn" onClick={() => setIsColorModalOpen(isColorModalOpen => !isColorModalOpen)}><span className="fa-solid fa-palette color-icon"></span></button>
            <button className="edit-btn" onClick={() => setIsEditModalOpen(isEditModalOpen => !isEditModalOpen)}><span className="fa-solid fa-pen-to-square edit-icon"></span></button>

            <button className="remove-btn" id="remove" onClick={() => onRemove(note.id)}><span className="fa-solid fa-trash-can remove-icon"></span></button>
        </div>
        {isColorModalOpen && <ColorModal setIsColorModalOpen={setIsColorModalOpen} onUpdateNote={onUpdateNote} note={note} />}
        {isEditModalOpen && <EditModal setIsEditModalOpen={setIsEditModalOpen} onUpdateNote={onUpdateNote} note={note} />}
    </section >)
}

