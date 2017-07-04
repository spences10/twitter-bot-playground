import * as Twit from 'twit'
import { Config } from './config'

const config: Config = new Config()

const bot = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
})

bot.post(
  'statuses/update',
  {
    status: 'hello TypeScript reposnse!'
  },
  (err: Error, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweeted!`)
    }
  }
)
