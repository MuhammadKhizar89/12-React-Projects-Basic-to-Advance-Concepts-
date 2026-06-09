"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let abc = "Hello, World!";
function greet(msg) {
    // if something not comming then this is undefined
    if (msg === undefined) {
        console.log(msg);
    }
    else {
        console.log(abc);
    }
}
let aabc;
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
function serve(entity) {
    if (entity instanceof Person) {
        console.log("Serving a person...");
    }
    else if (entity instanceof Animal) {
        console.log("Serving an animal...");
    }
    entity.serve();
}
let user = {
    name: "John",
    age: 30, type: "abc"
};
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
let newValue = "Hello";
// console.log(newValue.toUpperCase());// Error: Object is of type 'unknown'.
if (typeof newValue === "string") {
    console.log(newValue.toUpperCase()); // OK
}
let res = "12";
console.log(res.toLowerCase()); // so i am telling the compiler that this is string
let bookString = '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925}';
let book = JSON.parse(bookString); // Type assertion to tell the compiler that the parsed object is of type Book
console.log(book.title); // Output: The Great Gatsby
let num = "4s2";
console.log(Number(num)); // Output: 42
class ThisAlsoWorks {
    name = "John";
    age = 30;
    email = "a";
    type = "abc";
}
class UserAgain {
    name = "John";
    age = 30;
    email = "a";
    type = "abc";
}
// dono zaruri hn
let user1 = {
    name: "John",
    age: 30
};
let user2 = {
    name: "Alice"
    // age is optional
};
// ? ka matlab value hogi ya ni bhi hogi but undefined matlab key lazmi hogi but value ho bhi sakti hai aur na bhi
console.log(user2.age); // Output: undefined
const user3 = {
    name: "Bob",
    age: 25
};
// user3.name = "Alice"; // Error: Cannot assign to 'name' because it is a read-only property.
let obj = {
    name: "John",
    age: 30
};
obj = {
    name: "Alice",
    age: 25
}; // this is allowed because obj is not a constant, we can reassign it to a new object. However, if we had declared obj as const, we would not be able to reassign it to a new object.
obj.name = "Bob";
const more = {
    name: "Bob",
    age: 30
};
const user4 = more;
// less may more values agai but ts may yh acceptable hy
// console.log(user4.age);
function checker(entity) {
    // partial makes all properties of the type optional, so we can pass an object that has only some of the properties of User.
}
const user8 = {
    age: 30
};
function requiredChecker(entity) {
    // required makes all properties of the type required,even if they are marked as optional in the original type, so we cannot pass an object that has only some of the properties of Person.
}
requiredChecker({
    name: "John",
    age: 30
});
// pick allows us to create a new type by picking a set of properties from an existing type. In this case, we are creating a new type anotherType that has only the name and age properties from the User type.
let user5 = {
    name: "John",
    age: 30
};
// omit allows us to create a new type by omitting a set of properties from an existing type. In this case, we are creating a new type omitType that has all the properties of the User type except for the email property.
let user6 = {
    age: 30,
    name: "John",
    type: "abc"
};
// tuple
let tuple = ["Hello", 42];
let namedTuple = ["Alice", 30];
namedTuple.push(25); // This is allowed, bcoz tuple now is like Array<string|number>
console.log(namedTuple); // Output: ["Alice", 30, 25]
// tuple with optional elements
let optionalTuple = ["Hello"]; // age is optional
// optionalTuple[0] = "42"; //error
// optionalTuple.push(25); // error readonly tuple cannot be modified
// enum
var Size;
(function (Size) {
    Size[Size["Small"] = 0] = "Small";
    Size[Size["Medium"] = 1] = "Medium";
    Size[Size["Large"] = 2] = "Large";
})(Size || (Size = {}));
let size = Size.Medium;
console.log(size); // Output: 1
//# sourceMappingURL=index.js.map