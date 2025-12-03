---
sidebar_position: 13
draft: true
---

# Performance

Notes:
- Server side rendering
- Static site generation / prerendering
- Hybrid rendering
- Deferrable views
- Hydration
- Incremental hydration
- Dispatch event or event replay
- afterNextRender / afterEveryRender
- Zoneless

## General guidelines

**Avoid** over-optimizing or prematurely optimizing.

:::info Why?
In addition to being a potential waste of time, premature optimizations can introduce unnecessary complexity, making your code harder to maintain. Instead, focus on building a functional application first, then measure its performance to identify bottlenecks and optimize accordingly.
:::

**Consider** not using server-side rendering (SSR).

:::info Why?
SSR is beneficial for SEO and initial load performance, but it adds significant complexity to your application, such as:
- More complex deployment and hosting. A Node.js server must be deployed to render pages and it needs to be maintained, monitored, scaled, etc.
- Component code must be SSR-compatible. When rendering on the server, components cannot access browser-specific APIs such as `localStorage`, `window` or `document`.

If your application does not have strict SEO requirements (e.g. a private app not intended for public customers) then SSR may not be necessary and you can stick with client-side rendering (CSR).
:::

**Do** use Angular latest features.
- ✅ Signals
- ✅ Control flow (@if, @for, etc.)
- ✅ OnPush change detection strategy
- ...

## Displaying a large list

**Avoid** creating too many DOM elements.

:::info Why?
Rendering a large number of DOM elements can significantly slow down your application.
:::

**Avoid** using `track $index` in `@for` loop for dynamic collections.
- ❌ `track $index` for a collection with items that can be reordered, added, or removed.
- ✅ `track item.myUniqueKey` is always preferred.
- ✅ `track $index` is fine if the collection is static and items don't have a unique key.

**Consider** using the simplest display strategy that meets performance requirements, in this order:
1. ✅ Load everything and render everything (for small collections)
2. ✅ Load everything but render a subset (for light-weight collections in memory)
  - client-side pagination
  - client-side virtual scrolling
3. ✅ Load a subset and render a subset (for large collections)
  - server-side pagination
  - server-side virtual scrolling

:::info Why?
Requesting a server to load chunks of data on the browser can be costly to implement and maintain, requiring additional development on both the client and the server. Sometimes, fetching a long list from your server is not the problem but rendering DOM elements is. In that case, fetching the complete data on the client but only displaying a subset (usually the visible items in the viewport) is enough.
:::

## Reducing initial load time

Initial load time is mainly impacted by the size of the application bundle, the larger the bundle, the longer it takes to download, parse and execute it.

It is only once the Angular application has been fully initialized that it can make HTTP requests to fetch data from your server. 

### Lazy loading at route level

**Do** lazy load routes, see [lazy loading](./routing.md#lazy-loading).

### Lazy loading at component level

**Consider** using `@defer` blocks to lazy load components that are not immediately needed.

```html title="✅ defer"
@defer {
  <app-user-details/>
} @loading {
  <p>Loading...</p>  
} @placeholder {
  <p>Placeholder</p>
}
```

More about deferred loading in the [Angular documentation](https://v21.angular.dev/guide/templates/defer).

:::tip
Useful for "below the fold"
:::

:::warning
Might have some exceptions?
- should the "initial page" be lazy loaded?
- do not "over" lazy load
:::

**Consider** using incremental hydration (`@defer (hydrate ...)`).

```html title="✅ incremental hydration"
@defer (hydrate on viewport) {
  <app-user-details/>
}
```

More about incremental hydration in the [Angular documentation](https://v21.angular.dev/guide/incremental-hydration).

:::tip
Useful for "above the fold"
:::

:::warning
It only works with server-side rendered pages.
:::

### Rendering

**Consider** using static site generation (SSG) for static content.

:::info
SSG, also referred as prerendering or build-time rendering, can only be used for static content.
:::

**Consider** using server-side rendering (SSR) for dynamic content.

:::info Why?
SSR helps load time because:
- TODO
:::

**Consider** using hybrid rendering at route level.

## Server-side rendering (SSR)

- tips on making components SSR-compatible
- avoid browser-specific APIs (e.g. `localStorage`, `window`, `document`)
- `isPlatformBrowser`/`isPlatformServer`?
- `TransferState`?

## Measuring

- lighthouse for core web vitals
- angular devtools chrome extension
- bundle analyzer