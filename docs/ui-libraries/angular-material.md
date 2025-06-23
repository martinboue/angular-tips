---
draft: true
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Angular Material

## Styling

See [components guidelines](../component/styling.md#overriding-styles) first on how to override styles.

**Avoid** overriding private CSS variables.
- ❌ TODO

**Consider** using override mixins.
- ✅ TODO

**Consider** overriding system CSS variables.
- ✅ TODO

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

**Do** define `compareWith` input function in `<mat-select>` for non-primitive values.

```html title="❌ Compare object instances"
<mat-form-field>
  <mat-select [formControl]="selectedUser">
    @for (user of users; track user.id) {
      <mat-option [value]="user">{{ user.name }}</mat-option>
    }
  </mat-select>
</mat-form-field>
```

```html title="✅ Compare a unique key"
<mat-form-field>
  <mat-select [formControl]="selectedUser" [compareWith]="compareId">
    @for (user of users; track user.id) {
      <mat-option [value]="user">{{ user.name }}</mat-option>
    }
  </mat-select>
</mat-form-field>
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
TODO
:::
