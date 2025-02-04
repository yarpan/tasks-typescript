/*Task #1: Discriminated Union with Generics

Create a discriminated union Result to represent the result of an asynchronous operation:

A status field which can be either "success" or "error".
A data field for "success".
An error field for "error".
Create a function handleResult that:

If status === 'success', returns data.
If status === 'error', throws an error with error.
*/

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



/*
Task #2: Generic Queue

Create a generic class Queue that implements a queue data structure and has the following methods:

enqueue — adds an element to the end of the queue.
dequeue — removes and returns an element from the front of the queue.
peek — returns an element from the front of the queue without removing it.
size — returns the number of elements in the queue.
*/

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



/*
Task #3: Generic Sorting Function

Create a function sortArray that:

Accepts an array arr of any type.
Accepts a function compareFn that compares two elements.
Returns a sorted array without modifying the original.
*/

function sortArray<T>(arr: T[], compareFunc: Function): T[] {
    return arr.slice().sort(function (a: T, b: T): number {
        return compareFunc(a, b);
    });
}



/*
Task #4: Generic Constraints

Create a function extractProperty that returns the value of an object's property.

Use constraints to ensure that the key actually belongs to the object.
*/

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



/*
Task #5: Generic Types and Custom Collections

Create an Identifiable interface with an id field.

Create a Repository class to store objects that implement Identifiable.

Methods:

add — adds an object with a unique id.
getById — returns an object by its id.
removeById — removes an object and returns true if it was found and removed, otherwise false.
getAll — returns all objects.
Create several data types, such as User, Product, which implement Identifiable, and demonstrate the usage of Repository<User> and Repository<Product>.
*/

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