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
    component: AdminPage
  },
  {
    path: 'users',
    component: BrowseUsersPage
  },
  {
    path: 'users/:id',
    component: UserProfilePage
  }
  // ...
];
```

```ts title="✅ app.routes.ts"
const routes: Routes = [
  // use 'loadComponent' to lazy load single route features
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-page').then(c => c.AdminPage)
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
    component: BrowseUsersPage
  },
  {
    path: ':id',
    component: UserProfilePage
  },
  // ...
];
```

## Navigation

**Do** use `routerLink` for links over `router.navigate()` or `router.navigateByUrl()`.

```html title="❌ company-page.html"
<button (click)="showEmployees()">See employees</button>
<button (click)="showManager(user.id)">See manager</button>
```

```ts title="❌ company-page.ts"
import { Router } from '@angular/router';

export class CompanyPage {
  #router = inject(Router);

  showEmployees() {
    this.#router.navigateByUrl('/users');
  }
  showManager(managerId: number) {
    this.#router.navigate(['users', managerId]);
  }
}
```

```html title="✅ company-page.html"
<a routerLink="/users">See employees</a>
<a [routerLink]="['/users', user.id]">See manager</a>
```

:::info Why?
`RouterLink` uses standard HTML `<a>` tags which is better for accessibility, it supports native browser behaviors (opening link in new tab for example).

Only use `router` when programmatic navigation is required, such as redirects.
:::


## Data fetching

**Do** use `withComponentInputBinding()` for accessing route data (resolver, params and static data).

```ts title="❌ user-page.ts"
export class UserPage implements OnInit {
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

```ts title="✅ user-page.ts"
export class UserPage implements OnInit {
  userId = input.required<string>();
  user = input.required<User>();
}
```

**Consider** fetching data using a resolver instead of inside `ngOnInit` lifecycle hook.

```ts title="❌ user-page.ts"
export class UserPage implements OnInit {
  #userHttpClient = inject(UserHttpClient);
  userId = input.required<string>();

  // 'user' is undefined until HTTP request is resolved.
  user?: User;

  ngOnInit(): void {
    this.#userHttpClient.getUser(this.userId())
      .subscribe(user => this.user = user);
  }
}
```

```ts title="✅ user-page.ts"
export class UserPage {
  // 'user' will be loaded before the component initializes
  // and there is no need to handle the loading state.
  user: input.required<User>();
}
```

```ts title="✅ users.routes.ts"
const USERS_ROUTES: Routes = [
  {
    path: ':id',
    component: UserPage,
    resolve: {
      // Define your resolver here
      user: (route: ActivatedRouteSnapshot) => {
        const userId = route.params['id'];
        return inject(UserHttpClient).getUser(userId);
      }
    }
  },
  // ...
];
```

## Error handling

**Do** define a fallback route.

```ts title="✅ app.routes.ts"
export const routes: Routes = [
  ...
  // Keep this route at the end.
  { path: '**', component: NotFoundPage },
];
```

**Do** use `withNavigationErrorHandler` to handle navigation errors globally.

```ts title="✅ app.config.ts"
export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideRouter(routes, 
      withNavigationErrorHandler(error => {
        // Fallback to a generic error page
        const router = inject(Router);
        return new RedirectCommand(router.parseUrl('/error'));
      })),
  ]
};
```

**Do** handle resolver errors by returning a `RedirectCommand`.

```ts title="✅ app.routes.ts"
const appRoutes: Routes = [
  { 
    path: 'post/:id',
    component: PostPage,
    resolve: {
      // highlight-start
      post: postResolver
      // highlight-end
    }
  }
];
```

```ts title="✅ post-resolver.ts"
export const postResolver: ResolveFn<Post> = (route, state) => {
  const postHttpClient = inject(PostHttpClient);
  const router = inject(Router);

  return postHttpClient.getPost(route.params['id']).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        // Redirect to a specific 'Post not found' page
        const redirect = new RedirectCommand(router.parseUrl('/post-not-found'));
        return of(redirect);
      } else {
        // Throw unhandled error further, will be caught by the global navigation error handler
        return throwError(() => error);
      }
    })
  );
};
```
