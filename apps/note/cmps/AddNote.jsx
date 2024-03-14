const { useState} = React

import { noteService } from "../services/note.service.js"

import { MaxMizeInput } from "./MaxMizeInput.jsx"
import { MiniMizeInput } from "./MiniMizeInput.jsx"

export function AddNote({isExpanded,setIsExpanded}) {
    const [noteToEdit,setNotToEdit]=useState(noteService.getEmptyNote())

return <section>

{!isExpanded && <MiniMizeInput  setNotToEdit={setNotToEdit} noteToEdit={noteToEdit} setIsExpanded={setIsExpanded}/>}

{isExpanded&&<MaxMizeInput noteToEdit={noteToEdit} setIsExpanded={setIsExpanded} setNotToEdit={setNotToEdit}/>}

</section>
}


































// export function NoteAdd(){
// const [isExpanded,setIsExpanded]= useState(false)
// const [notetoedit,setnotetotedit]= useState(service.getempy)

//     return(<div>
// {!isExpanded && <minimizedIput setnotetotedit={setnotetotedit}/>}
// {isExpanded&&<expandedIput notetoedit={notetotedit}></expandedIput>}

//     </div>)
// }




// function minimizedinput({setnotetotedit,notetoedit}){

//     function onchangeNoteType(type){
// setnotetotedit(prev=>{...prev, type})
//     }
//     return <div>
// {/* <input type="text" placeholder:{notetoedit.type ==='img'? "enter url": "enter txt"} /> */}
// {/* <input type="text" placeholder:{notetoedit.type ==='img'? "enter url": "enter txt"} />
//  */}

//  {notetoedit.type === 'txt'&& input }
//  {notetoedit.type === 'img'&& input enter }
//         <button onclick={onchangeNoteType('txt')}></button>
//         <button></button>
//         <button></button>

//     </div>
// }







// function expandedinput({notetoedit}){
   



//     return <div>
// <dynamic notetoedit={notetoedit/>

//     </div>
// }

// export function DynamicSwitch(props) {

//     switch (props.notetoedit.type) {
//         case 'NoteTxt':
//             return <NoteTxt {...props} />
//         case 'NoteImg':
//             return <NoteImg {...props} />
//         case 'NoteVideo':
//             return <NoteVideo {...props} />
//         case 'NoteTodos':
//             return <NoteTodos {...props} />
//     }


//     return <section className="dyn-container">

//         {/* <h2>Select text or image...</h2> */}
        
//     </section>
// }


// function notetxt(props){

//     return <div>
//     <input type="text" />

//     </div>
// }