const body = document.querySelector("body");
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
      return;
    }
    addProject(projectName, projectDescription);
    inputText.value = "";
    textArea.value = "";
  });

  form.appendChild(h2);
  form.appendChild(inputText);
  form.appendChild(textArea);
  form.appendChild(button);
  formWrapper.appendChild(form);
  body.appendChild(formWrapper);
};

addProjectButton.addEventListener("click", () => {
  showAddProjectForm = !showAddProjectForm;
  if (showAddProjectForm) {
    showAddProject();
    addProjectButton.textContent = "Cancel";
  } else {
    body.removeChild(body.lastElementChild);
    addProjectButton.textContent = "Add Project";
  }
});
