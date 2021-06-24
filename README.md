# lerna-test

Monorepo using Lerna to manage multiple NPM packages.

The first half of this project was using this video, a great reference for starting: https://www.youtube.com/watch?v=pU87ufl2lDc&ab_channel=chantastic

## Why?

We are using Lerna in independent mode vs fixed mode. This means that each package we create is its own entity within npm. This makes it very easy to add features without worrying about breaking other components.

Issue with Fixed Mode:

- Library v1.0.0
- Grid component being used in App 1
- App 2 needs updated version of grid, causing a breaking change in the grid
- Make breaking change to grid, Library v2.0.0
- App 2 needs a new display container component that is not in the library
- Create new new display container component, Library v2.1.0
- App 1 wants to use the new component as well, but does not want to use the "new" grid.

This is not possible, as the new component has been added to the library after the grid's breaking change.

Solution with Independent Mode:

- Grid v1.0.0
- Grid component being used in App 1
- App 2 needs updated version of grid, causing a breaking change in the grid
- Make breaking change to grid, Grid v2.0.0
- App 2 needs a new new display container component that is not in the library
- Create new new display container component, DisplayContainerComponent v1.0.0
- App 1 wants to use the new component as well, but does not want to use the "new" grid.
- App 1 keeps Grid v1.0.0, and installs DisplayContainerComponent v1.0.0

Because these modules are packaged independently, we get to pick and choose exactly what we need to go in which app.

## Notes

Linking node_modules to /packages/...

Add .gitignore to modules in /packages/...

- Add a gitignore to ignore our distribution directory per module

Add .npmignore to modules in /packages/...

- Add a npmignore to ignore our everything BUT distribution directory per module

## Lerna Commands

lerna create <scope>

- Creates a new package boilerplate in our packages directory with a package.json scoped to the scope we provide. This makes publishing new modules quite easy, as we don't need to provide much config.
- ex: lerna create @cdm-lerna-test/avatar

lerna publish

- Looks through all changed modules, provides CLI to allow semver bumping, and pushes changes to npm.

lerna diff

- Shows diff of changes
- Might need to stage/push changes to git repo in order for lerna to see changed package files(?)

lerna updated

- Shows just the packages that have changed, useful to make sure changes are only in directories you have touched

lerna bootstrap

- It seems that we don't need to be using this command, it's related to adding dependencies and symlinking packages, but thus far I don't see it doing anything and imports work as intended outside this project.

## Other Commands

npm info @...scope

- Useful to get info on a package you have pushed
- ex: npm info @cdm-lerna-test/avatar

## Problems/Solutions

- Q: 'h is not defined'

- A: This was related to microbundle not compiling jsx correctly, must add the `--jsx React.createElement` flag to the build script.

---

- Q: Why doesn't lerna run build work? ex: lerna run build > `npm WARN Local package.json exists, but node_modules missing, did you mean to install?`

- A: When runing a lerna command that triggers a npm package in a module (lerna run build > microbundle), you must define that script in the root package.json, and trigger it with "npm run xxx". I believe this is to do with scoping our project node_modules in order to run these inside a package that has no existing node_modules.

---

- Q: How do I retry publishing if publish fails?

- A: If it has been updated, you can force re-publish. `lerna publish --force-publish $(ls packages/)`. If this doesn't work, you can add a small commit to force a change, then re commit and re publish.

---

- Q: What happens if a module is symlinked to a version of a component, but I want to still use the most updated version of a component? (ex: symlinked to button v1.0.0, but I want to use button v3.0.0 in the project)?

- A: Lerna manages this for us, if we inspect our node_modules in the host app we can see that all the dependencies are listed under our scope. If we follow the example and want to add button v3.0.0 as a dependency to the host app, we can do that. It will replace the node_module/button/... package, but the symlinked version will be moved into the directory that that specific version is needed.

- ex: before adding button v3.0.0

node_modules/
├─ @cdm-lerna-test/
│ ├─ button(v1.0.0)/
│ ├─ avatar/
│ ├─ usage/

- ex: After adding button v3.0.0

node_modules/
├─ @cdm-lerna-test/
│ ├─ button(v3.0.0)/
│ ├─ avatar/
│ ├─ usage/
│ │ ├─ node_modules/
│ │ │ ├─ button(v1.0.0)/

---

## Todos

Have package names capatialized

- ex: @cdm-lerna-test/button > @cdm-lerna-test/Button

Don't use index, makes stack traces hard

- ex: Avatar/index.js > Avatar/Avatar.js
- ex Button/lib/index.js > Button/lib/Button.js

Provide release notes when making version bumps

- Add what has changed in the package readme
