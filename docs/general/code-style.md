---
sidebar_position: 1
---

# Code style

On top of the [Angular official coding style guide](https://angular.dev/style-guide), you should comply with the following guidelines.

## General

**Be** consistent.

**Prefer** clarity over short code.

**Be** explicit.

**Do not** repeat yourself.

## Naming

- Use PascalCase for enum, class, type and interface names.
- Do not prefix interface with `I`.
- Do not prefix enum with `E`.
- Use camelCase for variable and method names.
- Prefer whole words in names, no abbreviation.
- Prefix private properties with `#`, examples:
    - ❌ `_myVar`
    - ❌ `private myVar`
    - ✅ `#myVar`
- Use plural form in names for iterables (array, set, ...), examples:
    - ❌ `userList = getUserArray()`
    - ✅ `users = getUsers()`
- Avoid ambiguity:
    - ❌ `id: number` (unclear if referring to a user or company ID)
    - ✅ `userId: number`
    - ✅ `companyId: number`
- Structure variable names to reflect ownership, ending with the specific value, examples:
    - ❌ `idUser: number`
    - ✅ `userId: number`
    - ❌ `nameOfManagerInCompanyDepartment: string`
    - ✅ `companyDepartmentManagerName: string`
- For Maps, specify the name of the key and then the value, seperating them with "To", examples:
    - ❌ `usersMap: Map<number, User>` (unclear what the key and value are)
    - ✅ `userIdToManager: Map<number, User>`
    - ✅ `companyIdToUsers for Map<number, User[]>`

## Code

- Never use `var`, use `const` by default and `let` if necessary.
- Use triple equals (`===` and `!==`), never doubles (`==` and `!=`).
    - exception: comparing to `null` or `undefined`.
- Use single quotes for string.
- Use template literals for string interpolation, examples:
    - ❌ `'I am ' + age + 'years old.'` 
    - ✅ `` `I am ${age} years old.` `` 
- Use arrow function `(a: number) => { }` over anonymous function `function(a: number) {}`.
- Prefer [pure](https://en.wikipedia.org/wiki/Pure_function) functions over impure.

## Comments

- Comments should explain _why_, not _how_.
- `TODO` and `FIXME` comments must include a reference to the task that will address them, examples:
    - ❌ `// TODO improve performance`
    - ✅ `// TODO #2831: improve performance` (GitHub issue or Jira ticket)
