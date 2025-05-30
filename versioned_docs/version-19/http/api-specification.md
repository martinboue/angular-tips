---
sidebar_position: 1
---
# API specification

An API specification is a language-agnostic contract that define how a client and a server communicate.
It describes the paths that can be used, their input parameters and output formats.

## General guidelines

**Do** define an API specification.

:::info Why?
A clear API contract improves readability, reduce integration issues and helps different teams work independently.
Because an API specification is language-agnostic, it allows consumers to easily interact with the API without needing to know or understand its implementation details.
:::

**Consider** writing a specification file instead of generating one from your source code.

:::info Why?
Even though it's tempting and seems faster, generating a specification file can create a bottleneck that could slow down team's productivity, as consumers may wait for the final implementation, reviewed and merged, before plugging in.

On the another hand, writing your own specification file makes simultaneous work easier, consumers can start their developments as soon as the API is defined.
This technique also has the great advantage of encouraging you to design your API before implementing it, focusing on business logic.

Also note that having a simple file is easier to deal with in your build pipelines.
:::

## OpenAPI

**Do** use [OpenAPI](https://www.openapis.org/) standard to describe your API.

:::tip
You can check out an interactive example of an API specification file on [Swagger Editor](https://editor.swagger.io/).
:::

## Code generation

**Do** generate models and HTTP clients from your API specification (see [recommended libraries](#libraries)).

:::info Why?
Having a document that describes how to use the API is great, but making sure it's used correctly is even better.
In addition to saving you time, this technique grants you type safety. If a breaking changes is made to the API, you'll detect it at compile time.
You ensure that the data structures used in your code always match the expected format.
:::

**Do** put generated files in [`shared` folder](../general//folder-structure.md#shared-folder).

**Avoid** committing or modifying generated files.

```txt title="✅ .gitignore"
src/app/shared/openapi
```

**Consider** using `postinstall` script to automatically generate files after running `npm install`.

```json title="✅ package.json"
{
  "scripts": {
    "postinstall": "npm run generate",
    "generate": "<command to generate clients and models>"
  }
}
```

### Libraries

**Consider** using one of the following:

✅ **[Orval](https://orval.dev/)** with [Angular client](https://orval.dev/guides/angular)

- ✅ Zod integration
- ✅ Mocking support

✅ **[OpenAPI Generator](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)** with [typescript-angular generator](https://openapi-generator.tech/docs/generators/typescript-angular)

- ❌ Requires Java to run
- ❌ Infrequent updates of the typescript-angular generator
