let abc: "my" | "Hello, World!" = "Hello, World!";

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
// this is called literal types bcoz we are using literally values as types not any primitive types like string or number but specific values as types
type types = "abc" | "def";

type User = {
    name: string;
    age: number;
    type: types;
}
let user: User = {
    name: "John",
    age: 30, type: "abc"
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

let newValue: unknown = "Hello";
// console.log(newValue.toUpperCase());// Error: Object is of type 'unknown'.
if (typeof newValue === "string") {
    console.log(newValue.toUpperCase()); // OK
}

let res: any = "12";
console.log((res as string).toLowerCase()); // so i am telling the compiler that this is string

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

// The function never reaches the end, so it never returns a value.

// function infiniteLoop(): never {
//     while (true) {
//     }
// }

// It runs forever and never returns.


type thisnotwork = "alice" | "bob";
// class thisNotWork implements thisnotwork {
// This will cause an error because a class cannot implement a union type of string literals.
// The class must implement an interface or a type that describes an object structure, not a union of string literals.
// To fix this, you can define an interface that includes the properties you want and then implement that interface in the class.
// }

type thisalsoworks = {
    name: string;
    age: number;
    email: string;
    type: "abc" | "def";
}
class ThisAlsoWorks implements thisalsoworks {
    name = "John";
    age = 30;
    email = "a";
    type: "abc" | "def" = "abc";
}

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

// union operator | is used to combine multiple types into one. It allows a variable to hold values of different types. For example:
// let value: string | number;
// value = "Hello";
// koi bhi aik ho tou kaam chly ga

// intersection operator & is used to combine multiple types into one. It creates a new type that has all the properties of the combined types. For example:
type A = { name: string };
type B = { age: number };
type C = A & B;
// dono zaruri hn

let user1: C = {
    name: "John",
    age: 30
}

type D = {
    name: string;
    age?: number;
}

let user2: D = {
    name: "Alice"
    // age is optional
}
// ? ka matlab value hogi ya ni bhi hogi but undefined matlab key lazmi hogi but value ho bhi sakti hai aur na bhi
console.log(user2.age); // Output: undefined

type E = {
    readonly name: string;
    age: number | undefined;
}
const user3: E = {
    name: "Bob",
    age: 25
}
// user3.name = "Alice"; // Error: Cannot assign to 'name' because it is a read-only property.


let obj = {
    name: "John",
    age: 30
}
obj = {
    name: "Alice",
    age: 25
} // this is allowed because obj is not a constant, we can reassign it to a new object. However, if we had declared obj as const, we would not be able to reassign it to a new object.
obj.name = "Bob";


type less = {
    name: string;
}

const more = {
    name: "Bob",
    age: 30
}
const user4: less = more
// less may more values agai but ts may yh acceptable hy
// console.log(user4.age);

function checker(entity: Partial<User>) {
    // partial makes all properties of the type optional, so we can pass an object that has only some of the properties of User.
}

const user8: Partial<User> = {
    age: 30
}


type optionalAll = {
    name?: string;
    age?: number;
}
function requiredChecker(entity: Required<optionalAll>) {
    // required makes all properties of the type required,even if they are marked as optional in the original type, so we cannot pass an object that has only some of the properties of Person.
}
requiredChecker({
    name: "John",
    age: 30
})

type anotherType = Pick<User, "name" | "age">;
// pick allows us to create a new type by picking a set of properties from an existing type. In this case, we are creating a new type anotherType that has only the name and age properties from the User type.
let user5: anotherType = {
    name: "John",
    age: 30
};

type omitType = Omit<User, "email">;
// omit allows us to create a new type by omitting a set of properties from an existing type. In this case, we are creating a new type omitType that has all the properties of the User type except for the email property.
let user6: omitType = {
    age: 30,
    name: "John",
    type: "abc"
}

// tuple
let tuple: [string, number] = ["Hello", 42];

let namedTuple: [name: string, age: number] = ["Alice", 30];
namedTuple.push(25); // This is allowed, bcoz tuple now is like Array<string|number>
console.log(namedTuple); // Output: ["Alice", 30, 25]
// tuple with optional elements
let optionalTuple: readonly [string, number?] = ["Hello"]; // age is optional
// optionalTuple[0] = "42"; //error
// optionalTuple.push(25); // error readonly tuple cannot be modified

// enum
enum Size {
    Small,
    Medium,
    Large
}
let size: Size = Size.Medium;
console.log(size); // Output: 1

enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Pending = "PENDING"
}
let status: Status = Status.Active;
console.log(status); // Output: ACTIVE

