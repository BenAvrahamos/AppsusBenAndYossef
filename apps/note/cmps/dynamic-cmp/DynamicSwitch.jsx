// const { useState } = React

import { NoteTxt } from "./NoteTxt.jsx"

export function DynamicSwitch({ cmpType }) {
    // const [cmpType, setCmpType] = useState('')

    console.log(cmpType)





    switch (cmpType) {
        case 'NoteTxt':
            return <NoteTxt />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }


    return <section className="dyn-container">

        <h2>hey from dyn</h2>




    </section>
}