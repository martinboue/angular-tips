---
sidebar_position: 1
---

# Code style
- naming convention
    - name variables from less to more specific, example : 
        - parentId and not idParent
    - map : specify key and value seperated by "To", example
        - parentIdToChildren for `Map<string, string[]>`, not childrenMap

## General guidelines

**Be** consistent.

**Prefer** clarity over short code.

**Do not** repeat information.


## Guidelines

On top of [Angular official coding style guide](https://angular.dev/style-guide), you should comply with the following guidelines.

### Naming

- Use PascalCase for enum, class, type and interface names.
- Do not prefix interface with `I`.
- Do not prefix enum with `E`.
- Use camelCase for variable and method names.
- Prefer whole words in names, no abbreviation.
- Prefix private properties with `#`, examples:
    - bad: `_myVar`
    - bad: `private myVar`
    - good: `#myVar`
- Use plural form in names for iterables (array, set, ...), examples:
    - bad: `userList = getUserArray()`
    - good: `users = getUsers()`

### Code

- Never use `var`, use `const` by default and `let` if necessary.
- Use triple equals (`===` and `!==`), never doubles (`==` and `!=`).
    - exception: comparing to `null` or `undefined`.
- Use single quotes for string.
- Use template literals for string interpolation, examples:
    - bad: `'I am ' + age + 'years old.'` 
    - good: `` `I am ${age} years old.` `` 
- Use arrow function `(a: number) => { }` over anonymous function `function(a: number) {}`.
- Prefer [pure](https://en.wikipedia.org/wiki/Pure_function) functions over impure.

### Comments

- Comments should explain _why_, not _how_.
- `TODO` and `FIXME` comments must have a link to the resolving action (GitHub issue, Jira ticket or other), examples:
    - bad: `// TODO improve performance`
    - good: `// TODO #2831: improve performance`
