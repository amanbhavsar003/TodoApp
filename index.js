// Select elements
let ip = document.getElementById("ip");
let btn = document.getElementById("btn");
let mainList = document.getElementById("todo-list");

let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];
let editIndex = null; // Track index of task being edited

// Function to add tasks dynamically
const addDynamicData = (ele, index) => {
    let taskValue = document.createElement("div");
    taskValue.classList.add("taskDiv");
    taskValue.innerHTML = `
        <p>${ele}</p>
        <div>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="del" data-index="${index}">Delete</button>
        
        </div>
    `;
    mainList.append(taskValue);
};

// Function to update UI and localStorage after deletion
const removeTask = (index) => {
    todoArray.splice(index, 1);
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
    renderTasks();
};

// Function to add a new task or update an existing one
const addOrUpdateTask = () => {
    let todoItem = ip.value.trim();

    if (todoItem !== "") {
        if (editIndex === null) {
            // Add new task
            if (!todoArray.includes(todoItem)) {
                todoArray.push(todoItem);
                localStorage.setItem("todoArray", JSON.stringify(todoArray));
            }
        } else {
            // Update existing task
            todoArray[editIndex] = todoItem;
            localStorage.setItem("todoArray", JSON.stringify(todoArray));
            editIndex = null; // Reset edit mode
            btn.textContent = "Add Task"; // Change button back to add
        }
        ip.value = ""; // Clear input field
        renderTasks();
    }
};

// Function to render tasks from localStorage
const renderTasks = () => {
    mainList.innerHTML = "";
    todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

    todoArray.forEach((ele, index) => {
        addDynamicData(ele, index);
    });
};

// Event listener for edit & delete buttons (Event Delegation)
mainList.addEventListener("click", (event) => {
    let index = event.target.getAttribute("data-index");

    if (event.target.classList.contains("del")) {
        removeTask(index);
    } else if (event.target.classList.contains("edit")) {
        ip.value = todoArray[index]; // Fill input with selected task
        editIndex = index; // Set index for update
        btn.textContent = "Save Update"; // Change button text
    }
});

renderTasks();

btn.addEventListener("click", addOrUpdateTask);
