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

getBotTimeline()

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
