---
sidebar_position: 7
---
# Typing

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
