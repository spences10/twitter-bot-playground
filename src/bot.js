var Twit = require('twit')
var fs = require('fs')
var csvparse = require('csv-parse')
var rita = require('rita')
var config = require('./config')

var inputText = 'I went to the car. The car went to the supermarket. Scott sent to play tennis'

var bot = new Twit(config)

var markov = new rita.RiMarkov(3)
markov.loadText(inputText)
var sentences = markov.generateSentences(1)
console.log(sentences)
