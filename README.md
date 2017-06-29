# Twitter bot playground

[![Greenkeeper badge](https://badges.greenkeeper.io/spences10/twitter-bot-playground.svg)](https://greenkeeper.io/) [![license][license-badge]][license-url] [![Chat](https://badges.gitter.im/awesome-twitter-bots/Lobby.svg)][gitter-url]

A twitter bot that uses the npm twit module with node, written in TypeScript

## Prerequisites

If you're going to follow along with this I'm going to assume that you have node installed on your machine and that you have a twitter account to use with the bot, along with your Twitter API keys for that account, if you need guidance on that take a look at the [README][twibotboo] of my [Twitter bot bootstrap][twibotboo] repo which details setting up a Twitter app and getting your API keys.

## Set up TypeScript

This is an exercise for me to get familiar with using TypeScript in an application and what better way than with a Twitter bot!

I'm going to try make this bot with the same functionality as the previous [**Twitter bot playground**][twibotcommon] that was coded in vanilla JS.

First off install [TypeScript][tsdl]

```shell
npm i -g typescript
```

You can get familiar with it by taking a look at the [TypeScript in 5 minutes tutorial][tsin5] if you like, it's exactly where I started.

## Set up the Project

Ok, now we're good to go for setting up our Twitter bot!

Lets start small, so, first off we need to init the project with TypeScript and npm, so from a terminal:

```shell
npm init -y
tsc -init
```

That will set up our config files, if you take a look at the `tsconfig.json` there may be something that loosely resembles this:

```json
{
  "compilerOptions": {
    /* Basic Options */                       
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    // "lib": [],                             /* Specify library files to be included in the compilation:  */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
```

It goes on for another fifty or so lines but I thought for readability I'll just stick a small section of it here so you can get an idea of what it looks like.

This was a bit overwhelming to begin with but if you take a look at the [TypeScript node starter project][tsnst] you can take some guidance from there on what the `tsconfig.json` should look like, I have come up with this:

```json
{
  "compilerOptions": {
    "outDir": "./build",
    "allowJs": true,
    "target": "es5",
    "module": "commonjs"
  },
  "types": [
    "node",
    "dotenv"
  ],
  "include": [
    "./"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ]
}
```

I won't pretend to know exactly what is going on here over and above the documentation supplied in the `tsconfig.json` comments, I know the `outDir` is where we want to keep our compiled `.js` files that the TypeScript compiler `tsc` will produce for us. These files are what we will be running in node.

Wow, all that talk and not even one line of line of code yet!

So, we have our package files `tsconfig.json` and `package.json` set up in out project, let's just make sure we can even TypeScript first! 

Create an `index.js` file:

```shell
touch index.ts
```

In our `index.ts` add a hello world console log:

```javascript
console.log('Hello TypeScript!')
```

Then from the terminal enter the `tsc` command to compile. This should create the JavaScript equivalent in the `build` folder, now if you take a look in there you'll see there's an `index.js` file, so we're happy now that the `tsc` will compile our `.ts` file into `.js` files!

## Make a basic bot

Awesome! Lets install the npm dependency for `twit`:

```shell
npm i twit
```

And set up a bot with the API keys for configuration, something like this:

```javascript
import * as Twit from 'twit'

const bot = new Twit({
  consumer_key: 'xxxxxxxxxxxxxxxxxxxxdMhxg',
  consumer_secret: 'xxxxxxxxxxxxxxxxxxxxkFNNj1H107PFv1mvWwEM6CZH0fjymV',
  access_token: 'xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxecKpi90bFhdsGG2N7iII',
  access_token_secret: 'xxxxxxxxxxxxxxxxxxxxZAU8wNKAPU8Qz2c0PhOo43cGO'
})
```

Simple bot set up and ready to go, it does jack all right now but we'll know if we're on the right track when we try run it and get no errors! So with that in mind lets do some more configuration!! 🙃

The code we want to run will be from the generated `build` folder so lets set up an npm script to run the `index.js` file from there, add the following script to your `package.json`:

```json
  "scripts": {
    "start": "node build/index.js"
  },
```

We can now test the output from the `tsc` so from the terminal run the `tsc` command:

```shell
tsc
```

Up until now we have just been running the `tsc` when needed but there is a watch function in the TypeScript compiler that we can use so that when we make a change the files are compiled and moved to the `build` folder after each save. To watch for file changes with `tsc` just use the `-w` flag:

```shell
tsc -w
```

No we can run the npm script, so from the terminal:

```shell
npm start
```

This should run the script start the `index.js` file from the `build` folder with no errors. 

Now we're ready to start adding more functionality 👍



<!-- LINKS -->
[license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: http://opensource.org/licenses/MIT
[gitter-bagde]: https://badges.gitter.im/awesome-twitter-bots/Lobby.svg
[gitter-url]: https://gitter.im/awesome-twitter-bots/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[twibotboo]: https://github.com/spences10/twitter-bot-bootstrap#twitter-bot-bootstrap
[twibotcommon]: https://github.com/spences10/twitter-bot-playground/tree/commonjs
[tsdl]: https://www.typescriptlang.org/#download-links
[tsin5]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[tsnst]: https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter
