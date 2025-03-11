---
sidebar_position: 6
---
# HTTP

This section outlines best practices for communicating efficiently with a server, from design to integration.

## General guidelines

**Do** send as few requests as possible.
- ❌ send requests in a loop.

**Avoid** sequential requests.

**Do** send as little data as possible in responses.
- ❌ fetch a collection for just one item.
- ❌ send a complete object but use only its id and name.
- ✅ send only useful data.

## Going further

Jump into details in the following sections.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```