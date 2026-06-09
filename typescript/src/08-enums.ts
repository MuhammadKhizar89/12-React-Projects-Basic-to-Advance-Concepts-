// Enums - a set of named constants

// Numeric Enum (default behavior)
enum Size {
    Small,      // 0
    Medium,     // 1
    Large       // 2
}

let size: Size = Size.Medium;
console.log(size); // Output: 1

// Custom numeric values
enum StatusCode {
    NotFound = 404,
    InternalError = 500,
    OK = 200
}

// String Enum
enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Pending = "PENDING"
}

let status: Status = Status.Active;
console.log(status); // Output: "ACTIVE"

// Heterogeneous Enum (mixing string and number)
enum Mixed {
    Yes = 1,
    No = "NO"
}

// Enum with computed values
enum Direction {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4
}

// Reverse mapping (for numeric enums)
enum NumericEnum {
    First = 1,
    Second = 2
}
console.log(NumericEnum[1]); // Output: "First"
console.log(NumericEnum.First); // Output: 1

// Practical use case
enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

function makeRequest(method: HTTPMethod) {
    console.log(`Making ${method} request`);
}

makeRequest(HTTPMethod.GET);
