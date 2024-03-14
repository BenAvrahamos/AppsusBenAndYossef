
export function MiniMizeInput({ setNotToEdit, noteToEdit, setIsExpanded }) {

    function onChangeNoteType(noteToEdit) {
        const { type } = noteToEdit
        setNotToEdit(prevNote => ({ ...prevNote, type: noteToEdit }))
        setIsExpanded(true)
    }

    return <section className="min-input-container">

        <input type="text" placeholder={noteToEdit.type === "NoteTxt" ? "Enter Text.." : "Enter Url.."} />
        <div className="icon-btn-container">
            <label className="txt-icon" htmlFor="txt"><span className="fa-solid fa-pen"></span></label>
            <label className="img-icon" htmlFor="img"><span className="fa-regular fa-image"></span></label>
            <label className="video-icon" htmlFor="video"><span className="fa-solid fa-video"></span></label>
            <button id="txt" onClick={() => onChangeNoteType('NoteTxt')}></button>
            <button id="img" onClick={() => onChangeNoteType('NoteImg')}></button>
            <button id="video" onClick={() => onChangeNoteType('NoteVideo')}></button>
        </div>
        {/* <button onClick={onChangeNoteType('NoteTodo')}></button> */}
    </section>
}

