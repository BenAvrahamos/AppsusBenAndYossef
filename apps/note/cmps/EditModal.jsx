const { useState, useEffect } = React

export function EditModal({ setIsEditModalOpen, onUpdateNote, note }) {
    const [inputTodoValue, setInputTodoValue] = useState(
        note.type === "NoteTodos" && note.info.todos ? note.info.todos.map(todo => todo.txt).join(', ') : ''
    )
    const [inputValue, setInputValue] = useState(note.info.txt)
    const [inputImgValue, setInputImgValue] = useState(note.info.url)


    function onSubmitInput(event) {
        event.preventDefault()
        const noteToUpdate = { ...note, info: { ...note.info, txt: inputValue } }
        onUpdateNote(noteToUpdate)
        setIsEditModalOpen(false)
    }

    function onSubmitImgInput(event) {
        event.preventDefault()
        const noteToUpdate = { ...note, info: { ...note.info, url: inputImgValue } }
        onUpdateNote(noteToUpdate)
        setIsEditModalOpen(false)
    }

    function onSubmitTodoInput(event) {
        event.preventDefault()
        const updatedTodos = inputTodoValue.split(',').map(txt => ({
            txt: txt.trim(),
            doneAt: null
        }))

        const noteToUpdate = { ...note, info: { ...note.info, todos: updatedTodos } }
        onUpdateNote(noteToUpdate)
        setIsEditModalOpen(false)
    }

    function onChangeTodoInput(value) {
        setInputTodoValue(value)
    }

    function onChangeTxtInput(value) {
        setInputValue(value)
    }
    function onChangeImgUrlInput(value) {
        setInputImgValue(value)
    }
    // function onChangeInput(value) {
    //     setInputValue(value)
    //     setInputImgValue(value)
    // }

    return <div className="edit-input-container">
        {note.type === "NoteTxt" &&
            <form onSubmit={(event) => onSubmitInput(event)}>

                <textarea
                    placeholder={inputValue}
                    value={inputValue}
                    onChange={(event) => onChangeTxtInput(event.target.value)}
                    rows="4"
                    className="edit-input"
                />
                <button className="save-edit-btn"><span className="fa-solid fa-check save-btn-icon" ></span></button>
            </form>}
        {note.type === "NoteImg" &&
            <form onSubmit={(event) => onSubmitImgInput(event)}>
                <input type="text"
                    placeholder={inputImgValue}
                    value={inputImgValue}
                    onChange={(event) => onChangeImgUrlInput(event.target.value)}
                />
                <button className="save-edit-btn"><span className="fa-solid fa-check save-btn-icon"></span></button>
            </form>}
        {note.type === "NoteVideo" &&
            <form onSubmit={(event) => onSubmitImgInput(event)}>
                <input type="text"
                    placeholder={inputImgValue}
                    value={inputImgValue}
                    onChange={(event) => onChangeImgUrlInput(event.target.value)}
                />
                <button className="save-edit-btn"><span className="fa-solid fa-check"></span></button>
            </form>}
        {note.type === "NoteTodos" &&
            <form onSubmit={(event) => onSubmitTodoInput(event)}>
                <textarea
                    placeholder={inputTodoValue}
                    value={inputTodoValue}
                    onChange={(event) => onChangeTodoInput(event.target.value)}
                    rows="4"
                    className="edit-input"
                />
                <button className="save-edit-btn"><span className="fa-solid fa-check"></span></button>
            </form>}

    </div>

}


