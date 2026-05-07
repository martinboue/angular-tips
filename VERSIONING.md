# Versioning

## Strategy
Angular Tips follows the same major versioning as Angular itself.

`/docs` folder contains documentation for the latest supported version of Angular.

`/versioned_docs` folder contains documentations for all previously supported versions of Angular.

When a new version of Angular is released, a new version of Angular Tips is created. The `docs` folder is copied for archiving purposes into `versioned_docs/version-vX` folder, where `X` is the previous major version number. `docs` folder then becomes the documentation for the new version of Angular and its content is updated accordingly.

## Create a new version
To create a new version of Angular Tips:

1. Run: `npm run docusaurus docs:version <previous_version_number>`.
    - Make sure versions are in the correct order in [versions.json](./versions.json).
2. Replace occurences of previous version with the new version number in `docs` folder, especially:
    - Links to Angular doc: `https://vX.angular.dev`
    - Links to Angular Material doc: `https://vX.material.angular.dev`
    - [Getting started > Angular Version](./docs/getting-started.mdx#angular-version)
    - Other occurences of `<previous_version_number>`.
3. Update [docusaurus.config.ts](./docusaurus.config.ts):
    - Set `presets > docs > versions > current > label` to the new version number.
    - Add a new entry in `presets > docs > versions` for the previous version.
4. Delete `draft: true` pages in the new `versioned_docs/version-vX` folder if any.
5. Remove `sidebar_class_name: new` and `sidebar_class_name: updated` in `docs` folder.
6. Update 'Supported Angular Versions' table in [README.md](./README.md).
7. Update `announcementBar` in [docusaurus.config.ts](./docusaurus.config.ts) if necessary.
8. Update [What's new](./docs/upgrading/whats-new.mdx) and [Upcoming](./docs/upgrading/upcoming.mdx) pages.
9. Test the new version locally and make sure it builds correctly.
