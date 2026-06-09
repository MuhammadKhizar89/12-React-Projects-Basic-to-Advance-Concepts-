// Utility Types - built-in types that help modify existing types

// Original type for examples
type User = {
    name: string;
    age: number;
    email?: string;
    type: "admin" | "user";
}

// Partial<T> - makes all properties optional
function checker(entity: Partial<User>) {
    // partial makes all properties optional
    // we can pass an object that has only some of the properties of User
}

const user8: Partial<User> = {
    age: 30
    // name, email, type are all optional
}

// Required<T> - makes all properties required (even optional ones)
type OptionalAll = {
    name?: string;
    age?: number;
}

function requiredChecker(entity: Required<OptionalAll>) {
    // required makes all properties required
    // we cannot pass an object that has only some of the properties
}

requiredChecker({
    name: "John",
    age: 30
})

// Pick<T, K> - creates a new type by picking specific properties
type AnotherType = Pick<User, "name" | "age">;
// AnotherType only has name and age properties

let user5: AnotherType = {
    name: "John",
    age: 30
};

// Omit<T, K> - creates a new type by omitting specific properties
type OmitType = Omit<User, "email">;
// OmitType has all properties of User except email

let user6: OmitType = {
    age: 30,
    name: "John",
    type: "admin"
}

// Record<K, T> - creates an object type with specific keys
type Status = "active" | "inactive" | "pending";
type StatusConfig = Record<Status, { color: string; label: string }>;

const statusConfig: StatusConfig = {
    active: { color: "green", label: "Active" },
    inactive: { color: "red", label: "Inactive" },
    pending: { color: "yellow", label: "Pending" }
}

// Readonly<T> - makes all properties readonly
type ReadonlyUser = Readonly<User>;
// All properties of ReadonlyUser cannot be modified after creation
