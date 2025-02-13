import { TodoList, FileStorage } from './todo-list'; 

const storage = new FileStorage('todo-list-data.json');
const todoList = new TodoList(storage);


const task1 = todoList.addTask(
    'Підготувати аргументи для підвищення зарплатні',
    'Додати аргументи, які можуть бути корисними для обговорення підвищення.',
    'protected'
);
console.log('New task added:', task1);


const task2 = todoList.addTask(
    'Засетапити мітинг для обговорення підвищення зарплатні',
    'Запланувати зустріч на найближчий понеділок'
);
console.log('New task added:', task2);


console.log('All tasks:\n', todoList.getAllTasks());


if (task1) {
    const updated = todoList.editTask(
        task1.id,
        'Підготувати нові аргументи для підвищення зарплатні',
        'Додати нові аргументи, які нададуть більше переконливості.',
        'force'
    );

    if (updated) {
        console.log('Task updated:', todoList.getTask(task1.id));
    } else {
        console.log('Failed to update the task.');
    }
} else {
    console.log('Task not found.');
}


if (task2) {
    const markedCompleted = todoList.markCompleted(task2.id);
    if (markedCompleted) {
        console.log('Task marked as completed:', todoList.getTask(task2.id));
    } else {
        console.log('Failed to mark the task as completed.');
    }
} else {
    console.log('Task not found.');
}


if (task1) {
    const deleted = todoList.deleteTask(task1.id);
    if (deleted) {
        console.log('Task deleted:', task1.id);
    } else {
        console.log('Failed to delete the task.');
    }
} else {
    console.log('Task not found.');
}


const searchResults = todoList.searchTasks('підвищення зарплатні');
console.log('Search results for "salary increase":\n', searchResults);


const taskCounts = todoList.getTaskCounts();
console.log('Total number of tasks:', taskCounts.total);
console.log('Number of incomplete tasks:', taskCounts.remaining);


const sortedByStatus = todoList.sortTasks('status');
console.log('Tasks sorted by status:\n', sortedByStatus);


const sortedByDate = todoList.sortTasks('date');
console.log('Tasks sorted by date:\n', sortedByDate);
