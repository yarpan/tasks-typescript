
/*
Create an interface and corresponding functionality for a simple calculator.

The calculator should perform basic arithmetic operations and include an additional function to calculate percentages.

Requirements:
Create an interface ICalculator that defines the calculator object.

The interface should contain methods for the following operations:
add – addition
subtract – subtraction
multiply – multiplication
divide – division
percent – percentage calculation
Create a class Calculator that implements ICalculator and enables calculations:

Define a method to accept an "operation" and the required parameters.
Implement method overloading if needed

*/

export enum Operation {
  Add = "add",
  Subtract = "subtract",
  Multiply = "multiply",
  Divide = "divide",
  Percent = "percent",
}

interface ICalculator {
  add(x: number, y: number): number;
  subtract(x: number, y: number): number;
  multiply(x: number, y: number): number;
  divide(x: number, y: number): number;
  percent(x: number, y: number): number;
  calculate(operation: Operation, x: number, y: number): number;
}


export class Calculator implements ICalculator {
  add(x: number, y: number): number {
    return x + y;
  }

  subtract(x: number, y: number): number {
    return x - y;
  }

  multiply(x: number, y: number): number {
    return x * y;
  }

  divide(x: number, y: number): number {
    if (y === 0) {
      throw new Error("Impossible to divide on zero");
    }
    return x / y;
  }

  percent(x: number, y: number): number {
    return x / 100 * y;
  }

  calculate(operation: Operation, x: number, y: number): number {
    switch (operation) {
      case Operation.Add:
        return this.add(x, y);
      case Operation.Subtract:
        return this.subtract(x, y);
      case Operation.Multiply:
        return this.multiply(x, y);
      case Operation.Divide:
        return this.divide(x, y);
      case Operation.Percent:
        return this.percent(x, y);
      default:
        throw new Error("Invalid operation");
    }
  }
}
