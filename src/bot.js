const picture = require('./picture-bot')
const markov = require('./markov-bot')
const link = require('./link-bot')

picture()
setInterval(picture, 1000 * 60 * 60 * 24)

const markovInterval = Math.floor(Math.random() * 180) + 5
markov()
setInterval(markov, markovInterval)


link()
setInterval(link, 1000 * 60 * 60 * 24)
