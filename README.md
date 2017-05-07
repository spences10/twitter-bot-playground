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
  - [Tweet media files](#tweet-media-files)

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

## Tweet media files

This [egghead.io][egghead-media-files] video is a great resource for this section thanks to [Hannah Davis][hannah-davis] for the awesome content!

This will be a request to get the [NASA image of the day][nasa-iotd] and tweet it.

For this we will need references to `request` and `fs` for working with the file system.

```javascript
var Twit = require('twit')
var request = require('request')
var fs = require('fs')
var config = require('./config')

var bot = new Twit(config)
```

First up get the photo from the NASA api, for this we will need to create a parameter object inside our `getPhoto` function that will be passed to the node HTTP client `request` for the image:

```javascript
function getPhoto() {
  var parameters = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  }
}
```

The `parameters` specify an `api_key` for this you can [apply for an API key][api-apply] or you can use the `DEMO_KEY` this API key can be used for initially exploring APIs prior to signing up, but it has much lower rate limits, so you’re encouraged to signup for your own API key.

In th example you can see that I have configured my key with the rest of my `.env` variables.

Now to use the `request` to get the image:

```javascript
function getPhoto() {
  var parameters = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  }
  request.get(parameters, function (err, respone, body) {
    body = JSON.parse(body)
    saveFile(body, 'nasa.jpg')
  })
}
```

In the `request` we pass in our parameters and parse the body as JOSN so we can save it with the `saveFile` function which we'll go over now:

```javascript
function saveFile(body, fileName) {
  var file = fs.createWriteStream(fileName)
  request(body).pipe(file).on('close', function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      console.log(body)
    }
  })
}
```

`request(body).pipe(file).on('close'...` is what saves the file from the `file` variable which has the name passed to it `nasa.jpg` from the `getPhoto` function.

Calling `getPhoto()` should now save the NASA image of the dat to the root of your project.

Now we can share it on Twitter 😎

Two parts to this, first save the file, this had me stumped for a bit as I have my files in a `src` folder, if you have youe bot file nested in folders then you will need to do the same with `fs.createWriteStream(...` 

```javascript
function saveFile(body, fileName) {
  var file = fs.createWriteStream('src/'+fileName)
  request(body).pipe(file).on('close', function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      var descriptionText = body.title
      uploadMedia(descriptionText, fileName)
    }
  })
}
```

Then `uploadMedia` to upload media to Twitter before we can post it:

```javascript
function uploadMedia(descriptionText, fileName) {
  var filePath = path.resolve(__dirname + '/' + fileName)
  console.log('file PATH ' + filePath)
  bot.postMediaChunked({
    file_path: filePath
  }, function (err, data, respone) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      var params = {
        status: descriptionText,
        media_ids: data.media_id_string
      }
      postStatus(params)
    }
  })
}
```

Then with the `params` we got from `uploadMedia` we can post with a straightforward `.post('statuses/update'...` 

```javascript
function postStatus(params) {
  bot.post('statuses/update', params, function (err, data, respone) {
    if (err) {
      console.log(err)
    } else {
      console.log('Status posted!')
    }
  })
}
```

Call the `getPhoto()` function top post to Twitter... super straight forward, right 😀 no, I know it wasn't. Heres the complete module:

```javascript
var Twit = require('twit')
var request = require('request')
var fs = require('fs')
var config = require('./config')
var path = require('path')

var bot = new Twit(config)

function getPhoto() {
  var parameters = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  }
  request.get(parameters, function (err, respone, body) {
    body = JSON.parse(body)
    saveFile(body, 'nasa.jpg')
  })
}

function saveFile(body, fileName) {
  var file = fs.createWriteStream('src/'+fileName)
  request(body).pipe(file).on('close', function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      var descriptionText = body.title
      uploadMedia(descriptionText, fileName)
    }
  })
}

function uploadMedia(descriptionText, fileName) {
  var filePath = path.resolve(__dirname + '/' + fileName)
  console.log('file PATH ' + filePath)
  bot.postMediaChunked({
    file_path: filePath
  }, function (err, data, respone) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      var params = {
        status: descriptionText,
        media_ids: data.media_id_string
      }
      postStatus(params)
    }
  })
}

function postStatus(params) {
  bot.post('statuses/update', params, function (err, data, respone) {
    if (err) {
      console.log(err)
    } else {
      console.log('Status posted!')
    }
  })
}

getPhoto()
```



[egghead-media-files]: https://egghead.io/lessons/node-js-tweet-media-files-with-twit-js
[hannah-davis]: https://egghead.io/instructors/hannah-davis
[nasa-iotd]: https://www.nasa.gov/multimedia/imagegallery/iotd.html
[api-apply]: https://api.nasa.gov/index.html#apply-for-an-api-key

