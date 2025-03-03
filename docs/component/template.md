---
sidebar_position: 2
draft: true
---
# HTML template

Notes:
- use layout components
- use content projection
- ng container ?
- ng template ?

## General
- use as few tags as possible
- use adequat tags
    - `<a>` with routerLink for links, not button with router.navigateByUrl
    - button for clickable elements
- group related tags in code blocks and add comments for readability
- prefer self closing tag, ex: `<app-my-comp/>` instead of `<app-my-comp></app-my-comp>`
- use @let

## Data binding
- attribute binding : always use `[field]="value"` instead of `field="{{ value }}"`
    - exception : mixing variables and constants, ex : `class="prefix-{{ state }}"`
- prefer two way binding

## Conditional rendering
- Prefer control flow over ngIf, ngFor and ngSwitch
  - @for: use @empty, $last and $first

## Common issues
- avoid function call in template
- never make heavy compute in template 
