const API_URL = '/api/todos';

// Fetch all todos on load
async function fetchTodos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    data.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${todo.task}</span>
            <span class="delete-btn" onclick="deleteTodo('${todo._id}')">Delete</span>
        `;
        list.appendChild(li);
    });
}

// Add a new todo
async function addTodo() {
    const input = document.getElementById('todoInput');
    if (!input.value) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: input.value })
    });
    input.value = '';
    fetchTodos();
}

// Delete a todo
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

fetchTodos();