let form = document.getElementById("form");
let taskNameInput = document.getElementById("name-task-input");
let descriptionInput = document.getElementById("description-task-input");
let assignedToInput = document.getElementById("assigned-to-task-input");
let dueDateInput = document.getElementById("due-date-task-input");
dueDateInput.min = new Date().toISOString().split("T")[0];
let statusInput = document.getElementById("status-task-input");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


// looks for event button press submit and runs the form validation function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// validation function and clear the form
let formValidation = () => {
  if (taskNameInput.value.length < 8) {
    document.getElementById("name-task-error").innerHTML =
      "Please enter at least 8 characters long";
    document.getElementById("name-task-input").style.borderColor = "red";
    document.getElementById("name-task-input").placeholder = "";
    document.getElementById("name-task-input").classList.add("is-invalid");
  } else {
    document.getElementById("name-task-input").classList.remove("is-invalid");
    document.getElementById("name-task-input").classList.add("is-valid");
    document.getElementById("name-task-input").style.borderColor = "green";
    document.getElementById("name-task-error").innerHTML = "";
  }

  if (descriptionInput.value.length < 15) {
    document.getElementById("description-task-error").innerHTML =
      "Please enter at least 15 characters long";
    document.getElementById("description-task-input").style.borderColor = "red";
    document.getElementById("description-task-input").placeholder = "";
    document.getElementById("description-task-input").classList.add("is-invalid");
  } else {
    document.getElementById("description-task-input").classList.remove("is-invalid");
    document.getElementById("description-task-input").classList.add("is-valid");
    document.getElementById("description-task-input").style.borderColor = "green";
    document.getElementById("description-task-error").innerHTML = "";
  }

  if (assignedToInput.value.length < 3) {
    document.getElementById("assigned-to-task-error").innerHTML =
      "Please enter at least 3 characters long";
    document.getElementById("assigned-to-task-input").style.borderColor = "red";
    document.getElementById("assigned-to-task-input").placeholder = "";
    document.getElementById("assigned-to-task-input").classList.add("is-invalid");
  } else {
    document.getElementById("assigned-to-task-input").classList.remove("is-invalid");
    document.getElementById("assigned-to-task-input").classList.add("is-valid");
    document.getElementById("assigned-to-task-input").style.borderColor = "green";
    document.getElementById("assigned-to-task-error").innerHTML = "";
  }
  if (dueDateInput.value < new Date().toISOString().split("T")[0]) {
    document.getElementById("due-date-task-input").style.borderColor = "red";
    document.getElementById("due-date-task-error").innerHTML = "Due date must be today or later";
    document.getElementById("due-date-task-input").placeholder = "";
    document.getElementById("due-date-task-input").classList.add("is-invalid");
  } else {
    document.getElementById("due-date-task-input").classList.remove("is-invalid");
    document.getElementById("due-date-task-input").classList.add("is-valid");
    document.getElementById("due-date-task-input").style.borderColor = "green";
    document.getElementById("due-date-task-error").innerHTML = "";
  }
  
  document.getElementById("due-date-task-input").min = new Date().toISOString().split("T")[0];

  if (statusInput.value === "0") {
    document.getElementById("status-task-input").style.borderColor = "red";
    document.getElementById("status-task-error").innerHTML = ""; "Please select a status";
    document.getElementById("status-task-input").classList.add("is-invalid");
  } else {
    document.getElementById("status-task-input").classList.remove("is-invalid");
    document.getElementById("status-task-input").classList.add("is-valid");
    document.getElementById("status-task-input").style.borderColor = "green";
    document.getElementById("status-task-error").innerHTML = "";
  }


  if (
    taskNameInput.value.length > 7 &&
    descriptionInput.value.length > 14 &&
    assignedToInput.value.length > 3 &&
    dueDateInput.value > new Date().toISOString().split("T")[0] &&
    statusInput.value !== "0"
  ) {
    acceptData();
    clearForms();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};


// this makes html card for each task
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    tasks.innerHTML += `
    <div class="card ${x.color}" id="${y}">
      <h5 class="card-header">Task Name: ${x.text}</h5>
      <div class="card-body">
        <p class="card-text">Description: ${x.description}</p>
        <p class="card-text">Due Date: ${x.date}</p>
        <p class="card-text">Assigned to: ${x.assignee}</p>
        <p class="card-text">Status: ${x.status}</p>
        <div class="options">
          <i class="fas fa-edit" onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
          <i class="fas fa-trash-alt" onClick="deleteTask(this); createTasks()"></i>
          <i class="fas fa-check" onClick="markAsDone(this)"></i>
        </div>
      </div>
    </div>
    `;
  });
  resetForm();
};


// delete function on trash icon

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};


// edit task
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement.parentElement;
  //taskNameInput.value = selectedTask.children[0].children[0].innerHTML.split(': ')[1];
  descriptionInput.value = selectedTask.children[1].children[0].innerHTML.split(': ')[1];
  assignedToInput.value = selectedTask.children[1].children[2].innerHTML.split(': ')[1];
  dueDateInput.value = selectedTask.children[1].children[1].innerHTML.split(': ')[1];
  statusInput.value = selectedTask.children[1].children[3].innerHTML.split(': ')[1];
  deleteTask(e);
};



// markdone function 
let markAsDone = (e) => {
  let id = e.parentElement.parentElement.parentElement.id;
  data[id].status = "Done";
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();

}

// reset form  function
let resetForm = () => {
  form.reset();
};

// render function parses data and renders it to the DOM
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
})();


// clears all the inputs
const clearForms = () => {
  document.getElementById("form").reset();
  const formElements = [
    "name-task-input",
    "description-task-input",
    "assigned-to-task-input",
    "due-date-task-input",
    "status-task-input"
  ];
  formElements.forEach(element => {
    document.getElementById(element).style.borderColor = "";
    document.getElementById(element).classList.remove("is-valid");
    document.getElementById(element).classList.remove("is-invalid");
  });
};

const resetButton = document.querySelector("#btnReset");
resetButton.addEventListener("click", clearForms);


// close button for modal form clears the form
const close = document.querySelector("#btnClose");
if (close) {
  close.addEventListener("click", function () {
    clearForms();
  });
}



