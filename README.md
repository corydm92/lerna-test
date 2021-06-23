# lerna-test
Monorepo using Lerna to manage multiple NPM packages.

## Notes

lerna create <scope>
- Creates a new package boilerplate in our packages directory with a package.json scoped to the scope we provide. This makes publishing new modules quite easy, as we don't need to provide much config.
- ex: lerna create @cdm-lerna-test/avatar

lerna publish
- Looks through all changed modules, provides CLI to allow semver bumping, and pushes changes to npm.

lerna diff
- Shows diff of changes
- Might need to stage/push changes to git repo in order for lerna to see changed package files(?)

## Questions

Can I use a global @scope in the project root?
Can I use a global public/private key in project root?
Can I use the local lerna?