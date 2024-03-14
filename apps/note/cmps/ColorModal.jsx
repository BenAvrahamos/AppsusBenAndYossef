
export function ColorModal({ onUpdateNote, note, setIsColorModalOpen }) {

    function onChangeColor(color) {
        const noteToUpdate = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(noteToUpdate)
        setIsColorModalOpen(false)
    }

    return (<div className="color-change-container">
        <div style={{ backgroundColor: "red" }} onClick={() => onChangeColor('red')}>red</div>
        <div style={{ backgroundColor: "orange" }} onClick={() => onChangeColor('orange')}>orange</div>
    </div>)
}