
// This ensures all elements are available before we access them
document.addEventListener("DOMContentLoaded", () => {
  
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodo"); 
  const todoList = document.getElementById("todoList"); 

  
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos)); 
  }

  
  function renderTodos() {
    todoList.innerHTML = ""; 

   
    todos.forEach((todo, index) => {
      const li = document.createElement("li"); 

      
      li.className =
        "flex items-center justify-between bg-purple-50 p-3 rounded-md shadow-sm";

      
      li.innerHTML = `
                <div class="flex items-center space-x-2">
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-purple-800" ${
                      todo.completed ? "checked" : "" 
                    }>
                    <span class="todo-text ${
                      todo.completed
                        ? "completed line-through text-purple-800"
                        : "text-gray-800"
                    }">${todo.text}</span>
                </div>
                <div class="space-x-2">
                    <button class="edit-btn text-purple-900 hover:text-purple-900">Edit</button>
                    <button class="delete-btn text-orange-900 hover:text-orange-900">Delete</button>
                </div>
            `;

      
      const checkbox = li.querySelector('input[type="checkbox"]');

      
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked; 
        saveTodos(); 
        renderTodos(); 
      });

      
      const editBtn = li.querySelector(".edit-btn");

      
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", todo.text); 
        if (newText !== null) {
          
          todo.text = newText.trim(); 
          saveTodos(); 
          renderTodos(); 
        }
      });

     
      const deleteBtn = li.querySelector(".delete-btn");

      
      deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1); 
        saveTodos(); 
        renderTodos(); 
      });

      
      todoList.appendChild(li);
    });
  }

  
  addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim(); 
    if (text) {
      
      todos.push({ text, completed: false }); 
      todoInput.value = ""; 
      saveTodos(); 
      renderTodos(); 
    }
  });

  
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
     
      addTodoBtn.click(); 
    }
  });
 
  renderTodos();
});