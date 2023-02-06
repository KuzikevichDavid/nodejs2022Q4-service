# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone {repository URL}
```

## Installing NPM modules

```bash
npm install
```

## Running application

Rename file `.env.example` to `.env` and change value of `port` if needed. Default value of `port` is 4000.

```bash
npm start
```

After starting the app you can test API in `Swagger Editor` by typing in browser http://localhost:4000/doc/ 
or https://editor.swagger.io/?url=https://localhost:4001/doc/file.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
