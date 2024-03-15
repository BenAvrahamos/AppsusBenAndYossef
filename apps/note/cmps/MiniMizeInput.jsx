const { useState, useEffect } = React

export function MiniMizeInput({ setNotToEdit, noteToEdit, setIsExpanded, onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    function onChangeNoteType(noteToEdit) {
        const { type } = noteToEdit
        setNotToEdit(prevNote => ({ ...prevNote, type: noteToEdit }))
        setIsExpanded(true)
    }

    return <section className="min-input-container">

        <input type="text"
            placeholder={"Search here or choose >>"}
            name="txt"
            value={filterByToEdit.txt}
            onChange={handleChange}
        />

        <div className="icon-btn-container">
            <label className="txt-icon" htmlFor="txt"><span className="fa-solid fa-pen"></span></label>
            <label className="img-icon" htmlFor="img"><span className="fa-regular fa-image"></span></label>
            <label className="video-icon" htmlFor="video"><span className="fa-solid fa-video"></span></label>
            <label className="todo-icon" htmlFor="todo" ><span className="fa-solid fa-list"></span></label>
            <button id="txt" onClick={() => onChangeNoteType('NoteTxt')}></button>
            <button id="img" onClick={() => onChangeNoteType('NoteImg')}></button>
            <button id="video" onClick={() => onChangeNoteType('NoteVideo')}></button>
            <button id="todo" onClick={() => onChangeNoteType('NoteTodos')}></button>
        </div>
        {/* <button onClick={onChangeNoteType('NoteTodo')}></button> */}
    </section>
}

