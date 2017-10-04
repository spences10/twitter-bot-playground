# Use Twitter search

To use search use `.get('search/tweets',...` there are quite a few search parameters for search.

`q: ''` the Q is for query so to search for mango use `q: 'mango'` we can also limit the results returned with `count: n` so let's limit it the count to in the example:

```javascript
bot.get('search/tweets', {
  q: 'mango',
  count: 5
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data.statuses)
  }
})
```

Like we did with the timeline we will pull out specific items from the `data.statuses` returned, like this:

```javascript
bot.get('search/tweets', {
  q: 'mango',
  count: 5
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    data.statuses.forEach(s => {
      console.log(s.text)
      console.log(s.user.screen_name)
      console.log('\n')
    })
  }
})
```

The search API returns for relevance and not completeness, if you want to search for an exact phrase you'll need to wrap the query in quotes `"purple pancakes"` if you want to search for one of two words then use `OR` like `'tabs OR spaces'` if you want to search for both use `AND` like `'tabs AND spaces'`.

If you want to search for a tweet without another word use `-` like `donald -trump` you can use it multiple times as well, like `donald -trump -duck`

You can search for tweets with emoticons, like `q: 'sad :('` try it!

Of course look for hashtags `q: '#towie'`. Look for tweets to a user `q: 'to:@stephenfry'` or from a user `q: 'from:@stephenfry'`

You can filter out indecent tweets with the `filter:safe` parameter you can also use it to filter for `media` tweets which will return tweets containing video. You can specify for `images` to view tweets with images and you can specify `links` for tweets with links.

If you want tweets from a certain website you can specify with the `url` parameter like `url:asda`

```javascript
bot.get('search/tweets', {
  q: 'from:@dan_abramov url:facebook filter:images since:2017-01-01',
  count: 5
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    data.statuses.forEach(s => {
      console.log(s.text)
      console.log(s.user.screen_name)
      console.log('\n')
    })
  }
})
```

Last few now, there's the `result_type` parameter that will return `recent`, `popular` or `mixed` results.

The `geocode` parameter that take the format latitude longitude then radius in miles `'51.5033640,-0.1276250,1mi'` example:

```javascript
bot.get('search/tweets', {
  q: 'bacon',
  geocode: '51.5033640,-0.1276250,1mi',
  count: 5
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    data.statuses.forEach(s => {
      console.log(s.text)
      console.log(s.user.screen_name)
      console.log('\n')
    })
  }
})
```

[Previous: Interact with tweets.](03-interact-with-tweets.md#interact-with-tweets)

[Next: Use twitter stream.](05-use-twitter-stream-api.md#use-twitter-stream-api)
