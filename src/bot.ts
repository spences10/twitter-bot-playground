import * as Twit from 'twit'
import * as config from './config'

const bot = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
})

bot.post(
  'friendships/create',
  {
    screen_name: 'MarcGuberti'
  },
  (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  }
)
