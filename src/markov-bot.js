const Twit = require('twit')
const fs = require('fs')
const csvparse = require('csv-parse')
const rita = require('rita')
const config = require('./config')
const path = require('path')

let inputText = ''

const bot = new Twit(config)

const filePath = path.join(__dirname, '../twitter-archive/tweets.csv')

const tweetData = () => {
  fs.createReadStream(filePath)
    .pipe(csvparse({
      delimiter: ','
    }))
    .on('data', row => {
      inputText = `${inputText} ${cleanText(row[5])}`
    })
    .on('end', () => {
      const markov = new rita.RiMarkov(10)
      markov.loadText(inputText)
      const sentence = markov.generateSentences(2)
      bot.post('statuses/update', {
        status: sentence
      }, (err, data, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Markov status tweeted!', sentence)
        }
      })
    })
}

function hasNoStopWords(token) {
  const stopwords = ['@', 'http', 'RT']
  return stopwords.every(sw => !token.includes(sw))
}

function cleanText(text) {
  return rita.RiTa.tokenize(text, ' ')
    .filter(hasNoStopWords)
    .join(' ')
    .trim()
}

module.exports = tweetData