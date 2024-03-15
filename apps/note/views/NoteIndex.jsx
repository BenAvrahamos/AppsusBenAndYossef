const { useState, useEffect } = React

import { AddNote } from "../cmps/AddNote.jsx"
import { NotePreview } from "../cmps/NotePreview.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isToggle, setIsToggle] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [isExpanded])

    useEffect(() => {
        loadNotes()
    }, [isToggle])

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                notes.sort((note1, note2) => (note1.isPinned + "").localeCompare(note2.isPinned + "")).reverse()
                setNotes(notes)
            })
            .catch((err) => alert(`Failed to load notes: ${err}`))
    }

    function onRemoveNote(noteId) {

        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                alert('note deleted', noteId);
            })
            .catch((err) => alert('note', err))
    }

    function onUpdateNote(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then((savedNote) => {
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
                setIsToggle(isToggle => !isToggle)
            })
            .catch(err => {
                alert('Had issues with updating note', err)
            })
    }

    if (!notes) return <div>loading...</div>
    return <section className="note-index-main-container">

        <section className="note-add-container">
            <AddNote isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </section>

        <section className="note-index-container">
            {notes.map(note => <article key={note.id}>
                <NotePreview
                    note={note}
                    onRemoveNote={onRemoveNote}
                    onUpdateNote={onUpdateNote}
                />
            </article>)}
        </section>
    </section >
}
