---
sidebar_position: 11
---
# Dependency injection

Dependency injection is a powerful design pattern that allows you to create flexible and maintainable code. In Angular, dependency injection is used to provide services and other dependencies to components, directives, pipes, services and more.

## General guidelines

**Do** use `inject` function for dependency injection.

```ts title="user-page.ts"
export class UserPage {
  // ✅ inject function
  userHttpClient = inject(UserHttpClient);

  // ❌ constructor-based dependency injection
  constructor(teamHttpClient: TeamHttpClient) {}
}
```

## Injection level

**Do** use root level injection by default.

```ts title="❌ Component level injection"
@Injectable()
export class UserHttpClient {...}
```

```ts title="✅ Root level injection"
@Injectable({
  providedIn: 'root'
})
export class UserHttpClient {...}
```

:::info Why?
When you provide a service at the root level, Angular creates a single instance of the service (a singleton) and shares it across the entire application wherever its needed. This is the most common use case and the easiest to understand and work with. If you do not need to scope the dependency to a component or route, then it's best to avoid the additional complexity.
:::

:::warning Exceptions
Providing a service at the component level can be useful in some cases, a few examples:
- Multiple instances of the same service with different states
- Service state that needs to be reset when the component is destroyed
- Multiple service implementations of an abstract class
- ...
:::

## Sharing injection context

When a dependency is provided in a component, it is only available to that component and its children. In some cases, you may need to inject a dependency provided at the component level to a component rendered at the root level. By default you'll get the following error: `NullInjectorError: No provider for <your dependency>!`.

:::note
A good example of this is a component rendered in a dialog. Since the dialog component is rendered at the root level and not as a child of the component that opens the dialog, it cannot access the dependencies provided at the component level.
:::

**Do** share injection context using `Injector`.

```ts title="✅ user-page.ts"
@Component({
  ...
  providers: [UserStore] // UserStore is provided at the component level
})
export class UserPage {
  dialog = inject(MatDialog);
  injector = inject(Injector);

  openDialog() {
    // Injection context is shared with the dialog component using Injector
    this.dialog.open(UserDialog, { injector: this.injector });
  }
}
```

```ts title="✅ user-dialog.ts"
export class UserDialog {
  // UserStore can now be injected in the dialog component
  userStore = inject(UserStore);
}
```

## Asserting injection context

When creating reusable helper functions that use `inject()`, you may want to ensure they are only called from an injection context. The `assertInInjectionContext()` function helps you enforce this constraint and provide clear error messages.

**Consider** using `assertInInjectionContext()` in helper functions that use `inject()`.

```ts title="❌ Without assertion - unclear error"
export function injectBody(): HTMLElement {
  return inject(DOCUMENT).body;
  // Error: NullInjectorError: No provider for DOCUMENT!
}
```

```ts title="✅ With assertion - clear error"
export function injectBody(): HTMLElement {
  assertInInjectionContext(injectBody);
  return inject(DOCUMENT).body;
  // Error: NG0203: injectBody() can only be used within an injection context
}
```

:::info Why?
`assertInInjectionContext()` provides a clearer, more actionable error message that points to your helper function instead of the generic `inject()` call. This makes debugging easier for developers using your code.
:::

**Do** call helper functions from injection contexts.

- ✅ Constructor
- ✅ Field initializer
- ✅ Within `runInInjectionContext()`
- ❌ Event handler
- ❌ Lifecycle hook

:::info Why?
Calling `inject()` or `assertInInjectionContext()` outside an injection context throws [error NG0203](https:/v20.angular.dev/errors/NG0203). Make sure to call these functions only during construction or initialization phases.
:::
