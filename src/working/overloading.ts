
// Завдання #1: Доповнити функцію sortArray з минулого завдання
// Створіть перевантаження для функції, щоб можна було вказати параметр, 
// за яким відбуватиметься порівняння, якщо це об'єкт.

type SortDirection = 'asc' | 'desc';

interface PersonW {
    name: string;
    age: number;
}

function sortArrayQ<T>(arr: T[], compareFunc: (a: T, b: T) => number): T[];
function sortArrayQ<T>(arr: T[], key: keyof T, direction: SortDirection): T[];
function sortArrayQ<T>(arr: T[], compareOrKey: ((a: T, b: T) => number) | keyof T, direction?: SortDirection): T[] {
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

const sortedByNameAsc = sortArrayQ(peopleW, 'name', 'asc');
const sortedByAgeDesc = sortArrayQ(peopleW, 'age', 'desc');

console.log('Sorted by name ascending:', sortedByNameAsc);
console.log('Sorted by age descending:', sortedByAgeDesc);





// Завдання #2: DeepReadonly
// Створіть тип DeepReadonly, який робитиме доступними тільки для читання навіть властивості вкладених об'єктів.

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Приклад використання
type BookQ = {
    title: string;
    author: {
        name: string;
        birthYear: number;
    };
    genre: string;
};

const bookQ: DeepReadonly<BookQ> = {
    title: "Пригоди Шерлока Холмса",
    author: {
        name: "Артур Конан Дойл",
        birthYear: 1859,
    },
    genre: "Детектив",
};


bookQ.title = "Інша книга";          // Cannot assign to 'title' because it is a read-only property.
bookQ.author.name = "Інший автор";   // Cannot assign to 'name' because it is a read-only property.
bookQ.author.birthYear = 1900;       // Cannot assign to 'birthYear' because it is a read-only property.





// Завдання #3: DeepRequireReadonly
// Створіть тип DeepRequireReadonly, який робитиме доступними тільки для читання навіть властивості вкладених об'єктів, 
// а також робитиме їх обов'язковими.

type DeepRequireReadonly<T> = {
    readonly [P in keyof T]-?: T[P] extends object ? DeepRequireReadonly<T[P]> : T[P];
};

interface BookZ {
    title: string;
    author: {
        name: string;
        birthYear: number;
    };
    genres: string[];
    pages: number;
    description: string;
    published: {
        publisherName: string;
        publisherAddress: string;
        publishedYear: number;
    };
}

const bookZ: DeepRequireReadonly<BookZ> = {
    title: "Пригоди Шерлока Холмса",
    author: {
        name: "Артур Конан Дойл",
        birthYear: 1859
    },
    genres: ["Детектив", "Пригоди"],
    pages: 307,
    description: "Збірник з дванадцяти оповідань про пригоди Шерлока Холмса.",
    published: {
        publisherName: "George Newnes",
        publisherAddress: "Лондон, Англія",
        publishedYear: 1892
    }
};

bookZ.title = "Інша книга";                             // Cannot assign to 'title' because it is a read-only property.
bookZ.author.name = "Інший автор";                      // Cannot assign to 'name' because it is a read-only property.
bookZ.published.publisherName = "Комбінат Україна";     // Cannot assign to 'publisherName' because it is a read-only property.





// Завдання #4: PartialByKeys
// Створіть тип, який робить властивості K в об'єкті T необов'язковими (аналог Partial, але лише для зазначених ключів).

type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface BookV {
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
}

type PartialBook = PartialByKeys<BookV, 'author' | 'genres'>;

const exampleBookS: PartialBook = {
    title: "Пригоди Шерлока Холмса",
    publishedYear: 1892,
    // other filds are optional
};




// Завдання #5: ReadonlyByKeys
// Створіть тип, який робить зазначені ключі K в об'єкті T доступними лише для читання.

type ReadonlyByKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

interface BookFF {
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
}

type ReadonlyBookTitle = ReadonlyByKeys<BookFF, 'title'>;

const exampleBookFF: ReadonlyBookTitle = {
    title: "Пригоди Шерлока Холмса",
    author: "Артур Конан Дойл",
    publishedYear: 1892,
    genres: ["Детектив", "Пригоди"]
};


exampleBookFF.title = "Новий Заголовок"; // Cannot assign to 'title' because it is a read-only property.
exampleBookFF.author = "Інший Автор"; // OK
























