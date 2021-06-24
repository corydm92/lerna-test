# lerna-test

Monorepo using Lerna to manage multiple NPM packages.

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

## Other Commands

npm info @...scope

- Useful to get info on a package you have pushed
- ex: npm info @cdm-lerna-test/avatar

## Problems/Solutions

'h is not defined'

- This was related to microbundle not compiling jsx correctly, must add the `--jsx React.createElement` flag to the build script.

lerna run build > `npm WARN Local package.json exists, but node_modules missing, did you mean to install?`

- When runing a lerna command that triggers a npm package in a module (lerna run build > microbundle), you must define that script in the root package.json, and trigger it with "npm run xxx". I believe this is to do with scoping our project node_modules in order to run these inside a package that has no existing node_modules.
