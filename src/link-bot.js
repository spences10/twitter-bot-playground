const Twit = require('twit')
const config = require('./config')
const Tabletop = require('tabletop')

const bot = new Twit(config)

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1842GC9JS9qDWHc-9leZoEn9Q_-jcPUcuDvIqd_MMPZQ/pubhtml'

Tabletop.init({
  key: spreadsheetUrl,
  callback(data, tabletop) {
    data.forEach(d => {
      const status = `${d.links} a link from a Google spreadsheet`
      console.log(status)
      bot.post('statuses/update', {
        status
      }, (err, response, data) => {
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
