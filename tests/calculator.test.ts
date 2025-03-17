import { Calculator } from "../src/calculator";
import { Operation } from "../src/calculator";

describe("CalculatorT", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test("should add two numbers", () => {
    expect(calculator.add(3, 5)).toBe(8);
  });

  test("should subtract two numbers", () => {
    expect(calculator.subtract(10, 5)).toBe(5);
  });

  test("should multiply two numbers", () => {
    expect(calculator.multiply(4, 3)).toBe(12);
  });

  test("should divide two numbers", () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  test("should throw an error when dividing by zero", () => {
    expect(() => calculator.divide(10, 0)).toThrow("Impossible to divide on zero");
  });

  test("should calculate percentage", () => {
    expect(calculator.percent(200, 10)).toBe(20);
  });

  test("should calculate using calculate method with add operation", () => {
    expect(calculator.calculate(Operation.Add, 7, 3)).toBe(10);
  });

  test("should calculate using calculate method with subtract operation", () => {
    expect(calculator.calculate(Operation.Subtract, 10, 3)).toBe(7);
  });

  test("should calculate using calculate method with multiply operation", () => {
    expect(calculator.calculate(Operation.Multiply, 6, 2)).toBe(12);
  });

  test("should calculate using calculate method with divide operation", () => {
    expect(calculator.calculate(Operation.Divide, 9, 3)).toBe(3);
  });

  test("should calculate using calculate method with percent operation", () => {
    expect(calculator.calculate(Operation.Percent, 250, 20)).toBe(50);
  });

  test("should throw an error for invalid operation", () => {
    expect(() => calculator.calculate("invalid_operation" as Operation, 2, 3)).toThrow("Invalid operation");
  });
});
