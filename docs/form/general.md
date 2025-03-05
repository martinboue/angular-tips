---
sidebar_position: 1
draft: true
---
# General best practices

- Template vs ReactiveForm
- always type
- formControlName vs formControl / form.controls.a vs form.get('a') vs `form.controls['a']`
- how to translate enums to readable text
- how to use mat-select and reactive form to display a list of objects (id or object itself as option value ?)
- how to reuse form for both edit and readonly page
- how to split form in multiple components
- use control value accessor for custom form fields
- never mix reactive form and template driven, examples
    - formControl + value
    - disabled formControl + disabled
- bind save form method on form submit instead of button click
- use getRawValue to get all form value including disabled controls