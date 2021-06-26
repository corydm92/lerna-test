# lerna-test

Monorepo using Lerna (independent) to handle managing our mutli package repository, and Microbundle to handle building each module. Our development environment is driven by Storybook.

The first half of this project was using this video, a great reference for starting: https://www.youtube.com/watch?v=pU87ufl2lDc&ab_channel=chantastic

---

## Why?

Creating a multi component repository allows us as engineers to have a single source for package development. Having one repo helps symlinking issues, and not having multiple repositories for single packages provides a better workflow.

We are using Lerna in independent mode vs fixed mode. This means that each package we create is its own entity within npm. This makes it very easy to add features without worrying about breaking other components, and allows other users to install just the packages they need instead of pulling an entire library and using one or two features.

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

---

## Initial Lerna Setup

This setup assumes you have a npm account, organization, and have npm credentials to publish from the console.

- Start by initializing lerna in a new repository, this sets up our project structure.

`npx lerna init --independent`

- Add microbundle and lerna as a dev dependencies.

`npm i -D microbundle lerna`

- Create your first package.

`lerna create @scope/package-name`
I personally set the version to 0.0.0 when starting
Add a description (can be changed in the packages package json)
I use MIT for licence
`Entry Point` is where your built code will live. I leave this as lib/package-name.js

- Next we move to `packages/package-name/package.json` add the source file, this is the file that will hold the actual code you want to build.

Go to pacakge.json > add a new attribute called `"source": "path-to-source-file.js"`.

- From here, this is how your new packages package.json should look. If you have questions on other attributes, please refer to lerna's documentaiton:

```
{
  "name": "@test/test-package",
  "version": "0.0.0",
  "description": "test package",
  "author": "Test User <testuser@email.com>",
  "homepage": "",
  "license": "MIT",
  "main": "lib/test-package.js",
  "source": "index.js",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib"
  ],
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1"
  }
}
```

- Now before we do any more work, lets add a .gitignore file and tell git to ignore the lib directory.

- Next, we add our component. Lets add a button.

Create index.js if you have not already
Add the following code:

```
import React from 'react';

const CustomButton = ({
	buttonText = 'Custom Button Text',
	onClick = () => console.log('Click!'),
}) => <button onClick={onClick}>{buttonText}</button>;

export default CustomButton;
```

- Now we need to add two scripts, one to build and one to watch for changes durring development. Add the following scripts to the test package package.json

```
"build": "microbundle --jsx React.createElement --no-compress",
"dev": "microbundle --jsx React.createElement watch"
```

- The last thing we need to do to publish these packages is to add a command in the root directory of our project. Lerna will look through each pacakge, and run each matching script it finds with the "build" and "dev" script tags.

```
"build": "lerna run build",
"dev": "lerna run dev",
```

- Side Note 1: If you are linking packages within this repository (ex: comp2 is importing comp1), make sure to list these in the modules package.json dependency section. Also, be sure to run lerna bootstrap to symlink the dependency, creating it's own node_module within that package that contains just those dependencies.

- Side Note 2: Another note, if you are using other dependencies such as lodash, add those to the peerDependency section of the modules package.json

- From here, you commit any changes, run `lerna bootstrap`, `npm run build`, then `lerna publish`. Add the correct version(s) to your packages and, voila, your packages have been published to npm!

- Ending Note: At the time of this writing, I've noticed that our host app will sometimes bundle dependencies within components, and will sometimes install them at the root of our npm package (please see the symlink tree in the Q/A section). This isn't an issue in the host app, but I don't have a great answer as to why this happens.

---

## Initial Storybook Setup

- At the root of the MonoRepo we have created, we are now ready to add Storybook to the app. This will give us a development environment, as well as provide proof of concepts, working examples, and documentation for what we create.

- Run `npx sb init` in the root of our project

- Run `npm i -D react react-dom` to install react and react-dom as dev dependencies.

- From here, all we need to do is run `npm run storybook` to start storybook, and in a seperate terminal run `npm run dev` to have microbundle watch for changes.

- The rest is pretty self explanitory, please see the .storybook/ directory, the examples in stories/..., and the storybook documentation.

Happy developing!

---

## Starting The Dev Environment

- We need to run two things to start working in this environment, we need to run storybook and we need to set microbundle to watch for changings in real time.

- In one terminal, run `npm run storybook` to kick off our storybook server.

- In another terminal, run `npm run dev`, this will run microbundle in watch mode for all of our packages. Note that there is no output in this terminal, perhaps there is a verbose flag but currently not an issue one way or another.

