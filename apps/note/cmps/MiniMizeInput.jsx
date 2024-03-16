const { useState, useEffect } = React

export function MiniMizeInput({ setNotToEdit, noteToEdit, setIsExpanded, onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isOpen, setIsOpen] = useState(false)

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

    function onToggleMenu() {
        setIsOpen(isOpen => !isOpen)
    }

    return <section className="min-input-container">

{isOpen &&<div onClick={()=> setIsOpen(isOpen =>!isOpen)} className="backdrop"></div>}

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
            <label htmlFor="ham-btn" className="ham-btn-label">☰</label>
            <button className="hamburger-btn" id="ham-btn" onClick={() => onToggleMenu()}></button>


        </div>

        {isOpen && <div className="ham-menu-container">
            <ul className="ham-menu-ul">
                <li>  <label className="txt-icon-menu" htmlFor="txt"><span className="fa-solid fa-pen"></span></label></li>
                <li> <label className="img-icon-menu" htmlFor="img"><span className="fa-regular fa-image"></span></label></li>
                <li><label className="video-icon-menu" htmlFor="video"><span className="fa-solid fa-video"></span></label></li>
                <li>  <label className="todo-icon-menu" htmlFor="todo" ><span className="fa-solid fa-list"></span></label></li>
                <button id="txt" onClick={() => onChangeNoteType('NoteTxt')}></button>
                <button id="img" onClick={() => onChangeNoteType('NoteImg')}></button>
                <button id="video" onClick={() => onChangeNoteType('NoteVideo')}></button>
                <button id="todo" onClick={() => onChangeNoteType('NoteTodos')}></button>
            </ul>
        </div>
        }
        {/* <button onClick={onChangeNoteType('NoteTodo')}></button> */}
    </section>
}

