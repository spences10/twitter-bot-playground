# Use Twitter Stream API

There are two ways to use the Stream API first there's `.stream('statuses/sample')` example:

```javascript
const stream = bot.stream('statuses/sample');

stream.on('tweet', t => {
  console.log(`${t.text}\n`)
})
```

This will give you a random sampling of tweets.

For more specific information use `.stream('statuses/filter')...` then pass some parameters, use `track:` to specify a search string:

```javascript
var stream = bot.stream('statuses/filter', {
  track: 'bot'
})

stream.on('tweet', function (t) {
  console.log(t.text + '\n')
})
```

You can also use multiple words in the `track` parameter, tis will get you results with either `twitter` or `bot` in them.

```javascript
const stream = bot.stream('statuses/filter', {
  track: 'twitter, bot'
});

stream.on('tweet', t => {
  console.log(`${t.text}\n`)
})
```

If you want both words then remove the comma `,` you can think of spaces as `AND` and commas as `OR`

You can also use the `follow:` parameter which lets you input the ids of specific users, example:

```javascript
const stream = bot.stream('statuses/filter', {
  follow: '4897735439'
});

stream.on('tweet', t => {
  console.log(`${t.text}\n`)
})
```

[Previous: Use twitter search.](04-use-twitter-search.md#use-twitter-search)

[Next: Tweet media files.](06-tweet-media-files.md#tweet-media-files)
