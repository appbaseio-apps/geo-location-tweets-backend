var Twitter = require('twitter');
var Appbase = require('appbase-js');

var client = new Twitter({
  consumer_key: 'O4qTQV5BKA0wWzaDAuqnznvJh',
  consumer_secret: 'SjsN9CKZCRgQmjf5dMG3FDHL53PdmtxGKOF2eKH2OcqSHMpyzK',
  access_token_key: '2915379876-bxv81KDXhOboefXl1wOmjVkTGjvDGhbDf5uVCaR',
  access_token_secret: 'LWIYuv1EJF7HP7EghM3JY6M5GvCL6qWNOQaRwOzOai2Ya'
});

var config = {
  appname: 'Twitter-Map1',
  username: 'AK9umsLlD',
  password: 'e71ac3b4-2886-4ede-b41f-866ffa98b154',
  type: 'new_data'
}

var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appname,
  username: config.username,
  password: config.password
});

client.stream('statuses/filter', { locations: '72.3393, 22.9992, 73.0629, 23.5715' }, function (stream) {
  stream.on('data', function (tweet) {
    index(tweet);
  });
  stream.on('error', function (error) {
  });
});


var index = function (tweet) {
  if (tweet.geo !== null && tweet.geo !== undefined) {
    var requestObject = {
      type: config.type,
      id: tweet.id,
      body: tweet
    };

    tweet["location"] = {
      "lat": tweet.geo.coordinates[0],
      "lon": tweet.geo.coordinates[1]
    }

    appbaseRef.index(requestObject).on('data', function (response) {
      console.log(tweet);
    }).on('error', function (error) {
    });
  }
}
