// Type Assertions - telling the compiler what type something is
let res: any = "12";
console.log((res as string).toLowerCase()); // Type assertion using 'as' keyword

// any type
// TypeScript stops checking when using 'any'
// let value: any = "Hello";
// value.toUpperCase(); // OK at compile time
// value.foo.bar();     // Also OK at compile time
// Problem: let value: any = 123;
//          value.toUpperCase(); // Runtime error! TypeScript doesn't warn you

// unknown type - safer than any
// TypeScript says: "I don't know the type yet, so prove it before using it."
// let value: unknown = "Hello";
// value.toUpperCase(); // Error: Object is of type 'unknown'.
// You must narrow the type first:
// if (typeof value === "string") {
//     console.log(value.toUpperCase()); // OK
// }

// Practical example: JSON.parse returns unknown/any
type Book = {
    title: string;
    author: string;
    year: number;
}

let bookString = '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925}';
let book = JSON.parse(bookString) as Book; // Type assertion to tell the compiler that the parsed object is of type Book
console.log(book.title); // Output: The Great Gatsby

let num = "4s2";
console.log(Number(num)); // Output: 42

// never type - the function never returns
// function infiniteLoop(): never {
//     while (true) {
//     }
// }
// The function runs forever and never returns.
