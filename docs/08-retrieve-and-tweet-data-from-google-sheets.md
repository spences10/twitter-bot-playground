# Retrieve and Tweet data from Google sheets

If you want to tweet a list of links you can use [`tabletop`][npm-tabletop] to work though the list, in this example again from [egghead.io][egghead-tabletop] we'll go through a list of links.

So, set up the bot and require `tabletop`:

```javascript
const Twit = require('twit')
const config = require('./config')
const Tabletop = require('tabletop')

const bot = new Twit(config)
```

On your [`Google spreadsheet`][google-sheets] you'll need to have a header defined and then add your links, we'll use the following for an example:

|links|
|---|
|https://www.freecodecamp.com|
|https://github.com|
|https://www.reddit.com|
|https://twitter.com|

Now from Google sheets we can select 'File'>'Publish to the web' and copy the link that is generated we can use that in table top.

Now init Table top with three parameters, `key:` which is the spreadsheet URL, a `callback:` function to get the data and `simpleSheet:` which is `true` if you only have one sheet, like in our example here:

```javascript
const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1842GC9JS9qDWHc-9leZoEn9Q_-jcPUcuDvIqd_MMPZQ/pubhtml'

Tabletop.init({
  key: spreadsheetUrl,
  callback(data, tabletop) {
    console.log(data)
  },
  simpleSheet: true
})
```

Running the bot now should give output like this:

```shell
$ node index.js
[ { 'links': 'https://www.freecodecamp.com' },
  { 'links': 'https://github.com' },
  { 'links': 'https://www.reddit.com' },
  { 'links': 'https://twitter.com' } ]
```

So now we can tweet them using `.post('statuses/update',...` with a `forEach` on the `data` that is returned in the callback:

```javascript
Tabletop.init({
  key: spreadsheetUrl,
  callback(data, tabletop) {
    data.forEach(d => {
      const status = `${d.links} a link from a Google spreadsheet`;
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
```

Note that `${d.links}` is the header name we use in the Google spreadsheet, I tried using skeleton and camel case and both returned errors so I went with a single name header on the spreadsheet.

The completed code here:

<details>
  <summary>Click to expand</summary>

```javascript
const Twit = require('twit')
const config = require('./config')
const Tabletop = require('tabletop')

const bot = new Twit(config)

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1842GC9JS9qDWHc-9leZoEn9Q_-jcPUcuDvIqd_MMPZQ/pubhtml'

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
```

</details>

[Previous: Make a Markov bot.](07-make-a-markov-bot.md#make-a-markov-bot)

[Next: Putting it all together.](09-putting-it-all-together.md#putting-it-all-together)
