
function fetchData(): unknown {
  return { name: "Vasyl Kisyl", age: 33 };
}

interface Person {
  name: string;
  age: number;
}

const person1: Person = <Person>fetchData();

const person2: Person = fetchData() as Person;

function assertIsPerson(person: any): asserts person is Person {
  if (typeof person.name !== "string" || typeof person.age !== "number") {
    throw new Error("Not a person");
  }
}

const person3: unknown = fetchData();
assertIsPerson(person3);


function printPersonInfo(person: any): asserts person is Person {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

printPersonInfo(person1);
printPersonInfo(person2);
printPersonInfo(person3);