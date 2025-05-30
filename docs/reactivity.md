---
sidebar_position: 6
---

# Reactivity

In UI development, reactivity is the principle where the user interface automatically reflects changes in application state. Angular provides reactive tools like signals and observables to manage state and handle events to make sure the view stays in sync. This guide covers best practices for using these features efficiently, as well as when to use them and when not to.


## General guidelines

**Avoid** using `setTimeout()` to fix a change detection issue (e.g. `NG0100: ExpressionChangedAfterItHasBeenCheckedError`).

:::info Why?
This is a workaround that can lead to unexpected behavior and makes your code harder to maintain. It usually means you are doing something wrong. Instead, use Angular's built-in reactivity features like signals, observables, and others to manage state changes properly.
:::

**Avoid** using `ChangeDetectorRef` and its methods.
- ❌ `this.changeDetectorRef.detectChanges()`
- ❌ `this.changeDetectorRef.markForCheck()`

:::info Why?
You should use reactive structures like signals instead of manually triggering the change detection cycle.

`detectChanges()` is almost always a bad practice as it usually means you are doing something wrong and should reorganize your code and how your components interact with each other.

`markForCheck()` on the other hand can safely be used with `ChangeDetectionStrategy.OnPush` when there are no reactive alternatives. For example, updating a `FormControl` after an asynchronous task.
:::

## Signals

**Consider** using signals to manage reactive state.

