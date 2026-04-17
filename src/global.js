export const state = {
  myNotes: [],
  myToDoItems: [],
  myProjects: [],
  currentProjectId: null,
};

export function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(state.myProjects));
  localStorage.setItem("todos", JSON.stringify(state.myToDoItems));
  localStorage.setItem("notes", JSON.stringify(state.myNotes));
  localStorage.setItem("currentProjectID", state.currentProjectId);
}
