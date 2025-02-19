
// Завдання #1: DeprecatedMethod

function DeprecatedMethod(reason: string, replacement?: string) {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void {

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Method "${propertyKey}" is deprecated! ${reason}` + (replacement ? ` Use "${replacement}" instead.` : ""));
      return originalMethod.apply(this, args);
    };
  };
}


class Example {
  @DeprecatedMethod("This method is deprecated!", "newMethod")
  oldMethod() {
    console.log("Executing old method...");
  }

  newMethod() {
    console.log("Executing new method...");
  }
}

const myObject = new Example();
myObject.oldMethod();

myObject.newMethod();




// Завдання #2: MinLength, MaxLength, Email

function MinLength(length: number) {
  return function (target: any, propertyKey: string) {
    let value: string = target[propertyKey];

    const getter = () => value;
    const setter = (newValue: string) => {
      if (newValue.length < length) {
        console.log(`${propertyKey} must be minimum ${length} characters long.`);
      } else {
        value = newValue;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}


function MaxLength(length: number) {
  return function (target: any, propertyKey: string) {
    let value: string = target[propertyKey];

    const getter = () => value;
    const setter = (newValue: string) => {
      if (newValue.length > length) {
        console.log(`${propertyKey} must be not more ${length} characters long.`);
      } else {
        value = newValue;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}


function Email(target: any, propertyKey: string) {
  let value: string = target[propertyKey];

  const getter = () => value;
  const setter = (newValue: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newValue)) {
      console.log(`${propertyKey} email not match pattern`);
    } else {
      value = newValue;
    }
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}


class UserX {
  @MinLength(5)
  name: string;

  @MaxLength(15)
  username: string;

  @Email
  email: string;

  constructor(name: string, username: string, email: string) {
    this.name = name;
    this.username = username;
    this.email = email;
  }
}

const userX = new UserX("Vasyl", "VasylPleten", "Vasyl.Pleten@ukr.net");
userX.name = "Vasl";
userX.username = "VasylPerelizcherezpleten";
userX.email = "Vasyl@Pleten@ukr@net";

console.log(userX);




// Завдання #3: Experimental decorators

function registerValidator(target: any, propertyKey: string, validator: (value: any) => void) {
  if (!target.constructor._validationRules) {
    target.constructor._validationRules = {};
  }

  if (!target.constructor._validationRules[propertyKey]) {
    target.constructor._validationRules[propertyKey] = [];
  }

  target.constructor._validationRules[propertyKey].push(validator);
}

function MinStrLength(minLen: number) {
  return function (target: any, propertyKey: string) {
    registerValidator(target, propertyKey, (value: string) => {
      if (value.length < minLen) {
        console.log(`${propertyKey} must be minimum ${minLen} characters long.`);
      }
    });
  };
}

function MaxStrLength(maxLen: number) {
  return function (target: any, propertyKey: string) {
    registerValidator(target, propertyKey, (value: string) => {
      if (value.length > maxLen) {
        console.log(`${propertyKey} must be not more ${maxLen} characters long.`);
      }
    });
  };
}

function ValidateEmail(target: any, propertyKey: string) {
  registerValidator(target, propertyKey, (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      console.log(`${propertyKey} email not match pattern`);
    }
  });
}


function runValidation(instance: any) {
  const validationRules = instance.constructor._validationRules;
  if (!validationRules) return;

  for (const property in validationRules) {
    const value = instance[property];
    validationRules[property].forEach((validator: Function) => validator(value));
  }
}


class PersonData {
  @MinStrLength(5)
  @MaxStrLength(25)
  username: string;

  @ValidateEmail
  contactEmail: string;

  constructor(username: string, contactEmail: string) {
    this.username = username;
    this.contactEmail = contactEmail;
  }
}

const newUser = new PersonData("Vasl", "Vasyl@Pleten@ukr@net");
runValidation(newUser); 
// username must be at least 5 characters long.
// contactEmail must be a valid email address.

