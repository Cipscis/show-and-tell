# show-and-tell

![Build and deploy status badge](https://github.com/cipscis/show-and-tell/actions/workflows/build-and-deploy.yml/badge.svg)

[Show and Tell](https://cipscis.github.io/show-and-tell/)

## Development

You will need to install [Node.js](https://nodejs.org/en/) before working on this project.

1. Clone the repository using `git clone https://github.com/cipscis/show-and-tell.git`.
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
* `npm run test:coverage` runs any configured test suites using [Jest](https://jestjs.io/), and reports coverage information.
* `npm run watch:test` runs any configured test suites using [Jest](https://jestjs.io/) in watch mode.

### .env

The `.env` file contains the following environment variables:

* `PROJECT_NAME?: string`

If present, used by [Express](https://expressjs.com/) to set up redirects for emulating [GitHub Pages](#github-pages).

* `MODE: 'development' | 'production'`

Used to determine what optimisations to use when running the build process.

* `PORT: number`

Used by [Express](https://expressjs.com/) to determine which port to use when running a local Node.js server.

An example `.env` file you can use for development is:

```
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

* [checkout](https://github.com/marketplace/actions/checkout): Used to check out the repository to a workspace so it can be built.

* [setup-node](https://github.com/marketplace/actions/setup-node-js-environment): Use to set up a Node.JS environment for the build and test scripts to run on during the deployment process.

* [upload-pages-artifact](https://github.com/marketplace/actions/upload-github-pages-artifact): Used to upload an artifact to use for deploying to GitHub Pages.

* [deploy-pages](https://github.com/marketplace/actions/deploy-github-pages-site): Used to deploy the artifact to GitHub Pages.
