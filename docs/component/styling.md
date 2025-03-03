---
sidebar_position: 3
---
# Styling
This page covers best practices for styling in Angular, including structuring styles, using variables, scoping component styles, and avoiding common pitfalls.

## General

**Avoid** repeating CSS styles.

:::tip Why?
If you do, it usually means that you need to make a component out of it.
:::

**Do** use SASS (.scss).

**Avoid** inline styles.
```html title="❌ user.component.html"
<div style="margin-top: 20px">...</div>
```

```css title="✅ user.component.scss"
div { 
  margin-top: 20px;
}
```

**Do** use snake-case for class and id names, examples:
- ❌ `class="selectedItem"`
- ✅ `class="selected-item"`
- ❌ `id="add_button"`
- ✅ `id="add-button"`

## Variables

**Do** use variables for theme related values.

### SASS variables

**Do** use SASS variables for static values, example:
```css 
$color-danger: #FF0000;

p {
  color: $color-danger;
}
```

**Do** add extra base path to import global SASS variables, example:

```css title="❌ user.component.scss"
@use '../../../../../theme';
h1 {
  color: theme.$primary;
}
```

```json title="✅ angular.json"
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "stylePreprocessorOptions": {
              // highlight-start
              "includePaths": ["src"]
              // highlight-end
            }
          }
        }
      }
    }
  }
}
```

```css title="✅ user.component.scss"
@use 'theme';
h1 {
  color: theme.$primary;
}
```

### CSS variables

**Do** use CSS variables for dynamic values that can change at runtime, example:
```css 
:root {
  --app-font-size: 16px;
}

p {
    font-size: var(--app-font-size);
}

.big-text-area {
    --app-font-size: 24px;
}
```

**Prefer** defining global CSS variables within the `:root` selector.

**Do** prefix global CSS variable names by `app-`, example:

```css title="✅ user.component.scss"
:root { 
  --app-text-color: #131218;
}
```

**Prefer** defining component's CSS variables within the `:host` selector.

**Do** prefix component's CSS variable names with the component name, example:

```css title="✅ user.component.scss"
:host { 
  --user-title-color: theme.$primary;
}
```

## Component styles

**Do** keep default style scoping, examples:
- ❌ `encapsulation: ViewEncapsulation.None`
- ✅ `encapsulation: ViewEncapsulation.Emulated`

**Prefer** component style over global styles, example:

```css title="❌ styles.scss"
.selected p > span {
  color: $primary;
}
```

```css title="✅ user-card.component.scss"
.selected p > span {
  color: $primary;
}
```

:::tip Why?
Global styles often leads to unintended side effects. The larger the project, the more difficult it will be to modify these global styles, 
forcing you to override them in several places.
:::

**Do** use `:host` to apply styles to the component root element, example:
```css title="✅ user.component.scss"
:host { 
  display: flex;
}
```

## Global styles

**Do** split global styles in partial SCSS files, examples:
- `styles.scss` as the entrypoint. 
- `_default.scss` for overriding default browsers styles.
- `_typography.scss` for fonts and headings.
- `_form.scss` for form fields.
- ...

## Overriding styles

**Prefer** CSS variables or component inputs to override your components styles.

**Avoid** using `::ng-deep`.

```css title="❌ user.component.ts"
:host ::ng-deep .mat-mdc-chip-action > .mdc-evolution-chip__graphic {
  padding: 0;
}
```

:::tip Why?
If you are trying to override your own component, use CSS variables or inputs instead.

If you are trying to override an external component, you'll need to rely on private implementation details that may change at any time (without being mentioned in a changelog). 
So there's a good chance you app will break after a dependency update, which will result in either a painful migration and bugs, or no update at all.

External libraries often provide theming features to customise their components, try to use them. Use `::ng-deep` only as a last resort.
:::

**Avoid** using `!important`.

:::tip Why?
It usually means that you are trying to override either global styles or private implementation details. 
Try another technique mentioned above or use a more specific selector instead.
:::

## Responsive design

**Do** use `MediaMatcher` to listen for window width changes, example:
```ts title="✅ layout.component.ts"
this.mobileQuery = this.media.matchMedia('(max-width: 900px)');
const isMobile = this.mobileQuery.matches;
```
