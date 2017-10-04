# Putting it all together

Ok, so those examples were good n' all but we haven't really got a bot out of this have we? I mean you run it from the terminal and that's it done, we want to be able to kick off the bot and leave it to do its thing.

One way I have found to do this is to use `setInterval` which will kick off events from the main `bot.js` module, so lets try this:

Take the example we did to tweet a picture and add it to it's own module, so from the root directory of our project:

```shell
cd src
touch picture-bot.js
```

Take the example code from that and paste it into the new module, then we're going to make the following changes, to `getPhoto`:

```javascript
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
    saveFile(body, 'nasa.jpg')
  })
}
```

Then at the bottom of the module add:

```javascript
module.exports = getPhoto
```

So now we can call the `getPhoto` function from the `picture-bot.js` module in our `bot.js` module, our `bot.js` module should look something like this:


```javascript
const picture = require('./picture-bot')

picture()
```

That's it, two lines of code, try running that from the terminal now:

```shell
npm run start
```

We should get some output like this:

```shell
$ node index.js
Media saved!
file PATH C:\Users\path\to\project\tweebot-play\nasa.jpg
{ media_id: 863020197799764000,
  media_id_string: '863020197799763968',
  size: 371664,
  expires_after_secs: 86400,
  image: { image_type: 'image/jpeg', w: 954, h: 944 } }
Status posted!
Done in 9.89s.
```

Ok, so thats the picture of the day done, but it has run once and completed we need to put it on an interval with `setInterval` which we need to pass two options to, the function it's going to call and the timeout value.

The picture updates every 24 hours so that will be how many milliseconds in 24 hours [8.64e+7] I don't even 🤷‍

I work it out like this, 1000 * 60 = 1 minute, so 1000 * 60 * 60 * 24 so for now lets add that directly into the `setInterval` function:

```javascript
const picture = require('./picture-bot')

picture()
setInterval(picture, 1000 * 60 * 60 * 24)
```

Cool, that's a bot that will post the NASA image of the day every 24 hours!

Lets keep going, now lets add some randomness in with the Markov bot, like we did in the picture of the day example, lets create a new module for the Markov bot and add all the code in there from the previous example, so from the terminal:

```shell
cd src
touch markov-bot.js
```

Then copy pasta the markov bot example into the new module, then we're going to make the following changes:

```javascript
const tweetData = () => {
  fs.createReadStream(filePath)
    .pipe(csvparse({
      delimiter: ','
    }))
    .on('data', row => {
      inputText = `${inputText} ${cleanText(row[5])}`
    })
    .on('end', () => {
      const markov = new rita.RiMarkov(10)
      markov.loadText(inputText)
        .toString()
        .substring(0, 140)
      const sentence = markov.generateSentences(1)
      bot.post('statuses/update', {
        status: sentence
      }, (err, data, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Markov status tweeted!', sentence)
        }
      })
    })
}
```

Then at the bottom of the module add:

```javascript
module.exports = tweetData
```

Ok, same again as with the picture bot example we're going to add the `tweetData` export from `markov-bot.js` to our `bot.js` module, which should now look something like this:

```javascript
const picture = require('./picture-bot')
const markov = require('./markov-bot')

picture()
setInterval(picture, 1000 * 60 * 60 * 24)

markov()
```

Let's make the Markov bot tweet at random intervals between 5 minutes and 3 hours

```javascript
const picture = require('./picture-bot')
const markov = require('./markov-bot')

picture()
setInterval(picture, 1000 * 60 * 60 * 24)

const markovInterval = (Math.floor(Math.random() * 180) + 1) * 1000
markov()
setInterval(markov, markovInterval)
```

Allrighty! Picture bot, Markov bot, done 👍

Do the same with the link bot? Ok, same as before, you get the idea now, right?

Create a new file in the `src` folder for link bot:

```shell
touch link-bot.js
```

Copy pasta the code from the link bot example into the new module, like this:

```javascript
const link = () => {
  Tabletop.init({
    key: spreadsheetUrl,
    callback(data, tabletop) {
      data.forEach(d => {
        const status = `${d.links} a link from a Google spreadsheet`
        console.log(status)
        bot.post('statuses/update', {
          status
        }, (err, response, data) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Post success!')
          }
        })
      })
    },
    simpleSheet: true
  })
}

module.exports = link
```

Then we can call it from the bot, so it should look something like this:

```javascript
const picture = require('./picture-bot')
const markov = require('./markov-bot')
const link = require('./link-bot')

picture()
setInterval(picture, 1000 * 60 * 60 * 24)

const markovInterval = (Math.floor(Math.random() * 180) + 1) * 1000
markov()
setInterval(markov, markovInterval)


link()
setInterval(link, 1000 * 60 * 60 * 24)
```

Ok? Cool 👍😎

We can now leave the bot running to do its thing!!

[Previous: Retrieve and tweet data from a Google sheet.](08-retrieve-and-tweet-data-from-google-sheets.md#retrieve-and-tweet-data-from-google-sheets)

[Next: Deploy to now.](10-deploy-to-now.md#deploy-to-now)
