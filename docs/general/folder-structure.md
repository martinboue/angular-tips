---
sidebar_position: 2
---
# Folder structure

Folder structure refers to *how* files and directories are organized within a project. A well-designed methodology helps developers navigate the codebase efficiently and, above all, keeps the project understandable and maintanable as it grows. It provides a clear separation of concerns, making it easier to locate, update, and manage different parts of the application.

## General guidelines

**Consider** grouping files in folders by domain-specific (business feature) rather than technical type (components, services, ...).

**Consider** structuring the file tree as close as possible to the routing and navigation in the application.

**Do** rename folders to avoid redundancy in path.
- ❌ `blog/blog-post/blog-post.ts`
- ✅ `blog/post/blog-post.ts`
- ❌ `admin/admin-dashboard/admin-dashboard-settings/admin-dashboard-settings.ts`
- ✅ `admin/dashboard/settings/admin-dashboard-settings.ts`

## Project structure

A typical Angular project should look like this:

```txt title="✅ Project structure"
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

```txt title="✅ core folder"
core
├── auth
|   └── auth.ts
├── layout
|   ├── nav-bar
|   |   └── nav-bar.ts
|   ├── page-layout
|   |   └── page-layout.ts
|   └── ...
├── interceptors
|   ├── error-handler-interceptor.ts
|   └── ...
└── ...
```

### `features` folder

This folder should contain domain-specific files divided in feature folders. Each feature folder can contains multiple components but also services, state management and more, but all should be related to the same feature.

A feature folder can be as deep as needed and have feature sub-folders, sub-sub-folders, etc.

A feature folder with more than one route should have a dedicated `<feature>.routes.ts` file (see [lazy loading](../routing.md)).

```txt title="✅ features folder"
features
├── dashboard
|   └── dashboard-page.ts
├── blog
|   ├── post
|   |   └── blog-post-page.ts
|   ├── feed
|   |   └── blog-feed-page.ts
|   └── blog.routes.ts
└── ...
```

**Avoid** importing files from `core` folder into the `features` folder.

### `shared` folder

This folder should contain reusable components, services, directives and more, that are shared accross multiple features.

Because many files in this folder are generics, i.e. not related to any feature, you can organize them by technical types. Other feature related files can be grouped together in feature folders.

```txt title="✅ shared folder"
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
|   ├── i18n.ts
|   └── ...
└── ...
```

**Avoid** importing files from `core` or `features` folders into the `shared` folder.

## Going further
This folder structure is a strong starting point, but for very large codebase, you may need to adapt a more complex and strict structure to keep your project maintainable.

For example, you can check out the [Feature Sliced Design methodology](https://feature-sliced.github.io/documentation/), which is a more advanced approach of the folder structure described above.
