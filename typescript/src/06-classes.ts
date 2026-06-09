// Classes - object-oriented programming with type safety

// Basic Class
class ABC {
    name: string;
    readonly age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// Class with Methods
class Person {
    serve() {
        console.log("Serving...");
    }
}

class Animal {
    serve() {
        console.log("Serving...");
    }
}

// Implementing Interface
type UserType = {
    name: string;
    age: number;
    email: string;
    type: "abc" | "def";
}

class UserClass implements UserType {
    name = "John";
    age = 30;
    email = "a";
    type: "abc" | "def" = "abc";
}

// Interface can also be implemented
interface IUser {
    name: string;
    age: number;
    email: string;
    type: "abc" | "def";
}

class UserFromInterface implements IUser {
    name = "John";
    age = 30;
    email = "a";
    type: "abc" | "def" = "abc";
}

// Function types in classes
type TestingType = {
    add: (a: number, b: number) => number; // arrow function syntax
    abc(price: number): string; // method syntax
}

let test: TestingType = {
    add: (a: number, b: number) => {
        return a + b;
    },
    abc: (price: number) => {
        return `The price is ${price}`;
    }
}

// Access modifiers (common in classes)
class UserWithModifiers {
    public name: string;
    private email: string;
    protected age: number;
    
    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
}
