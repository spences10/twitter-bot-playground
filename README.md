# Twitter bot playground

[![Greenkeeper badge](https://badges.greenkeeper.io/spences10/twitter-bot-playground.svg)](https://greenkeeper.io/) [![license][license-badge]][license-url] [![Chat](https://badges.gitter.im/awesome-twitter-bots/Lobby.svg)][gitter-url]

<details>
  <summary>Click to expand TOC</summary>

<!-- TOC -->

- [Twitter bot playground](#twitter-bot-playground)
  - [Prerequisites](#prerequisites)
  - [Set up TypeScript](#set-up-typescript)
  - [Set up the Project](#set-up-the-project)
  - [Make a basic bot](#make-a-basic-bot)
  - [Project structure](#project-structure)
  - [Set up the bot](#set-up-the-bot)
  - [Post Statuses](#post-statuses)
  - [Work with users](#work-with-users)

<!-- /TOC -->

</details>

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

```typescript
console.log('Hello TypeScript!')
```

Then from the terminal enter the `tsc` command to compile. This should create the JavaScript equivalent in the `build` folder, now if you take a look in there you'll see there's an `index.js` file, so we're happy now that the `tsc` will compile our `.ts` file into `.js` files!

## Make a basic bot

Awesome! Lets install the npm dependency for `twit`:

```shell
npm i twit
```

And set up a bot with the API keys for configuration, something like this:

```typescript
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

## Project structure

Lets organise the project a bit, add a `src` folder to the project and we'll move our `index.ts` file in there, in the `src` folder we're going to create an additional two files:

```shell
touch src/bot.ts src/config.ts
```

In the `index.ts` file we're going to make a pointer to the `bot.ts` file and in the `config.ts` we're going to use a `.env` file to store out API keys.

The project structure should look something like this now:

```text
├─ build
│  └─...
├─ node_modules
├─ src/
│  ├─ bot.ts
│  ├─ config.ts
│  └─ index.ts
├─ .env
├─ .gitignore
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

I know I haven't gone over what the `.env` file is used for, it's is used to store environment variables and sensitive information, you will need to add your Twitter API keys in there like in this example:

```shell
CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxdMhxg
CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxkFNNj1H107PFv1mvWwEM6CZH0fjymV
ACCESS_TOKEN=xxxxxxxxx-xxxxxxxxxxxxxxxxxxxxecKpi90bFhdsGG2N7iII
ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxZAU8wNKAPU8Qz2c0PhOo43cGO
```

**Note** that there are no `''` around the keys or spaces for the `=` sign.

The `.gitignore` should be a `node` flavoured one, you can get a version from [github/gitignore][ngign] you should add `build` in there as well 👌

Now that we have moved where the `index.ts` file is we'll need to update the npm script we did earlier:

```json
  "scripts": {
    "start": "node build/index.js"
  },
```

## Set up the bot 

Now we're going to set up the bot so that we can use it in each of the examples we're going to go through.

Let's install some dependencies and types, the types are just going to be available to us in development so we'll use the `-D` flag to install them as dev dependencies :

```shell
npm i dotenv
npm i -D @types/dotenv @types/node @types/twit
```

Ok, now to add the pointer into `index.ts` file mentioned earlier, open `index.ts` copy the code from that into `bot.ts` in `index.ts` now we just want one line of code:

```javascript
import './bot'
```

Now that we have `dotenv` installed we can use that in the `config.ts` file so that we can use configuration variables across the project, in the `config.ts` file type:

```typescript
import * as dotenv from 'dotenv'

const config = dotenv.config({ path: '.env' }).parsed

export = config
``` 

This will process the contents of the `.env` and assign it to `process.env` to be used in the bot, which we're going to add the `config.ts` into. 

`bot.ts` should look like this now:

```typescript
import * as Twit from 'twit'
import * as config from './config'

const bot = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
})
```

Running the `npm start` script should not return any errors like when we had the API keys hardcoded into the `Twit({})` config.

Bot is now configured and ready to go! 🚀

## Post Statuses

Firstly post statuses, with `.post('statuses/update'...` bot will post a hello world! status.

```typescript
bot.post(
  'statuses/update',
  {
    status: 'hello world!'
  },
  (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweeted!`)
    }
  }
)
```

## Work with users

To get a list of followers ids use `.get('followers/ids'...` and include the account that you want the followers of, in this example we're using [`@DroidScott`][scottbot], you can use any account you like. We can then log them out to the console in this example.

```javascript
bot.get(
  'followers/ids',
  {
    screen_name: 'DroidScott',
    count: 5
  },
  (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  }
)
```

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
[ngign]: https://github.com/github/gitignore/blob/master/Node.gitignore
