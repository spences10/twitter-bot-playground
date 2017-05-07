# Twitter bot playground

<details>
  <summary>TOC</summary>

<!-- TOC -->

- [Twitter bot playground](#twitter-bot-playground)
  - [Post Statuses](#post-statuses)
  - [Work with users](#work-with-users)
  - [Interact with tweets](#interact-with-tweets)
  - [Use Twitter search](#use-twitter-search)
  - [Use Twitter Stream API](#use-twitter-stream-api)

<!-- /TOC -->

</details>

This is a reference for me and anyone else that's interested in Twitter bots in JavaScript.

I'm using the `twit`  npm package there are others out there to use.

So if you don't know how to use node or have your environment set up to use it take a look at the README.md on my Twitter bot bootstrap which details getting a Twitter application set up and a development environment with c9.

A lot of this information is already out there so this may be repeating stuff that is elsewhere I'm doing this for my learning.

Once you have your bot set up you can use the following.

## Post Statuses

Firstly post statuses, with `.post('statuses/update'...` 

```javascript
bot.post('statuses/update', {
  status: 'hello world!'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' tweeted!')
  }
})
```

## Work with users

To get a list of followers ids use `.get('followers/ids'...`

```javascript
bot.get('followers/ids', {
  screen_name: 'DroidScott'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

Or to get a detailed list you can use `.get('followers/list'...` 

Here we print off a list of `user.screen_name`'s

```javascript
bot.get('followers/list', {
  screen_name: 'DroidScott'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    data.users.forEach(function (user) {
      console.log(user.screen_name)
    })
  }
})
```

To follow back a follower we can use `.post('friendships/create'...` here the bot following back the user `MarcGuberti`

>A bot should only follow users that follow the bot.

```javascript
bot.post('friendships/create', {
  screen_name: 'MarcGuberti'
}, function (err, data, response) {
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
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

And also a detailed list

```javascript
bot.get('friends/list', {
  screen_name: 'DroidScott'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

Get friendship status this is useful for following new followers, this will give us the relation of a specific user

Run through your followers list and follow back any users that do not have the `following` connection.

```javascript
bot.get('friendships/lookup', {
  screen_name: 'ScottDevTweets'
}, function (err, data, response) {
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
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

## Interact with tweets

To get a list of tweets in the bot time line use `.get(statuses/home_timeline'...`

```javascript
bot.get('statuses/home_timeline', {
  count: 1
}, function (err, data, response) {
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
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    data.forEach(function(t){
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
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' retweet success!')
  }
})
```

To unretweet just use `.post('statuses/unretweet/:id'...` 

```javascript
bot.post('statuses/unretweet/:id', {
  id: '860828247944253440'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' unretweet success!')
  }
})
```

To like a tweet use `.post('favorites/create'...` 

```javascript
bot.post('favorites/create', {
  id: '860897020726435840'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' tweet liked!')
  }
})
```

To unlike a post use `.post('favorites/destroy'...`

```javascript
bot.post('favorites/destroy', {
  id: '860897020726435840'
  
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' tweet unliked!')
  }
})
```

To reply to a tweet is much the same a posting a tweet but you need to include the `in_reply_to_status_id` parameter, but that's not enough as you will also need to put in the screen name of the person you are replying to.

```javascript
bot.post('statuses/update', {
  status: '@ScottDevTweets I reply to you yes!',
  in_reply_to_status_id: '860900406381211649'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' tweeted!')
  }
})
```

Finally if you want to delete a tweet use `.post('statuses/destroy/:id'...` passing the tweet id you want to delete.

```javascript
bot.post('statuses/destroy/:id', {
  id: '860900437993676801'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.text + ' tweet deleted!')
  }
})
```

## Use Twitter search

To use search use `.get('search/tweets',...` there are quite a few search parameters for search.

`q: ''` the Q is for query so to search for mango use `q: 'mango'` we can also limit the results returned with `count: n` so let limit it the count to 5 see the example:

```javascript
bot.get('search/tweets', {
  q: 'mango',
  count: 5
}, function (err, data, response) {
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
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    data.statuses.forEach(function(s){
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
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    data.statuses.forEach(function (s) {
      console.log(s.text)
      console.log(s.user.screen_name)
      console.log('\n')
    })
  }
})
```

Last few now, there's the `result_type` parameter that will return `recent`, `popular` or `mixed` results

The `geocode` parameter that take the format latitude longitude then radius in miles `'51.5033640,-0.1276250,1mi'` example:

```javascript
bot.get('search/tweets', {
  q: 'bacon',
  geocode: '51.5033640,-0.1276250,1mi',
  count: 5
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    data.statuses.forEach(function (s) {
      console.log(s.text)
      console.log(s.user.screen_name)
      console.log('\n')
    })
  }
})
```

## Use Twitter Stream API

There are two ways to use the Stream API first there's `.stream('statuses/sample')` example:

```javascript
var stream = bot.stream('statuses/sample')

stream.on('tweet', function(t) {
  console.log(t.text + '\n')
})
```

This will give you a random sampling of tweets.

For more specific information use `.stream('statuses/filter')...` then pass some parameters, use `track:` too specify a search string:

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
var stream = bot.stream('statuses/filter', {
  track: 'twitter, bot'
})

stream.on('tweet', function (t) {
  console.log(t.text + '\n')
})
```

If you want both words the remove the comma `,` you can think of spaces as `AND` and commas as `OR` 

You can also use the `follow:` parameter which lets you input the ids of specific users, example:

```javascript
var stream = bot.stream('statuses/filter', {
  follow: '4897735439'
})

stream.on('tweet', function (t) {
  console.log(t.text + '\n')
})
```



