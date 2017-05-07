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

var stream = bot.stream('statuses/filter', {
  follow: '4897735439'
})

stream.on('tweet', function (t) {
  console.log(t.text + '\n')
})
