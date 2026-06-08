let abc: "my"|"Hello, World!" = "Hello, World!";

function greet(msg?: string) {
    // if something not comming then this is undefined
    if (msg === undefined) {
        console.log(msg);
    } else {
        console.log(abc);
    }
}
let aabc: string | undefined;
greet();

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

function serve(entity: Person | Animal) {
    if (entity instanceof Person) {
        console.log("Serving a person...");
    } else if (entity instanceof Animal) {
        console.log("Serving an animal...");
    }
    entity.serve();
}

type types = "abc" | "def";

type User = {
    name: string;
    age: number;
    type: types;
}
let user: User = {
    name: "John",
    age: 30,type: "abc"
}


// any

// TypeScript basically stops checking.
// let value: any = "Hello";
// value.toUpperCase(); // OK
// value.foo.bar();     // Also OK at compile time

// TypeScript trusts you completely.

// The problem:
// let value: any = 123;
// value.toUpperCase(); // Runtime error!
// TypeScript doesn't warn you.

// unknown
// TypeScript says:
// "I don't know the type yet, so prove it before using it."
// let value: unknown = "Hello";
// value.toUpperCase(); // Error

// You must narrow the type first:
// if (typeof value === "string") {
//     console.log(value.toUpperCase()); // OK
// }

let newValue:unknown = "Hello";
// console.log(newValue.toUpperCase());// Error: Object is of type 'unknown'.
if (typeof newValue === "string") {
    console.log(newValue.toUpperCase()); // OK
}

let res:any ="12";
console.log((res as string).toLowerCase()); // so i am telling the compiler that this is string

type Book = {
    title: string;
    author: string;
    year: number;
}
let bookString ='{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925}';

let book = JSON.parse(bookString) as Book; // Type assertion to tell the compiler that the parsed object is of type Book
console.log(book.title); // Output: The Great Gatsby
let num = "4s2";
console.log(Number(num)); // Output: 42

// The function never reaches the end, so it never returns a value.

// function infiniteLoop(): never {
//     while (true) {
//     }
// }

// It runs forever and never returns.