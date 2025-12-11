# Versioning

## Strategy
Angular Tips follows the same major versioning as Angular itself.

`/docs` folder contains documentation for the latest supported version of Angular.

`/versioned_docs` folder contains documentations for all previously supported versions of Angular.

When a new version of Angular is released, a new version of Angular Tips is created. The `docs` folder is copied for archiving purposes into `versioned_docs/version-vX` folder, where `X` is the previous major version number. `docs` folder then becomes the documentation for the new version of Angular and its content is updated accordingly.

## Create a new version
To create a new version of Angular Tips:

1. Run: `npm run docusaurus docs:version <previous_version>`
2. Replace occurences of previous version with the new version number in `docs` folder, especially:
    - Links to Angular doc: `https://vX.angular.dev`
    - Links to Angular Material doc: `https://vX.material.angular.dev`
    - [Getting started > Angular Version](./docs/getting-started.md#angular-version)
3. Update [docusaurus.config.ts](./docusaurus.config.ts):
    - Set `presets > docs > versions > current > label` to the new version number.
    - Add a new entry in `presets > docs > versions` for the previous version.
4. Delete `draft: true` pages in the new `versioned_docs/version-vX` folder if any.
5. Test the new version locally and make sure it builds correctly.
6. Commit and push the changes.
