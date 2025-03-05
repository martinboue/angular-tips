---
sidebar_position: 5
title: Error handling
---
# HTTP error handling

**Do** use a generic error response model.

```ts title="✅ Example"
interface ErrorResponse {
  code: string;
  error: string;
  message: string;
}
```

**Do** use an interceptor to catch and handle error responses.
