var Spark = require('sparkai');

var bot = new Spark.MarkovChain({
  sentences: 1 // number of sentences (default = 3)
})
bot.train(['some data', 'more data']); // can be an array, or a single string
console.log(bot.generate()); // generates text