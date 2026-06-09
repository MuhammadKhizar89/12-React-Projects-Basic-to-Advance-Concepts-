// Type vs Type Alias vs Interface
// type is used to define a type alias for any type (primitive, union, intersection, tuple, etc.)
// interface is used to define the structure of objects
// interface can be extended using extends keyword
// interface can only describe object types
// interface can be implemented by classes

// Structural Typing
type Less = {
    name: string;
}

const more = {
    name: "Bob",
    age: 30
}
const user4: Less = more
// TypeScript allows this because 'more' has at least the properties of 'Less'
// This is called "structural typing" or "duck typing"

// Type cannot be implemented by classes (but interface can)
// This will cause an error:
// type thisnotwork = "alice" | "bob";
// class thisNotWork implements thisnotwork {
//     // Error: cannot implement a union of string literals
// }

// Type with object structure CAN be implemented
type ThisAlsoWorks = {
    name: string;
    age: number;
    email: string;
    type: "abc" | "def";
}

class ThisAlsoWorksClass implements ThisAlsoWorks {
    name = "John";
    age = 30;
    email = "a";
    type: "abc" | "def" = "abc";
}

// Interface - cleaner for object structures
interface NewUser {
    name: string;
    age: number;
    email: string;
    type: "abc" | "def";
}

class UserAgain implements NewUser {
    name = "John";
    age = 30;
    email = "a";
    type: "abc" | "def" = "abc";
}

// Interface Merging - interfaces with same name get merged
interface Test {
    name: string;
}
interface Test {
    age: number;
}
const testObj: Test = {
    name: "John",
    age: 30
}

// Interface Extension - extends keyword for inheritance
interface AB {
    name: string;
}

interface BA {
    age: number;
}

interface CA extends AB, BA {
    email: string;
}

const user7: CA = {
    name: "John",
    age: 30,
    email: "a@email.com",
}

// Key-Value Interface - for dynamic keys
interface KeyValue {
    [key: string]: string;
}

const keyValue: KeyValue = {
    name: "John",
    "key": "value",
    2: "233" // number keys are converted to string in JS
}

// Intersection Types - combine multiple types
type A = { name: string };
type B = { age: number };
type C = A & B;
// C must have all properties of A AND B

let user1: C = {
    name: "John",
    age: 30
}

// Union Types - one OR the other (different from intersection)
type D = {
    name: string;
    age?: number;
}
// D can have name (required) and optionally age
