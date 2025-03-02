---
sidebar_position: 2
---
# Folder structure


## General guidelines

**Prefer** grouping files in folders by domain-specific (business feature) rather than technical type (components, services, ...).

**Prefer** a file tree structure as close as possible to the routing and navigation in the application.

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
- [Folder structure](#folder-structure)
  - [General guidelines](#general-guidelines)
  - [Project structure](#project-structure)
    - [`core` folder](#core-folder)
    - [`features` folder](#features-folder)
    - [`shared` folder](#shared-folder)

### `core` folder

This folder should contain global components, services, interceptors and more, usually all the things that should be instantiated once.

```txt title="example"
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

A feature folder with more than one route should have a dedicated `<feature>.routes.ts` file (see [routing](../routing.md)).

```txt title="example"
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

### `shared` folder

This folder should contain reusable components, services, directives and more, that are shared accross multiple features.

Because many files in this folder are generics, i.e. not related to any feature, you should organize them by technical types. Other feature related files can be grouped together in feature folders.

```txt title="Example"
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
