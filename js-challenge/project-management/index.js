const main = document.querySelector("main");
const addProjectButton = document.querySelector("#add-project");

let projects = localStorage.getItem("projects");
if (!projects) {
  projects = [];
  localStorage.setItem("projects", JSON.stringify(projects));
} else {
  projects = JSON.parse(projects);
}
let showAddProjectForm = false;

const createElement = (element) => document.createElement(element);

const createProjectCard = ({ projectName, projectDescription }, index) => {
  const div = createElement("div");
  const h2 = createElement("h2");
  const viewButton = createElement("button");
  const deleteButton = createElement("button");

  div.classList.add("project-card");
  viewButton.classList.add("view");
  deleteButton.classList.add("delete");

  h2.textContent = projectName;
  viewButton.textContent = "View";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    deleteProject(index);
  });
  viewButton.addEventListener("click", () => {
    if (div.lastElementChild.id === "view-project") {
      div.removeChild(div.lastElementChild);
      return;
    }
    let p = createElement("p");
    p.setAttribute("id", "view-project");
    p.textContent = projectDescription;
    div.appendChild(p);
  });
  viewButton.addEventListener("focusout", () => {
    if (div.lastElementChild.id === "view-project") {
      div.removeChild(div.lastElementChild);
    }
  });

  div.appendChild(h2);
  div.appendChild(viewButton);
  div.appendChild(deleteButton);
  return div;
};

const deleteProject = (index) => {
  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  showProjects();
};
const showProjects = () => {
  while (main.firstElementChild) {
    main.removeChild(main.firstElementChild);
  }
  projects.map((project, index) => {
    let projectCard = createProjectCard(project, index);
    main.appendChild(projectCard);
  });
};
showProjects();

const addProject = (projectName, projectDescription) => {
  let project = {
    projectName,
    projectDescription,
  };
  projects.splice(0, 0, project);
  localStorage.setItem("projects", JSON.stringify(projects));
};

const showAddProject = () => {
  const formWrapper = createElement("div");
  const form = createElement("form");
  const h2 = createElement("h2");
  const inputText = createElement("input");
  const textArea = createElement("textarea");
  const button = createElement("button");

  formWrapper.setAttribute("id", "add-project-form-wrapper");
  form.setAttribute("id", "add-project-form");
  inputText.setAttribute("id", "project-name");
  inputText.setAttribute("type", "text");
  inputText.setAttribute("autocomplete", "off");
  textArea.setAttribute("id", "project-description");
  textArea.setAttribute("rows", "10");
  textArea.setAttribute("cols", "20");
  button.setAttribute("type", "submit");

  h2.textContent = "Add Project";
  inputText.setAttribute("placeholder", "Project Name");
  textArea.setAttribute("placeholder", "Project Description");
  button.textContent = "Add Project";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const projectName = inputText.value;
    const projectDescription = textArea.value;
    if (!projectName || !projectDescription) {
      alert("Please fill both inputs");
      return;
    }
    addProject(projectName, projectDescription);
    inputText.value = "";
    textArea.value = "";
    main.removeChild(main.lastElementChild);
    addProjectButton.textContent = "Add Project";
    showProjects();
  });

  form.appendChild(h2);
  form.appendChild(inputText);
  form.appendChild(textArea);
  form.appendChild(button);
  formWrapper.appendChild(form);
  main.appendChild(formWrapper);
};

addProjectButton.addEventListener("click", () => {
  showAddProjectForm = !showAddProjectForm;
  if (showAddProjectForm) {
    showAddProject();
    addProjectButton.textContent = "Cancel";
  } else {
    main.removeChild(main.lastElementChild);
    addProjectButton.textContent = "Add Project";
  }
});
