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

                mails = mails.filter(mail => mail.from !== loggedInUser.email && !mail.removedAt)

            }
            if (filterBy.isStarred) {

                mails = mails.filter(mail => mail.isStarred && !mail.removedAt)
            }

            if (filterBy.status === 'sent') {

                mails = mails.filter(mail => mail.from === loggedInUser.email && !mail.removedAt)
            }

            if (filterBy.status === 'draft') {

                mails = mails.filter(mail => mail.sendAt === null && !mail.removedAt)
            }

            if (filterBy.status === 'trash') {

                mails = mails.filter(mail => !!mail.removedAt);
            }

            return mails.sort((a, b) => (b.sentAt - a.sentAt))
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
        mail.id = utilService.makeId()
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
        isStarred: false,
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
        subject: "Coffee Chat",
        body: "Hey there! Let's catch up over coffee sometime this week.",
        isRead: false,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "john.doe@example.com",
        to: "alice.smith@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Project Update",
        body: "Attached is the latest project update. Please review and provide feedback.",
        isRead: true,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "project.manager@example.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Team Lunch",
        body: "Hey everyone, let's have a team lunch tomorrow at the new Italian place around the corner.",
        isRead: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        isStarred: false,
        from: "office.manager@example.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Reminder: Deadline Approaching",
        body: "Just a friendly reminder that the deadline for submitting the quarterly report is approaching. Please ensure all data is up to date.",
        isRead: true,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "manager@example.com",
        to: "reporting.team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Invitation to Webinar",
        body: "You're invited to our upcoming webinar on 'Effective Time Management Strategies.' Register now to secure your spot.",
        isRead: false,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "events@example.com",
        to: "attendees@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Weekly Newsletter",
        body: "Check out our latest newsletter for updates on industry trends and company news.",
        isRead: false,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: 1750612345,
        from: "newsletter@example.com",
        to: "subscribers@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Job Opportunity",
        body: "We have a new job opening for a Senior Software Engineer position. Are you interested?",
        isRead: false,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "hr@example.com",
        to: "candidates@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Meeting Agenda",
        body: "Attached is the agenda for our upcoming meeting. Please review and come prepared.",
        isRead: true,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "meeting.organizer@example.com",
        to: "participants@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Feedback Request",
        body: "We value your opinion! Please take a moment to complete our feedback survey.",
        isRead: false,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "feedback@example.com",
        to: "customers@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "New Product Launch",
        body: "Introducing our latest product! Check it out on our website.",
        isRead: true,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "marketing@example.com",
        to: "subscribers@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Holiday Closure Notice",
        body: "Our office will be closed for the upcoming holiday. We will reopen on [Date].",
        isRead: true,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "office.manager@example.com",
        to: "all@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Training Session",
        body: "We have scheduled a training session for [Topic]. Please RSVP by [Date].",
        isRead: false,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "training@example.com",
        to: "participants@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Networking Event Invitation",
        body: "You're invited to our networking event next week. Don't miss this opportunity to connect with industry professionals.",
        isRead: true,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "networking@example.com",
        to: "invitees@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "New Project Proposal",
        body: "We have a new project proposal for [Project Name]. Please review and provide feedback by [Date].",
        isRead: false,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "project.manager@example.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Team Building Activity",
        body: "Join us for a team building activity this Friday. Details will be shared soon.",
        isRead: false,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "team.leader@example.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Performance Review Reminder",
        body: "Just a reminder that your performance review is scheduled for [Date]. Please come prepared to discuss your achievements and goals.",
        isRead: true,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "hr@example.com",
        to: "employees@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Urgent: Server Maintenance",
        body: "We need to perform urgent maintenance on our servers tonight. Expect some downtime.",
        isRead: false,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "it@example.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Project Status Update",
        body: "I wanted to provide you with an update on the current status of the project. Everything is proceeding according to plan.",
        isRead: false,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "user@appsus.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Feedback Request",
        body: "We're constantly striving to improve our services. Could you please take a moment to provide us with your feedback?",
        isRead: true,
        isStarred: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "user@appsus.com",
        to: "customerservice@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Meeting Agenda",
        body: "Attached is the agenda for our upcoming meeting. Please review it and let me know if there's anything else you'd like to discuss.",
        isRead: false,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        isStarred: false,
        from: "user@appsus.com",
        to: "team@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Product Update",
        body: "We've just released a new update for our product. Check it out and let us know what you think!",
        isRead: true,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "user@appsus.com",
        to: "subscribers@example.com"
    },
    {
        id: utilService.makeId(),
        subject: "Upcoming Event Reminder",
        body: "Just a friendly reminder about the upcoming event next week. Don't forget to RSVP!",
        isRead: false,
        isStarred: true,
        sentAt: utilService.getRandomDate(),
        removedAt: null,
        from: "user@appsus.com",
        to: "attendees@example.com"
    }

]

_createMails()