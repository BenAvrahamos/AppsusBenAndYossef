

export function NoteBtn({onRemoveNote}) {

    return <section>

        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>


    </section>
}