const { useNavigate, useParams } = ReactRouter

import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail }) {
    const navigate = useNavigate()

    const date = new Date(mail.sentAt)
    const monthName = utilService.getMonthName(date).slice(0,3)
    const dayName = date.getDate()
    const yearName = date.getFullYear()
    let displayDate = monthName + ' ' + dayName + ' '

    if (mail.sentAt + 31536000000 < Date.now()) displayDate +=  ' ' +  yearName

    function openMailDetails() {
        navigate(`/mail/${mail.id}`)

    }


    return <article onClick={openMailDetails} className="mail-preview">


        {/* <Route path="/mail/:mailId" element={<MailList />} />  */}

        <span className="mail-from">{mail.from}</span>
        {/* <div className="mail-content"> */}
        <span className="mail-subject">{mail.subject}-</span>

        <span className="mail-body">{mail.body}</span>
        {/* </div> */}
        <span className="mail-sent-at">{displayDate}</span>


    </article>
}