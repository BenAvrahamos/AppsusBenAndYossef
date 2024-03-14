import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'MailDB'





const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}



export const mailService = {
    query,
    get,
    save,
    remove,
    getEmptyMail,
    getDefaultFilter,
    getUser,
    getEmptyMailCount,
}

function getUser() {
    return loggedInUser
}



function query(filterBy = getDefaultFilter()) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.body) ||
                    regex.test(mail.subject) ||
                    regex.test(mail.from) ||
                    regex.test(mail.to))
            }
            if (filterBy.status === 'inbox') {

                mails = mails.filter(mail => mail.from !== loggedInUser.email
                )
            }
            if (filterBy.isStared) {

                mails = mails.filter(mail => mail.isStared
                )
            }

            if (filterBy.status === 'sent') {

                mails = mails.filter(mail => mail.from === loggedInUser.email
                )
            }

            if (filterBy.status === 'draft') {

                mails = mails.filter(mail => mail.sendAt === null
                )
            }

            if (filterBy.status === 'trash') {

                mails = mails.filter(mail => mail.removedAt
                )
            }

            return mails
        })
}


function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(
    subject = '',
    body = '',
    isRead = false,
    sentAt = Date.now(),
    removedAt = null,
    from = loggedInUser.email,
    to = null
) {

    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        sentAt,
        removedAt,
        from,
        to
    }
}

function _createMails() {
    let Mails = utilService.loadFromStorage(MAIL_KEY)
    if (!Mails || !Mails.length) {
        Mails = gMails
        utilService.saveToStorage(MAIL_KEY, Mails)

    }
}

function getDefaultFilter() {
    return {
        status: '',
        txt: '',
        isRead: false,
        isStared: false,
        labels: ['important', 'romantic']

    }


}

function getEmptyMailCount() {
    return {
        sent: 0,
        Starred: 0,
        draft: 0,
        trash: 0
    }
}


const gMails = [
    {
        id: utilService.makeId(),
        subject: "Sprint 3 Bitch!",
        body: "Lets do this my Man",
        isRead: false,
        isStared: true,
        sentAt: (1714700499),
        removedAt: null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },
    {
        id: utilService.makeId(),
        subject: "Cakes CAKES CAKES!",
        body: "Lets do this my Man",
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },
    {
        id: utilService.makeId(),
        subject: "Sprint 3 Bitch!",
        body: "In the quiet of the night, Underneath the starry sky, Whispers echo in the breeze, Tales of love and memories. A melody begins to play, Softly dancing, in the fray, Hearts entwined, forever bound, Lost within the sweetest sound."
        ,
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },
    {
        id: utilService.makeId(),
        subject: "!",
        body: "The sun dipped below the horizon, casting a warm orange glow across the sky, while birds chirped happily in the trees, and a gentle breeze rustled through the leaves, carrying the scent of fresh flowers.",
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedInUser.email,
        to: "BenAvraham1998@Gmail.com"
    },
    {
        id: utilService.makeId(),
        subject: "!",
        body: "The sun dipped below the horizon, casting a warm orange glow across the sky, while birds chirped happily in the trees, and a gentle breeze rustled through the leaves, carrying the scent of fresh flowers.",
        isRead: false,
        sentAt: 150000,
        removedAt: null,
        from: "BenAvraham1998@Gmail.com",
        to: loggedInUser.email
    },

]
_createMails()