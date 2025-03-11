---
sidebar_position: 2
---
# Template

This page outlines best practices for Angular component's templates, focusing on organization, readability, accessibilty and performance. By following these guidelines, you'll ensure your templates are maintainable, readable, and aligned with Angular's recommended patterns.

## General guidelines

**Do** use as few tags as possible.

**Consider** using meaningful semantic HTML elements instead of non-semantic ones.

```html title="❌ app.component.html"
<div class="header">
  <div>Welcome to my Website</div>
</div>
<div class="content">
  <div class="post">
    <div>Some important text</div>
    <div>More details here in this description.</div>
  </div>
</div>
<div class="footer">...</div>
```

```html title="✅ app.component.html"
<header>
  <h1>Welcome to my Website</h1>
</header>
<main>
  <section>
    <h2>Some important text</h2>
    <p>More details here in this description.</p>
  </section>
</main>
<footer>...</footer>
```

:::tip
Use `<div>` or `<span>` as last resort if no more suitable element exists, a few examples:
- `<nav>` for navigation bar or side menu.
- `<main>` for main content area.
- `<section>` for grouping content.
- `<h1>` to `<h6>` for titles.
- `<p>` for paragraphs.
- `<strong>` for important texts.
- `<a>` for links.
- `<ul>` and `<li>` for unordered lists.
- `<ul>` and `<ol>` for ordered lists.
- `<button>` for clickable elements.
- `<span>` for inline elements.
- `<div>` for block elements.
- ...
:::

**Consider** using self-closing tags instead of container tags.
- ❌ `<app-my-comp></app-my-comp>`
- ✅ `<app-my-comp/>`
- ✅ `<app-my-comp>Content</app-my-comp>` (valid with content projection)

:::info Why?
Closing tag isn't necessary and removing it improves readability.
It also indicates that the component does not have projectable content.
:::

**Do** use a proper indentation.

```html title="❌ app.component.html"
<section>
<h2>Title</h2><p>Then a paragraph.</p>
</section>
```

```html title="✅ app.component.html"
<section>
  <h2>Title</h2>
  <p>Then a paragraph.</p>
</section>
```

**Consider** grouping related tags into code blocks and adding descriptive comments.

```html title="❌ app.component.html"
<header>
  ...
</header>
<main>
  <section>
    ...
  </section>
  <section>
    ...
  </section>
</main>
```

```html title="✅ app.component.html"
<!-- Navigation bar and menu -->
<header>
  ...
</header>

<main>
  <!-- Full page latest news -->
  <section>
    ...
  </section>

  <!-- Related news carousel -->
  <section>
    ...
  </section>
</main>
```

## Data binding

**Consider** using dynamic property binding instead of text interpolation.
- ❌ `<app-card title="{{ user.name }}"/>`
- ✅ `<app-card [title]="user.name"/>`
- ✅ `<app-card title="Created by {{ user.name }}"/>` (valid when mixing static and dynamic content)

**Consider** using two-way binding instead of property binding and event binding.
- ❌ `<app-item [selected]="item.selected" (selectedChange)="item.selected = $event"/>`
- ✅ `<app-item [(selected)]="item.selected"/>`

## Conditional rendering

**Do** use control flow instead of structural directives.

```html title="❌ *ngIf"
<div *ngIf="someCondition; else otherContent">Content 1</div>
<ng-template #otherContent>
  <div>Content 2</div>
</ng-template>
```

```html title="✅ @if"
@if (someCondition) {
  <div>Content 1</div>
} @else {
  <div>Content 2</div>
}
```

```html title="❌ *ngFor"
<li *ngFor="let item of items">{{ item.label }}</li>
```

```html title="✅ @for"
@for (item of items; track item.id) {
  <li>{{ item.label }}</li>
}
```

```html title="❌ ngSwitch"
<ng-container [ngSwitch]="someValue">  
  <p *ngSwitchCase="valueA">Value is A</p>
  <p *ngSwitchCase="valueB">Value is B</p>
  <p *ngSwitchDefault>I don't know.</p>
</ng-container>
```

```html title="✅ @switch"
@switch (someValue) {
  @case ('valueA') {
    <p>Value is A</p>  
  }
  @case ('valueB') {
    <p>Value is B</p>  
  }
  @default() {
    <p>I don't know.</p>  
  }
}
```

## Common issues

**Avoid** function call in templates.

**Avoid** heavy computations in templates.

```html title="❌ teams.component.html"
@for (team of teams; track team.id) {
  <li>Team manager: {{ getManager(team)?.name }}</li>
}
```

```ts title="❌ teams.component.ts"
export class TeamsComponent {
  teams: Team[];
  getManager(team: Team) {
    // This is heavy computation, some teams can have a lot of members.
    return team.members.find(m => m.role === 'manager');
  }
}
```

```ts title="✅ teams.component.ts"
// Define a new model to hold the manager in each team.
interface ManagedTeam extends Team {
  manager?: User;
}

export class TeamsComponent {
  teams: Team[];
  // Compute who's the manager of each team only once.
  managedTeams: ManagedTeam[] = this.teams.map(team => ({
    ...team,
    manager: team.members.find(m => m.role === 'manager')
  }));
}
```

```html title="✅ teams.component.html"
<!-- Loop over 'managedTeams' instead of 'teams'. -->
@for (team of managedTeams; track team.id) {
  <li>Team manager: {{ team.manager?.name }}</li>
}
```

:::info Why?
Angular templates are evaluated and rendered during each change detection cycle.
Heavy computations inside your template may cause performance issues.

Consider computing the value once and caching the result in the class instead.

You can use `computed` signal when dealing with signal.
:::

