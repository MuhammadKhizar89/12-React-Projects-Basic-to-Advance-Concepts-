# TypeScript Concepts - Organized Learning Guide

Your `index.ts` file has been reorganized into concept-based files for better learning and maintainability.

## File Structure

### 01-literals-and-unions.ts
Covers type narrowing fundamentals
- Literal types (specific values as types)
- Union types (multiple possible types)
- Type guards (instanceof, typeof)

### 02-optional-and-readonly.ts
Property modifiers and flexibility
- Optional parameters (`?`)
- Optional properties (`?`)
- Readonly properties
- Object mutability concepts

### 03-type-assertions.ts
Working with unknown types
- Type assertions (`as` keyword)
- `any` type and its problems
- `unknown` type (safer alternative)
- `never` type

### 04-interfaces-and-types.ts
Object structure definition
- Type aliases vs interfaces
- Structural/duck typing
- Interface merging
- Interface extension
- Intersection types (`&`)

### 05-utility-types.ts
Built-in type transformations
- `Partial<T>` - make all properties optional
- `Required<T>` - make all properties required
- `Pick<T>` - select specific properties
- `Omit<T>` - exclude specific properties
- `Record<K, T>` - create objects with specific keys
- `Readonly<T>` - make all properties immutable

### 06-classes.ts
Object-oriented programming with TypeScript
- Basic class syntax
- Constructor and properties
- Implementing types/interfaces
- Access modifiers
- Method definitions

### 07-tuples.ts
Fixed-structure arrays
- Fixed-length arrays with specific types
- Named tuple elements
- Optional elements
- Readonly tuples
- Variable-length tuples

### 08-enums.ts
Enumerated types for named constants
- Numeric enums
- String enums
- Heterogeneous enums
- Reverse mapping
- Custom values

### 09-generics.ts
Reusable components with type parameters
- Generic functions
- Generic interfaces
- Generic types
- Generic classes
- Real-world patterns (API responses, hooks, etc.)

## Learning Path

1. Start with **literals-and-unions** - understand basic type narrowing
2. Learn **optional-and-readonly** - control property flexibility
3. Study **type-assertions** - handle unknown types safely
4. Explore **interfaces-and-types** - structure your data
5. Master **utility-types** - transform types elegantly
6. Implement **classes** - write OOP code with types
7. Use **tuples** - create structured arrays
8. Organize code with **enums** - named constants
9. Build reusable code with **generics** - the power tool

## Usage

You can import concepts individually:
```typescript
import { User } from './04-interfaces-and-types';
import { Partial } from './05-utility-types';
```

Or import everything via the guide:
```typescript
import * from './index-guide';
```
