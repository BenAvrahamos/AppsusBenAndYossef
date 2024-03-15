const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter


import { mailService, } from "../services/mail.service.js";

export function MailFolderList({
    filterBy, setFilterBy,
    mailEditToggle, setMailEditToggle,
    toggledSection, setToggledSection,
    mailCount
}) {

    console.log(mailCount);

    const navigate = useNavigate()
   

    function onSetFilterType(value) {
        setToggledSection(value)
        navigate('/mail')

    }

    useEffect(() => {


    }, [filterBy])


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

        <button onClick={() => setMailEditToggle(mailEditToggle = true)} className="compose-btn">Compose</button>

        <section className="folder-options">

            <div
                className={toggledSection === 'inbox' ? 'selected' : ''}
                onClick={() => onSetFilterType('inbox')}>Inbox
                <span className="amount">{mailCount}</span>
            </div>

            <div
                className={toggledSection === 'starred' ? 'selected' : ''}
                onClick={() => onSetFilterType('starred')} id="starred">Starred
                <span className="amount"></span>
            </div>

            <div
                className={toggledSection === 'sent' ? 'selected' : ''}
                onClick={() => onSetFilterType('sent')}>Sent
                <span className="amount"></span>
            </div>

            <div
                className={toggledSection === 'draft' ? 'selected ' : ''}
                onClick={() => onSetFilterType('draft')}>Draft
                <span className="amount"></span>
            </div>

            <div
                className={toggledSection === 'trash' ? 'selected' : ''}
                onClick={() => onSetFilterType('trash')}>Trash <span
                    className="amount"></span>
            </div>

        </section>

    </section>


}