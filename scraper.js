var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var twitter_username = process.argv[2];
if (twitter_username) {
  var twitter_url = 'http://twitter.com/'+twitter_username;
  request(twitter_url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var name, screenname, bio, location, webpage, join_date;

      var $wrapper = $('.ProfileHeaderCard');
      name = $wrapper.find('.ProfileHeaderCard-name a').first().text();
      screenname = $wrapper.find('.ProfileHeaderCard-screenname > a').first().text();
      bio = $wrapper.find('.ProfileHeaderCard-bio').first().text();
      webpage = $wrapper.find('.ProfileHeaderCard-url a').first().text();
      join_date = $wrapper.find('.ProfileHeaderCard-joinDate').first().text();

      var response = {
        name: name,
        screenname: screenname,
        bio: bio,
        webpage: webpage,
        join_date: join_date
      };
      console.log(response)
    }

  });
}
