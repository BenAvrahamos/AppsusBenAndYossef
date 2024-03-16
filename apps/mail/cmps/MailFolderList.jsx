const { useEffect } = React
const { useNavigate } = ReactRouter




export function MailFolderList({
    filterBy, setFilterBy,
    mailEditToggle, setMailEditToggle,
    toggledSection, setToggledSection,
    mailCount
}) {

    const navigate = useNavigate()

    function onSetFilterType(value) {
        setToggledSection(value)
        navigate('/mail')

    }

    useEffect(() => {

        if (toggledSection === 'inbox') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStarred: false }))
        }

        if (toggledSection === 'starred') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, isStarred: true, status: '' }))
        }

        if (toggledSection === 'sent') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStarred: false }))
        }

        if (toggledSection === 'draft') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStarred: false }))
        }

        if (toggledSection === 'trash') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStarred: false }))
        }

    }, [toggledSection])

    return <section className="mail-folder-list-container">

        <section className="compact-mail-folder-list-container">

            <button onClick={() => setMailEditToggle(mailEditToggle = true)} className="compose-btn"><div className="fa-solid fa-pencil"></div></button>

            <section className="compact-options">

                <div
                    className={toggledSection === 'inbox' ? 'selected' : ''}
                    onClick={() => onSetFilterType('inbox')}><div className="fa-solid fa-inbox"></div>
                </div>

                <div
                    className={toggledSection === 'starred' ? 'selected' : ''}
                    onClick={() => onSetFilterType('starred')} id="starred"><div className="fa-solid fa-star"></div>
                </div>

                <div
                    className={toggledSection === 'sent' ? 'selected' : ''}
                    onClick={() => onSetFilterType('sent')}><div className="fa-solid fa-paper-plane"></div>
                </div>

                <div

                    className={toggledSection === 'draft' ? 'selected ' : ''}
                    onClick={() => onSetFilterType('draft')}><div className="fa-solid fa-file"></div>
                </div>

                <div
                    className={toggledSection === 'trash' ? 'selected' : ''}
                    onClick={() => onSetFilterType('trash')}><div className="fa-solid fa-trash-can"></div>
                </div>

            </section>

        </section>

        <button onClick={() => setMailEditToggle(mailEditToggle = true)} className="compose-btn"><div className="fa-solid fa-pencil"></div>Compose</button>

        <section className="folder-options">

            <div
                className={toggledSection === 'inbox' ? 'selected' : ''}
                onClick={() => onSetFilterType('inbox')}><div className="fa-solid fa-inbox"></div><span className="inbox">Inbox</span><span className="amount">{mailCount}</span>
            </div>
            <div
                className={toggledSection === 'starred' ? 'selected' : ''}
                onClick={() => onSetFilterType('starred')} id="starred"><div className="fa-solid fa-star"></div>Starred
                <span className="amount"></span>
            </div>

            <div
                className={toggledSection === 'sent' ? 'selected' : ''}
                onClick={() => onSetFilterType('sent')}><div className="fa-solid fa-paper-plane"></div>Sent
                <span className="amount"></span>
            </div>

            <div

                className={toggledSection === 'draft' ? 'selected ' : ''}
                onClick={() => onSetFilterType('draft')}><div className="fa-solid fa-file"></div>Draft
                <span className="amount"></span>
            </div>

            <div
                className={toggledSection === 'trash' ? 'selected' : ''}
                onClick={() => onSetFilterType('trash')}><div className="fa-solid fa-trash-can"></div>Trash <span
                    className="amount"></span>
            </div>

        </section>

    </section>

}