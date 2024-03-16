const { useNavigate, useParams } = ReactRouter
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js";
import { Loading } from "../../note/cmps/Loading.jsx";

export function MailDetails() {
    const navigate = useNavigate()
    const [mail, setMail] = useState()
    const [time, setTime] = useState()

    const params = useParams()

    useEffect(() => {
        loadMail()

    }, [])

    function onReturn() {
        navigate('/mail')

    }

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
            })
    }

    if (!mail) return <div><Loading /></div>
    return <section className="mail-details-container">
        <header >
            <div className="return-btn" onClick={onReturn}><span className="fa-solid fa-arrow-left"></span></div>
            {mail.subject}
        </header>
        <section className="mail-specifics">

            <div className="mail-contacts">
                <p >{mail.from}</p>
                <p >{mail.to}</p>
            </div>

            <div className="mail-actions">
                <p className="mail-sendAt">{time}</p>

            </div>
        </section>

        <main className="mail-content">{mail.body}</main>


    </section>
}
