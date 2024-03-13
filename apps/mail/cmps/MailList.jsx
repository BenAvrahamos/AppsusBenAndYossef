const { useState, useEffect } = React

import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail.service.js";



export function MailList({ mails }) {



    return (
        <ul className="mail-list-container">
            {mails.map(mail =>(
                <li key ={mail.id}>
                    <MailPreview mail ={mail}/>


                </li>


            ))}
        </ul>

    )

}