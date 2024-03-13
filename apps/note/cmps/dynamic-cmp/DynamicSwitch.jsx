// const { useState } = React

import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function DynamicSwitch({ cmpType }) {
   

    console.log(cmpType)





    switch (cmpType) {
        case 'NoteTxt':
            return <NoteTxt />
        case 'NoteImg':
            return <NoteImg />
        case 'NoteVideo':
            return <NoteVideo />
        case 'NoteTodos':
            return <NoteTodos />
    }


    return <section className="dyn-container">

        <h2>hey from dyn</h2>




    </section>
}