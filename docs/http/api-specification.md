---
sidebar_position: 2
---
# API specification

An API specification is a language-agnostic contract that define how a client and a server communicate.
It describes the paths that can be used, their input parameters and output formats.

## General

**Do** define an API specification.

:::info Why?
A clear API contract improves readability, reduce integration issues and helps different teams work independently.
Because an API specification is language-agnostic, it allows consumers to easily interact with the API without needing to know or understand its implementation details.
:::

**Consider** writting a specification file instead of generating one from your source code.

:::info Why?
Even though it's tempting and seems faster, generating a specification file can create a bottleneck that could slow down team's productivity, as consumers may wait for the final implementation, reviewed and merged, before plugging in.

On the another hand, writting your own specification file makes simultaneous work easier, consumers can start their developments as soon as the API is defined.
This technique also has the great advantage of encouraging you to design your API before implementing it, focusing on business logic.

Also note that having a simple file is easier to deal with in your build pipelines.
:::

**Do** generate models and HTTP clients from API specifications.

:::info Why?
Having a document that describes how to use the API is great, but making sure it's used correctly is even better.
In addition to saving you time, this technique grants you type safety. If a breaking changes is made to the API, you'll detect it at compile time.
You ensure that the data structures used in your code always match the expected format.
:::

## OpenAPI

We recommend using [OpenAPI](https://www.openapis.org/) standard to describe your API, and [openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli) npm package to generate clients and models.

:::tip
You can check out an interactive example of an API specification file on [Swagger Editor](https://editor.swagger.io/).
:::

Install the dependency by running:

```
npm install @openapitools/openapi-generator-cli
```

then generate clients and models with:

```
openapi-generator-cli generate -i server/api.yaml -g typescript-angular -o src/app/shared/openapi --additional-properties=fileNaming=kebab-case,stringEnums=true
```

:::info Command break down
- `-i server/api.yaml` is the input file, the OpenAPI specification.
- `-g typescript-angular` indicates that you want to generate Angular files.
- `-o src/app/shared/openapi` is the ouptut, where all files will be generated.
- `--additional-properties` are optional configurations, we recommend setting `fileNaming=kebab-case` and `stringEnums=true`.

More details on the OpenAPI Angular generator in the [official documentation](https://openapi-generator.tech/docs/generators/typescript-angular).
:::

Generated files should not be committed or manually modified.

```txt title=".gitignore"
src/app/shared/openapi
```

You can use `postinstall` script to automatically regenerate files after running `npm install`.

```json title="package.json"
{
  "scripts": {
    "generate": "openapi-generator-cli generate -i server/api.yaml -g typescript-angular -o src/app/shared/openapi --additional-properties=fileNaming=kebab-case,stringEnums=true",
    "postinstall": "npm run generate"
  }
}
```

You can now inject generated HTTP clients in your components and import the models.

