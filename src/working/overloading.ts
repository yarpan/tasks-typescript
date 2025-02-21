
// Завдання #1: Доповнити функцію sortArray з минулого завдання
// Створіть перевантаження для функції, щоб можна було вказати параметр, 
// за яким відбуватиметься порівняння, якщо це об'єкт.

type SortDirection = 'asc' | 'desc';

interface PersonW {
    name: string;
    age: number;
}

function sortArray<T>(arr: T[], compareFunc: (a: T, b: T) => number): T[];
function sortArray<T>(arr: T[], key: keyof T, direction: SortDirection): T[];
function sortArray<T>(arr: T[], compareOrKey: ((a: T, b: T) => number) | keyof T, direction?: SortDirection): T[] {
    if (typeof compareOrKey === 'function') {
        return arr.slice().sort(compareOrKey);
    }

    const key = compareOrKey as keyof T;
    const sortDirection = direction === 'desc' ? -1 : 1;

    return arr.slice().sort((a, b) => {
        if (a[key] < b[key]) return -1 * sortDirection;
        if (a[key] > b[key]) return 1 * sortDirection;
        return 0;
    });
}

const peopleW: PersonW[] = [
    { name: 'Vasyl', age: 30 },
    { name: 'Petro', age: 25 },
    { name: 'Danylo', age: 35 }
];

const sortedByNameAsc = sortArray(peopleW, 'name', 'asc');
const sortedByAgeDesc = sortArray(peopleW, 'age', 'desc');

console.log('Sorted by name ascending:', sortedByNameAsc);
console.log('Sorted by age descending:', sortedByAgeDesc);





// Завдання #2: DeepReadonly
// Створіть тип DeepReadonly, який робитиме доступними тільки для читання навіть властивості вкладених об'єктів.