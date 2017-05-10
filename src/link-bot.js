var Twit = require('twit')
var config = require('./config')
var Tabletop = require('tabletop')

var bot = new Twit(config)

var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1842GC9JS9qDWHc-9leZoEn9Q_-jcPUcuDvIqd_MMPZQ/pubhtml'

Tabletop.init({
  key: spreadsheetUrl,
  callback: function (data, tabletop) {
    data.forEach(function (d) {
      var status = d.links + ' a link from a Google spreadsheet'
      console.log(status)
      bot.post('statuses/update', {
        status: status
      }, function (err, response, data) {
        if (err) {
          console.log(err)
        } else {
          console.log('Post success!')
        }
      })
    })
  },
  simpleSheet: true
})
