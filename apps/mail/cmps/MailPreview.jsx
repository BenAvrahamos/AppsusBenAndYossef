import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    const date = Date(mail.sentAt)

    const NewDate = utilService.getDayName(date)
    console.log(NewDate);




    return <article className="mail-preview">




        <span className="mail-from">{mail.from}</span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-body">{mail.body}</span>
        <span className="mail-sent-at">{NewDate}</span>


    </article>
}