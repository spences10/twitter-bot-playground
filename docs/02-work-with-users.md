# Work with users

To get a list of followers ids use `.get('followers/ids'...` and include the account that you want the followers of, in this example we're using [`@DroidScott`][scottbot], you can use any account you like. We can then log them out to the console in this example.

```javascript
bot.get('followers/ids', {
  screen_name: 'DroidScott',
  count: 5
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

You can specify with the `count` parameter how many results you get up to 100 at a time.

Or to get a detailed list you can use `.get('followers/list'...`

Here we print off a list of `user.screen_name`'s up to 200 per call.

```javascript
bot.get('followers/list', {
  screen_name: 'DroidScott',
  count:200
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    data.users.forEach(user => {
      console.log(user.screen_name)
    })
  }
})
```

To follow back a follower we can use `.post('friendships/create'...` here the bot is following back the user `MarcGuberti`

>A bot should only follow users that follow the bot.

```javascript
bot.post('friendships/create', {
  screen_name: 'MarcGuberti'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

Like with followers you can get a list of accounts that your bot is following back.

```javascript
bot.get('friends/ids', {
  screen_name: 'DroidScott'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

And also a detailed list.

```javascript
bot.get('friends/list', {
  screen_name: 'DroidScott'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

Get friendship status, this is useful for following new followers, this will give us the relation of a specific user. So you can run through your followers list and follow back any users that do not have the `following` connection.

Lets take a look at the relation between our bot and [`@ScottDevTweets`][scotttwit]

```javascript
bot.get('friendships/lookup', {
  screen_name: 'ScottDevTweets'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

If the user follows the bot, then relationship will be:

```shell
[ { name: 'Scott Spence 🌯😴💻♻',
    screen_name: 'ScottDevTweets',
    id: 4897735439,
    id_str: '4897735439',
    connections: [ 'followed_by' ] } ]
```

If the user and the bot are following each other, the relationship will be:

```shell
[ { name: 'Scott Spence 🌯😴💻♻',
    screen_name: 'ScottDevTweets',
    id: 4897735439,
    id_str: '4897735439',
    connections: [ 'following', 'followed_by' ] } ]
```

And if there is no relationship then:

```shell
[ { name: 'Scott Spence 🌯😴💻♻',
    screen_name: 'ScottDevTweets',
    id: 4897735439,
    id_str: '4897735439',
    connections: [ 'none' ] } ]
```

Direct Message a user with `bot.post('direct_messages/new'...`

>A bot should only DM a user that is following the bot account

```javascript
bot.post('direct_messages/new', {
  screen_name: 'ScottDevTweets',
  text: 'Hello from bot!'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

[Previous: Post statuses.](01-post-statuses.md#post-statuses)

[Next: Interact with tweets.](03-interact-with-tweets.md#interact-with-tweets)

<!-- links -->
[scottbot]: https://twitter.com/DroidScott
[scotttwit]: https://twitter.com/ScottDevTweets
