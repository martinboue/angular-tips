---
sidebar_position: 1
---

# Code style

This page provides additional coding style guidelines on top of the [Angular official coding style guide](https://angular.dev/style-guide), 
focusing on best practices for naming conventions, code clarity, and consistency.

## General

**Be** consistent.

**Prefer** clarity over short code.

**Be** explicit.

**Do not** repeat yourself.

## Naming
**Do** use PascalCase for enum, class, type and interface names, examples:
- ❌ `userProfile`
- ❌ `user_profile`
- ✅ `UserProfile`

**Never** include type indicator in interface names, examples:
- ❌ `IUser`
- ❌ `UserInterface`
- ❌ `UserInt`
- ✅ `User`

**Never** include type indicator in enum names, examples:
- ❌ `EUserStatus`
- ❌ `UserStatusEnum`
- ✅ `UserStatus`

**Do** use camelCase for variable and method names, examples:
- ❌ `my_var`
- ✅ `myVar`
- ❌ `MyMethod()`
- ✅ `myMethod()`

**Prefer** whole words in names, no abbreviation.

**Do** prefix private properties with `#`, examples:
- ❌ `_myVar`
- ❌ `private myVar`
- ✅ `#myVar`

**Do** use plural form in names for iterables (array, set, ...), examples:
- ❌ `userList = getUserArray()`
- ✅ `users = getUsers()`

**Avoid** ambiguity, examples:
- ❌ `id: number` (unclear if referring to a user or company ID)
- ✅ `userId: number`
- ✅ `companyId: number`

**Do** structure variable names to reflect ownership, ending with the specific value, examples:
- ❌ `idUser: number`
- ✅ `userId: number`
- ❌ `nameOfManagerInCompanyDepartment: string`
- ✅ `companyDepartmentManagerName: string`

**Do**, for maps, specify the name of the key and then the value, seperating them with "To", examples:
- ❌ `usersMap: Map<number, User>` (unclear what the key and value are)
- ✅ `userIdToManager: Map<number, User>`
- ✅ `companyIdToUsers: Map<number, User[]>`

## Code

**Never** use `var`, use `const` by default and `let` if necessary, examples:
- ❌ `var a = 1`
- ✅ `const a = 1`
- ✅ `let a = 1`

**Do** use triple equals over doubles, examples:
- ❌ `a == b`
- ✅ `a === b`
- ❌ `a != b`
- ✅ `a !== b`
- exception: comparing to `null` or `undefined`.

**Do** use single quotes for string, examples:
- ❌ `"some text"`
- ✅ `'some text'`

**Do** use template literals for string interpolation, examples:
- ❌ `'I am ' + age + 'years old.'` 
- ✅ `` `I am ${age} years old.` `` 

**Do** use arrow function  over anonymous function, examples:
- ❌ `function() {...}`
- ✅ `() => {...}`

**Prefer** [pure](https://en.wikipedia.org/wiki/Pure_function) functions over impure.

## Comments

**Do** ensure comments explain _why_, not _how_.

**Do** include a reference to the task in `TODO` and `FIXME` comments, examples:
- ❌ `// TODO improve performance`
- ✅ `// TODO #2831: improve performance` (GitHub issue or Jira ticket)
