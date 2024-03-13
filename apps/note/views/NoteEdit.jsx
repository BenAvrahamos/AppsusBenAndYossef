const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouter


import { noteService } from "../services/note.service.js"


export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

    useEffect(() => {

    }, [])

    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(noteToEdit)
            .then(alert('Note saved'))
            .catch(err => { 'could not save', err })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToEdit(prevNotToEdit => ({ ...prevNotToEdit, info: { ...prevNotToEdit.info, [field] : value} }))

    }




    return <section>
<h2>edit!!!!!!!!!</h2>





    </section>
    
    
    
    
    
}