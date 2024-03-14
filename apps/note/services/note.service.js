// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from "../../../services/async-storage.service.js";

// const notes = [{
//     id: 'n101',
//     createdAt: 1112222,
//     type: 'NoteTxt',
//     isPinned: true,
//     style: {
//         backgroundColor: '#00d'
//     }, info: {
//         txt: 'Fullstack Me Baby!'
//     }
// }]

const NOTE_KEY = 'noteDB'
_createNotes()
export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,

    // getFilterFromParams
}


function query() {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     cars = cars.filter(car => regex.test(car.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            // }
            // if (filterBy.desc) {
            //     const regex = new RegExp(filterBy.desc, 'i')
            //     cars = cars.filter(car => regex.test(car.desc))
            // }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {

    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        note = _createNote(note.info.txt, note.type, note.info.url)
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(txt = '', type = '', url = '') {
    return {
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt,
            url,
        }
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: 'n101fd',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: 'rgb(224 255 255)'
            }, info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: "../../../assets/img/audi.jpg",
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        }]

        notes.push(_createNote('Hit me baby', "NoteTxt"))
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(txt, type, url) {
    const note = getEmptyNote(txt, type, url)
    note.id = utilService.makeId()
    return note
}