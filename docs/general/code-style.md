---
sidebar_position: 1
---
# Code style

- naming convention
    - Always use whole word, no abbreviation
    - consistency and homogeneity is key
        - name variables from less to more specific, example : 
            - parentId and not idParent
        - end variable name with "s" for arrays
        - map : specify key and value seperated by "To", example
            - parentIdToChildren for `Map<string, string[]>`, not childrenMap
- code style
    - https://github.com/microsoft/TypeScript/wiki/Coding-guidelines
    - always use triple equal ===, except for != null
    - comments (bad vs good comment)
        - TODO and FIXME : always set issue/ticket code
- never use var, use const or let
- use #myVar for private var, not private myVar or _myVar
- prefer pure functions over impure

## Other references :
- Angular code style : https://angular.dev/style-guide