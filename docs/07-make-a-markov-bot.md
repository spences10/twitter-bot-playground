# Make a Markov bot

This is pretty neat, again from the [egghead.io][egghead-markov] series it uses [`rita`][rita-npm] natural language toolkit. It also uses `csv-parse` as we're going to be reading out our Twitter archive to make the bot sound like us tweeting.

First of all, to set up the [Twitter archive][tweet-archive], you'll need to request your data from the Twitter settings page. You'll be emailed a link to download your archive, then when you have downloaded the archive extract out the `tweets.csv` file, we'll then put that in it's own folder, so from the root of your project:

```shell
cd src
mkdir twitter-archive
```

We'll move our `tweets.csv` there to be accessed by the bot we're going to go over now.

Use `fs` to set up a read stream...

```javascript
const filePath = path.join(__dirname, './twitter-archive/tweets.csv')

const tweetData =
  fs.createReadStream(filePath)
  .pipe(csvparse({
    delimiter: ','
  }))
  .on('data', row => {
    console.log(row[5])
  })
```

When you run this from the console you should get the output from your Twitter archive.

Now clear out things like `@` and `RT` to help with the natural language processing we'll set up two functions `cleanText` and `hasNoStopWords`

`cleanText` will tokenize the text delimiting it on space `' '` filter out the stop words then `.join(' ')` back together with a space and `.trim()` any whitespace that may be at the start of the text.

```javascript
function cleanText(text) {
  return rita.RiTa.tokenize(text, ' ')
    .filter(hasNoStopWords)
    .join(' ')
    .trim()
}
```

The tokenized text can then be fed into the `hasNoStopWords` function to be sanitized for use in `tweetData`

```javascript
function hasNoStopWords(token) {
  const stopwords = ['@', 'http', 'RT'];
  return stopwords.every(sw => !token.includes(sw))
}
```

Now that we have the data cleaned we can tweet it, so replace `console.log(row[5])` with `inputText = inputText + ' ' + cleanText(row[5])` then we can use `rita.RiMarkov(3)` the 3 being the number of words to take into consideration. Then use `markov.generateSentences(1)` with 1 being the number of sentences being generated. We'll also use `.toString()` and `.substring(0, 140)` to truncate the result down to 140 characters.

```javascript
const tweetData =
  fs.createReadStream(filePath)
  .pipe(csvparse({
    delimiter: ','
  }))
  .on('data', function (row) {
    inputText = `${inputText} ${cleanText(row[5])}`
  })
  .on('end', function(){
    const markov = new rita.RiMarkov(3)
    markov.loadText(inputText)
    const sentence = markov.generateSentences(1)
      .toString()
      .substring(0, 140)
  }
```

Now we can tweet this with the bot using `.post('statuses/update'...` passing in the `sentence` variable as the `status` logging out when there is a tweet.

```javascript
const tweetData =
  fs.createReadStream(filePath)
    .pipe(csvparse({
      delimiter: ','
    }))
    .on('data', row => {
      inputText = `${inputText} ${cleanText(row[5])}`
    })
    .on('end', () => {
      const markov = new rita.RiMarkov(3)
      markov.loadText(inputText)
      const sentence = markov.generateSentences(1)
        .toString()
        .substring(0, 140)
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

If you want your sentences to be closer to the input text you can increase the words to consider in `rita.RiMarkov(6)` and if you want to make it gibberish then lower the number.

Here's the completed module:

<details>
  <summary>Click to expand</summary>

```javascript
const Twit = require('twit')
const fs = require('fs')
const csvparse = require('csv-parse')
const rita = require('rita')
const config = require('./config')
const path = require('path')

let inputText = ''

const bot = new Twit(config)

const filePath = path.join(__dirname, '../twitter-archive/tweets.csv')

const tweetData =
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
      const sentence = markov.generateSentences(1)
        .toString()
        .substring(0, 140)
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

function hasNoStopWords(token) {
  const stopwords = ['@', 'http', 'RT']
  return stopwords.every(sw => !token.includes(sw))
}

function cleanText(text) {
  return rita.RiTa.tokenize(text, ' ')
    .filter(hasNoStopWords)
    .join(' ')
    .trim()
}
```

</details>

[Previous: Tweet media files.](06-tweet-media-files.md#tweet-media-files)

[Next: Retrieve and tweet data from a Google sheet.](08-retrieve-and-tweet-data-from-google-sheets.md#retrieve-and-tweet-data-from-google-sheets)
