var Spark = require("sparkai");
var fs = require("fs");
var forismatic = require('forismatic-node')();
var request = require('request');

var opts = {
  min: 2,
  max: 3
}

var generator = new Spark.generator(opts);

var data = JSON.parse(fs.readFileSync("./data.json"));

generator.train(data);

var post = generator.generate();

console.log(post);

var quotes = JSON.parse(fs.readFileSync(__dirname + "/data.json")) || [];

function pushData(cb) {
  quotes = quotes.filter(function(item, pos) {
    return quotes.indexOf(item) == pos;
  });
  fs.writeFile(__dirname + '/data.json', JSON.stringify(quotes), function(err) {
    console.log('DERP', err)
  });
}

module.exports.addData = function(data) {
  quotes.push(data);
  fs.writeFile(__dirname + '/data.json', JSON.stringify(quotes), function(err) {});
}

console.log(JSON.stringify(quotes))


function mineData() {
  request('http://quote.machinu.net/api', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        if(obj.text.split(" ").length <= 7 && obj.text.split(" ").length >= 3) {
          console.log("Mined Data: " + obj.text);
          quotes.push(obj.text);
        }
      }
  });

  forismatic.getQuote(function (err, quote) {
    if(err) {
      throw err;
    }
    if(quote.quoteText.split(" ").length <= 7) {
      console.log("Mined Data: " + quote.quoteText)
      quotes.push(quote.quoteText)
    }
  });
}function mineData() {
  request('http://quote.machinu.net/api', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        if(obj.text.split(" ").length <= 7 && obj.text.split(" ").length >= 3) {
          console.log("Mined Data: " + obj.text);
          quotes.push(obj.text);
        }
      }
  });

  forismatic.getQuote(function (err, quote) {
    if(err) {
      throw err;
    }
    if(quote.quoteText.split(" ").length <= 7) {
      console.log("Mined Data: " + quote.quoteText);
      quotes.push(quote.quoteText);
    }
  });
}

pushData()
mineData()

