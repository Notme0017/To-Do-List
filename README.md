# 🧠 Project Manager App

A lightweight productivity app that lets you manage **Projects, To-Do Items, and Notes** in one place — all running in the browser with persistent storage.

---

## ✨ Features

### 📁 Projects

* Create and delete projects
* Switch between projects instantly
* Each project has its own set of todos

### ✅ To-Do Items

* Add tasks with:

  * Title
  * Description
  * Due date
  * Priority
  * Completion status
* Edit existing tasks
* Delete tasks
* Toggle completion
* Visual priority-based styling

### 📝 Notes

* Create and delete notes
* Edit notes with a dedicated form
* View notes in a clean display area

### 💾 Persistence

* Data is saved using **localStorage**
* Projects, todos, and notes remain after refresh

---

## 🧱 Tech Stack

* HTML
* CSS (custom styling, responsive layout)
* JavaScript (ES6 modules)
* Webpack (bundling)

---

## 📂 Project Structure

```
src/
│
├── index.js        # Entry point (imports everything)
├── project.js      # Project logic + UI
├── todo.js         # To-do logic + UI
├── notes.js        # Notes logic + UI
├── global.js       # Shared state + localStorage
├── style.css       # Styling
└── index.html      # Template

dist/
└── main.js         # Bundled output
```

---

## ⚙️ Setup & Installation

1. Clone the repository:

```
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies:

```
npm install
```

3. Run development build:

```
npm run build
```

4. Open `dist/index.html` in your browser

---

## 🧠 How It Works

* All data is stored in a central **state object**
* Changes are saved using `localStorage`
* On reload:

  * Data is loaded
  * UI is reconstructed dynamically

---

## 🎨 UI Highlights

* Three-column layout:

  * 📂 Projects (left)
  * 🧠 Main content (center)
  * 📝 Notes (right)
* Consistent button system:

  * Primary (save/add)
  * Warning (edit)
  * Danger (delete)
* Responsive grid for todo cards
* Modal dialogs for forms

---

## 🚀 Future Improvements

* 🔄 Drag & drop todos
* 📌 Pin important notes
* 🧠 Search & filter functionality
* ☁️ Backend integration (database)
* 📱 Mobile responsiveness improvements

---

## 🐛 Known Limitations

* Data is stored locally (not synced across devices)
* No authentication system
* Limited validation on inputs

---

## 🎯 Goal of the Project

This project was built to practice:

* DOM manipulation
* State management
* Modular JavaScript architecture
* Webpack setup and bundling
* UI/UX structuring

---

## 📸 Preview

> A clean productivity dashboard with projects, todos, and notes working together seamlessly.

---

## 📄 License

This project is open source and available under the MIT License.
