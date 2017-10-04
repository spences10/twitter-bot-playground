# Deploy to `now`

Right, we have a bot that does a few things but it's on our development environment, so it can't stay there forever, well it could but it'd be pretty impcratcical. Lets put our bot on a server somewhere to do it's thing.

To do this we're going to be using [`now`][now], `now` allows for simple deployments from the CLI if you're not fimailiar with now then take a quick look at the [documentation][now] in these examples we're going to be using the `now-cli`.

There's a few things we need to do in order to get our bot ready to go on [`now`][now], let's list them quickly and then go into detail.

* Signup and install `now-cli`
* Add `now` settings + `.npmignore` file
* Add `.env` variables as secrets
* Add npm `deploy` script
* Re jig `picture-bot.js`

Ready? Lets do this! 💪

**Signup and install `now-cli`**

Fist up lets signup for [zeit][zeit-login] ▲ create an account and authenticate, then we can install the CLI.

Install `now` globally on our machine so you can use it everywhere, to install the `now-cli` from the terminal enter:

```shell
npm install -g now
```

Once it's completed login with:

```shell
now --login
```

The first time you run `now`, it'll ask for your email address in order to identify you. Go to the email account to supplied when sigining up an click on the email sent to you from `now`, and you'll be logged in automatically.

If you need to switch the account or re-authenticate, run the same command again.

You can always check out the [`now-cli`][now-getting-started-cli] documentation for more information along with the [`your first deployment`][now-first-deploy] guide.

**Add `now` settings**

Ok, so that's signup and install sorted, we can now configure the bot for deploying to `now`. First up lets add the `now` settings to our `package.json` file, I've put it in between my `npm` scripts and the author name in my `package.json`:

```json
"scripts": {
    "start": "node index.js"
  },
  "now": {
    "alias": "my-awesome-alias",
    "files": [
      "src",
      "index.js"
    ]
  },
  "author": "Scott Spence",
```

This was a source of major confusion for me so I'm hoping I can save you the pain I went through trying to configure this, all the relevant documentation is there you just need to put it all together 😎

>If you find anything in here that doesn't make sense or is just outright wrong then please [log an issue][github-issue] or create a pull request 👍

The now settings `alias` is to give your deployment a shothand name over the auto generated URL that `now` creates, the `files` section covers what we want to include in the depoloyment to `now` we'll go over the file structure shortly. Basically what is included in the `files` array is all that get pused up to the now servers.

All good so for?

Ok, now we need to add a `.npmignore` file in the root of the project and add the following line to it:

```shell
!tweets.csv
```

The `tweets.csv` needs to go up to the `now` server to be used by the bot, but we previously included it in our `.gitignore` which is what `now` uses to build your project when it's being loaded to the server. So this means that the file isn't going to get loaded unless we add the `.npmignore` to not ignore the `tweets.csv` 😅

**Add `.env` variables as secrets**

Ok, our super duper secret Twitter keys will need to be stored as `secrets` in `now` this is a pretty neat feature where you can define anything as a secret and reference it as an alias with `now`.

Lets start, so the syntax is `now secrets add my-secret "my value"` so for our `.env` keys add them all in giving them a descriptive [but short!] name.

>You will not need to wrap your "my value" in quotes but the documentation does say "when in doubt, wrap your value in quotes"

Ok, so from the terminal `now secrets ls` should list out your `secrets` you just created:

```shell
$ now secrets ls
> 5 secrets found under spences10 [1s]

                            id  name                   created
  sec_xxxxxxxxxxZpLDxxxxxxxxxx  ds-twit-key            23h ago
  sec_xxxxxxxxxxTE5Kxxxxxxxxxx  ds-twit-secret         23h ago
  sec_xxxxxxxxxxNorlxxxxxxxxxx  ds-twit-access         23h ago
  sec_xxxxxxxxxxMe1Cxxxxxxxxxx  ds-twit-access-secret  23h ago
  sec_xxxxxxxxxxMJ2jxxxxxxxxxx  nasa-key               23h ago
```

**Add npm `deploy` script**

Now we have out secrets defined we can create a deployment script to deploy to `now`, so in our `package.json` lets add an additional script:

```json
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "deploy": "now -e CONSUMER_KEY=@ds-twit-key -e CONSUMER_SECRET=@ds-twit-secret -e ACCESS_TOKEN=@ds-twit-access  -e ACCESS_TOKEN_SECRET=@ds-twit-access-secret -e NASA_KEY=@nasa-key"
  },
  "now": {
```

Lets go over what we have added there, `deploy` will run the `now` command and pass it all our environment `-e` variables and the associated `secret` value, if we break it down into separate lines it will be a bit clearer:

```text
now
-e CONSUMER_KEY=@ds-twit-key
-e CONSUMER_SECRET=@ds-twit-secret
-e ACCESS_TOKEN=@ds-twit-access
-e ACCESS_TOKEN_SECRET=@ds-twit-access-secret
-e NASA_KEY=@nasa-key
```

**Re jig `picture-bot.js`**

Ok, because `now` deployments are [immutable][immutable-deployment] it means that there's no write access to the disk where we want to save our NASA photo of the day, so to get around that we need to use the `/tmp` file location.

