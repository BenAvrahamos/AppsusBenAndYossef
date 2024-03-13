const { useState, useEffect } = React
const { Link, Outlet, NavLink } = ReactRouterDOM

import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

const { useNavigate, useParams } = ReactRouter




export function MailIndex() {

    const [mails, setMails] = useState(null)

    const { mailId } = useParams()


    useEffect(() => {
        loadMails()

    }, [])

    function loadMails() {
        mailService.query()
            .then((mails) => {
                setMails(mails)

            })
    }

    return <section className="mail-index-container">

        <MailFilter />
        <MailFolderList />

        {!mails && <div>loading...</div>}
        {mails && !mailId && <MailList mails={mails} />}

        {mailId && <Outlet />}


    </section>
}

