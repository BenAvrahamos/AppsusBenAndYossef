const { useState, useEffect } = React

import { noteService } from "../../services/note.service.js"

export function NoteTodos({ noteToEdit, setIsExpanded, setNotToEdit }) {
    const [todoInput, setTodoInput] = useState('')

    useEffect(() => {
        if (noteToEdit && noteToEdit.info && noteToEdit.info.todo) {
            const todosText = noteToEdit.info.todo.map(todo => todo.txt).join(', ')
            setTodoInput(todosText)
        }
    }, [noteToEdit])

    function handleChange({ target }) {
        const { value } = target
        setTodoInput(value)
    }

    function onSaveNote() {
        const todo = todoInput.split(',').map(txt => ({
            txt: txt.trim(),
            doneAt: null
        })).filter(todo => todo.txt)

        const updatedNote = {
            ...noteToEdit,
            info: {
                ...noteToEdit.info,
                todos: todo
            }
        }

        noteService.save(updatedNote)
            .then(() => {
                alert('Note saved')
                setIsExpanded(false)
            })
            .catch(err => alert(`Could not save note: ${err}`))
    }

    return <section className="note-todos-container note-text-container">

        <input type="text" className="input-add-new-note new-note-container"
            placeholder="Enter tasks, separated by commas..."
            onChange={handleChange}
            value={todoInput}
        />
        <button className="save-new-note-btn" onClick={onSaveNote}>Save</button>
    </section>
}