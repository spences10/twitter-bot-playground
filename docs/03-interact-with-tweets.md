# Interact with tweets

To get a list of tweets in the bots time line use `.get(statuses/home_timeline'...`

```javascript
bot.get('statuses/home_timeline', {
  count: 1
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

To be more granular you can pull out specific information on each tweet.

```javascript
bot.get('statuses/home_timeline', {
  count: 5
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    data.forEach(t => {
      console.log(t.text)
      console.log(t.user.screen_name)
      console.log(t.id_str)
      console.log('\n')
    })
  }
})
```

To retweet use `.post('statuses/retweet/:id'...` and pass in a tweet id to retweet.

```javascript
bot.post('statuses/retweet/:id', {
  id: '860828247944253440'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} retweet success!`)
  }
})
```

To unretweet just use `.post('statuses/unretweet/:id'...`

```javascript
bot.post('statuses/unretweet/:id', {
  id: '860828247944253440'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} unretweet success!`)
  }
})
```

To like a tweet use `.post('favorites/create'...`

```javascript
bot.post('favorites/create', {
  id: '860897020726435840'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} tweet liked!`)
  }
})
```

To unlike a post use `.post('favorites/destroy'...`

```javascript
bot.post('favorites/destroy', {
  id: '860897020726435840'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} tweet unliked!`)
  }
})
```

To reply to a tweet is much the same a posting a tweet but you need to include the `in_reply_to_status_id` parameter, but that's not enough as you will also need to put in the screen name of the person you are replying to.

```javascript
bot.post('statuses/update', {
  status: '@ScottDevTweets I reply to you yes!',
  in_reply_to_status_id: '860900406381211649'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} tweeted!`)
  }
})
```

Finally if you want to delete a tweet use `.post('statuses/destroy/:id'...` passing the tweet id you want to delete.

```javascript
bot.post('statuses/destroy/:id', {
  id: '860900437993676801'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} tweet deleted!`)
  }
})
```

[Previous: work with users.](02-work-with-users.md#work-with-users)

[Next: Use twitter search.](04-use-twitter-search.md#use-twitter-search)
