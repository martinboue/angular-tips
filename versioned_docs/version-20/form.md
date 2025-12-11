---
sidebar_position: 4
---
# Form

## General guidelines

**Avoid** mixing reactive and template-driven form for the same control.
- ❌ `<input [formControl]="title" [disabled]="true">`
- ✅ `<input [formControl]="title">` and `title.disable()` in typescript.
- ❌ `<input [formControl]="title" [value]="defaultTitle">`
- ✅ `<input [formControl]="title">` and `title.setValue(defaultTitle)` in typescript.

**Do** bind form submission to the `ngSubmit` form event instead of button `click`.
```html title="❌ click event"
<form>
  ...
  <button (click)="save()">Submit</button>
</form>
```

```html title="✅ ngSubmit event"
<form (ngSubmit)="save()">
  ...
  <button type="submit">Submit</button>
</form>
```

## Reactive forms

**Consider** using reactive forms for complex forms.
- ❌ Interactive component that is not part of a form
- ✅ Multi-field form
- ✅ Form with disabled fields
- ✅ Form with validation

**Do** type reactive forms (FormGroup, FormControl and FormArray).
- ❌ `title: FormControl`
- ✅ `title: FormControl<string>`
- ❌ `form: FormGroup`
- ✅ `form: FormGroup<{ title: FormControl<string> }>`

**Avoid** using strings to access form group controls.
- in template:
  - ❌ `formControlName="title"`
  - ✅ `[formControl]="form.controls.title"`
- in typescript:
  - ❌ `form.get('title')`
  - ✅ `form.controls.title`

:::info Why?
Using strings prevents type checking and can cause runtime errors if the control is missing, whereas direct property access guarantees its existence and makes code refactoring safer.
:::

**Do** use `getRawValue()` to get all control values including disabled controls.

## Template-driven forms

**Consider** using template-driven forms for simple interactive components.
- ❌ Multi-field form with validation
- ✅ Toggle button to open/close a menu
- ✅ Simple search bar
- ✅ Single-field form

## Custom fields

**Do** use `ControlValueAccessor` to create custom form fields.
- ✅ PIN code input
- ✅ Input file
- ...
