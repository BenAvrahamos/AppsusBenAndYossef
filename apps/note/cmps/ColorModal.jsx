
export function ColorModal({ onUpdateNote, note, setIsColorModalOpen }) {

    function onChangeColor(color) {
        const noteToUpdate = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(noteToUpdate)
        setIsColorModalOpen(false)
    }

    return (<div className="color-change-container">
        <div className="color-picker-container">
            <div style={{ backgroundColor: "red" }} className='color-red' onClick={() => onChangeColor('red')}></div>
            <div style={{ backgroundColor: "orange" }} className='color-red' onClick={() => onChangeColor('orange')}></div>
            <div style={{ backgroundColor: "yellow" }} className='color-red' onClick={() => onChangeColor('yellow')}></div>
            <div style={{ backgroundColor: "green" }} className='color-red' onClick={() => onChangeColor('green')}></div>
            <div style={{ backgroundColor: "blue" }} className='color-red' onClick={() => onChangeColor('blue')}></div>
            <div style={{ backgroundColor: "white" }} className='color-red white' onClick={() => onChangeColor('white')}></div>
        </div>
    </div>)
}