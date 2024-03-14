const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js";

export function MailFolderList({ filterBy, setFilterBy }) {

    const [mailCount, setMailCount] = useState(mailService.getEmptyMailCount)
    const [toggledSection, setToggledSection] = useState('inbox')


    function onSetFilterType(value) {

        setToggledSection(value)

    }

    useEffect(() => {
        console.log(filterBy);

    }, [filterBy])


    useEffect(() => {

        if (toggledSection === 'inbox') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStared: false }))
        }

        if (toggledSection === 'starred') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, isStared: true, status: '' }))
        }

        if (toggledSection === 'sent') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStared: false }))
        }

        if (toggledSection === 'draft') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStared: false }))
        }

        if (toggledSection === 'trash') {
            setFilterBy(prevFilterBy =>
                ({ ...prevFilterBy, status: toggledSection, isStared: false }))
        }

    }, [toggledSection])







    return <section className="mail-folder-list-container">

        <button className="compose-btn">Compose</button>

        <section className="folder-options">

            <div
                className={toggledSection === 'inbox' ? 'selected' : ''}
                onClick={() => onSetFilterType('inbox')}>Inbox
                <span className="amount">35</span>
            </div>

            <div
                className={toggledSection === 'starred' ? 'selected' : ''}
                onClick={() => onSetFilterType('starred')} id="starred">Starred
                <span className="amount">35</span>
            </div>

            <div
                className={toggledSection === 'sent' ? 'selected' : ''}
                onClick={() => onSetFilterType('sent')}>Sent
                <span className="amount">35</span>
            </div>

            <div
                className={toggledSection === 'draft' ? 'selected ' : ''}
                onClick={() => onSetFilterType('draft')}>Draft
                <span className="amount">35</span>
            </div>

            <div
                className={toggledSection === 'trash' ? 'selected' : ''}
                onClick={() => onSetFilterType('trash')}>Trash <span
                    className="amount">35</span>
            </div>

        </section>

    </section>


}