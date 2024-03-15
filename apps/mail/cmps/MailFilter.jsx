import { mailService } from "../services/mail.service.js";
const { useNavigate, useParams } = ReactRouter






export function MailFilter({ filterBy, setFilterBy, sortBy, setSortBy }) {



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


            <section className="sort-actions">
                <button onClick={() => setSortBy(prevSortBy => ({ ...prevSortBy, sortType: 'sentAt', sortOrder: prevSortBy.sortOrder * -1 }))}
                    className={`sort-sentAt ${sortBy.sortType === `sentAt` ? 'selected' : ''}`}>Date <span className="fa-solid fa-sort"></span></button>

                <button onClick={() => setSortBy(prevSortBy => ({ ...prevSortBy, sortType: 'subject', sortOrder: prevSortBy.sortOrder * -1 }))}
                    className={`sort-subject ${sortBy.sortType === `subject` ? 'selected' : ''}`}>Subject <span className="fa-solid fa-sort"></span></button>
            </section>
        </form>

    </section>


}