const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { ColorModal } from "./ColorModal.jsx"
import { EditModal } from "./EditModal.jsx"


export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const navigate = useNavigate()

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

    function onNoteToMail(noteId) {
        navigate(`/mail/edit${noteId}`)

    }

    function onTogglePin(note) {
        const updatedNote = { ...note, isPinned: !note.isPinned }
        onUpdateNote(updatedNote)
    }

    function onDuplicateNote(note) {
        const duplicateNote = { ...note, id: '', createdAt: Date.now() }
        onUpdateNote(duplicateNote)
    }

    function onDoneTodo(todo, idx) {
        const updateNote = { ...note }
        const currTodo = updateNote.info.todos[idx]
        if (currTodo.doneAt === null) {
            currTodo.doneAt = Date.now()
        } else {
            currTodo.doneAt = null
        }

        onUpdateNote(note)
    }

    return (<section className="note" style={note.style}>

        {note.type === 'NoteTxt' && <p> {note.info.txt}</p>}
        {note.type === "NoteImg" && <img src={note.info.url} alt={note.info.title} />}
        {note.type === "NoteTodos" &&
            <ol>
                {note.info.todos.map((todo, idx) => (
                    <li key={todo.txt + idx}>
                        <input type="checkbox"
                            checked={todo.doneAt !== null}
                            onChange={() => onDoneTodo(todo, idx)}
                            className="checkbox-todo"
                        />
                        {todo.txt}
                    </li>
                ))}
            </ol>
        }
        {note.type === "NoteVideo" && (
            <iframe
                src={getEmbedUrl(note.info.url)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        )}

        <div className='note-icons-container'>
            {!note.isPinned && <button className="pin-btn" onClick={() => onTogglePin(note)}><span className="fa-solid fa-thumbtack pin-icon" style={{ color: '#64606069' }}></span></button>}
            {note.isPinned && <button className="pin-btn" onClick={() => onTogglePin(note)}><span className="fa-solid fa-thumbtack pin-icon"></span></button>}
            <button className="clone-btn" onClick={() => onDuplicateNote(note)}><span className="fa-regular fa-copy clone-icon"></span></button>
            <button className="color-btn" onClick={() => setIsColorModalOpen(isColorModalOpen => !isColorModalOpen)}><span className="fa-solid fa-palette color-icon"></span></button>
            <button className="edit-btn" onClick={() => setIsEditModalOpen(isEditModalOpen => !isEditModalOpen)}><span className="fa-solid fa-pen-to-square edit-icon"></span></button>
            <button className="remove-btn" id="remove" onClick={() => onRemove(note.id)}><span className="fa-solid fa-trash-can remove-icon"></span></button>
            {isColorModalOpen && <ColorModal setIsColorModalOpen={setIsColorModalOpen} onUpdateNote={onUpdateNote} note={note} />}
        </div>
        {isEditModalOpen && <EditModal setIsEditModalOpen={setIsEditModalOpen} onUpdateNote={onUpdateNote} note={note} />}

    </section >)
}

