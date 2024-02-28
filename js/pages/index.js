// Check if user is logged in
if (
  localStorage.username !== window.user_credentials.username &&
  localStorage.password !== window.user_credentials.password
) {
  // Redirect to login page
  window.location.replace("./login.html");
}

let todos = [];

const no_todos = document.querySelector(".no-todos");

const storedTodos = JSON.parse(localStorage.todos ?? "[]");
if (storedTodos.length > 0) {
  no_todos.classList.toggle("hide", true);
  storedTodos.forEach((todo) => addToDo(todo.value, todo.checked));
}

function storeTodos(array) {
  localStorage.todos = JSON.stringify(array);
}

function addToDo(value = "", checked = false) {
  const todo_id = todos.length + 1;
  todos = [
    ...todos,
    {
      id: todo_id,
      value: value,
      checked: checked,
    },
  ];
  const todo = document.createElement("div");
  todo.classList.add("todo");
  todo.dataset.id = todo_id;
  todo.id = `todo_${todo_id}`;
  if (checked) todo.classList.add("todo-done");

  const check_icon = document.createElement("i");
  check_icon.classList.add("fa-solid", "fa-check", "checked-todo");

  const todo_text = document.createElement("p");
  todo_text.innerText = value;
  todo_text.classList.add("todo-text");
  todo_text.addEventListener("click", () => checkTodo(todo_id));

  const trash_icon = document.createElement("i");
  trash_icon.classList.add("fa-solid", "fa-trash", "delete-todo");
  trash_icon.addEventListener("click", () => removeTodo(todo_id));

  todo.append(check_icon, todo_text, trash_icon);
  document.querySelector(".todos").appendChild(todo);

  storeTodos(todos);
  no_todos.classList.toggle("hide", true);
}

function removeTodo(id) {
  document.getElementById(`todo_${id}`).remove();
  todos = todos.filter((todo) => todo.id !== id);
  storeTodos(todos);
  if (todos.length == 0) no_todos.classList.toggle("hide", false);
}

function checkTodo(id) {
  document.getElementById(`todo_${id}`).classList.toggle("todo-done");
  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          checked: !todo.checked,
        }
      : todo
  );
  storeTodos(todos);
}

const add_todo_form = document.querySelector(".add-todo-form");
const add_todo_button = document.querySelector(".add-todo-button");

add_todo_button.addEventListener("click", () => {
  add_todo_form.classList.toggle("hide");
  document
    .querySelector(".add-todo-button .button-text-add")
    .classList.toggle("hide");
  document
    .querySelector(".add-todo-button .button-text-cancel")
    .classList.toggle("hide");
});

add_todo_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".add-todo-form input");
  addToDo(input.value);
  input.value = "";
});
