import './style.css';

import { state } from './global.js';
import { TodoItems } from './todo.js';
import { Notes } from './notes.js';
import { renderProjects, displayProject, addProjects } from './project.js';
import { renderNotes } from './notes.js';
import { saveToLocalStorage } from './global.js';

function loadFromLocalStorage() {
	const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
	const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
	const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
	const storedCurrentProjectID = localStorage.getItem('currentProjectID');

	state.myProjects.length = 0;
	state.myProjects.push(...storedProjects);

	state.myToDoItems.length = 0;
	storedTodos.forEach((todo) => {
		const restoredTodo = new TodoItems(
			todo.title,
			todo.description,
			todo.dueDate,
			todo.priority,
			todo.hasCompleted,
			todo.id,
			todo.projectid
		);
		state.myToDoItems.push(restoredTodo);
	});

	state.myNotes.length = 0;
	storedNotes.forEach((note) => {
		const restoredNotes = new Notes(note.title, note.description, note.id);
		state.myNotes.push(restoredNotes);
	});

	state.currentProjectId = storedCurrentProjectID;
}

function initApp() {
	loadFromLocalStorage();

	if (state.myProjects.length === 0) {
		addProjects('default');
	} else {
		state.myProjects.forEach((project) => renderProjects(project));
	}

	displayProject();

	state.myNotes.forEach((n) => renderNotes(n));
}

initApp();
