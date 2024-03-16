import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, updateMail, removeMail }) {

    return (
        <ul className="mail-list-container">
            {mails.map(mail => (
                <li key={mail.id}>
                    <MailPreview
                        mail={mail}
                        updateMail={updateMail}
                        removeMail={removeMail} />
                </li>
            ))}
        </ul>
    )
}