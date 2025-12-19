---
sidebar_position: 15
sidebar_class_name: new
---
# Upgrading

## How to upgrade Angular?

**Consider** keeping up to date with the latest Angular release.

:::info Why?
Staying up to date with Angular versions enhances maintainability and security while providing access to the latest features and performance improvements. Regular upgrades are easier to manage than to upgrade several versions at once.

Angular limits breaking changes, new features are always opt-in and obsolete features are deprecated for several major versions before being removed.
Angular releases a major version every six months, you can anticipate and plan for upcoming version upgrades. Third party libraries are often the most painful to upgrade, not Angular itself.
:::

**Consider** using Long-Term Support (LTS) versions.

:::note
Angular provides Long-Term Support (LTS) for each major release for 18 months.
:::

**Do** upgrade one major version at a time.
- ❌ From v18 to v20
- ✅ From v18 to v19, then from v19 to v20

**Do** verify your dependencies compatibility with the target Angular version.

**Do** use [migrations schematics](https://v21.angular.dev/reference/migrations) to automate the upgrade process.

**Do** use the [Angular Update Guide](https://v21.angular.dev/update-guide).

**Consider** reading the [changelogs](https://github.com/angular/angular/releases).

## What's coming in Angular?

This section provides an overview of upcoming features, improvements, and deprecations that developers can expect in future versions of Angular.

### Features coming soon

The most impactful experimental and developer preview features that will soon be stable:

- [Resources signals](https://v21.angular.dev/guide/signals/resource): a new way to manage asynchronous data in Angular applications using signals.
- [Signal forms](https://v21.angular.dev/essentials/signal-forms): a new approach to building forms in Angular using signals.
- [Angular Aria](https://v21.angular.dev/guide/aria): a headless library for building accessible components in Angular.

For more details, refer to the complete list of [unstable APIs](https://v21.angular.dev/api?status=6).

### Features coming later

The most impactful features planned for future versions of Angular:

- **Signal integration**: deeper integration of signals into Angular's core features (e.g. Router or HTTP).
- **Selectorless**: using components and directives with their names instead of selectors.

For more details, refer to the [Angular roadmap](https://v21.angular.dev/roadmap).

### Deprecated features

The most impactful features currently deprecated that will be removed in future versions of Angular:

- **Vitest and Web Test Runner support**: set to be removed in v22.
- **`ngIf`, `ngFor` and `ngSwitch` directives**: set to be removed in v22.
- **`@angular/animations` package**: set to be removed in v23.
- **Karma and Jasmine support**: unknown removal date.

For more details, refer to the complete list of [deprecated APIs](https://v21.angular.dev/api?status=8).
