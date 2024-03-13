const { useNavigate, useParams } = ReactRouter


import { mailService } from "../services/mail.service.js";
export function MailDetails(){

    const { mailId } = useParams()






    mailService.get(mailId)
    .then( mail => console.log(mail))

    return <section>

        
        Hello!
        </section>
}