Shout out to [@Tim][tim] from `zeit` for helping me out with this!

In the `picture-bot.js` module add the following two lines to the top of the module:

```javascript
const os = require('os')
const tmpDir = os.tmpdir()
```

Those two lines give us the `temp` directory of the operating system, so if like me you're on Windows it will work as well as if you are on another stsyem like a linux based system, which is what `now` is. In our `saveFile` function we're going to use `tmpDir` to save our file.

We've taken out the `nasa.jpg` from the `getPhoto` function as we can define that information in the `saveFile` function, the NASA potd is not just a `'jpeg` some items posted there are videos as well. We we can define the type with a [ternary function][ternary] off of the `body` being passed in, this will send a tweet with a link to the video:

```javascript
function saveFile(body) {
  const fileName = body.media_type === 'image/jpeg' ? 'nasa.jpg' : 'nasa.mp4';
  const filePath = path.join(tmpDir + `/${fileName}`)

  console.log(`saveFile: file PATH ${filePath}`)
  if (fileName === 'nasa.mp4') {
    // tweet the link
    const params = {
      status: 'NASA video link: ' + body.url
    }
    postStatus(params)
    return
  }
  const file = fs.createWriteStream(filePath)

  request(body).pipe(file).on('close', err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      const descriptionText = body.title
      uploadMedia(descriptionText, filePath)
    }
  })
}
```

The completed code here:

<details>
  <summary>Click to expand</summary>

```javascript
const Twit = require('twit')
const request = require('request')
const fs = require('fs')
const config = require('./config')
const path = require('path')

const bot = new Twit(config)

const os = require('os')
const tmpDir = os.tmpdir()

const getPhoto = () => {
  const parameters = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  }
  request.get(parameters, (err, respone, body) => {
    body = JSON.parse(body)
    saveFile(body)
  })
}

function saveFile(body) {
  const fileName = body.media_type === 'image/jpeg' ? 'nasa.jpg' : 'nasa.mp4';
  const filePath = path.join(tmpDir + `/${fileName}`)

  console.log(`saveFile: file PATH ${filePath}`)
  if (fileName === 'nasa.mp4') {
    // tweet the link
    const params = {
      status: 'NASA video link: ' + body.url
    }
    postStatus(params)
    return
  }
  const file = fs.createWriteStream(filePath)

  request(body).pipe(file).on('close', err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      const descriptionText = body.title
      uploadMedia(descriptionText, filePath)
    }
  })
}

function uploadMedia(descriptionText, fileName) {
  console.log(`uploadMedia: file PATH ${fileName}`)
  bot.postMediaChunked({
    file_path: fileName
  }, (err, data, respone) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      const params = {
        status: descriptionText,
        media_ids: data.media_id_string
      }
      postStatus(params)
    }
  })
}

function postStatus(params) {
  bot.post('statuses/update', params, (err, data, respone) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Status posted!')
    }
  })
}

module.exports = getPhoto

```
</details>

Ok, thats it! We're ready to deploy to `now`!🚀

So from the terminal we call our deployment script we defined earlier:

```shell
yarn deploy
```

You will get some output:

```shell
λ yarn deploy
yarn deploy v0.24.4
$ now -e CONSUMER_KEY=@ds-twit-key -e CONSUMER_SECRET=@ds-twit-secret -e ACCESS_TOKEN=@ds-twit-access  -e ACCESS_TOKEN_SECRET=@ds-twit-access-secret -e NASA_KEY=@nasa-key
> Deploying ~\gitrepos\tweebot-play under spences10
> Using Node.js 7.10.0 (default)
> Ready! https://twee-bot-play-rapjuiuddx.now.sh (copied to clipboard) [5s]
> Upload [====================] 100% 0.0s
> Sync complete (1.54kB) [2s]
> Initializing…
> Building
> ▲ npm install
> ⧗ Installing:
>  ‣ csv-parse@^1.2.0
>  ‣ dotenv@^4.0.0
>  ‣ rita@^1.1.63
>  ‣ tabletop@^1.5.2
>  ‣ twit@^2.2.5
> ✓ Installed 106 modules [3s]
> ▲ npm start
> > tweet-bot-playground@1.0.0 start /home/nowuser/src
> > node index.js
> saveFile: file PATH /tmp/nasa.jpg
> Media saved!
> uploadMedia: file PATH /tmp/nasa.jpg
```

Woot! You have your bot deployed! 🙌

If you click on the link produced you will be able to inspect the bot as it is on `now` there's also a handy logs section on the page where you can check for output. 👍

[Previous: Putting it all together.](09-putting-it-all-together.md#putting-it-all-together)

<!-- links -->
[zeit-login]: https://zeit.co/login
[now]: https://zeit.co/now
[now-getting-started-cli]: https://zeit.co/docs/getting-started/installing-now#cli-with-npm
[now-first-deploy]: https://zeit.co/docs/getting-started/your-first-deployments#deploying-node
[github-issue]: https://github.com/spences10/twitter-bot-playground/issues/new
[immutable-deployment]: https://blog.codeship.com/immutable-deployments/
[tim]: https://github.com/timneutkens
[ternary]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

