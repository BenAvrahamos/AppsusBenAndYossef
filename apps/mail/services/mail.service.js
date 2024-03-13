import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

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
    _createMails
}



function query() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // if (filterBy.title) {
            //   const regex = new RegExp(filterBy.title, 'i')
            //   books = books.filter(book => regex.test(book.title))
            // }
            // if (filterBy.price) {

            //   books = books.filter(book => book.listPrice.amount >= filterBy.price
            //   )
            // }
            // if (filterBy.publishedDate) {

            //   books = books.filter(book => book.publishedDate >= filterBy.publishedDate
            //   )
            // }
            return mails
        })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
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


const gMails = [
    {
        id: utilService.makeId(),
        subject : "Sprint 3 Bitch!",
        body : "Lets do this my Man",
        isRead : false,
        sentAt : Date.now(),
        removedAt :null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },
    {
        id: utilService.makeId(),
        subject : "Sprint 3 Bitch!",
        body : "Lets do this my Man",
        isRead : false,
        sentAt : Date.now(),
        removedAt :null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },
    {
        id: utilService.makeId(),
        subject : "Sprint 3 Bitch!",
        body : "Lets do this my Man",
        isRead : false,
        sentAt : Date.now(),
        removedAt :null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },
    {
        id: utilService.makeId(),
        subject : "Sprint 3 Bitch!",
        body : "The sun dipped below the horizon, casting a warm orange glow across the sky, while birds chirped happily in the trees, and a gentle breeze rustled through the leaves, carrying the scent of fresh flowers.",
        isRead : false,
        sentAt : Date.now(),
        removedAt :null,
        from: loggedInUser.email,
        to: "Yossef@.gmail.com"
    },

]
_createMails()