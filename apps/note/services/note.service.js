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
    getDefaultFilter,
    // getFilterFromParams
}


function query(filterBy = getDefaultFilter()) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    const matchesTextOrUrl = regex.test(note.info.txt) || regex.test(note.info.url)

                    let matchesTodo = false
                    if (note.info.todos && note.info.todos.length > 0) {
                        matchesTodo = note.info.todos.some(todo => regex.test(todo.txt))
                    }
                    return matchesTextOrUrl || matchesTodo || regex.test(note.type)

                })
            }
            return notes
        })
}

function getDefaultFilter() {
    return { txt: '', url: '' }
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
        note = _createNote(note.info.txt, note.type, note.info.url, note.style.backgroundColor, note.isPinned, note.info.todos)
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(txt = '', type = '', url = '', backgroundColor = '#ffffff', isPinned = false, todos = [{ txt: '', doneAt: null }]) {
    return {
        createdAt: Date.now(),
        type,
        isPinned,
        style: {
            backgroundColor,
        },
        info: {
            txt,
            url,
            todos,
        }
    }
}

function _createNote(txt, type, url, backgroundColor, isPinned, todos) {
    const note = getEmptyNote(txt, type, url, backgroundColor, isPinned, todos)
    note.id = utilService.makeId()
    return note
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: utilService.makeId(),
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: 'green'
            }, info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: 1112222,
            type: 'NoteVideo',
            isPinned: true,
            style: {
                backgroundColor: 'yellow'
            },
            info: {
                url: "https://www.youtube.com/watch?v=lukT_WB5IB0"
            }
        },
        {
            id: utilService.makeId(),
            createdAt: 1112222,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: "https://katvanit.co.il/wp-content/uploads/2022/11/%D7%9B%D7%9C%D7%91-%D7%9B%D7%AA%D7%95%D7%9D-%D7%94%D7%95%D7%9C%D7%9A-%D7%A2%D7%9C-%D7%94%D7%99%D7%A8%D7%97-%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-AI.png",
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: 'white'
            }
        }]

        notes.push(_createNote('Hit me baby', "NoteTxt"))
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}
