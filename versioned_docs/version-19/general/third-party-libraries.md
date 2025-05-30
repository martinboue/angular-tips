---
sidebar_position: 5
---
# Third-party libraries

In the next pages, we will mention some third-party libraries that can help you build robust Angular applications efficiently. Each are production-ready and battle-tested libraries, with their pros and cons, that are widely used by the community.

:::note
If a library is not mentionned, it doesn't mean it's bad or not recommended. It just means that we haven't had the chance to evaluate it yet. You can suggest a library on GitHub, see [how to contribute](../contributing.md).
:::

## General guidelines

**Do** use as few dependencies as possible. 

:::info Why?
Each dependency you add to your project increases the complexity, the size of your application and the maintenance cost. Keeping your dependencies up to date will be more and more time consuming. It's important to carefully evaluate each dependency and only include those that are absolutely necessary and worth the trade-off.
:::

**Do** choose a library carefully and knowingly.

:::info Why?
Libraries can rapidly evolve and change over time. They can be deprecated, abandoned, refactored, or replaced by better alternatives.
Having an outdated or poorly maintained library in your project can lead to security vulnerabilities, bugs, and compatibility issues that prevent you from upgrading to the latest version of Angular or other libraries.

Replacing a library can be a painful and time-consuming process, especially if it is deeply integrated into your application. It can require significant refactoring and testing to ensure that everything works correctly with the new library.
:::

:::tip
Beware of trends and hype cycle, when building a long-term large application, aim for libraries that are:
- Functional: offers the features you need
- Mature and stable: tried and tested by others
- Actively maintained: regular improvements, bug fixes, security patches, ...
- Long-term supported (LTS): guaranteed support for a certain period of time
- Compatible: with other tools in your application
- Popular: for useful community resources and to attract/keep qualified developers. A library with a large user base is more likely to be maintained in the long run.

Run tests or proof of concept to compare solutions and ensure that the chosen one is right for you.
:::

**Avoid** mixing multiple libraries that serve the same purpose.

:::info Why?
Using multiple libraries that offer similar functionality can lead to confusion and potential conflicts, making your code harder to maintain and understand. It also increases the bundle size of your application, which can impact performance and loading times.
:::