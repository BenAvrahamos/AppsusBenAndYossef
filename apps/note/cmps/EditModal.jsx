const { useState, useEffect } = React

export function EditModal({ setIsEditModalOpen, onUpdateNote, note }) {
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
        const noteToUpdate = { ...note, info: { ...note.info, url: inputValue } }
        onUpdateNote(noteToUpdate)
        setIsEditModalOpen(false)
    }


    function onChangeInput(value) {
        setInputValue(value)
        setInputImgValue(value)
    }

    return <div>
        {note.type === "NoteTxt" &&
            <form onSubmit={(event) => onSubmitInput(event)}>
                <input type="text"
                    placeholder={inputValue}
                    value={inputValue}
                    onChange={(event) => onChangeInput(event.target.value)}
                />
                <button>Save</button>
            </form>}
        {note.type === "NoteImg" &&
            <form onSubmit={(event) => onSubmitImgInput(event)}>
                <input type="text"
                    placeholder={inputImgValue}
                    value={inputImgValue}
                    onChange={(event) => onChangeInput(event.target.value)}
                />
                <button>Save</button>
            </form>}
        {note.type === "NoteVideo" &&
            <form onSubmit={(event) => onSubmitImgInput(event)}>
                <input type="text"
                    placeholder={inputImgValue}
                    value={inputImgValue}
                    onChange={(event) => onChangeInput(event.target.value)}
                />
                <button>Save</button>
            </form>}

    </div>

}