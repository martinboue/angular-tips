---
sidebar_position: 2
---
# File structure

- file structure (shared/core/pages or features)
    - prefer grouping files in same folder by features rather than type (service, pipe, ...)

A typical Angular project should look like this:

```
<project root>
├── public
├── src
│   ├── app
│   │   ├── core
│   │   ├── features
│   │   ├── shared
│   │   └── ...
│   ├── environments
│   ├── index.html
│   ├── styles.scss
│   └── ...
├── angular.json
├── package.json
└── ...
```

## `core` folder

Examples:
- navigation bar
- sidemenu
- app layout
- ...

## `features`

```
features
├── a
|   └── feature-a.component.ts
├── feature-b
|   ├── b1
|   |   └── b1.component.ts
|   ├── b2
|   |   └── b2.component.ts
|   └── b.routes.ts
└── ...
```

example :
```

```


## `shared` folder

Examples:
- Reusable components, like:
    - An input to select one or multiple file
    - A block of form fields to type an address
    - A user card
    - A dialog to confirm before deleting something
    - ...
- common services, pipes, directives, ...
