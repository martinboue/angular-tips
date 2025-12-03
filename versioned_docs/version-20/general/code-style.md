---
sidebar_position: 1
---

# Code style

This page covers best practices and common mistakes when writing TypeScript code, focusing on those with the highest impact. It includes naming conventions, code clarity, consistency and more.

The following guidelines are a complement to the [Angular official coding style guide](https://v20.angular.dev/style-guide) that we recommend to read first.

## General guidelines

**Do** maintain consistency.

**Consider** clarity over short code.

**Do** ensure explicitness.

**Avoid** redundancy.

## Naming
**Do** use PascalCase for enum, class, type and interface names.
- ❌ `userProfile`
- ❌ `user_profile`
- ✅ `UserProfile`

**Avoid** including type indicator in interface names.
- ❌ `IUser`
- ❌ `UserInterface`
- ❌ `UserInt`
- ✅ `User`

**Avoid** including type indicator in enum names.
- ❌ `EUserStatus`
- ❌ `UserStatusEnum`
- ✅ `UserStatus`

**Do** use camelCase for variable and method names.
- ❌ `my_var`
- ✅ `myVar`
- ❌ `MyMethod()`
- ✅ `myMethod()`

**Avoid** using abbreviation in names, prefer whole words.
- ❌ `usrCnt`
- ✅ `userCount`

**Do** prefix private properties with `#`.
- ❌ `_myVar`
- ❌ `private myVar`
- ✅ `#myVar`

:::info Why?
`private` is a TypeScript keyword enforced at compile time and removed after compilation, it can be bypassed at runtime, whereas `#` is a JavaScript feature that ensures the property is private at runtime.
:::

:::warning Exceptions
Avoid using `#` if you're targeting browsers that don't natively support them, as the downleveling can impact performance and bundle size.

You're not concerned if you use [Angular's default browserlist](https://v20.angular.dev/reference/versions#browser-support).
:::

**Do** use plural form in names for iterables (array, set, ...).
- ❌ `userList = getUserArray()`
- ✅ `users = getUsers()`

**Avoid** ambiguity.
- ❌ `id: number` (unclear if referring to a user or company ID)
- ✅ `userId: number`
- ✅ `companyId: number`

**Do** structure variable names to reflect ownership, ending with the specific value.
- ❌ `idUser: number`
- ✅ `userId: number`
- ❌ `nameOfManagerInCompanyDepartment: string`
- ✅ `companyDepartmentManagerName: string`

**Consider** starting function and method names with a verb.
- ❌ `user()`
- ✅ `getUser()`

**Do** use common verbs appropriately in function and method names.
- ✅ `get`: return a value, no side effect.
- ✅ `set`: assign a new value to a property, no returned value.
- ✅ `is`/`has`: return a boolean, no side effect.
- ✅ `create`: instantiate a new instance of an object.
- ✅ `delete`: delete an object.
- ✅ `add`: insert one or multiple elements in a collection.
- ✅ `remove`: take one or multiple elements out of a collection.
- ✅ `to`: convert one type to another and return it, no side effect.
- ✅ `toggle`: switch between binary state.

:::info Why?
Following a clear, strict and consitent pattern with function names improves readability and predictability.
Developers will quickly understand a function's purpose without the need to read it's content, avoiding misinterpretation.
:::

**Do** name Maps by combining a description of the key and the value, separated by `To`.
- ❌ `usersMap: Map<number, User>` (unclear what the key and value are)
- ✅ `userIdToManager: Map<number, User>`
- ✅ `companyIdToUsers: Map<number, User[]>`

**Consider** *not* suffixing components, services and directives with their type.
- ❌ `user.component.ts` for `UserComponent` class
- ✅ `user-card.ts` for `UserCard` class
- ❌ `user.service.ts` for `UserService` class
- ✅ `user-http-client.ts` for `UserHttpClient` class
- ❌ `user.directive.ts` for `UserDirective` class
- ✅ `user-popover.ts` for `UserPopover` class

:::info Why?
Suffixes can be used to create files with the same name except for the suffix, discouraging developers to choose an appropriate and meaningful name. Several files may have a similar name even though they don't serve the same purpose at all, making it difficult to understand the differences at a glance.

Removing suffixes encourages proper and more descriptive naming, making file names easier to read and understand.

Note also that Angular is moving towards selectorless components in future releases. The component class name will be used in the template instead of the selector (e.g. `<UserCard/>` instead of `<app-user-card/>`), making the suffix even less relevant.
:::

**Consider** ending the names of routed components with `page`.
- ❌ `user.ts` and `User` class name
- ✅ `user-page.ts` and `UserPage` class name

**Consider** using `-` instead of `.` as a separator for pipes, guards, resolvers and interceptors file names.
- ❌ `kebab-case.pipe.ts`
- ✅ `kebab-case-pipe.ts`
- ❌ `authenticated.guard.ts`
- ✅ `authenticated-guard.ts`
- ❌ `user.resolver.ts`
- ✅ `user-resolver.ts`
- ❌ `error.interceptor.ts`
- ✅ `error-interceptor.ts`

:::info Why?
This is an official Angular recommendations and aligns with Angular's CLI generation (i.e. `ng generate pipe|guard|resolver|interceptor`). It's also consistent with the removal of the suffix mentionned above.
:::

## Code

**Avoid** using `var`, use `const` by default and `let` if necessary.
- ❌ `var a = 1`
- ✅ `const a = 1`
- ✅ `let a = 1`

**Do** use triple equals over doubles.
- ❌ `a == b`
- ✅ `a === b`
- ❌ `a != b`
- ✅ `a !== b`
- exception: comparing to `null` or `undefined`.

:::info Why?
Double equals (`==` and `!=`) performs type coercion, which can lead to unexpected results. For example, `0 == '0'` is true, but `0 === '0'` is false.
Using triple equals ensures both value and type are compared, preventing implicit and unexpected type conversion.
:::

**Do** use single quotes for string.
- ❌ `"some text"`
- ✅ `'some text'`

**Do** use template literals for string interpolation.
- ❌ `'I am ' + age + 'years old.'` 
- ✅ `` `I am ${age} years old.` `` 

**Do** use arrow function  over anonymous function.
- ❌ `function() {...}`
- ✅ `() => {...}`

:::info Why?
Arrow functions are more concise and do not bind their own `this`, avoiding common pitfalls with context binding in JavaScript.
:::

**Consider** using [pure](https://en.wikipedia.org/wiki/Pure_function) functions over impure ones.

:::info Why?
Pure functions are easier to test, reason about and debug. They always produce the same output for the same input and have no side effects, making them predictable and reliable.
:::

## Comments

**Do** ensure comments explain _why_, not _how_.

**Do** include a reference to the task in `TODO` and `FIXME` comments.
- ❌ `// TODO improve performance`
- ✅ `// TODO #2831: improve performance` (GitHub issue or Jira ticket)

## Going further

For a more in-depth guide, we recommend the following additional resources:
- [TypeScript style guide by Google](https://google.github.io/styleguide/tsguide.html)
- [Airbnb JavaScript code guide](https://github.com/airbnb/javascript)
- [TypeScript coding guidelines for TypeScript contributors](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)
