const { useState, useEffect } = React

import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";





export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then((mails) => {
                setMails(mails)
            
            })
    }
    if (!mails) return <div>loading...</div>
    return <section className="mail-index-container">



        <MailFilter />

        <MailFolderList />
        <MailList mails={mails} />



        {/* {if (!MailId)}<MailList/> */}
        {/* {(MailId) && <outLet />} */}


    </section>
}

