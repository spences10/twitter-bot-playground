var Twit = require('twit')
var fs = require('fs')
var csvparse = require('csv-parse')
var rita = require('rita')
var config = require('./config')
var path = require('path')

var inputText = ''

var bot = new Twit(config)

var filePath = path.join(__dirname, '../twitter-archive/tweets.csv')

var tweetData =
  fs.createReadStream(filePath)
  .pipe(csvparse({
    delimiter: ','
  }))
  .on('data', function (row) {
    inputText = inputText + ' ' + cleanText(row[5])
  })
  .on('end', function () {
    var markov = new rita.RiMarkov(10)
    markov.loadText(inputText)
    var sentence = markov.generateSentences(1)
    bot.post('statuses/update', {
      status: sentence
    }, function (err, data, response) {
      if (err) {
        console.log(err)
      } else {
        console.log('Markov status tweeted!', sentence)
      }
    })
  })

function hasNoStopWords(token) {
  var stopwords = ['@', 'http', 'RT']
  return stopwords.every(function (sw) {
    return !token.includes(sw)
  })
}

function cleanText(text) {
  return rita.RiTa.tokenize(text, ' ')
    .filter(hasNoStopWords)
    .join(' ')
    .trim()
}