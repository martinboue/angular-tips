---
sidebar_position: 10
---
# Testing

Testing is a crucial part of software development, especially for large applications, as it improves reliability and maintainability. 

:::warning
The Angular testing ecosystem is currently in a transitioning state. Officialy supported tools are deprecated, and the community is actively exploring modern alternatives. Expect recommendations and best practices to evolve in the near future as the ecosystem stabilizes.
:::

## Testing frameworks

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
- ✅ Simulated and real browser testing
- ❌ Experimental Angular support

✅ **[Jest](https://jestjs.io/)**

- ✅ Fast
- ❌ Experimental Angular support
- ❌ No real browser testing

✅ **[Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)**

- ✅ Real browser testing
- ❌ Experimental Angular support

## End-to-end testing tools (e2e)

✅ **[Playwright](https://playwright.dev/)**

✅ **[Cypress](https://docs.cypress.io/)**

✅ **[Puppeteer](https://pptr.dev/)**

✅ **[WebdriverIO](https://webdriver.io/)**

✅ **[Nightwatch.js](https://nightwatchjs.org/)**

❌ **[Protractor](https://www.protractortest.org/)**: deprecated and no longer maintained.
