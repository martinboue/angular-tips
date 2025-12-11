---
sidebar_position: 1
---
# Angular Material
This page provides best practices and common mistakes to avoid for using Angular Material in your projects.

## Styling

See [components guidelines](../component/styling.md#overriding-styles) first on how to override styles.

**Avoid** directly overriding Material's styles.
```css title="❌ Private CSS class"
.mdc-button__label {
  color: red;
}
```

**Avoid** overriding Material's private CSS variables.
```css title="❌ Private CSS variable"
button {
  --mat-button-filled-label-text-color: red;
}
```

:::info Why?
CSS classes, HTML structure and private CSS variables are Material's internal implementation details that can change without notice in any releases. If you rely on these elements, there is a high chance your application will break when upgrading.
:::

**Do** use `overrides` mixins.

```css title="✅ Overrides mixins"
@use '@angular/material' as mat;

:root {
  @include mat.button-overrides((
    filled-label-text-color: green
  ));
}
```

**Do** override CSS [system variables](https://v20.material.angular.dev/guide/system-variables).
```css title="✅ System variables"
@include mat.theme-overrides((
  primary-container: green
));
```

:::info Why?
Angular Material provides public and stable APIs to customize the look of components, such as the `overrides` mixins for each component and system variables. These are the preferred and only officially supported methods for customizing Material styles.
:::

## Custom components

**Consider** using [Angular CDK](https://v20.material.angular.dev/cdk).
- ❌ Work around the limitations of Angular Material's components
- ✅ Build custom components with CDK utilities

## Dialog

**Do** type dialog data and result.

```ts title="✅ Define type"
// Define data type (input)
export interface ConfirmDialogData {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

// and result type (output)
export type ConfirmDialogResult = boolean;
```

```ts title="✅ Use type in dialog component"
export class ConfirmDialog {
  // Use type here:
  data: UserDialogData = inject(MAT_DIALOG_DATA);
  #dialogRef: MatDialogRef<ConfirmDialog, ConfirmDialogResult> = inject(MatDialogRef);

  confirm() {
    this.#dialogRef.close(true);
  }
}
```

```ts title="✅ Use type in consumer"
export class PostComment {
  #dialog = inject(MatDialog);

  confirmDeletion() {
    // Use 'Data' and 'Result' types here:
    this.#dialog.open<ConfirmDialog, ConfirmDialogData, ConfirmDialogResult>(
      ConfirmDialog,
      {
        // 'data' is type checked
        data: {
          message: 'The comment will be permanently deleted, are you sure?',
          confirmLabel: 'Delete'
        }
      }
    ).afterClosed().subscribe(result => {
      // 'result' type is inferred
      if (result) {
        this.deleteComment();
      }
    });
  }
}
```

## Form fields

**Consider** defining `compareWith` input in `<mat-select>` with non-primitive option values.

```html title="❌ Compare object instances"
<mat-select [formControl]="selectedUser">
  @for (user of users; track user.id) {
    <mat-option [value]="user">{{ user.name }}</mat-option>
  }
</mat-select>
```

```html title="✅ Compare a unique key"
<mat-select [formControl]="selectedUser" [compareWith]="compareId">
  @for (user of users; track user.id) {
    <mat-option [value]="user">{{ user.name }}</mat-option>
  }
</mat-select>
```

```ts title="✅ Compare a unique key"
export class UserPage {
  ...
  compareId(a?: User, b?: User): boolean {
    return a?.id === b?.id;
  }
}
```

:::info Why?
When using `<mat-select>` with non-primitive values (e.g. objects), Angular compares options by reference, not by value. This means two different object instances with the same properties are not considered equal. This can lead to unexpected behavior, such as the selected value not matching the intended option.
:::
