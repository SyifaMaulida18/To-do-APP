const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const submitButton = document.getElementById('submit');
const toDoList = document.getElementById('todolist');
const doneList = document.getElementById('donelist');

submitButton.addEventListener('click', addTask);

let tasks = [];

loadTasks();

function addTask() {
  const task = taskInput.value;
  const date = dateInput.value;

  if (task === '' || date === '') {
    alert('Mohon masukkan tugas dan tanggal!');
    return;
  }

  const newTask = {
    task: task,
    date: date,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = '';
  dateInput.value = '';
}

function renderTasks() {
  toDoList.innerHTML = '';
  doneList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => toggleComplete(index));

    const taskText = document.createElement('span');
    taskText.textContent = task.task + ' - ' + task.date;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);

    if (task.completed) {
      checkbox.checked = true;
      const deleteButton = createDeleteButton(index);
      taskItem.appendChild(deleteButton);
      doneList.appendChild(taskItem);
    } else {
      toDoList.appendChild(taskItem);
    }
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function createDeleteButton(index) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.addEventListener('click', () => deleteTask(index));
  return deleteButton;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

renderTasks();