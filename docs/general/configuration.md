# Configuration

Proper configuration is the foundation of a maintainable and scalable Angular project. This guide covers essential configuration practices for modern Angular projects, from project setup and build optimization to environment management and code quality tools.

## General guidelines

**Avoid** using NgModule.
- ❌ `@NgModule`
- ✅ Standalone components, directives and pipes

:::info Why?
NgModule is a legacy feature that is not needed in modern Angular applications and replaced by standalone components, directives and pipes.

Standalone components are self-contained which is much easier to manage, and removing NgModules reduces boilerplate code and complexity.
:::

:::tip
You can run the [schematic migration](https://angular.dev/reference/migrations/standalone) to automatically convert your project to standalone.
:::

**Consider** using [Zoneless](https://angular.dev/guide/zoneless).

:::info Why?
Opting for Zoneless mode is a future-proof choice as Angular is moving towards this direction. While the performance impact is minimal (especially if you have already followed best practices, e.g. [`OnPush` change detection](../component/typescript-class#change-detection)), it can improve developer experience by providing clearer stack traces. Additionally, it'll help reduce bundle size and startup time.
:::

:::warning Exceptions
When using third-party libraries that depend on `zone.js`, you may need to keep zone-based change detection enabled. Some libraries or tools might not function correctly without it, so evaluate compatibility before switching to Zoneless mode.
:::

## Git

**Do** commit `package.json` and `package-lock.json` files.

:::info Why?
These files are essential for maintaining consistent dependencies across different environments and team members. Committing them ensures that everyone is using the same versions of packages, which helps prevent issues related to dependency mismatches.
:::

**Do** use `.gitignore` to exclude files that should not be committed.

```ignore title="✅ .gitignore"
# Generated Angular build files
/dist
# Installed dependencies
/node_modules
# Angular CLI cache
/.angular
# Code coverage reports
/coverage
# ...
```

## IDE

**Avoid** committing personal IDE settings that aren't project-specific.
- ❌ Personal themes, font sizes, or editor preferences
- ✅ Shared formatting rules and essential extensions

### Visual Studio Code

**Do** use Angular Language Service extension.

**Do** commit recommended extensions.

```json title="✅ .vscode/extensions.json"
{
  "recommendations": [
    "angular.ng-template",
    ...
  ]
}
```

### JetBrains

**Do** commit run configurations.

```ignore title="✅ .gitignore"
# Ignore ".idea" folder
/.idea/*
# Except run configurations
!/.idea/runConfigurations
```

:::info Why?
Committing run configurations ensures that all team members have access to the same project run/debug settings, which can improve consistency and reduce setup time for new developers.
:::

## Build

**Do** set commonly used scripts in `package.json`.

```json title="✅ package.json"
{
  "scripts": {
    "my-script": " node ./scripts/my-script.sh",
    ...
  }
}
```

**Do** leverage `pre` and `post` scripts in `package.json`.

```json title="✅ package.json"
{
  "scripts": {
    "prebuild": "npm run lint",
    "build": "ng build",
    "postbuild": "npm run archive"
  }
}
```

:::info Why?
`pre` and `post` scripts are executed automatically before and after the specified script, respectively.
For example, running `npm run build` will first run the `prebuild` script, then `build`, and finally `postbuild`.
:::

**Do** use the [`application` builder](https://angular.dev/tools/cli/build-system-migration).
```json title="✅ angular.json"
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          ...
        }
      }
    }
  }
}
```

**Do** keep optimization enabled for production builds.

```json title="✅ angular.json"
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "configurations": {
            "development": {
              "optimization": false,
              ...
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  }
}
```

:::note
Optimization is enabled by default for production builds.
:::

**Avoid** including development tools in production builds.
- ❌ Source maps in production
- ❌ Development dependencies in production bundles
- ❌ Console logs and debug statements

**Do** enable source maps in development.

```json title="✅ angular.json"
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "configurations": {
            "development": {
              "sourceMap": true,
              "namedChunks": true,
              ...
            }
          }
        }
      }
    }
  }
}
```

:::info Why?
Enabling source maps in development helps with debugging by providing a way to map the minified/compiled code back to the original source code. This makes it easier to identify and fix issues during development.
:::

## Linting & Code quality

**Avoid** inconsistent code formatting across the team.
- ❌ No formatting rules
- ❌ Different quote styles
- ❌ Inconsistent indentation

**Consider** using [ESLint](https://eslint.org/).

**Consider** using [Prettier](https://prettier.io/).

## Environments & Deployments

Angular provides a way to manage different environments (e.g. development or production) using environment files. These files can contain environment-specific variables that can be used throughout your application. 

:::note
The environment file is included in the build process which means you need to build your application for each environment you want to deploy to.
:::

**Do** use environment files for environment-specific values.
- ❌ `const API_URL = 'https://example.com'`
- ✅ `import { environment } from '@environments/environment'`

**Do** name environment files appropriately.
- ✅ `environment.ts` for local development
- ✅ `environment.<env name>.ts` for others, e.g. `environment.production.ts`

**Do** import only `environment.ts` file.
- ❌ `import { environment } from '@environments/environment.production';`
- ✅ `import { environment } from '@environments/environment';`

:::info Why?
This ensures that the correct environment file is used based on the file replacement configuration, preventing accidental usage of the wrong environment settings.
:::

**Do** configure file replacements in `angular.json`.

```json title="✅ angular.json"
{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}
```

### Proxy

**Do** use `proxy.conf.json` to resolve local [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) issues.

```json title="✅ proxy.conf.json"
{
   "/api": {
     "target": "http://localhost:8080",
     "secure": false
   }
 }
```

:::info Why?
Using a proxy configuration allows you to bypass CORS restrictions during development by redirecting API calls to a different server. This is particularly useful when working with APIs that are not hosted on the same domain as your Angular application.
:::

:::note
Angular proxy is only used for the local development server (i.e. `ng serve`). It is not used nor included in production builds. 
For production, you need to configure CORS on your server and/or use a reverse proxy like Nginx or Apache.
:::

