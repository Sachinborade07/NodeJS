import { existsSync, writeFileSync, readFileSync } from 'fs';

const filePath = './todos.txt';

function loadTodos() {
    if (!existsSync(filePath)) writeFileSync(filePath, '{}');
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function saveTodos(todos) {
    writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

export function addTask(taskName) {
    const todos = loadTodos();
    const keys = Object.keys(todos).map(Number);
    const nextId = keys.length > 0 ? Math.max(...keys) + 1 : 1;
    todos[nextId] = { taskName, status: "Pending" };
    saveTodos(todos);
}

export function removeTask(id) {
    const todos = loadTodos();
    delete todos[id];
    saveTodos(todos);
}

export function markDone(id) {
    const todos = loadTodos();
    if (todos[id]) {
        todos[id].status = "Done";
        saveTodos(todos);
    }
}

export function listTasks() {
    return loadTodos();
}
