const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NotePreview } from "../cmps/NotePreview.jsx"
import { DynamicSwitch } from "../cmps/dynamic-cmp/DynamicSwitch.jsx"


import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [cmpType, setCmpType] = useState('NoteTxt')
    const [isClicked, setIsClicked] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())


    function onSetIsClicked() {
        setIsClicked(prevClick => (prevClick = !prevClick))
    }

    useEffect(() => {
        loadNotes()
    }, [isClicked])

    function loadNotes() {
        noteService.query()
            .then((notes) => setNotes(notes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                alert('note deleted')
            })
            .catch((err) => alert('note', err))
    }

    function onUpdateNote(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then((savedNote) => {
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))

            })
            .catch(err => {
                alert('Had issues with updating note', err)

            })

    }

    function onSaveNote() {
        noteService.save(noteToEdit)
            .then(() => {
                alert('Note saved')
                onSetIsClicked()
            })
            .catch(err => { 'could not save', err })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNoteToEdit(prevNotToEdit => ({ ...prevNotToEdit, info: { ...prevNotToEdit.info, [field]: value } }))
    }



   
    const { info } = noteToEdit
    if (!notes) return <div>loading...</div>
    return <section className="note-index-main-container">


        <div className="new-note-container" onClick={onSetIsClicked}>
            <p>Add new note...</p>
            <div className="inputs-container">
                <label htmlFor="note-text">📄</label>
                <input type="radio"
                    id="note-text"
                    name="note-text"
                    value="NoteTxt"
                    onClick={(ev) => { setCmpType(ev.target.value) }}
                    style={{ display: 'none' }} />

                <label htmlFor="note-img">📷</label>
                <input type="radio"
                    id="note-img"
                    name="note-img"
                    value="NoteImg"
                    onClick={(ev) => { setCmpType(ev.target.value) }}
                    style={{ display: 'none' }} />

                <label htmlFor="note-video">📹</label>
                <input type="radio"
                    id="note-video"
                    name="note-video"
                    value="NoteVideo"
                    onClick={(ev) => { setCmpType(ev.target.value) }}
                    style={{ display: 'none' }} />

                <label htmlFor="note-todo">📝</label>
                <input type="radio"
                    id="note-todo"
                    name="note-text"
                    value="NoteTodos"
                    onClick={(ev) => { setCmpType(ev.target.value) }}
                    style={{ display: 'none' }} />
            </div>


        </div>
        {isClicked &&
            <React.Fragment>
                <input type="text"
                    placeholder="Enter text..."
                    name="txt"
                    onChange={handleChange}
                    value={info.txt}
                />
                <button onClick={onSaveNote}>Save</button>
            </React.Fragment>}

        {/* <DynamicSwitch cmpType={cmpType} /> */}





        {/* <Link to="/note/edit"><button className="add-btn">Add</button></Link> */}

        <section className="note-index-container">

            {
                notes.map(note => <article key={note.id}>
                    <NotePreview note={note}
                        onRemoveNote={onRemoveNote}
                        onUpdateNote={onUpdateNote}
                    />
                </article>)

            }


        </section>
    </section>
}
