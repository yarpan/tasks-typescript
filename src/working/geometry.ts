/*
Task: Design a Class Hierarchy for Geometric Figures
You need to design a class hierarchy for geometric figures using abstract classes and inheritance.

Base Class for Describing Figures
The class should have:

Properties (public, immutable after creation):
name: name of the figure
color: color of the figure

Methods:
calculateArea: returns the area of the figure
calculatePerimeter: returns the perimeter of the figure
printInfo: prints information about the figure

Class for Elliptical Figures
Additional method:
printDiameter: prints the diameter (or diameters) to the console

Class Circle
Add the necessary properties

Implement the methods:
calculateArea
calculatePerimeter

Class Ellipse
Add the necessary properties
Implement the methods:
calculateArea
calculatePerimeter

Base Abstract Class for Polygonal Figures
sides: list of side lengths of the polygon
Methods:
getNumberOfSides: returns the number of sides
Implement the abstract method calculatePerimeter
Abstract method printAreaFormula: prints the area formula as a string

Class Rectangle
Add the necessary properties

Class Square
Add the necessary properties

Class Triangle
Add the necessary properties

Methods:
printTriangleType: prints the type of triangle (isosceles, equilateral, or scalene) depending on the values passed during creation
calcHeight: calculates the height of the triangle

Class Polygon
Add the necessary properties
*/

abstract class FigureBase {
    constructor(public readonly name: string, public readonly color: string) {}
  
    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}`);
    }
  }
  

  abstract class ElipticFigureBase extends FigureBase {
    abstract printDiameter(): void;
  }
  

  class Circle extends ElipticFigureBase {
    public readonly radius: number;
  
    constructor(name: string, color: string, radius: number) {
      super(name, color);
      this.radius = radius;
    }
  
    calculateArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  
    calculatePerimeter(): number {
      return 2 * Math.PI * this.radius;
    }
  
    printDiameter(): void {
      console.log(`Diameter: ${2 * this.radius}`);
    }
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}, Radius: ${this.radius}`);
    }
  }
  

  class Ellipse extends ElipticFigureBase {
    public readonly majorAxis: number;
    public readonly minorAxis: number;
  
    constructor(name: string, color: string, majorAxis: number, minorAxis: number) {
      super(name, color);
      this.majorAxis = majorAxis;
      this.minorAxis = minorAxis;
    }
  
    calculateArea(): number {
      return Math.PI * this.majorAxis * this.minorAxis;
    }
  
    calculatePerimeter(): number {
      return Math.PI * (3 * (this.majorAxis + this.minorAxis) - Math.sqrt((3 * this.majorAxis + this.minorAxis) * (this.majorAxis + 3 * this.minorAxis)));
    }
  
    printDiameter(): void {
      console.log(`Major Diameter: ${2 * this.majorAxis}, Minor Diameter: ${2 * this.minorAxis}`);
    }
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}, Major Axis: ${this.majorAxis}, Minor Axis: ${this.minorAxis}`);
    }
  }
  

  abstract class PolygonBase extends FigureBase {
    public readonly sides: number[];
  
    constructor(name: string, color: string, sides: number[]) {
      super(name, color);
      this.sides = sides;
    }
  
    getNumberOfSides(): number {
      return this.sides.length;
    }
  
    calculatePerimeter(): number {
        let sum = 0;
        this.sides.forEach(side => {
          sum += side;
        });
        return sum;
    }
  
    abstract printAreaFormula(): void;
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}, Number of Sides: ${this.getNumberOfSides}`);
    }
  }
  

  class Rectangle extends PolygonBase {
    public readonly width: number;
    public readonly height: number;
  
    constructor(name: string, color: string, width: number, height: number) {
      super(name, color, [width, height, width, height]);
      this.width = width;
      this.height = height;
    }
  
    calculateArea(): number {
      return this.width * this.height;
    }
  
    printAreaFormula(): void {
      console.log("Area = Width * Heigth");
    }
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}, Width: ${this.width}, Height: ${this.height}, Perimeter: ${this.calculatePerimeter}, Area: ${this.calculateArea}`);
    }
  }
  

  class Square extends PolygonBase {
    public readonly sideLength: number;
  
    constructor(name: string, color: string, sideLength: number) {
      super(name, color, [sideLength, sideLength, sideLength, sideLength]);
      this.sideLength = sideLength;
    }
  
    calculateArea(): number {
      return this.sideLength * this.sideLength;
    }
  
    printAreaFormula(): void {
      console.log("Area = Side Length ^2");
    }
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}, Side Length: ${this.sideLength}, Perimeter: ${this.calculatePerimeter}, Area: ${this.calculateArea}`);
    }
  }
  

  class Triangle extends PolygonBase {
    public readonly sideA: number;
    public readonly sideB: number;
    public readonly sideC: number;
  
    constructor(name: string, color: string, sideA: number, sideB: number, sideC: number) {
      super(name, color, [sideA, sideB, sideC]);
      this.sideA = sideA;
      this.sideB = sideB;
      this.sideC = sideC;
    }
  
    calculateArea(): number {
      const s = this.calculatePerimeter() / 2;
      return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }
  
    printAreaFormula(): void {
      console.log("Area = sqrt(s * (s - a) * (s - b) * (s - c)), where s = (a + b + c) / 2");
    }
  
    printTriangleType(): void {
      if (this.sideA === this.sideB && this.sideB === this.sideC) {
        console.log("TriangleType: Equilateral triangle");
      } else if (this.sideA === this.sideB || this.sideB === this.sideC || this.sideA === this.sideC) {
        console.log("TriangleType: Isosceles triangle");
      } else {
        console.log("TriangleType: Scalene triangle");
      }
    }
  
    calcHeight(base: number): number {
      const area = this.calculateArea();
      return area * 2 / base;
    }
  
    printInfo(): void {
      console.log(`Figure: ${this.name}, Color: ${this.color}, Perimeter: ${this.calculatePerimeter}, Area: ${this.calculateArea}`);
    }
  }


  class Polygon extends PolygonBase {
    constructor(name: string, color: string, sides: number[]) {
      super(name, color, sides);
    }
  
    calculateArea(): number|never {
      throw new Error ("Polygon type not spicified!");
    }
  
    printAreaFormula(): void {
      console.log("Area formula depends on the specific polygon type");
    }
  }
  