var Twit = require('twit')
var config = require('./config')

var bot = new Twit(config)


function getBotTimeline() {
  bot.get('statuses/home_timeline', {
    count: 5
  }, function (err, data, response) {
    if (err) {
      console.log(err)
    } else {
      data.forEach(function (t) {
        console.log(t.text)
        console.log(t.user.screen_name)
        console.log(t.id_str)
        console.log('\n')
      })
    }
  })
}

// getBotTimeline()

bot.post('statuses/retweet/:id', {
  id: '860828247944253440'
}, function (err, data, response) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

