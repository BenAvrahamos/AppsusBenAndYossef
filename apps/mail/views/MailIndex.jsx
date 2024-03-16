const { useState, useEffect } = React
const { Link, Outlet, NavLink, useSearchParams } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter


import { MailEdit } from "../cmps/MailEdit.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";
import { Loading } from "../../note/cmps/Loading.jsx";

import { showSuccessMsg } from "../../../services/event-bus.service.js";

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    const [mails, setMails] = useState(null)
    const [mailEditToggle, setMailEditToggle] = useState(false)
    const [sortBy, setSortBy] = useState({ sortType: 'sendAt', sortOrder: 1 })
    const [toggledSection, setToggledSection] = useState('inbox')
    const [mailCount, calcMailCount] = useState('')

    useEffect(() => {
        setSearchParams(filterBy)
        filterMails()
    }, [sortBy])




    useEffect(() => {

        mailService.getTotalMailCount()
            .then(mailCount => {
                calcMailCount(mailCount)
            })



    }, [mails])

    function filterMails() {
        if (mails) {
            const { sortType, sortOrder } = sortBy;

            if (sortType === 'sentAt') {
                setMails(prevMailOrder => prevMailOrder.slice().sort((a, b) => (b[sortType] - a[sortType]) * sortOrder));
            }

            if (sortType === 'subject') {
                setMails(prevMailOrder => prevMailOrder.slice().sort((a, b) => {

                    const itemA = a[sortType]
                    const itemB = b[sortType]

                    if (itemA < itemB) return -1 * sortOrder
                    if (itemA > itemB) return 1 * sortOrder
                    return 0;
                }))
            }
        }
    }

    const { mailId } = useParams()

    function updateMail(mailToUpdate) {
        mailService.save(mailToUpdate)
            .then((savedMail) => {
                setMails(prevMails => prevMails.map(mail => mail.id === savedMail.id ? savedMail : mail))
            })

    }

    function addMail(mail) {
        mailService.save(mail)
            .then(savedMail => {
                setToggledSection('sent')
                setMails(prevMails => [...prevMails, savedMail])
                showSuccessMsg(`Mail Sent`)
            })

        setMailEditToggle(false)

    }

    function removeMail(mail) {
        if (!mail.removedAt) {
            const timeStamp = Date.now()
            mail.removedAt = timeStamp
            showSuccessMsg(`Mail Moved to Trash`)
            updateMail(mail)
            setMails(prevMails => prevMails.filter(oldMail => oldMail.id !== mail.id))
            return
        }
        const mailId = mail.id
        mailService.remove(mailId)
        showSuccessMsg(`Mail Deleted`)
        setMails(prevMails => prevMails.filter(oldMail => oldMail.id !== mail.id))

    }

    useEffect(() => {
        setSearchParams(filterBy)
        loadMails(filterBy)

    }, [filterBy])

    function loadMails(filterBy) {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)

            })
    }
    if (!mails) return <div><Loading /></div>
    return <section className="mail-index-container">

        <MailFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            sortBy={sortBy}
            setSortBy={setSortBy}
        />

        <MailFolderList
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            mailEditToggle={mailEditToggle}
            setMailEditToggle={setMailEditToggle}
            toggledSection={toggledSection}
            setToggledSection={setToggledSection}
            mailCount={mailCount}
        />


        {mails && !mails.length && <div className="noMailsAlert">No Mails to Show</div>}
        {mails && !mailId && <MailList
            mails={mails}
            updateMail={updateMail}
            removeMail={removeMail} />}

        {mailId && <Outlet />}

        {mailEditToggle && <MailEdit addMail={addMail} setMailEditToggle={setMailEditToggle} />}

    </section>
}

