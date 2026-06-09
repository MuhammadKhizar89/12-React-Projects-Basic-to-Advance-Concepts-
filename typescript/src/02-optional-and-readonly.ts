// Optional Parameters and Properties
function greet(msg?: string) {
    // if something is not coming, then this is undefined
    if (msg === undefined) {
        console.log(msg);
    } else {
        console.log(msg);
    }
}

let aabc: string | undefined;
greet();

// Optional Properties - property may or may not exist
type OptionalProps = {
    name?: string;
    age?: number;
}

let user2: OptionalProps = {
    name: "Alice"
    // age is optional
}
console.log(user2.age); // Output: undefined

// Readonly Properties - cannot be modified after initialization
type ReadonlyType = {
    readonly name: string;
    age: number | undefined;
}

const user3: ReadonlyType = {
    name: "Bob",
    age: 25
}
// user3.name = "Alice"; // Error: Cannot assign to 'name' because it is a read-only property.

// Object mutability
let obj = {
    name: "John",
    age: 30
}
obj = {
    name: "Alice",
    age: 25
} // this is allowed because obj is not a constant
obj.name = "Bob"; // this is allowed because the property is not readonly
