const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// Add todo on button click
addTodoBtn.addEventListener("click", addTodo);

// Add todo on ENTER key
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  // LEFT SIDE (checkbox + text)
  const leftDiv = document.createElement("div");
  leftDiv.className = "todo-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "todo-text";

  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed");
  });

  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  // RIGHT SIDE (buttons in straight line)
  const btnDiv = document.createElement("div");
  btnDiv.className = "todo-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText;
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  deleteBtn.onclick = () => li.remove();

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  li.appendChild(leftDiv);
  li.appendChild(btnDiv);

  todoList.appendChild(li);
  todoInput.value = "";
}
