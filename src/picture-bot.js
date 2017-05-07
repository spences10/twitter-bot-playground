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
  var file = fs.createWriteStream(fileName)
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
  var filePath = path.join(__dirname, '../' + fileName)
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
