// Literal Types - specific values as types, not just primitive types
type LiteralType = "my" | "Hello, World!";
let abc: LiteralType = "Hello, World!";

// Union Types - a variable can hold one of multiple types
let value: string | number;
value = "Hello"; // OK
value = 42; // OK

type types = "abc" | "def";

type User = {
    name: string;
    age: number;
    type: types;
}
let user: User = {
    name: "John",
    age: 30,
    type: "abc"
}

// Type Guards - checking which type is held by a union type
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

// instanceof guard
function serve(entity: Person | Animal) {
    if (entity instanceof Person) {
        console.log("Serving a person...");
    } else if (entity instanceof Animal) {
        console.log("Serving an animal...");
    }
    entity.serve();
}

// typeof guard
let newValue: unknown = "Hello";
if (typeof newValue === "string") {
    console.log(newValue.toUpperCase()); // OK
}
