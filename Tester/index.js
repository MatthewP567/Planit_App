const textInputField = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completeCount = document.getElementById("completed-counter");
const uncompleteCount = document.getElementById("uncompleted-counter");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completeCount.textContent = completedTasks;
    uncompleteCount.textContent = uncompletedTasks;
}

function switchMode(){
    const todoContainer = document.getElementById("todo-container");
    const inputButton = document.getElementById("input-button");
    const switchButton = document.getElementById("darkModeButton");
    const page = document.body;
    if (todoContainer.style.borderColor == "bisque") {
        todoContainer.style.borderColor="limegreen";
        inputButton.style.backgroundColor="limegreen";
        switchButton.style.backgroundColor="limegreen";
        switchButton.style.borderColor="green";
        switchButton.innerText = "Light Mode";

    }
    else {
        todoContainer.style.borderColor="bisque";
        inputButton.style.backgroundColor="bisque";
        switchButton.style.backgroundColor="bisque";
        switchButton.style.borderColor="teal";
        switchButton.innerText = "Dark Mode";
    }
}

function addTask() {
    const task = textInputField.value.trim();
    if (!task) {
        alert("Please write down a task");
        console.log("no task added");

        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="delete-btn">Delete</span>
    `;

    listContainer.appendChild(li);

    textInputField.value = " ";

    // attach event listeners to the new task
    const checkbox = li.querySelector("input");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });
    updateCounters();
}

textInputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});