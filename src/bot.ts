import * as Twit from 'twit'
import * as config from './config'

console.log('====================')
console.log(config)
console.log('====================')

const bot = new Twit(config.parsed)

bot.post(
  'statuses/update',
  {
    status: 'hello world!'
  },
  (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweeted!`)
    }
  }
)
