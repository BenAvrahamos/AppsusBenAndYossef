
import { DynamicSwitch } from "./dynamic-cmp/DynamicSwitch.jsx"

export function MaxMizeInput({ noteToEdit, setIsExpanded, setNotToEdit }) {

    return <section>
        <DynamicSwitch noteToEdit={noteToEdit} setIsExpanded={setIsExpanded} setNotToEdit={setNotToEdit} />
    </section>

}


