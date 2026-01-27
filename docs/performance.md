---
sidebar_position: 13
sidebar_class_name: new
---

# Performance

Performance is a critical aspect of front-end development that directly impacts user experience and satisfaction. A fast and responsive application can lead to higher user engagement, better retention rates, and improved SEO rankings. Conversely, a slow application can frustrate users, leading to increased bounce rates and lost opportunities.

## General guidelines

**Do** define performance requirements.
- ❌ Unrealistic, vague or ambiguous performance goals, such as "fast" or "responsive".
- ✅ Realistic, clear and measurable performance goals, such as "load time under 2 seconds".

:::info Why?
What is considered "fast" or "slow" can vary greatly depending on the context and the use case of the application. Defining clear performance requirements helps set expectations and provides a benchmark against which to measure the application's performance. This can include metrics such as load time, time to interactive, and responsiveness.
:::

**Do** measure performance before and after optimizations.
- ✅ [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- ✅ [Angular DevTools](https://chromewebstore.google.com/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)
- ✅ Browser profiling tools
- ✅ Application Performance Monitoring (APM) tools
- ✅ [Bundle Size Analyzer](https://esbuild.github.io/analyze/)
- ...

:::info Why?
Front-end applications are often network-bound rather than CPU-bound. This means that the main performance bottleneck is often the time it takes to download resources from the server, rather than the time it takes to execute code on the client. Therefore, optimizing network performance (e.g., reducing bundle size, minimizing HTTP requests) is often more effective than optimizing CPU performance (e.g., micro-optimizations in code).

Measuring performance helps identify bottlenecks so that appropriate optimizations can be applied. It also helps verify that changes have the desired effect and do not introduce regressions.
:::

**Avoid** over-optimizing or prematurely optimizing.

:::info Why?
In addition to being a potential waste of time, premature optimizations can introduce unnecessary complexity, making your code harder to maintain. Instead, focus on building a functional application first, then measure its performance to identify bottlenecks and optimize accordingly.
:::

**Do** use Angular latest features.
- ✅ Signals
- ✅ Control flow (@if, @for, etc.)
- ✅ OnPush change detection strategy
- ...

## Displaying a large dataset

**Avoid** creating too many DOM elements.

:::info Why?
Rendering a large number of DOM elements can significantly slow down your application.
:::

**Avoid** using `track $index` in `@for` loop for dynamic collections.
- ❌ `track $index` for a collection with items that can be reordered, added, or removed.
- ✅ `track item.myUniqueKey` is always preferred.
- ✅ `track $index` is fine if the collection is static and items don't have a unique key.

**Consider** using the simplest display strategy that meets performance requirements.
- ✅ Small collections: load everything and render everything
- ✅ Medium-sized but light-weight collection: load everything but render a subset (e.g. client-side pagination or virtual scrolling)
- ✅ Large collection: load a subset and render a subset (e.g. server-side pagination or virtual scrolling)

:::info Why?
Requesting a server to load chunks of data on the browser can be costly to implement and maintain, requiring additional development on both the client and the server. Sometimes, fetching a long list from your server is not the problem but rendering DOM elements is. In that case, fetching the complete data on the client but only displaying a subset (usually the visible items in the viewport) is enough.
:::

## Reducing initial load time

Initial load time is mainly impacted by the size of the application bundle, the larger the bundle, the longer it takes to download, parse and execute it. It is only once the Angular application has been fully initialized that it can make HTTP requests to fetch data from your server. 

### Lazy loading

You can reduce the initial bundle size by deferring the loading of the non-essential parts of your application.

<details>
  <summary>What is lazy loading?</summary>
  
  Lazy loading is a design pattern that defers the loading of non-essential resources at the initial load time, resources include JavaScript modules, components, directives, pipes, and other code. Instead, these resources are loaded on demand when they are needed, such as when a user navigates to a specific route or interacts with a particular component. This approach helps reduce the initial bundle size, leading to faster load times and improved performance.
</details>

#### At route level

**Do** lazy load routes, see [lazy loading](./routing.md#lazy-loading).
- ❌ Eagerly load all routes.
- ❌ Lazy load all routes.
- ✅ Eagerly load landing pages.
- ✅ Lazy load non-essential routes.

:::warning
Do not overuse lazy loading at route level. In particular, avoid having nested lazy loaded routes on multiple levels, as this can lead to performance issues.
:::

#### At component level

**Consider** using deferred loading for below the fold content.

<details>
  <summary>What is deferred loading?</summary>
  
  Deferred loading is a technique that allows you to delay the loading of non-essential components until after the initial page load. This means that components that are not immediately visible to the user (e.g., those located below the fold) can be loaded asynchronously after the main content has been rendered. This approach helps improve the perceived performance of your application by prioritizing the loading of critical content first.

  `@defer` block is the lazy loaded fragment. The loading trigger can be configured (on idle, hover, viewport and more).

  `@placeholder` block is displayed before the loading is triggered.

  `@loading` block is displayed while the deferred content is being loaded.

  More about deferred loading in the [Angular documentation](https://v21.angular.dev/guide/templates/defer).
</details>

```html title="✅ defer"
@defer {
  <app-user-details/>
} @loading {
  <p>Loading...</p>  
} @placeholder {
  <p>Placeholder</p>
}
```

:::tip
This can be useful for components that are not immediately visible and non essential for the initial user experience.
:::

**Consider** using incremental hydration for above the fold content.

<details>
  <summary>What is incremental hydration?</summary>
  
  Incremental hydration is a technique that allows you to progressively hydrate server-rendered components on the client side. Instead of hydrating the entire page at once, which can be resource-intensive, you can defer hydration of non-essential components. These components are dehydrated initially, i.e. non-interactive, until a specific trigger occurs. This approach helps improve the perceived performance of your application by allowing users to interact with the page sooner, while non-essential components are hydrated later in the background.

  `@defer (hydrate on X)` block is the incrementally hydrated fragment. The hydration trigger can be configured (on idle, hover, viewport and more).

  Incremental hydration occurs on the initial page load only, it does not apply to subsequent navigations which are handled on the client-side.

  More about incremental hydration in the [Angular documentation](https://v21.angular.dev/guide/incremental-hydration).
</details>

```html title="✅ incremental hydration"
@defer (hydrate on viewport) {
  <app-user-details/>
} @placeholder {
  <p>Placeholder</p>
}
```

:::tip
This can be useful for components that are immediately visible but non essential for the initial user experience.
:::

:::warning
Incremental hydration can only be used for server-side rendered pages.
:::


### Rendering modes

**Consider** setting the most suitable rendering mode for each route with hybrid rendering.

```ts title="✅ app.routes.server.ts"
export const serverRoutes: ServerRoute[] = [
  {
    path: 'about',
    renderMode: RenderMode.Prerender, // SSG
  },
  {
    path: 'profile',
    renderMode: RenderMode.Client, // CSR
  },
  {
    path: '**',
    renderMode: RenderMode.Server, // SSR
  }
];
```

:::info Why?
Hybrid rendering allows you to choose the most appropriate rendering strategy (CSR, SSR, SSG) for each route in your application based on its specific requirements. This flexibility enables you to optimize performance and user experience for different parts of your application.
:::

#### Client-server rendering (CSR)

**Consider** using CSR by default.

<details>
  <summary>What is CSR?</summary>
  
  Client-side rendering (CSR) is a technique where the rendering of the web page is done entirely on the client side using JavaScript. When a user requests a page, the server sends a minimal HTML file along with JavaScript files. The browser then executes the JavaScript to render the content dynamically.
</details>

:::info Why?
CSR is simpler to implement and maintain compared to SSR and SSG, see [SSR](#server-side-rendering-ssr) for more details.
:::

#### Static site generation (SSG)

**Consider** using SSG for static content.

<details>
  <summary>What is SSG?</summary>
  
  Static site generation (SSG), also referred as prerendering or build-time rendering, is a technique where HTML pages are generated at build time rather than on each request. This means that when a user requests a page, the server can serve a pre-generated HTML file, which is typically much faster than generating the page on-the-fly.
</details>

:::warning
SSG can only be used for routes that do *not* require dynamic data or user-specific content.
:::

#### Server-side rendering (SSR)

**Consider** using SSR for dynamic content.

<details>
  <summary>What is SSR?</summary>
  
  Server-side rendering (SSR) is a technique where the rendering of the web page is done on the server on a per-request basis rather than on the client. When a user requests a page, the server generates the HTML for the page and sends it to the browser. The browser then displays the pre-rendered HTML.

  Only the first page loaded is rendered on the server, subsequent navigation within the application is handled on the client-side.
</details>

:::info Why?
SSR can significantly improve the initial load performance of your application by rendering the initial HTML on the server and sending it to the client. This allows users to see the content faster, as the browser can display the pre-rendered HTML while the Angular application is being bootstrapped in the background.
:::

:::warning Exceptions
SSR is beneficial for SEO and initial load performance, but it adds significant complexity to your application, such as:
- More complex deployment and hosting. A Node.js server must be deployed to render pages and it needs to be maintained, monitored, scaled, etc.
- Component code must be SSR-compatible. When rendering on the server, components cannot access browser-specific APIs such as `localStorage`, `window` or `document`.

If your application does not have strict SEO requirements (e.g. a private app not intended for public customers) then SSR may not be necessary and you can stick with client-side rendering (CSR).
:::

**Do** enable hydration and event replay when using SSR.

<details>
  <summary>What are hydration and event replay?</summary>
  
  Hydration is the process of taking a server-rendered HTML page and making it interactive on the client side by attaching event listeners and initializing the JavaScript application without having to re-render the entire page on the client. Without hydration, the server-rendered HTML would be static and non-interactive, Angular would have to destroy and re-create the entire DOM tree on the client, leading to a poor user experience.

  Event replay is the process of capturing and replaying user interactions that occur before the Angular application is fully bootstrapped on the client. This ensures that any user actions, such as clicks or form inputs, are not lost during the hydration process, between the time the server-rendered HTML is displayed and the time the Angular application becomes interactive.

  More about hydration and event replay in the [Angular documentation](https://v21.angular.dev/guide/hydration).
</details>

```ts title="✅ app.config.ts"
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    // ...
  ]
};
```

:::info Why?
Hydration and event replay significantly improves the perceived performance and user experience for SSR applications.
:::

**Consider** using dependency injection to access platform-specific implementations.
- ❌ `window` global object
- ✅ `window = inject(WINDOW)` imported from `@angular/core`
- ❌ `document` global object
- ✅ `document = inject(DOCUMENT)` imported from `@angular/core`

:::tip
You can provide custom implementations for different platforms. For example, you could inject a common abstract class:

```ts title="✅ component.ts"
cacheService = inject(CacheService);
```

and provide two implementations, one for the browser:
```ts title="✅ app.config.ts"
export const appConfig: ApplicationConfig = {
  providers: [{ provide: CacheService, useClass: BrowserCacheService }]
};
```

and one for the server:
```ts title="✅ app.config.server.ts"
const serverConfig: ApplicationConfig = {
  providers: [{ provide: CacheService, useClass: ServerCacheService }]
};
```

You can also use `isPlatformBrowser`, `isPlatformServer`, `afterNextRender` and `afterEveryRender` functions to conditionally run code only on the browser or on the server.
:::
