---
sidebar_position: 7
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

**Avoid** defining a class for POJO objects.

```ts title="❌ POJO class"
class User {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

```ts title="✅ Interface"
interface User {
  id: number;
  name: string;
}
```

**Avoid** unnecessary `null` and `undefined` types.

- ❌ `user?: User = myUser`
- ❌ `user: User | null = myUser`
- ❌ `user: User | undefined = myUser`
- ✅ `user: User = myUser`

:::info Why?
Excessive use of optional types can lead to unnecessary code to handle `null` or `undefined` cases that will never occur. Or, it may also encourage developers to bypass the optional typing (using `name!`) which lead to runtime errors if a `null` case does occur.
:::

## Typescript configuration

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
