

export function NoteImg({ handleChange, info, onSaveNote, onSetIsClicked }) {

console.log(info);

    return <section className="note-text-container">


        <input className="input-add-new-note"
            type="text"
            placeholder="Enter image URL.."
            onChange={handleChange}
            value={info.url}
            name="url"
        />

        <button className="save-new-note-btn" onClick={onSaveNote}>Save</button>
        <button className="cancel-new-note-btn" onClick={onSetIsClicked}>Cancel</button>

    </section>
}