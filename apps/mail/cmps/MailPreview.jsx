const { useNavigate, useParams } = ReactRouter

import { utilService } from '../../../services/util.service.js'


export function MailPreview({ mail }) {
    const date = Date(mail.sentAt)
    const navigate = useNavigate()
    const NewDate = utilService.getDayName(date)

 
    function openMailDetails() {
        navigate(`/mail/:${mail.id}`)

    }


    return <article onClick={openMailDetails} className="mail-preview">


        {/* <Route path="/mail/:mailId" element={<MailList />} />  */}

        <span className="mail-from">{mail.from}</span>
        {/* <div className="mail-content"> */}
            <span className="mail-subject">{mail.subject}-</span>
            
            <span className="mail-body">{mail.body}</span>
        {/* </div> */}
        <span className="mail-sent-at">{NewDate}</span>


    </article>
}