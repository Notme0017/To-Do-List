
import { state, saveToLocalStorage } from "./global.js";

export class TodoItems {
    constructor(title, description, dueDate, priority, hasCompleted, id, projectid) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.hasCompleted = hasCompleted;
        this.id = id;
        this.projectid = projectid;
    }

    completed() {
        this.hasCompleted = true;
    }

    flipCompleted() {
        this.hasCompleted = !this.hasCompleted;
    }
}

export function addToDoItems(title, description, dueDate, priority, hasCompleted) {
    const uid = crypto.randomUUID();
    const todo = new TodoItems(
        title,
        description,
        dueDate,
        priority,
        hasCompleted,
        uid,
        state.currentProjectId
    );
    state.myToDoItems.push(todo);
    displayToDoItems();
    saveToLocalStorage();
}

export function displayToDoItems() {
    const container = document.getElementById("card-container");
    if (!container) return;
    container.innerHTML = "";

    const filteredTodos = state.myToDoItems.filter((todo) => todo.projectid === state.currentProjectId);

    filteredTodos.sort((a, b) => a.priority - b.priority);

    filteredTodos.forEach((TodoItem) => {
        toDoCard(TodoItem, container);
    });

    console.log(state.myToDoItems);
    console.log(filteredTodos);
}

export function ToDoAddForm() {
    let dialog = document.createElement("dialog");
    dialog.id = "toDodialog";

    const todoForm = document.createElement("form");
    todoForm.id = "toDoForm";
    todoForm.method = "dialog";

    todoForm.innerHTML = `
        <h2>TO DO Details<h2>
        <label for="todotitle">Work: </label>
        <input type="text" id="todotitle">

        <label for="tododesc">Desc: </label>
        <input type="text" id="tododesc">

        <label for="todoDueDate">Due Date </label>
        <input type="date" id="todoDueDate">

        <label for="todoPriority">Priority </label>
        <input type="numeric" id="todoPriority">

        <label for="todoCheck">Completed </label>
        <input type="checkbox" id="todoCheck">
    
        <button type="submit" value="submit" id="submit-btn">Submit</button>
        <button type="button" id="close-btn">Close</button>
        `;

    dialog.appendChild(todoForm);
    document.body.appendChild(dialog);

    const closeButton = todoForm.querySelector("#close-btn");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "submit") {
            const title = todoForm.querySelector("#todotitle").value;
            const description = todoForm.querySelector("#tododesc").value;
            const dueDate = todoForm.querySelector("#todoDueDate").value;
            const priority = todoForm.querySelector("#todoPriority").value;
            const hasCompleted = todoForm.querySelector("#todoCheck").checked;

            addToDoItems(title, description, dueDate, priority, hasCompleted);
        }

        dialog.remove();
    });

    dialog.showModal();
}

function toDoCard(todo, container) {
    const card = document.createElement("div");
    card.dataset.id = todo.id;
    card.classList.add("todo-card");
    card.style.backgroundColor = getPriorityColor(Number(todo.priority));

    const titleText = document.createElement("h3");
    titleText.textContent = todo.title;

    const description = document.createElement("div");
    description.textContent = todo.description;

    const dueDate = document.createElement("div");
    dueDate.textContent = todo.dueDate;

    const priority = document.createElement("div");
    priority.textContent = todo.priority;

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = `completed-${todo.id}`;
    checkBox.checked = todo.hasCompleted;

    checkBox.addEventListener("change", () => {
        todo.flipCompleted();
        card.classList.toggle("read", todo.hasCompleted);
        saveToLocalStorage();
    });
    card.classList.toggle("read", todo.hasCompleted);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
        const id = card.dataset.id;

        const index = state.myToDoItems.findIndex((t) => t.id === id);
        if (index !== -1) {
            state.myToDoItems.splice(index, 1);
        }
        saveToLocalStorage();
        displayToDoItems();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
        openEditForm(todo.id);
    });

    card.appendChild(titleText);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);
    card.appendChild(checkBox);
    card.appendChild(removeButton);
    card.appendChild(editButton);
    container.appendChild(card);
}

function getPriorityColor(priority) {
    const p = Math.min(priority, 10);

    const red = 100 + p * 10;
    const green = 200 - p * 10;
    const blue = 120;
    const alpha = 0.4 + p * 0.05;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function openEditForm(todoId) {
    const todo = state.myToDoItems.find((t) => t.id === todoId);
    if (!todo) return;

    let dialog = document.createElement("dialog");
    dialog.id = "toDodialog";

    const form = document.createElement("form");
    form.method = "dialog";

    form.innerHTML = `
        <h2>Edit To Doc </h2>
    
        <label>Work: </label>
        <input type ="text" id="todotitle" value="${todo.title}">

        <label>Desc: </label>
        <input type="text" id="tododesc" value="${todo.description}">

        <label>Due Date</label>
        <input type="date" id="todoDueDate" value="${todo.dueDate}">

        <label>Priority</label>
        <input type="number" id="todoPriority" value="${todo.priority}">

        <label>Completed</label>
        <input type="checkbox" id="todoCheck" ${todo.hasCompleted ? "checked" : ""}>

        <button type="submit" value="submit">Save</button>
        <button type="button" id="close-btn">Cancel</button>
        `;

    dialog.appendChild(form);
    document.body.appendChild(dialog);

    form.querySelector("#close-btn").addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "submit") {
            updateTodo(todoId, form);
        }
        dialog.remove();
    });
    dialog.showModal();
}

function updateTodo(id, form) {
    const todo = state.myToDoItems.find((t) => t.id === id);
    if (!todo) return;

    todo.title = form.querySelector("#todotitle").value;
    todo.description = form.querySelector("#tododesc").value;
    todo.dueDate = form.querySelector("#todoDueDate").value;
    todo.priority = form.querySelector("#todoPriority").value;
    todo.hasCompleted = form.querySelector("#todoCheck").checked;

    saveToLocalStorage();
    displayToDoItems();
}