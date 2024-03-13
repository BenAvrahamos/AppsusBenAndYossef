import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    const date = Date(mail.sentAt)

    const NewDate = utilService.getDayName(date)
    console.log(NewDate);

function hello(){
    console.log('hi');
}


    return <article onClick={hello} className="mail-preview">




        <span className="mail-from">{mail.from}</span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-sent-at">{NewDate}</span>


    </article>
}