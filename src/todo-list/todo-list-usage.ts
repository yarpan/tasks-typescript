
import { TodoList } from './todo-list';

const todoList = new TodoList();

const task1 = todoList.addTask(
    'Підготувати список аргументів для розмови про підвищення зарплатні',
    'Додати аргументи, які можуть бути корисними для обговорення підвищення.',
    'protected'
);
console.log('Додано нову таску:', task1);


const task2 = todoList.addTask(
    'Нанести мітинг для обговорення підвищення зарплатні',
    'Запланувати зустріч на найближчий понеділок'
);
console.log('Додано нову таску:', task2);


console.log('Усі таски:', todoList.getAllTasks());


const updated = todoList.editTask(
    task1.id,
    'Підготувати аргументи для підвищення зарплатні',
    'Додати нові аргументи, які нададуть більше переконливості.',
    'force'
);
if (updated) {
    console.log('Таску відредаговано:', todoList.getTask(task1.id));
} else {
    console.log('Не вдалося редагувати таску.');
}


const markedCompleted = todoList.markCompleted(task2.id);
if (markedCompleted) {
    console.log('Таска помічена як виконана:', todoList.getTask(task2.id));
} else {
    console.log('Не вдалося позначити таску як виконану.');
}


const deleted = todoList.deleteTask(task1.id);
if (deleted) {
    console.log('Таску видалено:', task1.id);
} else {
    console.log('Не вдалося видалити таску.');
}


const searchResults = todoList.searchTasks('підвищення зарплатні');
console.log('Пошук по запиту "підвищення зарплатні":\n', searchResults);


const taskCounts = todoList.getTaskCounts();
console.log('Загальна кількість тасок:', taskCounts.total);
console.log('Кількість невиконаних тасок:', taskCounts.remaining);


const sortedByStatus = todoList.sortTasks('status');
console.log('Таски, відсортовані за статусом:\n', sortedByStatus);


const sortedByDate = todoList.sortTasks('date');
console.log('Таски, відсортовані за датою:\n', sortedByDate);
