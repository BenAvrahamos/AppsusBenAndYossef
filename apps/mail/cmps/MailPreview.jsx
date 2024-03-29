const { useNavigate } = ReactRouter
const { useState } = React

import { utilService } from '../../../services/util.service.js'
import { mailService } from "../services/mail.service.js";

export function MailPreview({ mail, updateMail, removeMail }) {
    const navigate = useNavigate()
    const [isRead, toggleIsRead] = useState(mail.isRead)
    const [isStarred, toggleIsStarred] = useState(mail.isStarred)

    const user = mailService.getUser()

    const date = new Date(mail.sentAt)
    const monthName = utilService.getMonthName(date).slice(0, 3)
    const dayName = date.getDate()
    const yearName = date.getFullYear()
    let displayDate = monthName + ' ' + dayName + ' '
    if (mail.sentAt + 31536000000 < Date.now()) displayDate += ' ' + yearName

    function openMailDetails() {
        navigate(`/mail/${mail.id}`)
    }

    function onSetMailIsRead(ev) {
        ev.stopPropagation();
        const updatedIsRead = !isRead
        toggleIsRead(updatedIsRead)
        mail.isRead = updatedIsRead
        updateMail(mail)
    }

    function onRemoveMail(ev) {
        ev.stopPropagation()
        removeMail(mail)
    }

    function onSetMailIsStarred(ev) {
        ev.stopPropagation();
        const updatedIsStarred = !isStarred
        toggleIsStarred(updatedIsStarred)
        mail.isStarred = updatedIsStarred
        updateMail(mail)
    }

    return <article onClick={openMailDetails} className={`mail-preview `}>

        <div onClick={onSetMailIsStarred}
            title={mail.isStarred ? 'Not Starred' : 'Starred'} className={mail.isStarred ? 'fa-regular fa-star ' : 'fa-solid fa-star yellow-star'}></div>

        <span className={`mail-from ${!mail.isRead ? 'unread' : ''}`}>{mail.from === user.email ? 'Me' : mail.from}</span>

        <span className={`mail-subject ${!mail.isRead ? 'unread' : ''}`}>{mail.subject}-</span>

        <span className="mail-body">{mail.body}</span>

        <span className="mail-sent-at">{displayDate}</span>

        <section className="actions ">

            <div onClick={onSetMailIsRead}
                title={mail.isRead ? 'Mark as Read' : 'Mark as Unread'}
                className={mail.isRead ? 'fa-regular fa-envelope-open' : 'fa-solid fa-envelope '}>
            </div>
            <div onClick={onRemoveMail}
                title={mail.removedAt ? 'Delete Mail' : 'Move Mail to Trash'} className="fa-solid fa-trash-can"></div>
        </section>
    </article>
}

