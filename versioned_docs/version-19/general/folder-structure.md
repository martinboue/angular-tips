---
sidebar_position: 2
---
# Folder structure

Folder structure refers to *how* files and directories are organized within a project. A well-designed methodology helps developers navigate the codebase efficiently and, above all, keeps the project understandable and maintanable as it grows. It provides a clear separation of concerns, making it easier to locate, update, and manage different parts of the application.

## General guidelines

**Consider** grouping files by domain (business feature) rather than technical type (components, services, ...).

**Consider** structuring the file tree as close as possible to the routing and navigation in the application.

**Do** rename folders to avoid redundancy in path.
- ❌ `blog/blog-post/blog-post.component.ts`
- ✅ `blog/post/blog-post.component.ts`
- ❌ `admin/admin-dashboard/admin-dashboard-settings/admin-dashboard-settings.component.ts`
- ✅ `admin/dashboard/settings/admin-dashboard-settings.component.ts`

## Project structure

**Consider** splitting your codebase into 3 main folders, [`core`](#core-folder), [`features`](#features-folder) and [`shared`](#shared-folder).

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

### `core` folder

**Do** include non-business and global features in `core` folder.
- ✅ Layout components
- ✅ Authentication service
- ✅ Interceptors
- ...

:::note
`core` folder usually contains files that are instantiated once or used globally.
:::

```txt title="✅ core folder"
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

**Avoid** importing files from `features` folder into the `core` folder.

### `features` folder

**Do** include business features grouped by domain in `features` folder.

```txt title="✅ features folder"
features
├── dashboard
|   └── dashboard.component.ts
├── blog
|   ├── feed
|   |   └── blog-feed.component.ts
|   ├── post
|   |   └── blog-post.component.ts
|   └── blog.routes.ts
└── ...
```

:::tip
Nested folders under `features` can be as deep as needed to represent the domain structure of your application.
:::

**Do** colocate files related to the same feature in the same folder.

```txt title="✅ Colocated files"
feed
├── blog-feed.component.ts
├── blog-feed.component.html
├── blog-feed.component.css
├── blog-feed.store.ts
├── blog-feed.service.ts
└── ...
```

**Consider** creating a dedicated `<feature>.routes.ts` file for domains that contain more than one route (see [lazy loading](../routing.md#lazy-loading)).

```txt title="✅ Domain-specific route file"
features
├── blog
|   ├── feed
|   |   └── blog-feed.component.ts
|   ├── post
|   |   └── blog-post.component.ts
    // highlight-start
|   └── blog.routes.ts
    // highlight-end
└── ...
```

### `shared` folder

**Do** include reusable components, services, directives and other files in `shared` folder.

:::note
For some files under the `shared` folder, such as generic utilities or highly reusable code, grouping by domain doesn't make sense. Instead, you can organize them by technical type (like components, services or directives).
:::

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
└── ...
```

**Avoid** importing files from `core` or `features` folders into the `shared` folder.

## Going further

This folder structure is a strong starting point, but for very large codebase, you may need to adapt a more complex and strict structure to keep your project maintainable.

For example, you can check out the [Feature Sliced Design methodology](https://feature-sliced.github.io/documentation/), which is a more advanced approach of the folder structure described above.
