---
sidebar_position: 5
draft: true
---
# Routing

Notes:
- route path not hardcoded, define constants to reuse for nav
- naming convention like REST API
- use custom data to pass static data to components
- try to be as close as possible to your REST
- each route in the same feature should be prefixed by the feature name, example :
    - admin: admin/roles, admin/privacy, ...
- do not suffix /all

## Naming convention

**Consider** having a file structure similar to your routes structure, see [file structure](./general/folder-structure.md#features-folder).

## Lazy loading

**Consider** lazy loading each feature under `features` folder.

**Do** use `loadComponent` to lazy load single route features.

```ts title="app.routes.ts"
const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(c => c.LazyComponent)
  }
];
```

**Do** create a sub route file for multi route features.

```ts title="features/users/users.routes.ts"
const USERS_ROUTES: Routes = [
  {
    path: '',
    component: SearchUsersComponent
  },
  {
    path: ':id',
    component: UserProfileComponent
  },
  // ...
];
```

**Do** use `loadChildren` to lazy load multi route features.

```ts title="app.routes.ts"
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
  }
];
```

## Navigation

**Avoid** hardcoding route path.

:::tip Why?
  TODO
:::


