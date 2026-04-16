
import { state, saveToLocalStorage } from "./global.js";
import { ToDoAddForm, displayToDoItems } from "./todo.js";

export class Project {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
}

export function addProjects(title) {
    const project = createProject(title);
    renderProjects(project);
    displayProject();
    saveToLocalStorage();
}

export function createProject(title) {
    const uid = crypto.randomUUID();
    const project = new Project(title, uid);

    state.myProjects.push(project);

    state.currentProjectId = uid;

    return project;
}

export function renderProjects(project) {
    const projectUI = document.createElement("div");
    projectUI.id = project.id;

    const projectButton = document.createElement("button");
    projectButton.dataset.projectid = project.id;
    projectButton.id = `projectbutton-${project.id}`;
    projectButton.textContent = project.title;

    projectButton.addEventListener("click", (e) => {
        const projectid = e.currentTarget.dataset.projectid;
        state.currentProjectId = projectid;
        displayProject(projectid);
    });

    const removeButton = document.createElement("button");
    removeButton.dataset.projectid = project.id;
    removeButton.id = `removebutton-${project.id}`;
    removeButton.textContent = "X";
    removeButton.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.projectid;

        const remainingTodos = state.myToDoItems.filter((todo) => todo.projectid !== id);

        state.myToDoItems.length = 0;
        state.myToDoItems.push(...remainingTodos);

        const index = state.myProjects.findIndex((p) => p.id === id);
        if (index !== -1) {
            state.myProjects.splice(index, 1);
        }

        projectUI.remove();
        saveToLocalStorage();

        if (state.currentProjectId === id) {
            state.currentProjectId = state.myProjects.length > 0 ? state.myProjects[0].id : null;
        }

        displayProject();
    });

    projectUI.appendChild(projectButton);
    projectUI.appendChild(removeButton);
    const list = document.querySelector("#project-list");
    if (list) list.appendChild(projectUI);
}

export function displayProject() {
    const content = document.getElementById("content");
    if (!content) return;
    content.innerHTML = "";

    const projectArea = document.createElement("div");
    projectArea.id = "projectArea";

    const addToDoButton = document.createElement("button");
    addToDoButton.id = "addtodoItems";
    addToDoButton.textContent = "Add To Do";
    addToDoButton.addEventListener("click", ToDoAddForm);

    const cardContainer = document.createElement("div");
    cardContainer.id = "card-container";

    projectArea.appendChild(addToDoButton);
    projectArea.appendChild(cardContainer);

    content.appendChild(projectArea);

    displayToDoItems();
}

export function createProjectForm() {
    let dialog = document.createElement("dialog");
    dialog.id = "projectdialog";

    const projectForm = document.createElement("form");
    projectForm.id = "projectForm";
    projectForm.method = "dialog";

    projectForm.innerHTML = `
        <h3> Project </h3>
        <label for="projectTitle">Project: </label>
        <input type="text" id="projectTitle">

        <button type="submit" value="submit" id="submit-btn">Submit</button>
        <button type="button" id="close-btn">Close</button>
        `;

    dialog.appendChild(projectForm);
    document.body.appendChild(dialog);

    const closeButton = projectForm.querySelector("#close-btn");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "submit") {
            const title = projectForm.querySelector("#projectTitle").value;

            addProjects(title);
        }

        dialog.remove();
    });

    dialog.showModal();
}

const addProjectButton = document.getElementById("addProjects");
if (addProjectButton) addProjectButton.addEventListener("click", createProjectForm);
