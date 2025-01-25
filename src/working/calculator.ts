interface ICalculator {
    add(x: number, y: number): number;
    subtract(x: number, y: number): number;
    multiply(x: number, y: number): number;
    divide(x: number, y: number): number;
    percent(x: number, y: number): number;
    calculate(operation: string, x: number, y: number): number;
  }
  
  class Calculator implements ICalculator {
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
  
    calculate(operation: string, x: number, y: number): number {
      switch (operation) {
        case "add":
          return this.add(x, y);
        case "subtract":
          return this.subtract(x, y);
        case "multiply":
          return this.multiply(x, y);
        case "divide":
          return this.divide(x, y);
        case "percent":
          return this.percent(x, y);
        default:
          throw new Error("Invalid operation");
      }
    }
  }
  