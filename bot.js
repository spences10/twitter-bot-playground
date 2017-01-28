var
  twit = require('twit'),
  config = require('./config'),
  uniqueRandomArray = require('unique-random-array');

var Twitter = new twit(config);

// 
//  search twitter for all tweets containing the word 'banana' since July 11, 2011 
// 
// Twitter.get('search/tweets', { q: 'banana since:2017-01-01', count: 1 }, function(err, data, response) {
//   console.log(data);
//   // console.log(err);
//   // console.log(response);
// });

// 
//  get the list of user id's that follow @ScottDevTweets 
// 
// Twitter.get('followers/ids', { screen_name: 'ScottDevTweets' },  function (err, data, response) {
//   console.log(data)
// })

// 
// Twit has promise support; you can use the callback API, 
// promise API, or both at the same time. 
// 

var selfId = function() {

  Twitter.get('account/verify_credentials', {
      skip_status: true
    })
    .catch(function(err) {
      console.log('caught error', err.stack);
    })

  .then(function(result) {
    // `result` is an Object with keys "data" and "resp". 
    // `data` and `resp` are the same objects as the ones passed 
    // to the callback. 
    // See https://github.com/ttezel/twit#tgetpath-params-callback 
    // for details.
    // console.log(result.data.id_str);
    return result.data.id_str;
  });


};


function fetchSelfId(callback) {
    Twitter.get('account/verify_credentials', {
        skip_status: true
      })
      .catch(function(err) {
        console.log('caught error', err.stack);
      })
    .then(function(result) {
      // `result` is an Object with keys "data" and "resp". 
      // `data` and `resp` are the same objects as the ones passed 
      // to the callback. 
      // See https://github.com/ttezel/twit#tgetpath-params-callback 
      // for details.
      // console.log(result.data.id_str);
      return result.data.id_str;
    });
}

function getSelfId() {
  fetchSelfId( function (id) {
      return id
  })
}

var id = getSelfId()
console.log(id)