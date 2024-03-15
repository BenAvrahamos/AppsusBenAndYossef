const { useState, useEffect } = React
const { Link, Outlet, NavLink } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter

import { MailEdit } from "../cmps/MailEdit.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";


console.log();




export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter)
    const [mails, setMails] = useState(null)
    const [mailEditToggle, setMailEditToggle] = useState(false)


    const { mailId } = useParams()

    function updateMail(mailToUpdate) {
        mailService.save(mailToUpdate)
            .then((savedMail) => {
                setMails(prevMails => prevMails.map(mail => mail.id === savedMail.id ? savedMail : mail),
                    console.log(mails))
            })

    }

    function removeMail(mail) {
        if (!mail.removedAt) {
            const timeStamp = Date.now()
            mail.removedAt = timeStamp
            updateMail(mail)
            console.log('filterBy', filterBy.status)
            console.log('removedAt', mail.removedAt)
            setMails(prevMails => prevMails.filter(oldMail => oldMail.id !== mail.id))
            return
        }
        const mailId = mail.id
        mailService.remove(mailId)
        setMails(prevMails => prevMails.filter(oldMail => oldMail.id !== mail.id))

    }



    useEffect(() => {
        loadMails()
        console.log(filterBy);
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
            setFilterBy={setFilterBy}
        />

        <MailFolderList
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            mailEditToggle={mailEditToggle}
            setMailEditToggle={setMailEditToggle} />

        {!mails && <div>loading...</div>}
        {mails && !mailId && <MailList
            mails={mails}
            updateMail={updateMail}
            removeMail={removeMail} />}

        {mailId && <Outlet />}

        {mailEditToggle && <MailEdit />}



    </section>
}

