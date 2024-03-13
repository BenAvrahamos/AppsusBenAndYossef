import { mailService } from "../services/mail.service.js";


export function MailFilter({ filterBy, setFilterBy }) {
    console.log(filterBy);


    function handleChange({ target }) {
        const value = target.value
        setFilterBy(prevFilterBy =>
            ({ ...prevFilterBy, txt: value }))

    }


    return <section className="mail-filter">

        <input type="text"
            placeholder="Search for Mail..."
            value={filterBy.txt}
            onChange={handleChange} />



    </section>


}