const { useState, useEffect } = React
// const { Link, useSearchParams } = ReactRouterDOM

export function NoteTxt({ handleChange, onSaveNote, onSetIsClicked, info }) {
    // const [isClicked, setIsClicked] = useState(false)
    // useEffect(() => {
    //     if (isClicked) {

    //     }
    // }, [isClicked])
    // function onSetIsClicked() {
    //     setIsClicked(prevClick => (prevClick = !prevClick))
    // }

    console.log(info);

    return <section className="note-text-container">




        <input className="input-add-new-note" type="text"
            placeholder="Enter text..."
            name="txt"
            onChange={handleChange}
            value={info.txt}
        />
        <button className="save-new-note-btn" onClick={onSaveNote}>Save</button>
        <button className="cancel-new-note-btn" onClick={onSetIsClicked}>Cancel</button>






    </section>
}