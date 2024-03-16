const { useState, useEffect } = React

import { AddNote } from "../cmps/AddNote.jsx"
import { NotePreview } from "../cmps/NotePreview.jsx"

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js";
import { Loading } from "../cmps/Loading.jsx";
export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isToggle, setIsToggle] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        loadNotes()
    }, [isExpanded])

    useEffect(() => {
        loadNotes()
    }, [isToggle])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                // notes.sort((note1, note2) => (note1.isPinned + "").localeCompare(note2.isPinned + "")).reverse()
                setNotes(notes)
            })
            .catch((err) => alert(`Failed to load notes: ${err}`))
    }

    function onRemoveNote(noteId) {

        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                alert('note deleted', noteId);
                showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issus removing note', err);
                showErrorMsg(`Could not remove (${noteId})`)
            })
    }

    function onUpdateNote(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then((savedNote) => {
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
                setIsToggle(isToggle => !isToggle)
                showSuccessMsg(`Note updated successfully (${noteToUpdate.id})`)
            })
            .catch(err => {
                showErrorMsg(`Could not update (${noteToUpdate.id})`)
                console.log('Had issues with updating note', err)
            })
    }



    if (!notes) return <div><Loading /></div>
    return <section className="note-index-main-container">

        <section className="note-add-container">
            <AddNote isExpanded={isExpanded} setIsExpanded={setIsExpanded}
                onSetFilter={onSetFilter} filterBy={filterBy} />
        </section>

        {notes && notes.some(note => note.isPinned) && (
            <section className="note-index-container">
                <h2 className="pinned-unpinned-h2">Pinned</h2>
                {notes.filter(note => note.isPinned).map(note => (
                    <React.Fragment key={note.id}>
                        <NotePreview
                            note={note}
                            onRemoveNote={onRemoveNote}
                            onUpdateNote={onUpdateNote}
                        />
                    </React.Fragment>))}
            </section>)}

        {notes && notes.some(note => note.isPinned) && <hr className='line-hr' />}

        {notes && notes.some(note => !note.isPinned) && (
            <section className="note-index-container">
                <h2 className="pinned-unpinned-h2">Unpinned</h2>
                {notes.filter(note => !note.isPinned).map(note => (
                    <React.Fragment key={note.id}>
                        <NotePreview
                            note={note}
                            onRemoveNote={onRemoveNote}
                            onUpdateNote={onUpdateNote}
                        />
                    </React.Fragment>))}
            </section>)}
    </section >
}