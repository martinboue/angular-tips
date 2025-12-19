---
sidebar_position: 3
sidebar_class_name: updated
---
# Styling
This page covers best practices for styling in Angular, including structuring styles, using variables, scoping component styles, and avoiding common pitfalls.

## General guidelines

**Avoid** repeating CSS styles.

:::info Why?
If you do, it usually means that you need to make a component out of it.
:::

**Do** use SASS (.scss).

**Avoid** inline styles.
```html title="❌ user-page.html"
<div style="margin-top: 20px">...</div>
```

```scss title="✅ user-page.scss"
div { 
  margin-top: 20px;
}
```

**Do** use kebab-case for class and id names.
- ❌ `class="selectedItem"`
- ✅ `class="selected-item"`
- ❌ `id="add_button"`
- ✅ `id="add-button"`

## Variables

**Do** use variables for theme related values.

### SASS variables

**Do** use SASS variables for static values.
```scss 
$color-danger: #FF0000;

p {
  color: $color-danger;
}
```

**Do** add extra base path to import global SASS variables.

```scss title="❌ user-page.scss"
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
          "builder": "@angular/build:application",
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

```scss title="✅ user-page.scss"
@use 'theme';
h1 {
  color: theme.$primary;
}
```

### CSS variables

**Do** use CSS variables for dynamic values that can change at runtime.
```scss 
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

## Component styles

**Do** keep default style scoping.
- ❌ `encapsulation: ViewEncapsulation.None`
- ✅ `encapsulation: ViewEncapsulation.Emulated`

**Consider** using component style instead of global styles.

```scss title="❌ styles.scss"
.selected p > span {
  color: $primary;
}
```

```scss title="✅ user-card.scss"
.selected p > span {
  color: $primary;
}
```

:::info Why?
Global styles often leads to unintended side effects. The larger the project, the more difficult it will be to modify these global styles, 
forcing you to override them in several places.
:::

**Do** use `:host` to apply styles to the component root element.
```scss title="✅ user-page.scss"
:host { 
  display: flex;
}
```

**Consider** defining component's CSS variables within the `:host` selector.

**Do** prefix component's CSS variable names with the component name.

```scss title="✅ user-page.scss"
:host { 
  --user-title-color: theme.$primary;
}
```

**Do** use style binding instead of `ngStyle` directive.
- ❌ `[ngStyle]="{ 'width': '200px' }"`
- ✅ `[style]="{ 'width': '200px' }"`
- ✅ `[style.width.px]="200"`

## Global styles

**Do** split global styles in partial SCSS files.
- `styles.scss` as the entrypoint. 
- `_default.scss` for overriding default browsers styles.
- `_typography.scss` for fonts and headings.
- `_form.scss` for form fields.
- ...

**Consider** defining global CSS variables within the `:root` selector.

**Do** prefix global CSS variable names by `app-`.

```scss title="✅ user-page.scss"
:root { 
  --app-text-color: #131218;
}
```


## Overriding styles

**Consider** CSS variables or component inputs to override your components styles.

**Avoid** using `::ng-deep`.

```scss title="❌ user-page.ts"
:host ::ng-deep .mat-mdc-chip-action > .mdc-evolution-chip__graphic {
  padding: 0;
}
```

:::info Why?
If you are trying to override your own component, use CSS variables or inputs instead.

If you are trying to override an external component, you'll need to rely on private implementation details that may change at any time (without being mentioned in a changelog). 
So there's a good chance you app will break after a dependency update, which will result in either a painful migration and bugs, or no update at all.

External libraries often provide theming features to customise their components, try to use them. Use `::ng-deep` only as a last resort.
:::

**Avoid** using `!important`.

:::info Why?
It usually means that you are trying to override either global styles or private implementation details. 
Try another technique mentioned above or use a more specific selector instead.
:::

## Responsive design

**Do** use `MediaMatcher` to listen for window width changes.
```ts title="✅ Checking screen width"
this.mobileQuery = this.media.matchMedia('(max-width: 900px)');
const isMobile = this.mobileQuery.matches;
```

## Libraries

**Consider** not using a CSS framework.

:::info Why?
While it's not a bad thing to use a CSS framework, it shouldn't be automatic. These frameworks are more complex than regular CSS and can harm your code readability and maintanability. Choose knowingly before integrating it deeply into your project.
:::

**Consider** using one the following:

✅ **[Tailwind CSS](https://tailwindcss.com/)**: utility-first CSS framework that provides low-level utility classes to build custom designs.

:::note
Since Angular v21, Tailwind CSS is natively supported and integrated with the Angular CLI, see [Angular guide](https://v21.angular.dev/guide/tailwind).
:::

✅ **[Bootstrap](https://getbootstrap.com/)**: CSS framework that provides a set of pre-designed components and utilities.

❌ **[PrimeFlex](https://primeflex.org/)**: project has stopped and no longer receive development or maintenance.
