const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js";


export function MailEdit() {

    const [newMail, editNewMail] = useState(mailService.getEmptyMail)

    function handleChange({ target }) {
        const { name: field, value } = target
        editNewMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev){
        ev.preventDefault()
        // newMail.mailService.save()
        // .then(console.log(mails))

    }

    return <section className="mail-edit-container">

        <h1>New Message</h1>
        <form onSubmit={onSendMail}>
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
            <button className="close-btn">close</button>
        </form>




    </section>


}