---
sidebar_position: 10
---
# Libraries

Below is a curated list of production-ready and battle-tested libraries recommended for Angular developers, with their pros and cons. These libraries are widely used in the community and can help you build robust, efficient applications faster.

:::info
If a library is not listed here, it doesn't mean it's bad or not recommended. It just means that we haven't had the chance to evaluate it yet.
:::

## General guidelines

**Do** use as few dependencies as possible. 

:::info Why?
Each dependency you add to your project increases the complexity, the size of your application and the maintenance cost. Keeping your dependencies up to date will be more and more time consuming. It's important to carefully evaluate each dependency and only include those that are absolutely necessary and worth the trade-off.
:::

**Avoid** mixing multiple libraries that serve the same purpose.

## UI components

✅ **[Angular Material](https://material.angular.dev/)**: the official Angular component library that implements Material Design. It provides essential UI components and is well-maintained by the Angular team.

- ✅ High quality components
- ✅ Always up to date with Angular releases
- ✅ Strong accessibility
- ✅ Good documentation
- ❌ Limited customization, enforced Material Design style
- ❌ Some missing components (Input file, tree table, ...)

✅ **[PrimeNG](https://primeng.org/)**: Feature-rich, customizable UI component suite with a wide variety of widgets and themes, maintained by PrimeTek.

- ✅ Wide range of components
- ✅ Highly customizable
- ✅ Tailwind CSS integration
- ❌ Paid Long Term Support (LTS)
- ❌ Good quality components, but not as polished and stable as Angular Material

✅ **[NG-ZORRO](https://ng.ant.design/)**: Feature-rich UI component library based on Ant Design.

- ✅ Wide range of components
- ❌ Less popular, smaller community

❌ **[Spartan](https://www.spartan.ng/)**: promising library but not yet production-ready, you should avoid it for the time being.

## Headless UI

Headless UI library provide functional UI logic without any styling or markup, allowing developers full control over how components look, while still handling how they behave. They usually come with a set of primitives that handle behavior logic, state management and accessibility, giving you maximum visual flexibility.

:::info
Headless UI libraries are not so popular and advanced in the Angular ecosystem compared to others like React (see [shadcn](https://ui.shadcn.com/), [Radix](https://www.radix-ui.com/), [TanStack](https://tanstack.com/), [HeadlessUI](https://headlessui.com/), etc.). There aren't many viable solutions, but they are evolving and still worth considering.
:::

✅ **[Angular CDK](https://material.angular.dev/cdk)**:
The Component Development Kit (CDK) is a set of low-level primitives for building UI components, such as overlays, drag-and-drop, and accessibility features.

- ✅ High quality primitives
- ✅ Well-maintained by the Angular team
- ❌ Not a complete headless UI library, insufficient on its own

:::tip
Angular CDK can be used with any UI component library, not just Angular Material. It's useful for building custom components that your component library doesn't provide.
:::

## Styling

✅ **[Tailwind CSS](https://tailwindcss.com/)**: utility-first CSS framework that provides low-level utility classes to build custom designs.

✅ **[Bootstrap](https://getbootstrap.com/)**: CSS framework that provides a set of pre-designed components and utilities.

❌ **[PrimeFlex](https://primeflex.org/)**: project has stopped and no longer receive development or maintenance.

## State management

✅ **[NgRx](https://ngrx.io/)**: reactive state management library that provides a global store inspired by Redux, but also a simpler signal-based store.

❌ **[TanStack Query](https://tanstack.com/query/latest/docs/framework/angular/overview)**: the Angular adapter is not yet production-ready, but worth keeping an eye on.

❌ **[Akita](https://opensource.salesforce.com/akita/)**: no longer maintained.

## OpenAPI code generation

✅ **[Orval](https://orval.dev/)** with [Angular client](https://orval.dev/guides/angular)

- ✅ Zod integration
- ✅ Mocking support

✅ **[OpenAPI Generator](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)** with [typescript-angular generator](https://openapi-generator.tech/docs/generators/typescript-angular)

- ❌ Requires Java to run
- ❌ Infrequent updates of the typescript-angular generator

## Internationalization (i18n)

✅ **[Angular built-in i18n](https://angular.dev/guide/i18n)**: compile-time internationalization library that is part of Angular.

- ❌ Does not support runtime language switching (needs window refresh)

:::tip
Angular i18n generates translation files from your source code but does not merge existing translations files with new ones. We recommend using [ng-extract-i18n-merge](https://github.com/daniel-sc/ng-extract-i18n-merge) to handle that.
:::

✅ **[Transloco](https://jsverse.gitbook.io/transloco)**

- ✅ Supports runtime language switching

✅ **[ngx-translate](https://ngx-translate.org/)**:

- ✅ Supports runtime language switching

## Icons

✅ **[Material Icons](https://fonts.google.com/icons)**

✅ **[Prime Icons](https://primeng.org/icons)**

## Authentication

✅ **[Angular Auth OIDC Client](https://angular-auth-oidc-client.com)**

## Charts

✅ **[ngx-charts](https://swimlane.gitbook.io/ngx-charts)**

## Testing

### Testing framework

:::warning
The Angular testing ecosystem is currently in a transitioning state. Officialy supported tools are deprecated, and the community is actively exploring modern alternatives. Expect recommendations and best practices to evolve in the near future as the ecosystem stabilizes.
:::

✅ **[Karma](https://karma-runner.github.io/)** is the pre-installed test runner with [Jasmine](https://jasmine.github.io/) as the assertion library.

- ✅ Officially supported by Angular
- ✅ Real browser testing
- ❌ Deprecated and no longer maintained
- ❌ Slow
- ❌ Angular support will probably drop in future releases

:::info Why?
Even if Karma is deprecated, it is still a valid option as it's the only officially supported framework, and it gets the job done. Other options may or may not be supported in the future, they are currently not as well integrated with Angular and may require additional configuration to work.
:::

✅ **[Vitest](https://vitest.dev/)**

- ✅ Fast
- ❌ Not officially supported by Angular
- ❌ Not real browser testing (uses JSDOM)

✅ **[Jest](https://jestjs.io/)**

- ✅ Fast
- ❌ Not officially supported by Angular
- ❌ Not real browser testing (uses JSDOM)

✅ **[Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)**

- ✅ Real browser testing
- ❌ Not officially supported by Angular

### End-to-end testing (e2e)

✅ **[Playwright](https://playwright.dev/)**

✅ **[Cypress](https://docs.cypress.io/)**

✅ **[Puppeteer](https://pptr.dev/)**

✅ **[WebdriverIO](https://webdriver.io/)**

✅ **[Nightwatch.js](https://nightwatchjs.org/)**

❌ **[Protractor](https://www.protractortest.org/)**: deprecated and no longer maintained.
