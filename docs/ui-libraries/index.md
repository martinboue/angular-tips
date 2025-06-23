---
sidebar_position: 5
---
# UI libraries

Angular has a rich ecosystem of UI libraries to help you build accessible user interfaces quickly. Choosing a UI library is a crucial decision that can significantly impact your development speed and your project's maintainability. It's important to select libraries that are well-maintained and fit your project's needs, especially in terms of design.

We can split UI libraries into two categories, UI components libraries and headless UI libraries.

[UI components libraries](#ui-components) provide ready-to-use and pre-styled components, which are more or less customizable depending on the library.  Components are generally easy to use, integrates well with each other and have a consistent look and feel. These libraries are great for quickly building user interfaces, but lack of flexibility if you want specific design or behavior.

[Headless UI libraries](#headless-ui) offer functional UI logic without any styling or markup, allowing developers full control over how components look, while still handling how they behave. They usually come with a set of primitives that handle behavior logic, state management and accessibility, giving you maximum visual flexibility. These libraries are great for building custom components that fit your design system or specific requirements, but require more effort to implement and style.

:::note
Headless UI libraries are not so popular and advanced in the Angular ecosystem compared to others like React (see [shadcn](https://ui.shadcn.com/), [Radix](https://www.radix-ui.com/), [TanStack](https://tanstack.com/), [HeadlessUI](https://headlessui.com/), etc.). There aren't many viable solutions, but they are evolving and still worth considering.
:::

## UI components

**Consider** using one of the following:

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

**Consider** using the following:

✅ **[Angular CDK](https://material.angular.dev/cdk)**:
The Component Development Kit (CDK) is a set of low-level primitives for building UI components, such as overlays, drag-and-drop, and accessibility features.

- ✅ High quality primitives
- ✅ Well-maintained by the Angular team
- ❌ Not a complete headless UI library, insufficient on its own

:::tip
Angular CDK can be used with any UI component library, not just Angular Material. It's useful for building custom components that your component library doesn't provide.
:::

## Icons

**Consider** using one of the following:

✅ **[Material Icons](https://fonts.google.com/icons)**

✅ **[Prime Icons](https://primeng.org/icons)**

## Charts

**Consider** using one of the following:

✅ **[ngx-charts](https://swimlane.gitbook.io/ngx-charts)**