# Tweet media files

This [egghead.io][egghead-media-files] video is a great resource for this section thanks to [Hannah Davis][hannah-davis] for the awesome content!

This will be a request to get the [NASA image of the day][nasa-iotd] and tweet it.

For this we will need references to `request` and `fs` for working with the file system.

```javascript
const Twit = require('twit')
const request = require('request')
const fs = require('fs')
const config = require('./config')

const bot = new Twit(config)
```

First up get the photo from the NASA api, for this we will need to create a parameter object inside our `getPhoto` function that will be passed to the node HTTP client `request` for the image:

```javascript
function getPhoto() {
  const parameters = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  };
}
```

The `parameters` specify an `api_key` for this you can [apply for an API key][api-apply] or you can use the `DEMO_KEY` this API key can be used for initially exploring APIs prior to signing up, but it has much lower rate limits, so you’re encouraged to signup for your own API key.

In the example you can see that I have configured my key with the rest of my `.env` variables.

```text
CONSUMER_KEY=AmMSbxxxxxxxxxxNh4BcdMhxg
CONSUMER_SECRET=eQUfMrHbtlxxxxxxxxxxkFNNj1H107xxxxxxxxxx6CZH0fjymV
ACCESS_TOKEN=7xxxxx492-uEcacdl7HJxxxxxxxxxxecKpi90bFhdsGG2N7iII
ACCESS_TOKEN_SECRET=77vGPTt20xxxxxxxxxxxZAU8wxxxxxxxxxx0PhOo43cGO

NASA_KEY=DEMO_KEY
```

Now to use the `request` to get the image:

```javascript
function getPhoto() {
  const parameters = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  };
  request.get(parameters, (err, respone, body) => {
    body = JSON.parse(body)
    saveFile(body, 'nasa.jpg')
  })
}
```

In the `request` we pass in our parameters and parse the body as JOSN so we can save it with the `saveFile` function which we'll go over now:

```javascript
function saveFile(body, fileName) {
  const file = fs.createWriteStream(fileName);
  request(body).pipe(file).on('close', err => {
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

Calling `getPhoto()` should now save the NASA image of the day to the root of your project.

Now we can share it on Twitter 😎

Two parts to this, first save the file.

```javascript
function saveFile(body, fileName) {
  const file = fs.createWriteStream(fileName);
  request(body).pipe(file).on('close', err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      const descriptionText = body.title;
      uploadMedia(descriptionText, fileName)
    }
  })
}
```

Then `uploadMedia` to upload media to Twitter before we can post it, this had me stumped for a bit as I have my files in a `src` folder, if you have your bot files nested in folders then you will need to do the same if you are struggling with `file does not exist` errors:

Add a `require` to `path` then use `join` with the relevant relative file path.

```javascript
const path = require('path')
//...
const filePath = path.join(__dirname, '../' + fileName)
```

Complete function here:

```javascript
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
```

Then with the `params` we created in `uploadMedia` we can post with a straightforward `.post('statuses/update'...`

```javascript
function postStatus(params) {
  bot.post('statuses/update', params, (err, data, respone) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Status posted!')
    }
  })
}
```

Call the `getPhoto()` function top post to Twitter... super straight forward, right 😀 no, I know it wasn't. Here's the complete module:

<details>
  <summary>Click to expand</summary>

```javascript
const Twit = require('twit')
const request = require('request')
const fs = require('fs')
const config = require('./config')
const path = require('path')

const bot = new Twit(config)

function getPhoto() {
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

function saveFile(body, fileName) {
  const file = fs.createWriteStream(fileName)
  request(body).pipe(file).on('close', err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Media saved!')
      const descriptionText = body.title
      uploadMedia(descriptionText, fileName)
    }
  })
}

function uploadMedia(descriptionText, fileName) {
  const filePath = path.join(__dirname, `../${fileName}`)
  console.log(`file PATH ${filePath}`)
  bot.postMediaChunked({
    file_path: filePath
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

getPhoto()
```
</details>

[Previous: Use twitter stream API.](05-use-twitter-stream-api.md#use-twitter-stream-api)

[Next: Make a Markov bot.](07-make-a-markov-bot.md#make-a-markov-bot)
