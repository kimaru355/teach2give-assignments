const inputTask = document.querySelector("#input-task");
const inputCompleted = document.querySelector("#input-completed");
const showTasks = document.querySelector("#show-tasks");
const itemsLeft = document.querySelector("#items-left");
const showAll = document.querySelector("#show-all-tasks");
const showActive = document.querySelector("#show-active-tasks");
const showCompleted = document.querySelector("#show-completed-tasks");
const deleteCompleted = document.querySelector("#delete-completed");

/* load or set local storage */
let tasks = localStorage.getItem("tasks");
if (!tasks) {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
} else {
  tasks = JSON.parse(tasks);
}
let filter = localStorage.getItem("filter");
if (!filter) {
  filter = "all";
  localStorage.setItem("filter", filter);
}

/* edit the tasks */
const addTask = (task, completed) => {
  let taskItem = {
    task: task,
    completed: completed,
  };
  tasks.splice(0, 0, taskItem);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  inputTask.focus = true;
};

const editTask = (index, completed) => {
  let task = tasks[index];
  task.completed = completed;
  tasks.splice(index, 1, task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

const removeCompleted = (index) => {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

/* create the UI for displaying the tasks */
const createElement = (element) => {
  return document.createElement(element);
};
const createTaskDiv = ({ id, task, completed }) => {
  const taskDiv = createElement("div");
  const taskCompleted = createElement("input");
  const taskItem = createElement("p");
  const taskDelete = createElement("button");
  const taskClose = createElement("img");

  taskCompleted.setAttribute("type", "checkbox");
  taskCompleted.setAttribute("name", "task-completed");
  taskDiv.setAttribute("id", id);
  taskClose.setAttribute("src", "images/icon-cross.svg");
  taskCompleted.classList.add("task-completed");

  taskCompleted.checked = completed;
  taskItem.textContent = task;

  taskDelete.addEventListener("click", () => {
    deleteTask(id);
  });
  taskCompleted.addEventListener("change", () => {
    editTask(id, taskCompleted.checked);
  });

  taskDiv.appendChild(taskCompleted);
  taskDiv.appendChild(taskItem);
  taskDelete.appendChild(taskClose);
  taskDiv.appendChild(taskDelete);

  return taskDiv;
};

/* display the tasks */
const displayTasks = () => {
  while (showTasks.firstElementChild) {
    showTasks.removeChild(showTasks.firstElementChild);
  }
  tasks.map((task, index) => {
    task.id = index;
    if (filter === "all") {
      let taskDiv = createTaskDiv(task);
      showTasks.appendChild(taskDiv);
    } else if (filter === "active") {
      if (!task.completed) {
        let taskDiv = createTaskDiv(task);
        showTasks.appendChild(taskDiv);
      }
    } else if (filter === "completed") {
      if (task.completed) {
        let taskDiv = createTaskDiv(task);
        showTasks.appendChild(taskDiv);
      }
    }
  });
  itemsLeft.textContent = `${tasks.length} items left`;
};
displayTasks();

/* event listeners */
// input
inputTask.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let taskInput = inputTask.value;
    let completedInput = inputCompleted.checked;
    inputCompleted.checked = false;
    inputTask.value = "";
    addTask(taskInput, completedInput);
  }
});
// filter
showAll.addEventListener("click", () => {
  filter = "all";
  localStorage.setItem("filter", filter);
  displayTasks();
});
showActive.addEventListener("click", () => {
  filter = "active";
  localStorage.setItem("filter", filter);
  displayTasks();
});
showCompleted.addEventListener("click", () => {
  filter = "completed";
  localStorage.setItem("filter", filter);
  displayTasks();
});
deleteCompleted.addEventListener("click", () => {
  removeCompleted();
});
