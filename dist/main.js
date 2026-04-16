/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/project.js"
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
() {

eval("{\r\nclass Project{\r\n    constructor(title, id){\r\n        this.title = title;\r\n        this.id = id;\r\n    }\r\n}\r\n\r\nfunction addProjects(title){\r\n    const project = createProject(title);\r\n    renderProjects(project);\r\n    displayProject();\r\n    saveToLocalStorage();\r\n}\r\n\r\nfunction createProject(title){\r\n    const uid = crypto.randomUUID();\r\n    const project = new Project(title, uid);\r\n\r\n    myProjects.push(project);\r\n\r\n    currentProjectId = uid;\r\n\r\n    return project;\r\n}\r\n\r\nfunction renderProjects(project){\r\n    const projectUI = document.createElement('div');\r\n    projectUI.id = project.id;\r\n\r\n    const projectButton = document.createElement('button');\r\n    projectButton.dataset.projectid = project.id;\r\n    projectButton.id = `projectbutton-${project.id}`;\r\n    projectButton.textContent = project.title;\r\n\r\n    projectButton.addEventListener(\"click\", (e) =>{\r\n        const projectid = e.currentTarget.dataset.projectid;\r\n        currentProjectId = projectid;\r\n        displayProject(projectid);\r\n    });\r\n\r\n    const removeButton = document.createElement('button');\r\n    removeButton.dataset.projectid = project.id;\r\n    removeButton.id = `removebutton-${project.id}`;\r\n    removeButton.textContent = \"X\";\r\n    removeButton.addEventListener(\"click\", (e) =>{\r\n        const id = e.currentTarget.dataset.projectid;\r\n        \r\n        const remainingTodos = myToDoItems.filter(\r\n            todo => todo.projectid !== id\r\n        );\r\n\r\n        myToDoItems.length =0;\r\n        myToDoItems.push(...remainingTodos);\r\n\r\n        const index = myProjects.findIndex(project => project.id === id);\r\n        if(index !== -1){\r\n            myProjects.splice(index, 1);\r\n        }\r\n\r\n        projectUI.remove();\r\n        saveToLocalStorage();\r\n\r\n        if(currentProjectId === id){\r\n            currentProjectId = myProjects.length > 0 ? myProjects[0].id : null;\r\n        }\r\n\r\n        displayProject();\r\n\r\n    })\r\n\r\n    projectUI.appendChild(projectButton);\r\n    projectUI.appendChild(removeButton);\r\n    document.querySelector('#project-list').appendChild(projectUI);\r\n}\r\n\r\nfunction displayProject(){\r\n    \r\n    const content = document.getElementById(\"content\");\r\n    content.innerHTML = \"\";\r\n    \r\n    const projectArea = document.createElement('div');\r\n    projectArea.id = \"projectArea\";\r\n    \r\n    const addToDoButton = document.createElement('button');\r\n    addToDoButton.id = \"addtodoItems\";\r\n    addToDoButton.textContent = \"Add To Do\";\r\n    addToDoButton.addEventListener(\"click\", ToDoAddForm);\r\n    \r\n    const cardContainer = document.createElement('div');\r\n    cardContainer.id = \"card-container\";\r\n    \r\n    projectArea.appendChild(addToDoButton);\r\n    projectArea.appendChild(cardContainer);\r\n\r\n    content.appendChild(projectArea);\r\n\r\n    displayToDoItems();\r\n}\r\n\r\nfunction createProjectForm(){\r\n    let dialog = document.createElement('dialog');\r\n    dialog.id = 'projectdialog';\r\n\r\n    const projectForm = document.createElement('form');\r\n    projectForm.id = 'projectForm';\r\n    projectForm.method = 'dialog';\r\n\r\n    projectForm.innerHTML = `\r\n    <h3> Project </h3>\r\n    <label for=\"projectTitle\">Project: </label>\r\n    <input type=\"text\" id=\"projectTitle\">\r\n\r\n    <button type=\"submit\" value=\"submit\" id=\"submit-btn\">Submit</button>\r\n    <button type=\"button\" id=\"close-btn\">Close</button>\r\n    `;\r\n\r\n    dialog.appendChild(projectForm);\r\n    document.body.appendChild(dialog);\r\n\r\n    const closeButton = projectForm.querySelector('#close-btn');\r\n    closeButton.addEventListener(\"click\", () => {\r\n        dialog.close();\r\n    });\r\n\r\n    dialog.addEventListener(\"close\", () =>{\r\n\r\n        if(dialog.returnValue === \"submit\"){\r\n            const title = dialog.querySelector(\"#projectTitle\").value;\r\n\r\n            addProjects(title);\r\n        }\r\n\r\n        dialog.remove();\r\n    });\r\n\r\n    dialog.showModal();\r\n}\r\n\r\nconst addProjectButton = document.getElementById(\"addProjects\");\r\naddProjectButton.addEventListener(\"click\", createProjectForm);\r\n\n\n//# sourceURL=webpack:///./src/project.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/project.js"]();
/******/ 	
/******/ })()
;