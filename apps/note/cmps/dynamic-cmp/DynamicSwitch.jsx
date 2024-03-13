// const { useState } = React

import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function DynamicSwitch(props) {








    switch (props.cmpType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }


    return <section className="dyn-container">

        <h2>Select text or image...</h2>




    </section>
}