import { state, saveToLocalStorage } from "./global.js";
import { displayToDoItems } from "./todo.js";

export class Notes {
    constructor(title, description, id) {
        this.title = title;
        this.description = description;
        this.id = id;
    }
}

export function addNotes(title, description) {
    const notes = createNotes(title, description);
    renderNotes(notes);
    displayNotes(notes.id);
    saveToLocalStorage();
}

export function createNotes(title, description) {
    const uid = crypto.randomUUID();
    const notes = new Notes(title, description, uid);

    state.myNotes.push(notes);
    return notes;
}

export function renderNotes(notes) {
    const notesUI = document.createElement("div");
    notesUI.id = notes.id;

    const notesButton = document.createElement("button");
    notesButton.dataset.id = notes.id;
    notesButton.id = `notesbutton-${notes.id}`;
    const title = notes.title;
    notesButton.textContent = title.slice(0, 10);

    notesButton.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        displayNotes(id);
    });

    const removeButton = document.createElement("button");
    removeButton.dataset.id = notes.id;
    removeButton.id = `removebutton-${notes.id}`;
    removeButton.textContent = "X";
        removeButton.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;

        const remainingNotes = state.myNotes.filter((n) => n.id !== id);

        state.myNotes.length = 0;
        state.myNotes.push(...remainingNotes);

        notesUI.remove();
        saveToLocalStorage();

        // update project display if needed (lazy import to avoid circular static imports)
        awaitImportDisplayProject().then((mod) => {
            if (mod.displayProject) mod.displayProject();
        });
    });

    const updateButton = document.createElement('button');
    updateButton.dataset.id = notes.id;
    updateButton.id = `updatebutton-${notes.id}`;
    updateButton.textContent = "Edit";

    updateButton.addEventListener("click", (e) =>{
        openEditForm(notes.id);
    });

    notesUI.appendChild(notesButton);
    notesUI.appendChild(removeButton);
    notesUI.appendChild(updateButton);
    const list = document.querySelector("#notes-list");
    if (list) list.appendChild(notesUI);
}

export function displayNotes(currentNotesID) {
    const content = document.getElementById("content");
    if (!content) return;
    content.innerHTML = "";

    const notesArea = document.createElement("div");
    notesArea.id = "notesArea";

    const found = state.myNotes.find((n) => n.id === currentNotesID) || { title: "", description: "" };

    const title = document.createElement("h3");
    title.id = "notesTitle";
    title.textContent = found.title;

    const description = document.createElement("div");
    description.id = "notesDescription";
    description.textContent = found.description;

    notesArea.appendChild(title);
    notesArea.appendChild(description);

    content.appendChild(notesArea);
}

export function createNotesForm() {
    let dialog = document.createElement("dialog");
    dialog.id = "notesdialog";

    const notesForm = document.createElement("form");
    notesForm.id = "notesForm";
    notesForm.method = "dialog";

    notesForm.innerHTML = `
        <h3> Notes </h3>
        <label for="notesTitle"> Project: </label>
        <input type="text" id="notesTitle">

        <label for="notesDescription"></label>
        <textarea id="notesDescription"></textarea>

        <button type="submit" value="submit" id="submit-btn">Submit</button>
        <button type="button" id="close-btn">Close</button>
        `;

    dialog.appendChild(notesForm);
    document.body.appendChild(dialog);

    const closeButton = notesForm.querySelector("#close-btn");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "submit") {
            const title = dialog.querySelector("#notesTitle").value;
            const description = dialog.querySelector("#notesDescription").value;

            addNotes(title, description);
        }
        dialog.remove();
    });
    dialog.showModal();
}

function openEditForm(notesId){
    const note = state.myNotes.find((n) => n.id === notesId);
    if(!note) return;

    let dialog = document.createElement("dialog");
    dialog.id = "notesdialog";

    const form = document.createElement('form');
    form.id = "notesForm";
    form.method = "dialog";

    form.innerHTML =`
    <h2> Edit Note <h2>

    <label>Title:</label>
    <input type="text" id="notesTitle" value ="${note.title}">

    <label>Description: </label>
    <textarea id="notesDescription">${note.description}</textarea>

    <button type="submit" value="submit">Save</button>
    <button type="button" id="close-btn">Cancel</button>
    `;

    dialog.appendChild(form);
    document.body.appendChild(dialog);

    form.querySelector("#close-btn").addEventListener("click", ()=>{
        dialog.close();
    });

    dialog.addEventListener("close", () =>{
        if(dialog.returnValue === "submit"){
            updateNotes(notesId, form);
        }
        dialog.remove();
    });
    dialog.showModal();
}

function updateNotes(id, form){
    const note = state.myNotes.find((n) => n.id === id);
    if(!note) return;

    note.title = form.querySelector("#notesTitle").value;
    note.description = form.querySelector("#notesDescription").value;

    saveToLocalStorage();
    displayNotes(id);
}

function awaitImportDisplayProject() {
    // lazy import to avoid circular static import issues when modules import each other
    return import("./project.js").catch(() => ({}));
}

const addNotesButton = document.getElementById("addNotes");
if (addNotesButton) addNotesButton.addEventListener("click", createNotesForm);