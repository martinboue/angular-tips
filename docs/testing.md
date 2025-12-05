---
sidebar_position: 10
---
# Testing

Testing is a crucial part of software development, especially for large applications, as it improves reliability and maintainability. 

## Testing frameworks

**Do** use a testing framework.

- ✅ [Vitest](https://vitest.dev/)

:::info Why?
The Angular testing ecosystem has completed its transition. Karma and Jasmine have been replaced by Vitest as the recommended and default testing framework in Angular v21. While legacy projects may still use Karma/Jasmine, new projects should adopt Vitest for better performance and modern tooling.

Vitest offers a fast and efficient testing experience with support for both simulated and real browser environments. It is actively maintained, officially supported by Angular and integrated directly into the Angular CLI.
:::

- ❌ [Karma](https://karma-runner.github.io/) and [Jasmine](https://jasmine.github.io/)

:::info Why?
Karma has been the default test runner for Angular applications for many years. However, it has been deprecated in 2023 and is no longer maintained. Vitest replaced it as the default testing framework in Angular in v21, and Angular's support for Karma/Jasmine will drop in future releases.

You can still use Karma and Jasmine for existing projects, but you will most likely need to migrate to Vitest in the future to ensure compatibility with newer Angular versions. For new projects, you should directly start with Vitest.
:::

- ❌ [Jest](https://jestjs.io/)
- ❌ [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)

:::info Why?
Jest and Web Test Runner were evaluated as alternatives to Karma/Jasmine but were rejected in favor of Vitest in Angular v21.
:::

## End-to-end testing (e2e)

**Consider** e2e testing for critical user flows and complex interactions.

**Do** use an e2e testing tool.

- ✅ [Playwright](https://playwright.dev/)
- ✅ [Cypress](https://docs.cypress.io/)
- ✅ [Puppeteer](https://pptr.dev/)
- ✅ [WebdriverIO](https://webdriver.io/)
- ✅ [Nightwatch.js](https://nightwatchjs.org/)
- ❌ [Protractor](https://www.protractortest.org/): deprecated and no longer maintained.
