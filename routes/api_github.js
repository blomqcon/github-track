var request = require('request');

var options = {
  url: '',
  headers: {
  'User-Agent': 'github-org-track'
  }
};

exports.orgs = function(org, res, process_github_orgs) {
	options.url = 'https://api.github.com/orgs/' + org;
	
	request(options, github_orgs_callback);
		
	function github_orgs_callback(error, githubRes, body) {
	  if (!error && githubRes.statusCode == 200) {
      //console.log(githubRes.headers['x-ratelimit-limit']);
      console.log('Rate Limit Remainning: ' + githubRes.headers['x-ratelimit-remaining']);
      //console.log(githubRes.headers['x-ratelimit-reset']);
      process_github_orgs(body);
	  } else {
      console.log(error);
      res.status(500).send();
	  }
	}
};

exports.orgs_members = function(org, res, process_github_orgs_members) {
	options.url = 'https://api.github.com/orgs/' + org + "/members";
	request(options, github_orgs_members_callback);
		
	function github_orgs_members_callback(error, githubRes, body) {
	  if (!error && githubRes.statusCode == 200) {
      console.log('Rate Limit Remainning: ' + githubRes.headers['x-ratelimit-remaining']);
      process_github_orgs_members(body);
	  } else {
		console.log(error);
		res.status(500).send();
	  }
	}
};