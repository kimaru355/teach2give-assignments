const inputTask = document.querySelector("#input-task");
const inputCompleted = document.querySelector("#input-completed");
const showTasks = document.querySelector("#show-tasks");
const itemsLeft = document.querySelector("#items-left");
const showAll = document.querySelector("#show-all-tasks");
const showActive = document.querySelector("#show-active-tasks");
const showCompleted = document.querySelector("#show-completed-tasks");
const deleteCompleted = document.querySelector("#delete-completed");
const changeThemeBtn = document.querySelector("#change-theme");
const bodyBgImg = document.querySelector("#body-bg-image");
const body = document.querySelector("body");

/* load or set local storage */
let filter = localStorage.getItem("filter");
if (!filter) {
  filter = "all";
  localStorage.setItem("filter", filter);
}
let theme = localStorage.getItem("theme");
if (theme === null) {
  theme = "dark";
  localStorage.setItem("theme", theme);
}
let tasks = localStorage.getItem("tasks");
if (!tasks) {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
} else {
  tasks = JSON.parse(tasks);
}

/* change theme */
const showTheme = () => {
  let allDivs = document.querySelectorAll("div");
  if (theme === "dark") {
    changeThemeBtn.firstElementChild.setAttribute("src", "images/icon-sun.svg");
    bodyBgImg.style.backgroundImage = 'url("images/bg-desktop-dark.jpg")';
    body.style.backgroundColor = "#181824";
    allDivs.forEach((div) => {
      div.style.backgroundColor = "#25273c";
    });
  } else {
    changeThemeBtn.firstElementChild.setAttribute(
      "src",
      "images/icon-moon.svg"
    );
    bodyBgImg.style.backgroundImage = 'url("images/bg-desktop-light.jpg")';
    body.style.backgroundColor = "#fafafa";
    allDivs.forEach((div) => {
      div.style.backgroundColor = "white";
    });
  }
};
const changeTheme = () => {
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  showTheme();
};

/* create the UI for displaying the tasks */
const createElement = (element) => {
  return document.createElement(element);
};
const createTaskDiv = ({ id, task, completed }) => {
  const taskDiv = createElement("div");
  const taskCompleted = createElement("input");
  const taskItem = createElement("button");
  const taskDelete = createElement("button");
  const taskClose = createElement("img");

  taskCompleted.checked = completed;
  taskItem.textContent = task;

  taskCompleted.setAttribute("type", "checkbox");
  taskCompleted.setAttribute("name", "task-completed");
  taskDiv.setAttribute("id", id);
  taskClose.setAttribute("src", "images/icon-cross.svg");
  taskCompleted.classList.add("task-completed");

  if (completed) {
    taskItem.style.color = "rgba(0, 0, 0, 0.2)";
    taskItem.style.textDecoration = "line-through";
  }

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
  itemsLeft.textContent = `${
    tasks.filter((task) => !task.completed).length
  } items left`;
  showTheme();
};
displayTasks();

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
changeThemeBtn.addEventListener("click", () => {
  changeTheme();
});
