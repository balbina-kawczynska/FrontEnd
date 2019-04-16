'use strict';

window.addEventListener('DOMContentLoaded', init);

var addButton = document.querySelector('.addNote');
var pinButton = document.querySelector('.pinNote');
var saveButton = document.querySelector('.saveNote');

function init() {
    addButton.addEventListener('click', addNote);

    pinButton.addEventListener('click', () => {
        //console.log('Clicked PIN button');
        this.pinButton.classList.toggle('.pinned');
    });

    saveButton.addEventListener('click', () => {
        //console.log('Clicked SAVE button');
    });
}
class Note {
    constructor(title, content, date, isPinned) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.isPinned = isPinned;
    }
}

const notesList = document.querySelector('#notesList');
const notes = [];

function addNote(e) {
    e.preventDefault();
    const note = new Note;
    
    notes.push(note);
    populateList(notes, notesList);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function populateList(notes = [], notesList) {
    let noteDate = (new Date).toLocaleString();
    notesList.innerHTML = notes.map((note, i) => {
        return `
            <li id="note${i}">
                <div class="note">
                    <div class="noteBar">            
                        <button class="pinNote" type=”button”>&#128204</button>
                        <textarea class="noteTitle" type="text" name="noteTitle" placeholder="Title"></textarea>
                        <!-- <button class="deleteNote" type=”button”>&#128465</button> -->
                    </div>
                    <div class="noteDate">${noteDate}</div>
                    <textarea class="noteContent" type="text" name="noteContent" placeholder="Content" required></textarea>
                    <button class="saveNote" type=”button”>&#128190</button>
                </div>
            </li>
            `;
    }).join('');
}
