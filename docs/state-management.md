---
sidebar_position: 12
---
# State management

State management is the process of handling and organizing the data (state) that changes over time in your application. Reactive state management ensures your UI stays in sync with your data, making it easier to build dynamic and complex applications.

A **store** is a term often used in state management libraries to designate a centralized container that holds and manages state for your application, or a part of it. Stores provide a consistent way to read, update, and observe state changes, making it easier to share data between components and keep your UI synchronized.

## General guidelines

**Do** keep state as local as possible.

**Consider** using the simplest state management solution that fits your needs. Some increasingly complex solutions:

1. Component attribute: for local state used by a single component that are not meant to be shared.
2. Input and output: to pass state between nearby components. This is the most simple and efficient way to share state.
3. Service: to share state between components with signals and/or observables. This is often sufficient and the most flexible solution, it also doesn't require a third-party library.
4. Store: to widely share data between multiple components. This is useful for managing complex state that needs to be shared across the application.

:::info Why?
The closer the state is to its consumer, the easier it is to maintain. Using a store for simple state management adds unnecessary complexity that will make your code harder to maintain and be less flexible.
:::

:::tip
Keep in mind that picking a state management library does not mean you have to use it everywhere. You can mix and match different state management solutions in your application, using a library for complex use cases and a service for simpler ones.
:::

**Do** use `asReadonly()` to expose readonly signals.

```ts title="auth-manager.ts"
export class AuthManager {
  // ❌ Public writable signal
  userName = signal("martin");

  // ✅ Private writable signal + public readonly signal
  #userName = signal("martin");
  readonly userName = this.#userName.asReadonly();
}
```

## Libraries

**Consider** not using a state management library, except for complex use cases.
- ✅ Caching data
- ✅ Request deduplication
- ✅ Automatic re-fetching
- ✅ Offline support
- ✅ Optimistic updates
- ...

:::info Why?
State management libraries add considerable complexity and can be overkill for many applications, where a service with signals and/or observables could get the job done. Carefully evaluate your requirements and only adopt a library if there is a clear, justified need.

Stores are often misused and overused. Over time, a lot of data and logic ends up in there by mistake which makes it hard to maintain. It's important to define in each project what *should* go into a store and what *should not*.
:::

**Consider** using one the following:

✅ **[NgRx](https://ngrx.io/)**: reactive state management library that provides a global store inspired by Redux, but also a simpler signal-based store.

❌ **[TanStack Query](https://tanstack.com/query/latest/docs/framework/angular/overview)**: the Angular adapter is not yet production-ready, but worth keeping an eye on.

❌ **[Akita](https://opensource.salesforce.com/akita/)**: no longer maintained.
