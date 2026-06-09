// Tuples - arrays with fixed length and specific types at each position

// Basic Tuple
let tuple: [string, number] = ["Hello", 42];

// Named Tuple Elements
let namedTuple: [name: string, age: number] = ["Alice", 30];

// Tuples are actually arrays under the hood
namedTuple.push(25); // This is allowed
console.log(namedTuple); // Output: ["Alice", 30, 25]

// Optional Tuple Elements
let optionalTuple: readonly [string, number?] = ["Hello"]; // age is optional
// optionalTuple[0] = "42"; // error - readonly
// optionalTuple.push(25); // error - readonly tuple cannot be modified

// Readonly Tuple - elements cannot be modified
let readonlyTuple: readonly [string, number] = ["Hello", 42];
// readonlyTuple[0] = "World"; // Error: cannot modify readonly tuple
// readonlyTuple.push(25); // Error: cannot modify readonly tuple

// Variable Length Tuple (using spread operator)
let variableTuple: [string, ...number[]] = ["hello", 1, 2, 3];

// Practical use case - return multiple values from a function
function getUserInfo(): [string, number, boolean] {
    return ["John", 30, true];
}

const [name, age, isActive] = getUserInfo();
