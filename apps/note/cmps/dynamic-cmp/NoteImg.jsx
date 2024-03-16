
import { noteService } from "../../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../../services/event-bus.service.js";

export function NoteImg({ noteToEdit, setIsExpanded, setNotToEdit }) {

    function handleChange({ target }) {
        const { value } = target

        setNotToEdit(prevNotToEdit => ({
            ...prevNotToEdit, info: {
                ...prevNotToEdit.info, url: value
            }
        }))

    }

    function onSaveNote() {
        noteService.save(noteToEdit)
            .then(() => {
                showSuccessMsg(`Note saved successfully`)

                setIsExpanded(false)
            })
            .catch(err => {
                showErrorMsg(`Could not save`)
                console.log(`Could not save note: ${err}`)
            })
    }

    return <section className="note-text-container">

        <input className="input-add-new-note new-note-container"
            type="text"
            placeholder="Enter image URL.."
            name="url"
            onChange={handleChange}
            value={noteToEdit.info.url}
        />

        <button className="save-new-note-btn" onClick={onSaveNote}>Save</button>
        <button className="cancel-new-note-btn" onClick={() => setIsExpanded(false)}>Cancel</button>

    </section>
}