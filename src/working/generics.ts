
// Завдання #1: Дискримінантне об'єднання з узагальненням

type Result<T> =
    | { status: 'success'; data: T }
    | { status: 'error'; error: string };

function handleResult<T>(result: Result<T>): T {
    if (result.status === 'success') {
        return result.data;
    } else {
        throw new Error(result.error);
    }
}


// Завдання #2: Узагальнена черга

class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }
}



// Завдання #3: Узагальнена функція сортування

function sortArray<T>(arr: T[], compareFunc: Function): T[] {
    return arr.slice().sort(function (a: T, b: T): number {
        return compareFunc(a, b);
    });
}



// Завдання #4: Узагальнені обмеження

interface PersonA {
    name: string;
    age: number;
}

class PersonClass implements PersonA {
    constructor(public name: string, public age: number) { }
    getName(): string {
        return this.name;
    }
    getAge(): number {
        return this.age;
    }
}

function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const personA = new PersonClass("Vasyl Kisyl", 33);
const nameA = extractProperty(personA, "name"); 
const ageA = extractProperty(personA, "age"); 
console.log(nameA); 
console.log(ageA); 



// Завдання #5: Узагальнені типи та користувацькі колекції

interface Identifiable {
    id: number;
}

class Repository<T extends Identifiable> {
    private items: Map<number, T> = new Map();

    add(item: T): void {
        this.items.set(item.id, item);
    }

    getById(id: number): T | undefined {
        return this.items.get(id);
    }

    removeById(id: number): boolean {
        return this.items.delete(id);
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }
}


class Users implements Identifiable {
    constructor(public id: number, public name: string) { }
}

class Products implements Identifiable {
    constructor(public id: number, public title: string) { }
}

const userRepository = new Repository<Users>();
userRepository.add(new Users(1, 'Vasyl'));
userRepository.add(new Users(2, 'Petro'));
console.log(userRepository.getById(1));
console.log(userRepository.getAll());

const productRepository = new Repository<Products>();
productRepository.add(new Products(100, 'javelin'));
productRepository.add(new Products(101, 'machinegun'));
console.log(productRepository.getById(100));
console.log(productRepository.getAll());