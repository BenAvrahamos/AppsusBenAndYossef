const { useState, useEffect } = React
const { Link, Outlet, NavLink } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter

import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";


console.log();




export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter)
    const [mails, setMails] = useState(null)

    const { mailId } = useParams()



    useEffect(() => {
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)

            })
    }

    return <section className="mail-index-container">

        <MailFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy} />

        <MailFolderList />

        {!mails && <div>loading...</div>}
        {mails && !mailId && <MailList mails={mails} />}

        {mailId && <Outlet />}



    </section>
}

