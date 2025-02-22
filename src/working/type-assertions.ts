/*
Task: Create the fetchData Method
Create a method fetchData that returns a value of type unknown.
Assume that this function returns an object with fields name: string and age: number, but the return type is not known.
Use different type assertion methods to cast the result of fetchData to the expected object type.
Save the obtained result in a variable with a refined type.
Add a method printPersonInfo, in whose signature use Signature Assertion to ensure that the parameter person is an object with fields name: string and age: number.
Invoke fetchData and pass the result to printPersonInfo to ensure correct operation.
*/


function fetchData(): unknown {
  return { name: "Vasyl Kisyl", ageS: 33 };
}

interface Person {
  name: string;
  ageS: number;
}

const person1: Person = <Person>fetchData();

const person2: Person = fetchData() as Person;

function assertIsPerson(person: any): asserts person is Person {
  if (typeof person.name !== "string" || typeof person.ageS !== "number") {
    throw new Error("Not a person");
  }
}

const person3: unknown = fetchData();
assertIsPerson(person3);


function printPersonInfo(person: any): asserts person is Person {
  console.log(`Name: ${person.name}, Age: ${person.ageS}`);
}

printPersonInfo(person1);
printPersonInfo(person2);
printPersonInfo(person3);