---
sidebar_position: 4
---
# REST API

This section gives you best practices for designing a REST API with clear naming conventions and data modeling strategies.
Adhering to consistent conventions across your API ensures better maintainability, scalability, and ease of use for developers.

## Naming convention

**Do** use kebab-case for path, examples:
    - ❌ `/bestPractices` 
    - ❌ `/best_practices` 
    - ✅ `/best-practices`

**Do** use snake_case or camelCase for query params, but be consistent, examples:
    - ❌ `/users?first-name=Martin` 
    - ✅ `/users?first_name=Martin` 
    - ✅ `/users?firstName=Martin`

**Consider** using only resource names in path, not verbs, examples:
- ❌ `/getUsers`,
- ❌ `/users/all`
- ❌ `/users/delete`
- ✅ `/users` with `GET` HTTP verb
- ✅ `/users` with `DELETE` HTTP verb

:::tip Why?
The HTTP verb (GET, POST, ...) is already indicates the action to be performed.
:::

:::warning Exceptions
It often happens that you don't have enough HTTP verbs to represent all the actions you can perform on the same resource in your application.
In that case, you can safely break this rule and append the action name at the end of the path. Examples:

- A complex search request that requires a body can be turned into a POST request.
- Additional domain-specific actions other than CRUD can also use the PUT method: validating, reviewing, submitting, ...
:::

**Do** use plural forms for resources.
- ❌ `GET /user`
- ✅ `GET /users`
- ❌ `GET /user/:id`
- ✅ `GET /users/:id`

**Do** use the appropriate HTTP verb.
- `GET` for retrieving one or multiple resources
- `POST` for creating a resource.
- `PUT` for updating a resource.
- `PATCH` for partially updating a resource.
- `DELETE` for deleting a resource.

**Do** use path to reflect the hierarchical relationship between resources, examples:
- ❌ `GET /users?companyId=1`
- ✅ `GET /companies/1/users`

## Data modeling

**Prefer** defining a dedicated a DTO for each endpoint rather than reusing the same one.

:::tip Why?
- Clarity: clearly indicates the expected input/output, making it easier for consumers.
- Flexibilty: allow different structure of the same data.
- Maintainability & evolutivity: future modifications on an endpoint will not break others.
- Performance: Transfer only the required fields in responses, reducing bandwidth.
:::

:::warning Exceptions
In some cases, you can safely reuse the same model in multiple endpoints to reduce redundancy. For example, when you need to reference an object in different DTOs using the exact same data structure, 
you can create a shared DTO (see `Company` in example below).
:::

**Do** prefix DTO names by the endpoint action (Create, Read, Update, Delete, Search, ...).

**Do** suffix DTO names by either `Request` or `Response`.

```ts title="❌ Bad example"
// In this example you need to mark almost every field as optional to match all use cases.
interface User {
    id?: number;
    name: string;
    age?: number;
    company?: Company;
}
```

```ts title="✅ Good example"
// Read DTO is complete and all fields can be marked as required.
interface ReadUserResponse {
    id: number;
    name: string;
    age: number;
    company: Company;
}

// Create DTO does not have an id yet and only company's id is needed.
interface CreateUserRequest {
    name: string;
    age: number;
    companyId: number;
}

// Search DTO can be lighter with only id and name.
interface SearchUserResponse {
    id: number;
    name: string;
}
```

## Response codes

**Do** use the appropriate HTTP response code.

### Successful responses
**Do** use `2XX` HTTP codes for successful responses, the most common are:

- `200 OK` when the request was successfully processed.
- `201 Created` when a ressource was successfully created.
- `202 Accepted` when an action has been queued for execution.
- `204 No Content` when an action was successfully completed but did not return any content.
- `206 Partially Returned` when only part of the collection is returned or the resource is incomplete.

### Client error responses

**Do** use `4XX` HTTP codes for client-side errors, the most common are:

- `400 Bad Request` when the request is malformed or violates business rules.
- `401 Unauthorized` when the client's authentication is invalid.
- `403 Forbidden` when the authentication is valid, but the client does not have permission to access the resource.
- `404 Not Found` when the requested resource could not be found.
- `404 Method Not Allowed` when the action requested by the HTTP verb cannot be performed on the specified resource.
- `409 Conflict` when there is a version mismatch between the client and the server for the resource.

### Server error

**Do** use `5XX` HTTP codes for server-side errors, the most common are:

- `500 Internal Server Error` when an unexpected, not anticipated server error occurs.
- `501 Not Implemented` when a feature is not implemented yet.
- `503 Service Unavailable` when the server is unable to respond.
- `504 Gateway Timeout` the server takes too long to respond.

