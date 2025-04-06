import { addTask, removeTask, markDone, listTasks } from './todo.js';

// to print todo's 
function printTasks(title) {
    console.log(`\n ${title}`);
    const tasks = listTasks();
    for (const key in tasks) {
        const { taskName, status } = tasks[key];
        console.log(`${key}: ${taskName} [${status}]`);
    }
}

addTask("Buy groceries");
addTask("Go jogging");

printTasks("All Tasks:");

markDone("4");
printTasks("After Marking Done:");

removeTask("2");
printTasks("After Removing:");
