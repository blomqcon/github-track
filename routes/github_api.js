var request = require('request');

exports.orgs = function(org, callback) {
	var endpoint = 'orgs/' + org;
	github_api_request(endpoint, callback);
};

exports.orgs_members = function(org, callback) {
	var endpoint = 'orgs/' + org + '/members';
	github_api_request(endpoint, function(body) {
    console.log(body);
  });
};

function github_api_request(endpoint, callback) {
  var options = {
    url: 'https://api.github.com/' + endpoint,
    headers: {
    'User-Agent': 'github-org-track'
    }
  };
  
  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      //console.log(response.headers['x-ratelimit-limit']);
      console.log('Rate Limit Remainning: ' + response.headers['x-ratelimit-remaining']);
      //console.log(response.headers['x-ratelimit-reset']);
      callback(body);
    } else {
      console.log(error);
      callback();
    }
  });
}