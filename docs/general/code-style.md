---
sidebar_position: 1
---

# Code style

This page provides additional coding style guidelines on top of the [Angular official coding style guide](https://angular.dev/style-guide), 
focusing on best practices for naming conventions, code clarity, and consistency.

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

**Do**, for maps, specify the name of the key and then the value, seperating them with "To".
- ❌ `usersMap: Map<number, User>` (unclear what the key and value are)
- ✅ `userIdToManager: Map<number, User>`
- ✅ `companyIdToUsers: Map<number, User[]>`

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

**Do** use single quotes for string.
- ❌ `"some text"`
- ✅ `'some text'`

**Do** use template literals for string interpolation.
- ❌ `'I am ' + age + 'years old.'` 
- ✅ `` `I am ${age} years old.` `` 

**Do** use arrow function  over anonymous function.
- ❌ `function() {...}`
- ✅ `() => {...}`

**Consider** using [pure](https://en.wikipedia.org/wiki/Pure_function) functions over impure ones.

## Comments

**Do** ensure comments explain _why_, not _how_.

**Do** include a reference to the task in `TODO` and `FIXME` comments.
- ❌ `// TODO improve performance`
- ✅ `// TODO #2831: improve performance` (GitHub issue or Jira ticket)
