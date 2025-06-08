---
sidebar_position: 3
---
# Access control

This section outlines recommended approaches for implementing authentication and authorization in Angular in a secure and maintainable way.

[Authentication](#authentication) is the process of verifying the identity of a user, typically through credentials like username and password, tokens, or other methods.

[Authorization](#authorization) is the process of determining what actions a user is allowed to perform or what resources they can access.

## Authentication

**Do** choose a well-established authentication protocol and authentication flow.

:::note
This guide will *not* give recommendations on what protocol or authentication flow to use because it highly depends on your specific use case, security requirements, architecture, identity provider, infrastructure, etc.
:::

**Avoid** implementing your own authentication system.

:::info Why?
Implementing custom authentication is very complex and error-prone, it will most likely lead to security vulnerabilities if you are not a security expert.
:::

**Do** use a [client library](#libraries) to handle authentication flow.

**Consider** using a service to globally manage authentication and interact with the chosen client library.

```ts title="✅ auth-manager.ts"
@Injectable({ providedIn: 'root' })
export class AuthManager {
  // Expose readonly signals
  isAuthenticated: Signal<boolean> = ...;
  userInfo: Signal<UserInfo | null> = ...;
  
  // Implementation details depends on your authentication flow, protocol and client library.
  login() {...}
  logout() {...}
}
```

**Avoid** storing sensitive information (e.g. token) in local storage or session storage.

:::info Why?
Local and session storage are vulnerable to [cross-site scripting (XSS) attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS).
:::

### Using a cookie

**Consider** using an [`HttpOnly` cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#block_access_to_your_cookies) to store the authentication token.

:::info Why?
HttpOnly cookies are not accessible via JavaScript, which helps mitigate the risk of [cross-site scripting (XSS) attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS).
:::

:::note
Cookies are automatically sent with every HTTP request to the server if it has the same origin, no need to manually add them to each request header.

Cookies are also compatible with native browser file downloads, i.e. `<img src="...">` and `<a download href="...">` tags, which make it easier to download files protected by authentication.
:::

**Consider** setting [`SameSite=Strict`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#samesitesamesite-value) to the authentication cookie.

:::info Why?
Setting `SameSite=Strict` on cookies helps prevent [cross-site request forgery (CSRF) attacks](https://developer.mozilla.org/en-US/docs/Glossary/CSRF) by ensuring that cookies are only sent in requests originating from the same site.
:::

**Do** set [`withCredentials: true`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) in your HTTP requests to support authenticated cross-origin requests.

```ts title="✅ credentials-interceptor.ts"
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // Do NOT share credentials to third-party APIs or public resources.
  if (!req.url.startsWith(environment.apiBaseUrl)) {
    return next(req);
  }

  // Clone the request to add the 'withCredentials' property.
  const requestWithCredentials = req.clone({
    withCredentials: true
  });
  return next(requestWithCredentials);
};
```

:::info Why?
By default, cookies are not sent with cross-origin requests, i.e. if your API is hosted on a different domain than your Angular application.
:::

### Using a header

:::warning
Prefer [using a cookie](#using-a-cookie) for authentication, but if you need to use an HTTP header, follow the guidelines below.
:::

**Do** use an interceptor to add HTTP request headers.

```ts title="✅ auth-interceptor.ts"
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Do NOT send token to third-party APIs or public resources.
  if (!req.url.startsWith(environment.apiBaseUrl)) {
    return next(req);
  }

  // Do nothing if the user is not authenticated.
  const authManager = inject(AuthManager);
  if (!authManager.token) {
    return next(req);
  }

  // Clone the request to add the 'Authorization' header.
  const authenticatedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authManager.token}`
    }
  });
  return next(authenticatedRequest);
};
```

:::info Why?
HTTP headers are not propagated automatically by the browser, so you need to manually add them to each request. Using an interceptor allows you to add the authentication token to every HTTP request made with Angular's `HttpClient`, centralizing authentication logic in one place.
:::

### Protecting routes

**Do** use guards to restrict access to routes to authenticated users.

```ts title="✅ authenticated-guard.ts"
export const authenticatedGuard: CanMatchFn = () => {
  const authManager = inject(AuthManager);
  return authManager.isAuthenticated();
};
```

```ts title="✅ app.routes.ts"
const appRoutes: Routes = [
  { 
    path: 'profile',
    component: UserProfilePage,
    // highlight-start
    canMatch: [authenticatedGuard]
    // highlight-end
  }
];
```

**Consider** using a guard to redirect unauthenticated users to the login page.

```ts title="✅ authenticated-guard.ts"
export const authenticatedGuard: CanMatchFn = () => {
  const authManager = inject(AuthManager);
  if (!authManager.isAuthenticated()) {
    const router = inject(Router);
    return new RedirectCommand(router.parseUrl('/login'));
  }
  return true;
};
```

### Protecting components

**Consider** using a structure directive to conditionally render UI elements based on authentication status.

```html title="✅ nav-bar.html"
<a routerLink="/profile" *isAuthenticated>Profile</a>
```

```ts title="✅ is-authenticated.ts"
@Directive({
  selector: '[isAuthenticated]'
})
export class IsAuthenticated implements OnInit {
  #template = inject(TemplateRef);
  #viewContainer = inject(ViewContainerRef);
  #authManager = inject(AuthManager);

  ngOnInit(): void {
    if (this.#authManager.isAuthenticated()) {
      this.#viewContainer.createEmbeddedView(this.#template);
    }
  }
}
```

### Libraries

**Consider** using one of the following:

✅ **[angular-auth-oidc-client](https://angular-auth-oidc-client.com)**

✅ **[angular-auth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc)**

## Authorization

**Do** filter data based on user permissions on the server side, not on the client side.

:::info Why?
Relying on client-side filtering can expose sensitive data to unauthorized users. An attacker can easily bypass client-side checks, inspect network requests or directly request server data using tools like Postman or cURL.
:::

**Consider** using a service to globally manage user permissions.

```ts title="✅ permission-manager.ts"
export type UserPermission = 'read_post' | 'write_post' | 'write_comment' | 'read_comment';

@Injectable({ providedIn: 'root' })
export class PermissionManager {
  #authManager = inject(AuthManager);

  // Use a 'Set' for efficient lookup.
  #permissions = computed(() => {
    return new Set(this.#authManager.userInfo()?.permissions ?? []);
  });

  hasPermission(permission: UserPermission): boolean {
    return this.#permissions().has(permission);
  }

  hasAnyPermission(permissions: UserPermission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  hasEveryPermission(permissions: UserPermission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }
}
```

### Protecting routes

**Do** use guards to protect routes based on user permissions.

```ts title="✅ permission-guard.ts"
export const permissionGuard: (permission: UserPermission) => CanMatchFn = (permission) => {
  return () => inject(PermissionManager).hasPermission(permission);
};
```

```ts title="✅ app.routes.ts"
const appRoutes: Routes = [
  { 
    path: 'post/:id',
    component: PostPage,
    // highlight-start
    canMatch: [permissionGuard('read_post')]
    // highlight-end
    resolve: {
      post: postResolver
    }
  }
];
```

:::tip
If you need to restrict access to a specific resource (e.g. a specific post), you should check permissions on the server side and return an appropriate error response (e.g. 403 Forbidden or 404 Not Found) that can be handled by a resolver on the client side.
:::

### Protecting components

**Consider** using a structure directive to conditionally render UI elements based on user permissions.

```html title="✅ blog-feed-page.html"
<button *hasPermission="'write_post'">Create Post</button>
```

```ts title="✅ has-permission.ts"
@Directive({
  selector: '[hasPermission]'
})
export class HasPermission implements OnInit {
  #template = inject(TemplateRef);
  #viewContainer = inject(ViewContainerRef);
  #permissionManager = inject(PermissionManager);

  hasPermission = input.required<UserPermission>();

  ngOnInit(): void {
    if (this.#permissionManager.hasPermission(this.hasPermission())) {
      this.#viewContainer.createEmbeddedView(this.#template);
    }
  }
}
```
