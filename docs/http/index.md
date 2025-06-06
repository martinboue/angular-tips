---
sidebar_position: 9
---
# HTTP

This section outlines best practices for communicating efficiently with a server, from design to integration.

## General guidelines

**Do** send as few requests as possible.
- ❌ Send requests in a loop.

:::info Why?
Sending too much requests can lead to performance issues. Consider redesigning your API and aim for a single request that retrieves all the necessary data.
:::

**Avoid** sequential requests.

:::info Why?
Sequential requests can lead to performance issues and increased latency. Consider redesigning your API into a single request, or parallel requests.
:::

**Do** send as little data as possible in responses.
- ❌ Fetch a collection for just one item.
- ❌ Send a complete object but use only its id and name.
- ✅ Send only useful data.

:::info Why?
Sending too much data can lead to performance issues, increased bandwidth usage and slower response times. This is particularly true for low-end and mobile devices, or if your application is used in a location with poor network coverage. Remember to use paging, filtering and selecting the minimum required fields.
:::

**Do** send HTTP requests with `HttpClient`.

- ❌ `new XMLHttpRequest()`
- ❌ `fetch('/api/users')`
- ✅ `this.httpClient.get<User[]>('/api/users')`
- ✅ `this.httpClient.post<User>('/api/users', newUser)`

:::info Why?
`HttpClient` is the official recommendation for communicating with a server, its designed to be easily testable and supports the use of interceptors.
:::

## Going further

Jump into details in the following sections.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```