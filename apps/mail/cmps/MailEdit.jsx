const { useState } = React

import { mailService } from "../services/mail.service.js";

export function MailEdit({ addMail, setMailEditToggle }) {

    const [newMail, editNewMail] = useState(mailService.getEmptyMail)

    function handleChange({ target }) {
        const { name: field, value } = target
        editNewMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev) {
        newMail.isRead = true
        ev.preventDefault()
        addMail(newMail)

    }

    return <section className="mail-edit-container">

        <div className="mail-edit-header">
            <h1>New Message</h1>
            <button type="button" onClick={() => setMailEditToggle(false)} className="close-btn">close</button>
        </div>
        <form id="mailEdit" onSubmit={onSendMail}>
            <div className="mail-edit-details">

                <div className="mail-to">

                    <label htmlFor="mail-to">To</label>
                    <input type="text" id="mail-to" />

                </div>

                <input className="mail-edit-subject" type="text" name="subject" placeholder="Subject" onChange={handleChange} />

            </div>

            <textarea className="mail-edit-body" name="body"
                onChange={handleChange} value={newMail.body} placeholder="Body" cols="50" rows="10"></textarea>

            <button className="send-btn">Send</button>
        </form>

    </section>

}