---

## Lerna

TODO

https://github.com/lerna/lerna

---

## Microbundle

TODO

---

## Storybook

This project is using storybook in the root of our repository as our development environment, as well as provides us documentation for each component written.

---

## Root Level Commands

`npm run build`

- Runs `lerna run build`, important to run from root as this will fail if ran by itself.

`npm run storybook`

- Starts our storybook app.

`npm run publish`

- Once changes are ready to be pushed to npm, this handles versioning and publishing.

## Lerna Commands

`npx lerna init --independent`

- Initializes a new lerna project in independent mode

`lerna create <scope>`

- Creates a new package boilerplate in our packages directory with a package.json scoped to the scope we provide. This makes publishing new modules quite easy, as we don't need to provide much config.
- ex: `lerna create @cdm-lerna-test/avatar`

`lerna publish`

- Looks through all changed modules, provides CLI to allow semver bumping, and pushes changes to npm.

`lerna diff`

- Shows diff of changes
- Might need to stage/push changes to git repo in order for lerna to see changed package files(?)

`lerna updated`

- Shows just the packages that have changed, useful to make sure changes are only in directories you have touched

`lerna bootstrap`

- Running this command will take any dependencies in packages and add them to a package-level node_modules directory. This step seems to be taken care of durring the build process, I will need to do more testing.

`lerna run build`

- Runs our build process for each changed package in /packages

---

## Microbundle Commands

These commands are ran by lerna, running at the package level

`microbundle --jsx React.createElement --no-compress`

- Builds the module, the `--jsx React.createElement` is necessary for react modules.
- `--no-compress` formats the build in a human readable format

---

## Storybook Commands

`npx sb init`

- Add Storybook to app

`npm run storybook`

- Starts Storybook in development mode

---

## Other Commands

`npm info <scope>`

- Useful to get info on a package you have pushed
- ex: `npm info @cdm-lerna-test/avatar`

---

## Questions/Answers

- Q: Why am I getting `h is not defined` after adding a module to my host app?

- A: This was related to microbundle not compiling jsx correctly, must add the `--jsx React.createElement` flag to the build script.

- Q: Why doesn't `lerna run build` work? ex: `lerna run build` > `npm WARN Local package.json exists, but node_modules missing, did you mean to install?`

- A: When runing a lerna command that triggers a npm package in a module (lerna run build > microbundle), you must define that script in the root package.json, and trigger it with "npm run xxx". I believe this is to do with scoping our project node_modules in order to run these inside a package that has no existing node_modules.

- Q: How do I retry publishing if publish fails?

- A: If it has been updated, you can force re-publish. `lerna publish --force-publish $(ls packages/)`. If this doesn't work, you can add a small commit to force a change, then re commit and re publish.

- Q: What happens if a module is symlinked to a version of a component, but I want to still use the most updated version of a component? (ex: symlinked to button v1.0.0, but I want to use button v3.0.0 in the project)?

- A: Lerna manages this for us, if we inspect our node_modules in the host app we can see that all the dependencies are listed under our scope. If we follow the example and want to add button v3.0.0 as a dependency to the host app, lets say our usage component needs v1.0.0, we can do that. It will replace the node_module/button/... package, but the symlinked version will be moved into the directory that that specific version is needed.

- ex: before adding button v3.0.0

```
node_modules/
├─ @cdm-lerna-test/
│ ├─ button(v1.0.0)/
│ ├─ avatar/
│ ├─ usage/
```

- ex: After adding button v3.0.0

```
node_modules/
├─ @cdm-lerna-test/
│ ├─ button(v3.0.0)/
│ ├─ avatar/
│ ├─ usage/
│ │ ├─ node_modules/
│ │ │ ├─ button(v1.0.0)/
```

- Q: I want to name my package with a capital, as is common convention with React components?

- A: NPM does not support capitalized scopes

- ex:

```
package name: (@cdm-lerna-test/test1) @cdm-lerna-test/Test1
Sorry, name can no longer contain capital letters.
```

---

## Notes

Add .gitignore to modules in /packages/...

- Add a gitignore to ignore our distribution directory per module

---

## Todos

TEAM

- Don't use index for distribution files, makes stack traces hard
  ex: `Button/lib/index.js > Button/lib/Button.js`

- Make sure release notes are made in the package README file as part of publishing requirements.

- Make sure we are using .jsx extension for react component files.

GENERAL

- Add Initial Setup documentation

- Learn more about `lerna bootstrap`

- Actions not tracking in storybook
