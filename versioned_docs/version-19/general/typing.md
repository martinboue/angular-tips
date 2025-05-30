---
sidebar_position: 3
---
# Typing

Typing is a fundamental aspect of Angular application that ensures your code is robust, maintainable, and less prone to runtime errors. This guide provides best practices for leveraging TypeScript's type system effectively, helping you write cleaner and safer code. By following these tips, you'll improve the readability and scalability of your projects while catching potential issues early during development.

## General guidelines

**Do** type everything.

:::info Why?
Typing improves readability, scalability and maintanability. Type inconsistencies will be detected at compile time rather than at runtime, before shipping to production.
:::

**Avoid** using `any`.

```ts title="❌ any"
// This code compiles but will throw an error at runtime:
// "Uncaught TypeError: Cannot read properties of undefined (reading 'name')"
const user: any = { name: 'Martin' };
console.log(user.manager.name);
```

```ts title="✅ Proper typing"
// This code fails to compile, it'll show you a friendly error:
// "Property 'manager' does not exist on type 'User'."
interface User {
  name: string;
}
const user: User = { name: 'Martin' };
console.log(user.manager.name);
```

:::info Why?
Using `any` completely bypass type checking, as if there were no type at all.
:::

:::tip
If the type doesn't matter, use `unknown` instead of `any`.
:::

**Do** define an `interface` for structural types, not a `class`.

```ts title="❌ class"
class User {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

```ts title="✅ interface"
interface User {
  id: number;
  name: string;
}
```

**Do** use specific values instead of generic types like `string` or `number`.
- ❌ `status: string`
- ✅ `status: 'active' | 'inactive' | 'pending'`
- ❌ `priority: number`
- ✅ `priority: 1 | 2 | 3`

:::info Why?
Using union types ensures that only specific, predefined values, are allowed, reducing the risk of invalid inputs and improving code clarity.
:::

**Do** use tuple types for fixed-length arrays.

- ❌ `parents: string[]`
- ✅ `parents: [string, string]` for 2 elements
- ✅ `siblings: [string, ...string[]]` for at least 1 element

:::info Why?
Using tuple types ensures that the array has a fixed length and specific types for each element, improving type safety and reducing potential errors.
:::

## Null safety

JavaScript has two special values: `null` and `undefined`. When strict null checks are enabled (see [TypeScript configuration](#typescript-configuration)), `null` and `undefined` are not assignable to any type unless explicitly specified. 

- ❌ `name: string = null` does not compile
- ✅ `name: string | null = null` compiles

:::tip
You should use this feature to prevent "Null Pointer Exceptions" at runtime. TypeScript will warn you if you try to access a property of an object that might be `null` or `undefined`. On the other hand, if the object is guaranteed to be non-null, you can safely access its properties without any additional checks.
:::

:::note
No preferences for `null` or `undefined` in TypeScript, but be consistent in your codebase.
:::

**Avoid** unnecessary `null` and `undefined` types.

- ❌ `status: Status | null = 'pending'`
- ❌ `status: Status | undefined = 'pending'`
- ❌ `status?: Status = 'pending'`
- ✅ `status: Status = 'pending'`

:::info Why?
Excessive use of optional types can lead to unnecessary code to handle `null` or `undefined` cases that will never occur. Or, it may also encourage developers to bypass the optional typing (using `name!`) which lead to runtime errors if a `null` case does occur.
:::

**Do** use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).
- ✅ `user?.manager?.name`

**Do** use [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).
- ✅ `name ?? 'Default name'`

**Do** use [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-).
- ✅ `user!.name`

:::warning
Use the non-null assertion operator with caution. It tells TypeScript to ignore the possibility of `null` or `undefined`, but it can still lead to runtime errors if you're not careful and the value is actually `null` or `undefined`.

Use it only when you're absolutely sure that the value will never be `null` or `undefined` in your specific case.
:::

## TypeScript configuration

**Do** use the following compiler options in your [TypeScript configuration](https://www.typescriptlang.org/tsconfig/) file:

```json title="✅ tsconfig.json"
{
  ...
  "compilerOptions": {
    ...
    "strict": true,
    "allowUnreachableCode": false,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Do** use import aliases.

```ts title="❌ user.component.ts"
import { ManagerComponent } from '../../../../shared/manager/manager.component';
````

```json title="✅ tsconfig.json"
{
  ...
  "compilerOptions": {
    ...
    "baseUrl" : "./src",
    "paths": {
      "@shared/*": ["app/shared/*"],
      "@features/*": ["app/features/*"],
      "@core/*": ["app/core/*"]
    }
  }
}
```

```ts title="✅ user.component.ts"
import { ManagerComponent } from '@shared/manager/manager.component';
````

:::info Why?
Using import aliases improves code readability and reduces the number of import paths to be modified when moving files.
:::
