### 1. var, let, and const
`var` is the older way to declare variables; it does not respect block scope and can lead to unintended bugs. `let` is the modern replacement and allows reassignment. `const` is used when the variable's value should remain unchanged.

### 2. Spread operator (...)
The spread operator "expands" elements from an array or object. For example, to copy an array or merge two arrays, you can use `[...arr1, ...arr2]`. It works similarly with objects.

### 3. map() vs filter() vs forEach()
- `map()` loops through an array and returns a new array with transformed elements.
- `filter()` loops and returns a new array containing only elements that meet a specified condition.
- `forEach()` simply iterates over the array but does not return anything.

### 4. Arrow functions
Arrow functions offer a shorter syntax for writing functions. For instance, `const add = (a, b) => a + b` replaces `function add(a, b) { return a + b; }`. Additionally, they handle the `this` keyword differently than traditional functions.

### 5. Template literals
Template literals use backticks (`` ` ``) and `${}` for embedding expressions, e.g., `` `Hello ${name}!` `` instead of `"Hello " + name + "!"`. They also allow for multi-line strings without special characters.