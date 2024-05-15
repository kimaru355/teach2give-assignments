let username = document.getElementById("name");
let phone = document.getElementById("phone_no");
let email = document.getElementById("email");

let nameError = document.querySelector("#nameError");
let phonenoError = document.querySelector("#phonenoError");
let emailError = document.querySelector("#emailError");

let createUserForm = document.querySelector(".create-user-form");
const submitBtn = document.querySelector(".btnsubmit");

let allUsers = localStorage.getItem("users");
if (!allUsers) {
  allUsers = [];
  localStorage.setItem("users", JSON.stringify(allUsers));
} else {
  allUsers = JSON.parse(allUsers);
}

let indexLocal = localStorage.getItem("index");
if (!indexLocal) {
  indexLocal = {
    isEditing: false,
    index: null,
  };
  localStorage.setItem("index", JSON.stringify(indexLocal));
} else {
  indexLocal = JSON.parse(indexLocal);
}

if (indexLocal.isEditing) {
  username.value = allUsers[indexLocal.index].full_name;
  phone.value = allUsers[indexLocal.index].phone_number;
  email.value = allUsers[indexLocal.index].user_email;
  submitBtn.value = "Update";
}

createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  fullname = username.value.trim() !== "";
  phonenumber = phone.value.trim() !== "";
  useremail = email.value.trim() !== "";

  if (!fullname) {
    nameError.textContent = "Name is required";
    nameError.style.color = "red";
    setTimeout(() => {
      nameError.textContent = "";
    }, 3000);
  }
  if (!phonenumber) {
    phonenoError.textContent = "Phone number is required";
    phonenoError.style.color = "red";
    setTimeout(() => {
      phonenoError.textContent = "";
    }, 3000);
  }
  if (!useremail) {
    emailError.textContent = "Email is required";
    emailError.style.color = "red";
    setTimeout(() => {
      emailError.textContent = "";
    }, 3000);
  }

  user = fullname && phonenumber && useremail;

  let newUser = {
    full_name: username.value.trim(),
    phone_number: phone.value.trim(),
    user_email: email.value.trim(),
  };

  if (indexLocal.isEditing && user === true) {
    allUsers.splice(indexLocal.index, 1, newUser);
    indexLocal.isEditing = false;
    indexLocal.index = null;
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("index", JSON.stringify(indexLocal));

    username.value = "";
    phone.value = "";
    email.value = "";
    submitBtn.value = "Create Account";

    displayUsers();
    return;
  }

  if (user == true) {
    allUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(allUsers));

    username.value = "";
    phone.value = "";
    email.value = "";

    displayUsers();
  }
});

function displayUsers() {
  let listOfUsers = localStorage.getItem("users");
  let users = JSON.parse(listOfUsers);
  if (!users) {
    return;
  }

  let existingUsers = document.querySelectorAll("#displayUserstbl .userdata");
  existingUsers.forEach((userRow) => {
    userRow.remove();
  });

  users.forEach((user, index) => {
    let userNumber = document.createElement("td");
    userNumber.textContent = index + 1;

    let userName = document.createElement("td");
    userName.textContent = user.full_name;

    let userPhone = document.createElement("td");
    userPhone.textContent = user.phone_number;

    let userEmail = document.createElement("td");
    userEmail.textContent = user.user_email;

    let deleteUserbtn = document.createElement("button");
    deleteUserbtn.textContent = "Delete";
    deleteUserbtn.addEventListener("click", () => {
      allUsers.splice(index, 1);

      localStorage.setItem("users", JSON.stringify(allUsers));

      displayUsers();
    });

    let updateUserbtn = document.createElement("button");
    updateUserbtn.textContent =
      index === indexLocal.index ? "Cancel" : "Update";
    updateUserbtn.style.marginLeft = "10px";
    updateUserbtn.addEventListener("click", () => {
      if (updateUserbtn.textContent === "Update") {
        username.value = user.full_name;
        email.value = user.user_email;
        phone.value = user.phone_number;
        submitBtn.value = "Update";
        indexLocal.isEditing = true;
        indexLocal.index = index;
      } else {
        username.value = "";
        email.value = "";
        phone.value = "";
        submitBtn.value = "Create Account";
        indexLocal.isEditing = false;
        indexLocal.index = null;
      }
      localStorage.setItem("index", JSON.stringify(indexLocal));
      displayUsers();
    });
    let row = document.createElement("tr");
    row.className = "userdata";

    row.appendChild(userNumber);
    row.appendChild(userName);
    row.appendChild(userPhone);
    row.appendChild(userEmail);
    row.appendChild(deleteUserbtn);
    row.appendChild(updateUserbtn);

    let displayUserstbl = document.querySelector("#displayUserstbl");
    displayUserstbl.appendChild(row);
  });
}

displayUsers();
