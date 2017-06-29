import * as Twit from 'twit'

const bot = new Twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
})

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
