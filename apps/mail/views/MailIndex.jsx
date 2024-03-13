import { MailFilter } from "../../../cmps/MailFilter.jsx";
import { MailFolderList } from "../../../cmps/MailFolderList.jsx";
import { MailList } from "../../../cmps/MailList.jsx";



export function MailIndex() {

    return <section  className="mail-index-container">
        <MailFilter/>

        <MailFolderList/>
        
        <MailList/>


    </section>
}

