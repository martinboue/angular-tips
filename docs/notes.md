---
draft: true
sidebar_position: 0
---
# Notes
- avoid using switch default case with enums or union types (i.e. fixed set of values)
    - why? if you add a new case, the missing case will be detected by the compiler unless you have a default case
- seperation of concern (the art of creating reusable components)
    - abstraction techniques
        - never polluting generic components with specific logic, use input/outputs, generics, content projection
- use custom data in route to pass static data to components
- strategy pattern for component
    - routing vs if/switch vs NgComponentOutlet/ViewContainerRef
- performance
    - nothing then virtual scroll or client pagination then backend pagination
    - rendering
        - when to use CSR vs SSR vs SSG
- features 
    - dynamic page titles and meta tags
    - prevent user from leaving the page with unsaved changes
    - auth
        - recommend tool : angular auth oidc client
        - inject token by configuring openapi generator or use interceptor
        - where to store token?
        - how to inject token in requests
        - openapi config?
        - recommend https://www.npmjs.com/package/angular-auth-oidc-client or other?
    - logging
    - http error handling: add interceptor example.
    - Redirecting to 404 not found page
        - for unknown route
        - on resolver fail
    - Controlling user access / preventing unauthorized access
        - Protect routes
            - Verify user is authenticated (guard) 
            - Verify user has a given role (guard)
        - Hide UI elements (custom directive)
    - custom field with control value accessor
- maintenance : use migration guide and schematics
- dev workspace
    - IDE
        - setup for vscode or intelliJ (plugins, conf, ...)
        - prettier
        - linter
    - .gitignore
        - DO commit package-lock.json
        - use angular default .gitignore
- testing
- versioning
    - use semver
    - use npm version major/minor/patch
    - how to show version to user:
        - do NOT import package.json to display version
        - use postversion script
- going further, share useful links :
    - git commit convention
- template
    - use layout components
    - use content projection
    - ng container ?
    - ng template ?
    - use @let
    - @for: use @empty, $last and $first
    - passing array as input and change detection not triggered when adding or removing elements in array, you need to create a new array
- details or add external link on REST API principles
- form
    - Template vs ReactiveForm
    - how to translate enums to readable text
    - how to use mat-select and reactive form to display a list of objects (id or object itself as option value ?)
    - how to reuse form for both edit and readonly page
    - how to split form in multiple components
    - leverage grouping controls to disable/enable a group of controls, checking a validity, ...
- typing
    - use `?` for optional properties or method inputs
    - use `Readonly<T>` or readonly T or "as const"
    - use satisfies
    - type vs interface
    - protected
    - type inference
- when to use and not to use Angular
- JavaScript details
    - false/true vs truthy/falsy
    - spread operator on list or object: `...myVar`
- component
    - use angular cli
        - short: ng g c my-comp
    - use standalone, never NgModule
    - component extending another component or directive
    - use host, view and viewChild signals instead of @Host, @View and @ViewChild decorator
    - contentChild and contentChildren
    - inject(DOCUMENT) and WINDOW instead of document and window
- reactivity
    - avoid setTimeout()
    - signals
        - mySignal.asReadonly()
    - rxjs 
        - common operators
        - subscritions
            - when and when not to unsubscribe
            - use async pipes
            - use takeUntilDestroyed instead of saving subscription and unsubscribe in ngOnDestroy
    - interoperability
- dependency injection
    - overriding injection token
    - forwardRef
    - different injection tokens (useClass, useExisting, ...)
- i18n
    - date and time formatting (date pipe)
    - number formatting (number pipe)
- angular material : 
    - type dialog data
    - how to override styles and how not to
        - override mixin
        - system css variables
        - private implementation: css variables, ::ng-deep, !important, @layer, ...
    - tailwind css:
        - do not dynamically create classes (because detected at compile time)