
export function MiniMizeInput({ setNotToEdit, noteToEdit, setIsExpanded }) {

    function onChangeNoteType(noteToEdit) {
        const { type } = noteToEdit
        setNotToEdit(prevNote => ({ ...prevNote, type: noteToEdit }))
        setIsExpanded(true)
    }

    return <section className="min-input">

        <input type="text" placeholder={noteToEdit.type === "NoteTxt" ? "Enter Text.." : "Enter Url.."} />
        <button onClick={() => onChangeNoteType('NoteTxt')}>Text</button>
        <button onClick={() => onChangeNoteType('NoteImg')}>Img</button>
        <button onClick={() => onChangeNoteType('NoteVideo')}>Vid</button>

        {/* <button onClick={onChangeNoteType('NoteTodo')}></button> */}
    </section>
}

