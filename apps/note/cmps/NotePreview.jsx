const { useState } = React


import { NoteList } from "../cmps/NoteList.jsx"
import { DynamicSwitch } from "./dynamic-cmp/DynamicSwitch.jsx"

export function NotePreview() {
    const [cmpType, setCmpType] = useState('')

    console.log(cmpType);



    return <section className="preview-container">

        <h2>hey from preview</h2>

        <div>
            <label htmlFor="note-text">T</label>
            <input type="radio"
                id="note-text"
                name="note-text"
                value="NoteTxt"
                onClick={(ev) => { setCmpType(ev.target.value) }} />
        </div>


        <DynamicSwitch cmpType={cmpType} />





        <NoteList />
    </section>
}