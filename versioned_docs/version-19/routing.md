---
sidebar_position: 7
---
# Routing

This page provides best practices for routing in Angular, focusing on structure, lazy loading, and navigation.

## General guidelines

**Consider** having a project structure similar to your routes structure, see [folder structure](./general/folder-structure.md#features-folder).

**Consider** applying the same naming convention as your API, see [API naming convention](./http/api-design.md#naming-convention).

**Consider** having a client routing as close as possible to your server API routing.

## Lazy loading

**Consider** lazy loading each feature under `features` folder.

**Do** create a sub route file for multi route features.

```ts title="❌ app.routes.ts"
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'users',
    component: SearchUsersComponent
  },
  {
    path: 'users/:id',
    component: UserProfileComponent
  }
  // ...
];
```

```ts title="✅ app.routes.ts"
const routes: Routes = [
  // use 'loadComponent' to lazy load single route features
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(c => c.AdminComponent)
  },
  // use 'loadChildren' to lazy load multi route features.
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
  }
  // ...
];
```

```ts title="✅ features/users/users.routes.ts"
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

## Navigation

**Do** use `routerLink` for links over `router.navigate()` or `router.navigateByUrl()`.

```html title="❌ company.component.html"
<button (click)="showEmployees()">See employees</button>
<button (click)="showManager(user.id)">See manager</button>
```

```ts title="❌ company.component.ts"
import { Router } from '@angular/router';

export class CompanyComponent {
  #router = inject(Router);

  showEmployees() {
    this.#router.navigateByUrl('/users');
  }
  showManager(managerId: number) {
    this.#router.navigate(['users', managerId]);
  }
}
```

```html title="✅ company.component.html"
<a routerLink="/users">See users</a>
<a [routerLink]="['/users', user.id]">See manager</a>
```

:::info Why?
`RouterLink` uses standard HTML `<a>` tags which is better for accessibility, it supports native browser behaviors (opening link in new tab for example).

Only use `router` when programmatic navigation is required, such as redirects.
:::


## Data fetching

**Do** use `withComponentInputBinding()` for accessing route data (resolver, params and static data).

```ts title="❌ user.component.ts"
export class UserComponent implements OnInit {
  #route = inject(ActivatedRoute);

  userId!: string;
  user!: User;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.user = this.route.snapshot.data['user'];
  }
}
```

```ts title="✅ app.config.ts"
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // ...
  ]
};
```

```ts title="✅ user.component.ts"
export class UserComponent implements OnInit {
  userId = input.required<string>();
  user = input.required<User>();
}
```

**Consider** fetching data using a resolver instead of inside `ngOnInit` lifecycle hook.

```ts title="❌ user.component.ts"
export class UserComponent implements OnInit {
  #userService = inject(UserService);
  userId = input.required<string>();

  // 'user' is undefined until HTTP request is resolved.
  user?: User;

  ngOnInit(): void {
    this.#userService.getUser(this.userId())
      .subscribe(user => this.user = user);
  }
}
```

```ts title="✅ user.component.ts"
export class UserComponent {
  // 'user' will be loaded before the component initializes
  // and there is no need to handle the loading state.
  user: input.required<User>();
}
```

```ts title="✅ users.routes.ts"
const USERS_ROUTES: Routes = [
  {
    path: ':id',
    component: UserComponent,
    resolve: {
      // Define your resolver here
      user: (route: ActivatedRouteSnapshot) => {
        const userId = route.params['id'];
        return inject(UserService).getUser(userId);
      }
    }
  },
  // ...
];
```
