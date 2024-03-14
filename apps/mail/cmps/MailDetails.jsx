const { useNavigate, useParams } = ReactRouter
const { useState, useEffect } = React



import { mailService } from "../services/mail.service.js";
import { utilService } from '../../../services/util.service.js'

export function MailDetails() {
    const navigate = useNavigate()
    const [mail, setMail] = useState()
    const [time, setTime] = useState()

    const params = useParams()

    useEffect(() => {
        loadMail()

    }, [])

    function calcTime(mail) {
        let dateString = new Date(mail.sentAt).toUTCString()
        dateString = dateString.split(' ').slice(0, 4).join(' ')
        setTime(dateString)
    }

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
                calcTime(mail)
                console.log(mail.body)
            })
    }

    if (!mail) return <div>loading</div>
    return <section className="mail-details-container">
        <header >{mail.subject}</header>
        <section className="mail-specifics">

            <div className="mail-contacts">
                <p >{mail.from}</p>
                <p >{mail.to}</p>
            </div>

            <div className="mail-actions">
                <p className="mail-sendAt">{time}</p>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </div>
        </section>

        <main className="mail-content">{mail.body}</main>


    </section>
}
