---
sidebar_position: 2
---
# Folder structure

This page is your roadmap to a well-organized Angular project, showing you how to structure your folders for scalability and readability.

## General guidelines

**Consider** grouping files in folders by domain-specific (business feature) rather than technical type (components, services, ...).

**Consider** structuring the file tree as close as possible to the routing and navigation in the application.

## Project structure

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

with 3 main folders inside `src/app`:
- [`core` folder](#core-folder)
- [`features` folder](#features-folder)
- [`shared` folder](#shared-folder)

### `core` folder

This folder should contain global components, services, interceptors and more, usually all the things that should be instantiated once.

```txt title="✅ Example"
core
├── authentication
|   └── authentication.service.ts
├── layout
|   ├── nav-bar
|   |   └── nav-bar.component.ts
|   ├── page-layout
|   |   └── page-layout.component.ts
|   └── ...
├── interceptors
|   ├── error-handler.interceptor.ts
|   └── ...
└── ...
```

### `features` folder

This folder should contain domain-specific files divided in feature folders. Each feature folder can contains multiple components but also services, state management and more, but all should be related to the same feature.

A feature folder can be as deep as needed and have feature sub-folders, sub-sub-folders, etc.

A feature folder with more than one route should have a dedicated `<feature>.routes.ts` file (see [lazy loading](../routing.md)).

```txt title="✅ Example"
features
├── dashboard
|   └── dashboard.component.ts
├── blog
|   ├── post
|   |   └── blog-post.component.ts
|   ├── feed
|   |   └── blog-feed.component.ts
|   └── blog.routes.ts
└── ...
```

**Avoid** importing files from `core` folder into the `features` folder.

### `shared` folder

This folder should contain reusable components, services, directives and more, that are shared accross multiple features.

Because many files in this folder are generics, i.e. not related to any feature, you can organize them by technical types. Other feature related files can be grouped together in feature folders.

```txt title="✅ Example"
shared
├── components
|   ├── form
|   |   ├── color-picker
|   |   ├── search-bar
|   |   ├── input-file
|   |   └── ...
|   ├── confirm-dialog
|   └── ...
├── directives
├── models
├── pipes
├── services
|   ├── i18n.service.ts
|   └── ...
└── ...
```

**Avoid** importing files from `core` or `features` folders into the `shared` folder.

## Going further
This folder structure is a strong starting point, but for very large codebase, you may need to adapt a more complex and strict structure to keep your project maintainable.

For example, you can check out the [Feature Sliced Design methodology](https://feature-sliced.github.io/documentation/), which is a more advanced approach of the folder structure described above.
