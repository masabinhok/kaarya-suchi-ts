import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  id: string;
}

const todos: Todo[] = [];

const todosContainer = document.getElementById("todoList") as HTMLDivElement;

const todoInput = document.getElementsByName("kaam")[0] as HTMLInputElement;

const myForm = document.querySelector(".myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  let todo: HTMLLIElement = document.createElement("li");
  todo.className = "flex justify-between items-center p-3  rounded-xl  gap-5";

  //checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;

  checkBox.onchange = () => {
    todos.find((todo) => {
      if (todo.id === id) {
        todo.isCompleted = checkBox.checked;
      }
    });

    paragraph.className = checkBox.checked ? "line-through text-green-500" : "";
  };

  //paragraph element
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted
    ? "line-through text-center"
    : "text-center";
  checkBox.checked ? (paragraph.className = "line-through") : "";

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "p-2 rounded-xl hover:text-red-500 active:text-green-500";
  btn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkBox, paragraph, btn);
  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  todos.splice(idx, 1);

  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  if (todos.length === 0) {
    todosContainer.innerHTML = "Kuch to karle besharam 😤";
  } else {
    todosContainer.innerHTML = "";
  }

  todos.forEach((todo) => {
    generateTodoItem(todo.title, todo.isCompleted, todo.id);
  });
};
