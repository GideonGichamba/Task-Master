// Retrieve tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update tasks in localStorage
function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const taskText = taskInput.value;
  if (taskText) {
    addTask(taskText);
    taskInput.value = '';
    updateTasks(); // Update tasks in localStorage
  }
});

function addTask(taskText) {
  const task = {
    text: taskText,
    completed: false
  };
  tasks.push(task);
  updateTasks(); // Update tasks in localStorage

  renderTasks(); // Update the UI to display the new task
}

function renderTasks() {
  taskList.innerHTML = ''; // Clear the taskList element

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.innerText = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }

    li.addEventListener('click', function() {
      task.completed = !task.completed;
      updateTasks(); // Update tasks in localStorage
      renderTasks(); // Update the UI to reflect the task completion
    });

    li.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
      updateTasks(); // Update tasks in localStorage
      renderTasks(); // Update the UI to remove the deleted task
    });

    taskList.appendChild(li);
  });
}

// Initial rendering of tasks from localStorage
renderTasks();

