# Project Title

## Header 1

- text

## Header 2

- Text

## Header 3

- Text

## Header 4

Text

## Typescript Instructions

This branch is configured to use Typescript in both the frontend and backend.
In the frontend, if you decide to use TS, you will need to define the Props and State interface for each component.
In the backend, make sure that you include type signatures when needed.

If you want to come use a js server, change the "start" script of package.json to `"start": "nodemon --ignore client/",` instead of
`"TS_NODE_PROJECT='./server-tsconfig.json' nodemon --watch 'server/**/*.ts' --exec 'ts-node' server/server.ts"`

If you want to modify how TS is compiled, you should modify client-tsconfig.json or server-tsconfig.json for client side and server side changes respectively. We have two tsconfig files to maintain the structure of the original skeleton code, although a monorepo approach might be cleaner.

**Sharing interfaces**

In the shared folder, you can export shared interfaces between the frontend and backend. This is to make get and post requests typesafe. Make sure that the interface is in sync with the mongoose schema! See server/models/User.ts.

**Note**

When installing packages, you will also have to install their type signatures. If the TypeScript compiler
is complaining that some package does not have any type signatures, make sure to do `npm install @types/nameOfPackageHere`. Note that because Heroku deletes all the devDependencies after the build step, make sure to do `npm install dependencyThatTheServerNeeds`. In this setup, you should only include use `npm install somePackage --save-dev` on client-side devDependencies.

## don't touch

the following files students do not need to edit. feel free to read them if you would like.

```
client/src/index.js
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
tsconfig.json
server-tsconfig.json
.babelrc
.npmrc
.prettierrc
package-lock.json
webpack.config.js
```

## Good luck on your project :)
