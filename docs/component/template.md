---
sidebar_position: 2
draft: true
---
# HTML template

- avoid function call in template
- never make heavy compute in template 
- use content projection
- use adequat tags
    - `<a>` with routerLink for links, not button with router.navigateByUrl
    - button for clickable elements
- use control flow
- use layout components
- use as few tags as possible
- attribute binding : always use `[field]="value"` instead of `field="{{ value }}"`
    - exception : mixing variables and constants, ex : `class="prefix-{{ state }}"`
- group related tags in code blocks and add comments for readability
- prefer self closing tag, ex: `<app-my-comp/>` instead of `<app-my-comp></app-my-comp>`
