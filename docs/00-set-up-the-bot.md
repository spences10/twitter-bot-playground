# Set up the bot

Before touching the terminal or writing any code we'll need to create a [Twitter app][twitter-app] to get our API keys, we'll need them all:

```text
Consumer Key (API Key)
Consumer Secret (API Secret)
Access Token
Access Token Secret
```

Keep the keys somewhere safe so you can use them again when you need them, we're going to be using them in the [`.env`][dotenv] file we're going to create.

We're using [`dotenv`][dotenv] so that if at some point in the future we want to add our bot to GitHub the Twitter API keys are not added to GitHub for all to see.

Starting from scratch, create a new folder via the terminal and initialise the `package.json` via `npm` or `yarn` we'll need `twit` and `dotenv` for all these examples.

I'll be using `yarn` for all these examples, you can use `npm` if you prefer.

Terminal commands:

```shell
mkdir tweebot-play
cd tweebot-play
yarn init -y
yarn add twit dotenv
touch .env .gitignore index.js
```

If you take a look at the `package.json` that was created it should look something like this:

```json
{
  "name": "tweebot-play",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Scott Spence <spences10apps@gmail.com> (https://spences10.github.io/)",
  "license": "MIT",
  "dependencies": {
    "dotenv": "^4.0.0",
    "twit": "^2.2.5"
  }
}
```

Add an `npm` script to the `package.json` to kick off the bot when we're testing and looking for output:

```json
  "scripts": {
    "start": "node index.js"
  },
```

It should look something like this now:

```json
{
  "name": "tweebot-play",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Scott Spence <spences10apps@gmail.com> (https://spences10.github.io/)",
  "license": "MIT",
  "dependencies": {
    "dotenv": "^4.0.0",
    "twit": "^2.2.5"
  }
}
```

Now we can add the following pointer to the bot in `index.js`, like so:

```javascript
require('./src/bot')
```

So when we use `yarn start` to run the bot it calls the `index.js` file which runs the `bot.js` file from the `src` folder we're going to create.

Now we add our API keys to the `.env` file, it should look something like this:

```text
CONSUMER_KEY=AmMSbxxxxxxxxxxNh4BcdMhxg
CONSUMER_SECRET=eQUfMrHbtlxxxxxxxxxxkFNNj1H107xxxxxxxxxx6CZH0fjymV
ACCESS_TOKEN=7xxxxx492-uEcacdl7HJxxxxxxxxxxecKpi90bFhdsGG2N7iII
ACCESS_TOKEN_SECRET=77vGPTt20xxxxxxxxxxxZAU8wxxxxxxxxxx0PhOo43cGO
```

In the `.gitignore` file we need to add `.env` and `node_modules`

```shell
# Dependency directories
node_modules

# env files
.env
```

Then init git:

```shell
git init
```

Ok, now we can start to configure the bot, we'll need a `src` folder a `bot.js` file and a `config.js` file.

Terminal:

```shell
mkdir src
cd src
touch config.js bot.js
```

Then we can set up the bot config, open the `config.js` file and add the following:

```javascript
require('dotenv').config()

module.exports = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
}
```

Ok, that's the bot config done now we can set up the bot, each of the examples detailed here will have the same three lines of code:

```javascript
const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config)
```

Ok, that's it out bot is ready to go, do a test with `yarn start` from the terminal, we should get this for output:

```shell
yarn start
yarn start v0.23.4
$ node index.js
Done in 0.64s.
```

Bot is now configured and ready to go!🚀

[Next: Post Statuses.](01-post-statuses.md#post-statuses)

