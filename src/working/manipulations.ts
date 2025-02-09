
// Завдання #1: DeepMutable

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

interface PersonG {
  readonly name: string;
  readonly details: {
    readonly age: number;
    readonly address: {
      readonly city: string;
    };
  };
}

type MutablePersonG = DeepMutable<PersonG>;

const personG: MutablePersonG = {
  name: "Vasyl",
  details: {
    age: 30,
    address: {
      city: "Kyiv",
    },
  },
};

personG.name = "Petro";
personG.details.age = 31;
personG.details.address.city = "Odessa";




// Завдання #2: PickByValueType

type PickByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

interface PersonH {
  name: string;
  age: number;
  isActive: boolean;
  address: string;
}

type StringProperties = PickByValueType<PersonH, string>;

const personH: StringProperties = {
  name: "Vasyl",
  address: "Kyiv",
};




// Завдання #3: OmitByValueType

type OmitByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? never : K]: T[K];
};

interface PersonJ {
  name: string;
  age: number;
  isActive: boolean;
  address: string;
}

type NonStringProperties = OmitByValueType<PersonJ, string>;

const personJ: NonStringProperties = {
  age: 30,
  isActive: true,
};




// Завдання #4: CustomReturnType

type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;


function exampleFunction(a: number, b: string): boolean {
  return a > 0 && b.length > 0;
}
type ReturnTypeOfExample = CustomReturnType<typeof exampleFunction>;


function calculateAverage(numbers: number[]): number {
  const total = numbers.reduce((acc, num) => acc + num, 0);
  return total / numbers.length;
}
type AverageReturnType = CustomReturnType<typeof calculateAverage>;


function getStringInfo(text: string): { length: number } {
  return { length: text.length };
}
type StringInfoReturnType = CustomReturnType<typeof getStringInfo>;




// Завдання #5: ExtendedCustomReturnType

type FunctionInfo<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer R ? [R, P] : never;

function sampleFunction(a: number, b: string): boolean {
  return a > 0 && b.length > 0;
}
type FunctionInfoResult = FunctionInfo<typeof sampleFunction>;


function anotherSapmle(x: Date, y: string, z: number): string[] {
  return [x.toString(), y, z.toString()];
}
type AnotherFunctionInfoResult = FunctionInfo<typeof anotherSapmle>;