**Avoid** using signals for event handling, use [RxJs](#rxjs) instead.

### Writable state

**Do** use `signal()` for writable state.
- ✅ `user = signal<User>({ name: 'martin' })`

**Do** change signal value using `set()` or `update()` method.
- ❌ `user().name = 'martin'`
- ❌ `users().push(newUser)`
- ✅ `user.set({ name: 'martin' })`
- ✅ `users.update(prev => [...prev, newUser])`

:::info Why?
Angular compare old and new values for signals using `Object.is()`. When modifying a property of an object, the reference to the object does not change, so Angular does not detect the change. In this case, the view will not be updated and computed will not be re-evaluated. 

Using `set()` or `update()` with a new object reference allows Angular to detect the change and update the view accordingly.
:::

### Derived state

**Do** use `computed()` for derived state.

```ts title="✅ From a simple value"
userNameField = signal('');
cleanUserName = computed(() => this.userNameField().trim());
```

```ts title="✅ From an object"
user = signal<User>({ name: 'martin' });
isManager = computed(() => this.user().role === 'manager');
```

```ts title="✅ From an array"
teamMembers = signal<User[]>([
  { name: 'martin', role: 'developer' },
  { name: 'john', role: 'developer' },
  { name: 'alice', role: 'manager' },
]);
teamDevelopers = computed(() => this.teamMembers().filter(user => user.role === 'developer'));
nbDevelopersInTeam = computed(() => this.teamDevelopers().length);
```

### Writable and derived state

**Do** use [`linkedSignal()`](https://angular.dev/guide/signals/linked-signal) for writable state that depends on another signal.

```ts title="✅ Selecting an item from a reactive array"
// Reactive array of users (could also be a computed(), input() or other).
users = signal<User[]>([...]);

// The selected user must be a user included in the users array.
// If the users array changes and the selected user is no longer in the array, we need to deselect it.
selectedUser = linkedSignal<User[], User | undefined>({
  // Source signal that the linked signal depends on:
  source: this.users,
  // Compute function triggered when the source signal changes:
  computation: (newUsers, prevSelectedUser) => {
    // If the previously selected user is still in the new array, return it, otherwise return undefined.
    return newUsers.find((user) => user.id === prevSelectedUser?.value.id);
  }
});
```

:::info Why?
`linkedSignal()` helps you create derived but writable signals that always have a valid value, as you only need to manage a single source of truth, which is the `source` signal.
:::

### Side effect

**Consider** using `effect()` for side effects.

```ts title="✅ Side effect"
preference = signal('');

constructor() {
  effect(() => {
    localStorage.setItem('user-preference', this.preference());
  });
}
```

:::tip
`effect()` are useful for syncing reactive and non-reactive state such as:
- Local/Session storage
- DOM element or attributes that cannot be handled in a template (e.g. meta tags, canvas, etc.)
- Third-party UI libraries
:::

**Consider** alternatives instead of writing to signals within an `effect`.

- ✅ `computed()`
- ✅ `linkedSignal()`
- ✅ RxJs `Observable`
- ...

:::info Why?
`effect()` signal is a very flexible and powerful tool, which makes it prone to anti-patterns. Writing to a signal within an `effect()` can lead to confusing data flow and multiple source of truth problem. There is often a better tool for the job.
:::

### Fetching data

**Do** fetch data with `HttpClient`, then consume it using an `async` pipe or by writing the response to a `signal()`.

```ts title="✅ Using async pipe (class)"
#http = inject(HttpClient);
user$ = this.#http.get<User>(`/api/users/${this.userId()}`);
```

```html title="✅ Using async pipe (template)"
@let user = user$ | async;
<span>{{ user.name }}</span>
```

```ts title="✅ Using a signal"
#http = inject(HttpClient);
user = signal<User | null>(null);

fetchUser(userId: string) {
  this.#http.get<User>(`/api/users/${userId}`).subscribe(user => {
    this.user.set(user);
  });
}
```

:::warning
When manually subscribing to an observable, you become responsible for the subscription, see [managing subscriptions](#managing-subscriptions) for more information.
:::

**Avoid** using `resource()`, `rxResource()` or `httpResource()` signals.

:::info Why?
`resource()`, `rxResource()` and `httpResource()` are experimental features in Angular v19 and are not recommended for production use.
:::

## RxJs

**Consider** using RxJs to handle events.
- ✅ Stream of events
- ✅ Asynchronous mutation (e.g. HTTP POST request)
- ✅ Complex event handling (e.g. debounce, throttle, etc.)
- ...

**Consider** using [signals](#signals) instead of RxJs `BehaviorSubject`.

### Common use cases

#### Conditional event handling

**Do** use `filter()` to process only values that satisfy a condition.

```ts title="✅ Filter out specific values"
this.askUserConfirmation().pipe(
  filter(confirmed => confirmed)
).subscribe(() => {
  // Action is performed only if the user confirmed
  this.performAction();
});
```

#### Mapping result

**Do** use `map()` to transform the emitted value.

```ts title="✅ Mapping to a property"
this.http.get<User>(`/api/users/${id}`).pipe(
  map(user => user.manager)
).subscribe(manager => {
  this.doSomethingWithManager(manager);
});
```

```ts title="✅ Mapping to a new model"
this.http.get<Team[]>('/api/teams').pipe(
  map(teams => teams.map(team => ({
    ...team,
    // Add a 'manager' property for each team
    manager: team.members.find(member => member.role === 'manager')
  })))
).subscribe(teamsWithManager => {
  this.doSomethingWithTeams(teamsWithManager);
});
```

#### Handling errors

**Do** use `error` callback function to handle error responses.

```ts title="✅ Handle errors"
this.http.get<User>(`/api/users/${userId}`).subscribe({
  // Handle the successful response:
  next: user => {
    this.doSomethingWithUser(user);
  },
  // Handle the error response:
  error: error => {
    this.showErrorToaster(`User not found`, error.message);
  }
});
```

**Do** use `catchError()` operator to catch errors and fallback to a default value.

```ts title="✅ Catch errors and replace value"
this.http.get<User[]>('/api/users').pipe(
  catchError(error => {
    return of([]);
  })
).subscribe(users => {
  this.doSomethingWithUsers(users);
});
```

#### Side effects

**Do** use `tap()` to perform side effects on success.

```ts title="✅ Side effect on success only"
this.http.post<User>('/api/users', user).pipe(
  tap(user => {
    this.showSuccessToaster(`User ${user.name} created successfully!`);
  })
).subscribe(user => {
  this.doSomethingWithUser(user);
});
```

**Do** use `finalize()` to always perform side effects, on success and error.

```ts title="✅ Side effect on success and error"
this.loading.set(true);
this.http.post<User>('/api/users', user).pipe(
  finalize(() => this.loading.set(false))
).subscribe(user => {
  this.doSomethingWithUser(user);
});
```

:::note
`tap()` and `finalize()` operators do not modify the emitted value.
:::

#### Unsubscribing when component is destroyed

Do use `takeUntilDestroyed()` to automatically unsubscribe when the component is destroyed.

```ts title="✅ From an injection context (e.g. constructor)"
constructor() {
  this.userService.status$.pipe(
    takeUntilDestroyed()
  ).subscribe(status => {
    this.doSomethingWhenUserStatusChange(status);
  });
}
```

```ts title="✅ From outside an injection context with DestroyRef"
destroyRef = inject(DestroyRef);

startListeningStatus() {
  this.userService.status$.pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe(status => {
    this.doSomethingWhenUserStatusChange(status);
  });
}
```
More information below on [how to manage subscriptions](#managing-subscriptions).

#### Fetch once on demand then cache

**Do** use `shareReplay(1)` to emit an HTTP request once and cache the result for other subscribers.

```ts title="✅ Fetch once then cache"
const preferences$ = this.http.get<UserPreferences>('/api/users-preferences').pipe(
  shareReplay(1)
);

// First subscription will trigger the HTTP request and cache the result:
preferences$.subscribe(preferences => this.doSomethingWithPreferences(preferences));
// Next subscriptions will use the cached result:
preferences$.subscribe(preferences => this.doSomethingElseWithPreferences(preferences));
```

#### Search input

**Do** use `debounceTime()` and `distinctUntilChanged()` for search inputs.

```ts title="✅ Search input"
this.searchControl.valueChanges.pipe(
  // Wait for 200ms of inactivity and use the latest value
  debounceTime(200), 
  // Only emit if the value has changed
  distinctUntilChanged()
  // Then perform the search
  switchMap(query =>  this.searchUsers(query))
).subscribe(users => {
  this.doSomethingWithUsers(users);
});
```

:::info Why?
Using `debounceTime()` prevents sending too many requests while the user is typing. Search is triggered when the user has stopped typing for a short period of time, rather than on each keystroke.
:::

#### Parallel HTTP requests

**Do** use `forkJoin()` to send multiple HTTP requests in parallel and wait for all of them to complete.

```ts title="✅ Known number of parallel HTTP requests"
forkJoin({
  user: this.http.get(`/api/users/${userId}`),
  orders: this.http.get(`/api/users/${userId}/orders`)
}).subscribe(({ user, orders }) => {
  this.doSomethingWithUserAndOrders(user, orders);
});
```

```ts title="✅ Unknown number of parallel HTTP requests"
const request = selectedUsers.map(user => this.http.get(`/api/users/${user.id}`));
forkJoin(users).subscribe((users) => {
  this.doSomethingWithUserAndOrders(user, orders);
});
```

#### Sequential HTTP requests

**Do** use `switchMap()` to send an HTTP request after another one completes.

```ts title="✅ Sequential HTTP requests"
// Fetch a user by ID first
this.http.get<User>(`/api/users/${userId}`).pipe(
  // Then fetch the user's team using the user data
  switchMap(user => this.http.get<Team>(`/api/teams/${user.team.id}`))
).subscribe(team => {
  doSomethingWithTeam(team);
});
```

:::warning
Keep in mind that sequential requests should be avoided when possible, learn more in [HTTP guide](./http/index.md).
:::

#### Going further

There are 90+ RxJs operators, we've covered only the most common here. You can learn more at [learnrxjs.io](https://www.learnrxjs.io/).

### Managing subscriptions

**Do** unsubcribe from observables.
- ✅ Use `async` pipe in template (it handles subscription and unsubscription)
- ✅ Use `takeUntilDestroyed()` (see [common use case](#unsubscribing-when-component-is-destroyed))
- ✅ Call `unsubscribe` in `ngOnDestroy` lifecycle hook

:::info Why?
Unsubscribing from observables is crucial to prevent memory leaks in your application. When a component is destroyed, any active subscriptions will continue to run, potentially leading to unexpected behavior or performance issues. Subscriptions could accumulate as components are created and destroyed.
:::

:::warning Exceptions
Finite subscriptions, such as HTTP requests, are automatically unsubscribed when a response is received, but that does not mean the request is cancelled. If your component is destroyed before the request completes, the callback will still be executed. This can lead to runtime errors if you are trying to access component properties that no longer exist.

Preferably always unsubscribe from finite subscriptions, but you can omit the unsubscription if the callback is safe to execute after the component is destroyed.
:::
