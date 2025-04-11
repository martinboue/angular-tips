---
sidebar_position: 1
---
# TypeScript class

## General guidelines

**Do** use seperate files for class, template and style.

:::warning Exception
You can use a single file for components with no style and extremely short template (1 to 3 lines).
:::

**Do** use `inject` function for dependency injection.

```ts title="user.component.ts"
export class UserComponent {
  // ✅ inject function
  userService = inject(UserService);

  // ❌ constructor-based dependency injection
  constructor(authService: AuthService) {}
}
```

**Avoid** direct DOM access or manipulation.

- ❌ `document.getElementById('my-button')`
- ❌ `document.createElement('div')`
- ❌ `window.innerWidth`

:::info Why?
Direct DOM access breaks Angular's abstraction layer and makes testing and maintenance harder. Direct DOM accesses are likely to break in future changes, as they are not type-checked. Prefer Angular's reactive and declarative approach instead, some examples:
- Conditional rendering
- `viewChild()` and `viewChildren()` queries
- Templating with `<ng-content>` or `<ng-template>`
- Angular Material `MediaMatcher`
- ...
:::

**Do** use a selector prefix.
- ❌ `selector: 'user-card'`
- ✅ `selector: 'app-user-card'`

:::tip
`app-` is the default Angular selector prefix, and in most cases it is fine. If needed, you can change it, but keep it short.

In multi-project workspace, it could be a good thing to have a different prefix for each project.
:::

**Do** use the same name for component class name and the selector, but with a prefix and in snake-case.
- Given the component class `ManagerTeamPreviewMenuComponent`:
    - ❌ `selector: 'app-team-preview'`
    - ✅ `selector: 'app-manager-team-preview-menu'`

**Do** group class attributes.

```ts title="✅ user.component.ts"
export class UserComponent {
  // 1. Injected dependencies
  userService = inject(UserService);

  // 2. Constants
  UserStatus = UserStatus;

  // 3. Inputs
  user = input.required<User>();

  // 4. Outputs
  delete = output();

  // 5. Internal component states
  profileForm = new FormGroup(...);
  userManager = computed(...);
}
```

## Inputs & outputs

**Do** use `input()` and `output()` signals instead of `@Input()` and `@Ouput()` decorators.

:::tip
You can run [schematic migrations](https://angular.dev/reference/migrations) to automatically transform decorators to signals.
:::

**Do** type inputs and outputs.
- ❌ `input()`
- ❌ `input<any>()`
- ✅ `input<string>()`
- ❌ `output<any>()`
- ✅ `output()` (void by default)
- ✅ `output<string>()`

**Do** use `input.required()` signal for required inputs.
- ❌ `mandatoryField = input<string>()`
- ✅ `mandatoryField = input.required<string>()`

**Do** use `model()` signal for two-way binding.
- ❌ `selected = input(false)` and `selectedChange = output<boolean>()`
- ✅ `selected = model(false)`

## Change detection

**Consider** using `ChangeDetectionStrategy.OnPush` for every components.
- ❌  unspecified change detection strategy 
- ❌ `changeDetection: ChangeDetectionStrategy.Default`
- ✅ `changeDetection: ChangeDetectionStrategy.OnPush`

:::info Why?
The main reason is sustainability. Angular is heading towards better reactivity with signals and Zoneless application, and using `OnPush` now will make migration to future major releases easier.

In addition, `OnPush` strategy improves performances by reducing the number of change detection cycles, which is particularly interesting for large projects.
:::

:::tip
You can set the default change detection strategy to `OnPush` in your `angular.json` file for components generated with Angular CLI.
:::

**Avoid** using `ChangeDetectorRef` and its methods.
- ❌ `this.changeDetectorRef.detectChanges()`
- ❌ `this.changeDetectorRef.markForCheck()`

:::info Why?
You should use reactive structures like signals instead of manually triggering the change detection cycle.

`detectChanges()` is almost always a bad practice as it usually means you are doing something wrong and should reorganize your code and how your components interact with each other.

`markForCheck()` on the other hand can safely be used with `ChangeDetectionStrategy.OnPush` when there are no reactive alternatives. For example, updating a `FormControl` after an asynchronous task.
:::

## Lifecycle 

**Avoid** misusing or overusing component lifecycle hooks.
- ❌ `ngOnInit`
- ❌ `ngOnChanges`
- ❌ `ngOnDestroy`
- ❌ `ngDoCheck`
- ❌ `ngAfterContentInit`
- ❌ `ngAfterContentChecked`
- ❌ `ngAfterViewInit`
- ❌ `ngAfterViewChecked`
- ❌ `afterRender`
- ❌ `afterNextRender`

:::info Why?
These methods are often used to do things you should avoid, like manipulating the DOM, and where reactive patterns are a better fit. Some alternatives:
- `computed()` and `effect()` signals
- `viewChild()` and `viewChildren()` signals
- `takeUntilDestroyed()` rxjs operator
- ...

Use signals and observables first and lifecycle hooks as a last resort.

You can initialize your component inside the `constructor` instead of the `ngOnInit` method.
:::

:::warning Exceptions
Because Angular v19 is not completely signal-based yet, you will need to rely on lifecycle hooks in some cases, for example:
- Initializing a form
- Accessing route data
- ...
:::

**Do** implement the lifecycle interface if its lifecycle method is defined.

```ts title="❌ user.component.ts"
export class UserComponent {
  ngOnInit() {...}
}
```
```ts title="✅ user.component.ts"
export class UserComponent implements OnInit {
  ngOnInit() {...}
}
```

:::info Why?
Angular will call your component's lifecycle methods even if it does not explicitly implement the interface, but make sure you implement it for type safety.
:::