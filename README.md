# Architect [![Build Status](https://travis-ci.org/codaco/Architect.svg?branch=master)](https://travis-ci.org/codaco/Architect)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodaco%2FArchitect.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodaco%2FArchitect?ref=badge_shield)

Technologies used:
ES6 (via Babel)
React
Redux
Electron
Cordova
SCSS
Jest (Testing suite)
React Scripts

# Operation
## Installation
This repository assumes that `npm` is installed. If you don't have it installed, here are [installation instructions](https://docs.npmjs.com/getting-started/installing-node).

1. Clone this repo.
2. Go into the repo directory

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`.|
|`build`|Compiles assets and prepares app for production in the /build directory.|
|`test`|Runs testing suite.|
|`build-docs`|Builds HTML API docs into the docs-build directory.|
|`electron`|Runs the current code in electron, for testing.|
|`generate-icons`|Uses icon-gen package to generate iconsets and icon files for OSX and Windows.|
|`package-mac`|Uses electron-packager to package an OSX release.|
|`package-win`|Uses electron-packager to package a Windows release.|
|`package-linux`|Uses electron-packager to package a Linux release.|
|`package-cordova`|Builds Android and iOS cordova projects|
|`create-installer-mac`|Creates a DMG based installer for OSX.|

### Development workflow in Electron

There are two additional tasks to enable development within an electron app natively:

1. `npm run start:electron`: to start the webpack dev server
  - Note: must be running on port 3000.
2. `npm run electron:dev` (in another terminal session)
  1. Copies the electron source to `./electron-dev`
  2. Runs the electron app from there

#### Dev tools

Electron supports [extensions to Chrome devtools](https://electronjs.org/docs/tutorial/devtools-extension) such as Redux DevTools.

In the development environment, these will be loaded if you provide one or more paths to your extensions (semicolon-separated) in the `NC_DEVTOOLS_EXENSION_PATH` environment variable. The electron docs describe how to find the filepath for an extension once installed.

Example: enabling Redux Devtools on macOS:
```bash
NC_DEVTOOLS_EXENSION_PATH=~/Library/Application\ Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.2_0 npm run electron:dev
```

## Application Structure

```
.
├── build                    # Prod assets
├── config                   # Project and build configurations (webpack, env config)
├── public                   # Static public assets
│   └── index.html           # Static entry point
├── src                      # Application source code
│   ├── index.js             # Application bootstrap and rendering
│   ├── routes.js            # App Route Definitions
│   ├── components           # Contains directories for components
│   ├── containers           # Contains directories for containers for native and base classes
│   ├── reducers             # Reducers for data stores
│   ├── ducks                # Middleware, modules (ducks-style with actions, reducers, and action creators), and store
│   └── utils                # Helpers and utils
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodaco%2FArchitect.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodaco%2FArchitect?ref=badge_large)
