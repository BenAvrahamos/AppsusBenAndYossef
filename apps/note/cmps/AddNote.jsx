const { useState } = React

import { noteService } from "../services/note.service.js"

import { MaxMizeInput } from "./MaxMizeInput.jsx"
import { MiniMizeInput } from "./MiniMizeInput.jsx"

export function AddNote({ isExpanded, setIsExpanded, onSetFilter, filterBy }) {
    const [noteToEdit, setNotToEdit] = useState(noteService.getEmptyNote())

    return <section>

        {!isExpanded && <MiniMizeInput setNotToEdit={setNotToEdit} noteToEdit={noteToEdit} setIsExpanded={setIsExpanded} onSetFilter={onSetFilter} filterBy={filterBy} />}

        {isExpanded && <MaxMizeInput noteToEdit={noteToEdit} setIsExpanded={setIsExpanded} setNotToEdit={setNotToEdit} />}

    </section>
}