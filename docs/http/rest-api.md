---
sidebar_position: 4
draft: true
---
# REST API

Notes:
- specific DTO for each endpoint
    - prefix by Create/Read/Update/Search
    - suffix by Request/Response

## Naming convention

**Do** use kebab-case for path, example `/best-practices`.

**Do** use snake_case or camelCase for query params, example `/users?first_name=Martin` or `/users?firstName=Martin`. Be consistent.

**Consider** using only resource names in path, not verbs.
- Bad: `/getUsers`, `/users/all` or `/users/delete`
- Good: `GET /users` or `DELETE /users`

:::tip Why?
The HTTP verb (GET, POST, ...) is already present to indicate the action to be performed.
:::

:::warning Some exceptions
TODO :
- Complex search request that requires a body are turned into POST request
- More than just CRUD actions on a single resource, examples: validating, reviewing, ... 
:::

**Do** use plural forms for resources.
- Bad: `GET /user` or `GET /user/:id`
- Good: `GET /users` or `GET /users/:id`

**Do** use the appropriate HTTP verb.
- `GET` for ...
- `POST` for ...
- `PUT` for ...
- `DELETE` for ...
