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
