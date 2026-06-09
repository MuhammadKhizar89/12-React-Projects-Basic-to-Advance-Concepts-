// Generics - create reusable components that work with different types
// Generics are heavily used in libraries to provide flexibility

// Basic Generic Function
function CheckType<A, B>(a: A, b: B): [A, B] {
    // return [b, a]; // Error: return type is [A, B] not [B, A]
    return [a, b];
}

console.log(CheckType("Hello", 42)); // Output: ["Hello", 42]
console.log(CheckType(true, 42)); // Output: [true, 42]

// Generic Interface
interface Box<A> {
    value: A;
    key: string;
}

// Specify the type when using the generic
const box: Box<number> = {
    value: 42,
    // value: "Hello", // Error: value is of type number not string
    key: "myKey"
}

// Generic API Response
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

// Generic Type Alias
type MyType<T> = "abc" | "def" | T;
let myValue: MyType<number> = 2; // myValue can be "abc", "def", or any number

// Real-world example: extending generic with specific type
interface DefaultResponse extends APIResponse<string> {
    mk: string;
    // this is how we can extend a generic interface with a specific type
}

const defaultResponse: DefaultResponse = {
    data: "Success",
    status: 200,
    mk: "abc"
}

// Generic with constraints
function merge<T, U extends T>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

// Multiple generic types
type Pair<A, B> = {
    first: A;
    second: B;
}

const pair: Pair<string, number> = {
    first: "hello",
    second: 42
}

// Real-world hook pattern with Generics
interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
    // This is a mock implementation of a fetch hook
    // In a real implementation, you would use the Fetch API or a library like Axios
    return {
        data: null,
        loading: true,
        error: null
    };
}

// Using the generic hook
const userResponse = useFetch<{ name: string; age: number }>("https://api.example.com/user/1");
// userResponse.data will have type { name: string; age: number } | null

// Generic Array helper
function getFirstElement<T>(arr: T[]): T|undefined {
    return arr[0];
}

const firstString = getFirstElement<string>(["hello", "world"]);
const firstNumber = getFirstElement<number>([1, 2, 3]);

// Generic class
class Stack<T> {
    private items: T[] = [];
    
    push(item: T) {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // Output: 2
