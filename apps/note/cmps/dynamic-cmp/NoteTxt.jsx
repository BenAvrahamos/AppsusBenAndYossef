const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteTxt() {
    const [isClicked, setIsClicked] = useState(false)
    useEffect(() => {
        if (isClicked) {

        }
    }, [isClicked])
    function onSetIsClicked() {
        setIsClicked(prevClick => (prevClick = !prevClick))
    }



    return <section className="note-text-container">

        <div onClick={onSetIsClicked}>
            <p>Add new note</p>
            {isClicked &&
                <React.Fragment>
                    <input type="text"
                        placeholder="Enter title..." />

                    <input type="text"
                        placeholder="Enter text..." />
                </React.Fragment>}

        </div>








    </section>
}