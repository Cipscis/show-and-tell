# Using this template

This is my template repository to use when creating new projects. The top section of this readme is for how to use it to start a new project, and should be removed as part of the setup process.

## Setup

You will need to install [Node.js](https://nodejs.org/en/) before using this template.

1. Click "[Use this template](https://github.com/cipscis/base-project/generate)" to create a new repository based on this one.
2. Update the `package.json` file to reflect your new project's details.
3. Update names throughout the package.
	a. Replace `base-project` with the name of your project as it is used in code.
	b. Replace `Base Project` Replace with the name of your project as it is used in documentation.
	c. If you're not me, replace `@cipscis` with your npm username and then `cipscis` with your GitHub username, and be sure to also update the `author` property in the `package.json`.
4. Create a `.env` file. See [.env](#env-1) for more information.
5. Run `npm install`.
6. Update this `README.md` file and the `CHANGELOG.md` file to remove the instruction sections.

Now you're ready to work on code in this project.

## Usage

Using the files specified in `package.json`, you can create a project to be installed with npm.

In the `app` folder, which can be deployed to GitHub Pages but is not included when your project is installed, you can document your project. Here, the project files outside the `app` folders can be included in the bundle by using root-relative paths such as `import foo from '/main.js';`

Once you have an initial version of your project ready to push, you will want to update the `version` attribute of your `package.json` file to `"1.0.0"`. See [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for more information on version numbers.

You should also update the `CHANGELOG.md` file to describe your changes. This is particularly important after your initial 1.0.0 version.

## Structure

### Frontend assets

Assets such as CSS and JavaScript are contained in `/app/assets`. In here, the contents of the `scss` folder are used to compile CSS files into the `css` folder.

The `/app/assets/js` folder contains a `src` folder and a `dist` folder. Any JavaScript or TypeScript files inside the `src` folder are bundled into the `dist` folder. By default, eslint is configured to look for a single entry point at `/app/assets/js/src/main.ts`.

### Backend assets

Node.js code sits within the `/scripts` directory. This includes the build system, which uses [esbuild](https://esbuild.github.io/), as well as the [Express](https://expressjs.com/) server code.

The build system's entry points are defined within [`build-config.ts`](./scripts/build-config.ts).

By default, the server code just runs a static http server that serves files in the `/app` directory, but it can be extended to add additional functionality.

This server only runs locally, so any additional functionality will not be available on GitHub Pages.

## Configuration

### package.json

By default, the `package.json` file is configured to set the project to be of type `module`. This means NodeJS will use ES module syntax as opposed to its default CommonJS syntax, allowing the use of `import` and `export` keywords.

For more information on the differences, see [Differences between ES modules and CommonJS](https://nodejs.org/api/esm.html#esm_differences_between_es_modules_and_commonjs)

### Linting

[eslint](https://www.npmjs.com/package/eslint) is configured in [`.eslintrc.cjs`](./.eslintrc.cjs), and [stylelint](https://www.npmjs.com/package/stylelint) is configured in [`stylelint.config.cjs`](./stylelint.config.cjs)

### Tests

The [Jest](https://jestjs.io/)-based test suite is configured in [jest.config.js](./jest.config.js). No custom test name matcher is specified, which means [Jest's default matcher](https://jestjs.io/docs/configuration#testmatch-arraystring) will be used:

> By default it looks for `.js`, `.jsx`, `.ts` and `.tsx` files inside of `__tests__` folders, as well as any files with a suffix of `.test` or `.spec` (e.g. `Component.test.js` or `Component.spec.js`). It will also find files called `test.js` or `spec.js`.

### .env

See [.env](#env-1) for information on setting up a `.env` file.

## GitHub Pages

This project is set up to use a GitHub Action every time new code is pushed to the `main` branch. This `build-and-deploy` workflow runs the `build` npm script, then runs the test script, then if the tests passed it deploys the contents of the `app` directory by committing them to a `gh-pages` branch. This `gh-pages` branch should be configured in GitHub to be published to GitHub Pages.

When publishing a project using [GitHub Pages](https://pages.github.com/), the project usually appears at a URL with a path, such as `https://cipscis.github.io/base-project`. This means using root relative URLs such as `/assets/css/main.css` would work locally, but would break when the project is published on GitHub Pages.

To fix this, the local Node.js server looks for a `PROJECT_NAME` variable in your [`.env`](#env-1) file. If it finds one, it sets up redirects so URLs starting with `/${PROJECT_NAME}` can be used as though they were root relative, so they will find your assets.

By default, the `index.html` file is configured to be published to GitHub Pages under the project name `base-project`. When you use it as a base for your own project, you will need to update these URLs.

---

**Delete everything above here when creating a new project**

---

# base-project

![Build and deploy status badge](https://github.com/cipscis/base-project/actions/workflows/build-and-deploy.yml/badge.svg)

[Base Project](https://cipscis.github.io/base-project/)

## Development

You will need to install [Node.js](https://nodejs.org/en/) before working on this project.

1. Clone the repository using `git clone https://github.com/cipscis/base-project.git`.
2. Run `npm install` to install development dependencies.
3. Create a [`.env`](#env) file.
4. Run `npm start` to run the local server and watch CSS and JS files for changes.

Usually, you will just want to run `npm start`, but this project also provides the following npm scripts:

* `npm run server` runs a Node.js server on the port specified in the [`.env`](#env) file, using [Express](https://expressjs.com/).

* `npm run build` compiles CSS files using [sass](https://www.npmjs.com/package/sass), then typechecks TypeScript using [the TypeScript compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and bundles TypeScript and any JavaScript using [esbuild](https://esbuild.github.io/).

* `npm run watch` compiles both CSS and TypeScript+JavaScript files just like `npm run build`, but in watch mode so any further changes will result in recompilation. Also runs any configured tests suites in watch mode.

* `npm run lint` lints all JavaScript and TypeScript files using [eslint](https://www.npmjs.com/package/eslint) and all SCSS files using [stylelint](https://www.npmjs.com/package/stylelint).

* `npm start` runs both the `server` and `watch` tasks simultaneously.

* `npm test` runs any configured test suites using [Jest](https://jestjs.io/).
* `npm run testCoverage` runs any configured test suites using [Jest](https://jestjs.io/), and reports coverage information.
* `npm run testWatch` runs any configured test suites using [Jest](https://jestjs.io/) in watch mode.

### .env

The `.env` file contains the following environment variables:

* `PROJECT_NAME` `(string)`

If present, used by [Express](https://expressjs.com/) to set up redirects for emulating [GitHub Pages](#github-pages).

* `MODE` `(string 'development' | 'production')`

Used by Webpack to determine what optimisations to use and how to generate sourcemaps.

* `PORT` `(int)`

Used by [Express](https://expressjs.com/) to determine which port to use when running a local Node.js server.

An example `.env` file you can use for development is:

```
PROJECT_NAME = "base-project"
MODE = "development"
PORT = "8080"
```

This file is intended to differ from environment to environment, so it is ignored by Git.

## Dependencies

None.

## Dev Dependencies

### Development

These dependencies are used when working on the project locally.

* [Node.js](https://nodejs.org/en/): Runtime environment

* [ts-node](https://typestrong.org/ts-node/): Allows TypeScript code to be run in a Node.js environment

* [npm](https://www.npmjs.com/): Package manager

* [TypeScript](https://www.typescriptlang.org/): JavaScript extension for static type checking

* [Jest](https://jestjs.io/): Testing framework

	* [@jest/globals](https://www.npmjs.com/package/@jest/globals): Allows Jest utilities to be imported instead of polluting the global scope

	* [cross-env](https://www.npmjs.com/package/cross-env): Used for setting the `--experimental-vm-modules` Node CLI flag to allow Jest to work with ESM modules

	* [jest-environment-jsdom](https://www.npmjs.com/package/jest-environment-jsdom): Mocks a DOM environment to allow testing code that uses DOM APIs

	* [ts-jest](https://kulshekhar.github.io/ts-jest/docs/): Allows Jest tests to be written in TypeScript

	* [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/): Utilities for DOM tests using Jest

	* [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/): Utilities for simulating user interaction during tests

* [esbuild](https://esbuild.github.io/): Bundling tool

* [sass](https://www.npmjs.com/package/sass): Compiling CSS from [Sass](https://sass-lang.com/)

* [Express](https://expressjs.com/): Running a Node.js server, accessed at `http://localhost:<PORT>`

* [Concurrently](https://www.npmjs.com/package/concurrently): Running server and development build tasks concurrently

* [dotenv](https://www.npmjs.com/package/dotenv): Reading environment variables from [`.env`](#env) file

* [eslint](https://www.npmjs.com/package/eslint): Linting TypeScript files

	* [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): Allows `eslint` to lint TypeScript

	* [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser): Allows `eslint` to parse TypeScript

	* [@stylistic/eslint-plugin](https://eslint.style/): Provides linting rules to enforce code style

* [stylelint](https://www.npmjs.com/package/stylelint): Linting CSS

	* [stylelint-config-recommended-scss](https://www.npmjs.com/package/stylelint-config-recommended-scss): Allows `stylelint` to lint SCSS files, and provides a base set of SCSS linting rules

### Deploy

These dependencies are used for deploying the project to GitHub Pages.

* [checkout](https://github.com/marketplace/actions/checkout): Used to check out the repository to a workspace so it can be built

* [setup-node](https://github.com/marketplace/actions/setup-node-js-environment): Use to set up a Node.JS environment for the build and test scripts to run on during the deployment process.

* [Deploy to GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages): Used to deploy the project to GitHub pages once it has been built
