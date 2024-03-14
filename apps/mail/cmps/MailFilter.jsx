import { mailService } from "../services/mail.service.js";
const { useNavigate, useParams } = ReactRouter




export function MailFilter({ filterBy, setFilterBy }) {

    const navigate = useNavigate()

    function onSubmit(ev) {
        ev.preventDefault()
        navigate('/mail')
    }



    function handleChange({ target }) {

        const value = target.value
        setFilterBy(prevFilterBy =>
            ({ ...prevFilterBy, txt: value }))

    }


    return <section className="mail-filter">
        <form onSubmit={onSubmit}>

            <input type="text"
                placeholder="Search for Mail by Subject / Body / Address..."
                value={filterBy.txt}
                onChange={handleChange} />

        </form>

    </section>


}