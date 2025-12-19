---
sidebar_position: 4
sidebar_class_name: new
---
# Change detection

Change detection is a core concept in Angular that ensures the UI stays in sync with the application state. This guide explores best practices for managing change detection effectively, including strategies for optimizing performance and leveraging Angular's built-in mechanisms.

## General guidelines

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

**Do** rely on reactive primitives to trigger change detection.

- ✅ [Signals](../reactivity#signals) - reading a signal in a template registers it for updates, and calling `set()` or `update()` marks the view dirty.
- ✅ [Async Pipe](../reactivity#managing-subscriptions) - it subscribes to an Observable and triggers view checks on each emission.
- ✅ Event handlers, e.g. `(click)` or `(keydown)`.
- ✅ Input property changes from parent to child components.
- ❌ Timers, e.g. `setTimeout()` or `setInterval()`.
- ❌ HTTP requests

:::tip
As a last resort, you can use `markForCheck()` method from `ChangeDetectorRef` to manually trigger change detection.
:::

See [Reactivity](../reactivity.md) for more details.

## Zoneless

Zoneless mode represents a major shift in Angular’s change detection strategy. Historically, Angular relied on Zone.js, a patching library that intercepted asynchronous tasks—timers, promises, events—to automatically trigger UI updates. With zoneless, this implicit mechanism is gone. Angular no longer monitors every async operation; instead, updates happen only when the framework knows something changed.

**Consider** using [Zoneless](https://v21.angular.dev/guide/zoneless).

:::info Why?
Opting for Zoneless mode is a future-proof choice as Angular is moving towards this direction. While the performance enhancement is minimal (especially if you have already followed best practices, e.g. [`OnPush` change detection](../component/typescript-class#change-detection)), it can improve developer experience by providing clearer stack traces. Additionally, it'll help reduce bundle size and startup time.
:::

:::tip
To migrate existing code to Zoneless mode, check for legacy code using `NgZone` or relying on implicit change detection after timers, HTTP calls, or event handlers. The most encountered problem is a piece of UI that does not reflect a state change until you interact with it. If state changes but the DOM stays stale, you can use debugging tools or logs to confirmand reactive patterns mentioned above to fix it.
:::

:::warning Exceptions
When using third-party libraries that depend on `zone.js`, you may need to keep zone-based change detection enabled. Some libraries or tools might not function correctly without it, so evaluate compatibility before switching to Zoneless mode.
:::

### Testing

**Do** provide zoneless change detection in tests.
- ✅ `provideZonelessChangeDetection()` in `TestBed.configureTestingModule()`
- ❌ `fixture.detectChanges()`