class abcs {
    name: string;
    readonly age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

type testingType = {
    add: (a: number, b: number) => number; //methods in simple js
    abc(price: number): string; // method in class syntax
    //   (a: number, b: number): number;
}
let test: testingType = {
    add: (a: number, b: number) => {
        return a + b;
    },
    abc: (price: number) => {
        return `The price is ${price}`;
    }
}

// interface just objects k structure ko define krta hai but type alias kisi bhi type ko define kr skta hai like primitive types, union types, intersection types, tuples, and more.



// interface vs type 
// interface is used to define the structure of an object, while type is used to define a type alias for a primitive type, union type, intersection type, tuple, or any other type.
// interface can be extended using the extends keyword, while type cannot be extended but can be intersected using the & operator.
// interface can only describe object types, while type can describe any type, including primitive types, union types, intersection types, tuples, and more.
// interface can be implemented by classes using the implements keyword, while type cannot be implemented by classes.



// foe key value thing
interface KeyValue {
    [key: string]: string;
}
const keyValue: KeyValue = {
    name: "John",
    "key": "value",
    2:"233" // this is also allowed because in js object keys can be string or number but in ts we are defining it as string so number will be converted to string
}

// merging interface
interface test {
    name: string;
}
interface test {
    age: number;
}
const testObj: test = {
    name: "John",
    age: 30
}
// kahi bhi test interface defien kr do tou vo add the end add ho jay gi us ki properties

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
    email: "    ",
}

// Generics -> Generics allow us to create reusable components that can work with different types.
// Used in libraries
                  //defining A,B can be anything
function CheckType<A,B>(a: A, b: B): [A, B] {
//  return [b, a]; error bcoz return type is [A,B] not [B,A]
    return [a, b];
}
console.log(CheckType("Hello", 42)); // Output: ["Hello", 42]
console.log(CheckType(true, 42)); // Output: [true, 42]

interface Box<A>{
    value: A;
    key: string;
}
// so interfae ki types ko bhi khud later decide kr skty hn
const box: Box<number> = {
    value: 42,
    // value: "Hello", error bcoz value is of type number not string
    key: "myKey"
}

interface APIResponse<T> {
    data: T;
    status: number;
    error?: string;
}

const response: APIResponse<{ name: string; age: number }> = {
    data: {
        name: "John",
        age: 30
    },
    status: 200
}

type abc<T>= "abc"| "def"| T;
let abcValue: abc<number> = 2; // abcValue can be "abc", "def", or any number type

// const response:AxiosResponse<User>=await axios.get("https://api.example.com/user/1")
// so now response.data will be of type User, and other things like status will be coming from AxiosResponse type itself

let v="a";
//v=1; // this is allowed because v is of type string | number, so it can hold either a string or a number.


interface defaultResponse extends APIResponse<string> {
    mk: string;
    // this is how we can extend a generic interface with a specific type
}
const defaultResponse: defaultResponse = {
    data: "Success",
    status: 200,
    mk: "abc"
}


interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
function useFetch<T>(url: string): FetchState<T> {
    // This is a mock implementation of a fetch hook that returns a FetchState object with the specified type T.
    // In a real implementation, you would use the Fetch API or a library like Axios to fetch data from the specified URL and update the state accordingly.
    return {
        data: null,
        loading: true,
        error: null
    };
}
useFetch<{ name: string; age: number }>("https://api.example.com/user/1");