---
sidebar_position: 4
sidebar_label: Error handling
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

```ts title="✅ Display error messages in a toaster"
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toasterService = inject(ToasterService);
  return next(req).pipe(
    tap({
      error: (error) => {
        toasterService.addError(error);
      }
    })
  );
};
```
