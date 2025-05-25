---
sidebar_position: 9
---
# Dependency injection

Dependency injection is a powerful design pattern that allows you to create flexible and maintainable code. In Angular, dependency injection is used to provide services and other dependencies to components, directives, pipes, services and more.

## General guidelines

**Do** use `inject` function for dependency injection.

```ts title="user.component.ts"
export class UserComponent {
  // ✅ inject function
  userService = inject(UserService);

  // ❌ constructor-based dependency injection
  constructor(authService: AuthService) {}
}
```

## Injection level

**Do** use root level injection by default.

```ts title="❌ Component level injection"
@Injectable()
export class UserService {...}
```

```ts title="✅ Root level injection"
@Injectable({
  providedIn: 'root'
})
export class UserService {...}
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

:::info
A good example of this is a component rendered in a dialog. Since the dialog component is rendered at the root level and not as a child of the component that opens the dialog, it cannot access the dependencies provided at the component level.
:::

**Do** share injection context using `Injector`.

```ts title="✅ user.component.ts"
@Component({
  ...
  providers: [UserService] // UserService is provided at the component level
})
export class UserComponent {
  dialog = inject(MatDialog);
  injector = inject(Injector);

  openDialog() {
    // Injection context is shared with the dialog component using Injector
    this.dialog.open(DialogComponent, { injector: this.injector });
  }
}
```

```ts title="✅ dialog.component.ts"
export class DialogComponent {
  // UserService can now be injected in the dialog component
  userService = inject(UserService);
}
```


