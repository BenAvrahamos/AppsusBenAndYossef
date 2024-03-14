

export function NoteVideo({ handleChange, info, onSaveNote, onSetIsClicked }) {

    return <section className="note-video-container">
        <h2>hey from NoteVideo</h2>

        <input className="input-add-new-note new-note-container"
            type="text"
            placeholder="Enter video URL..."
            onChange={handleChange}
            value={info.url}
            name="url"
        />
       

        <button className="save-new-note-btn" onClick={onSaveNote}>Save</button>
        <button className="cancel-new-note-btn" onClick={onSetIsClicked}>Cancel</button>
    </section>
}