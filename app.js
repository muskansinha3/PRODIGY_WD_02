// Retrieve tasks from local storage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update the task list in the UI
function updateTaskList() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    listItem.className = task.completed ? 'completed' : '';

    // Add click event listener to mark task as completed
    listItem.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      updateTaskList();
      saveTasksToLocalStorage();
      updateRemainingTasksCount();
    });

    taskList.appendChild(listItem);
  });

  updateRemainingTasksCount();
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== '') {
    tasks.push({ title: taskTitle, completed: false });
    taskInput.value = '';
    updateTaskList();
    saveTasksToLocalStorage();
  }
}

// Function to delete completed tasks
function deleteCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateTaskList();
  saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update the remaining tasks count
function updateRemainingTasksCount() {
  const remainingTasks = document.getElementById('remainingTasks');
  const remainingCount = tasks.filter((task) => !task.completed).length;
  remainingTasks.textContent =
    remainingCount === 1 ? `${remainingCount} task remaining` : `${remainingCount} tasks remaining`;
}

// Add event listeners
document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Load tasks from local storage and update the UI on page load
updateTaskList();
