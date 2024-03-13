const { useState } = React





export function NotePreview({ note,onRemoveNote,onUpdateNote }) {
    




    return <div className="note" style={note.style}>

        <p>{note.info.txt}</p>


        {/* <button>Color</button>
        <button>Pin</button> */}
        {/* <button className="edit-txt" onClick={()=> onChangeTxt(note)}>Edit</button> */}
        <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>

    </div>
}