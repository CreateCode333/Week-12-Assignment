//Below is the JavaScript code for the assignment

document.addEventListener('DOMContentLoaded', async () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
  
    // Below is the code with a Function to fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        return tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };
  
    // Function to render tasks to the UI
    const renderTasks = async () => {
      taskList.innerHTML = '';
      const tasks = await fetchTasks();
      tasks.forEach(task => {
        const taskCard = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${task.title}</h5>
              <button class="btn btn-danger delete-btn" data-id="${task.id}">Delete</button>
            </div>
          </div>
        `;
        taskList.innerHTML += taskCard;
      });
    };
  
    // Initial render of tasks
    renderTasks();
  
    // Event listener for the task form submission
    taskForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const taskTitle = document.getElementById('taskTitle').value;
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: taskTitle })
        });
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        // Clear input and re-render tasks
        document.getElementById('taskTitle').value = '';
        renderTasks();
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    });
  
    // Event delegation for delete buttons
    taskList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const taskId = event.target.dataset.id;
        try {
          const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete task');
          }
          // Re-render tasks after deletion
          renderTasks();
        } catch (error) {
          console.error('Error deleting task:', error.message);
        }
      }
    });
  });
  