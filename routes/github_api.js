var Q = require('q');
var request = require('request');
var request_promise = Q.denodeify(request);
var client_id = "b0ae0043142413a28918"
var client_secret = "615d59edf606bda4f5e8c2a87f61b1ba2577e425"

exports.orgs = function(org) {
  var endpoint = 'orgs/' + org + '?client_id=' + client_id + '&client_secret=' + client_secret;
  var outputPromise = github_api_request(endpoint).then(function(response) {
    return JSON.parse(response[0].body);
  }, function(error) {
    return {};
  });
  return outputPromise;
}

exports.orgs_members = function(org) {
  return orgs_members_helper([], org, 1);
};

function orgs_members_helper(all_members, org, page) {
  var promise = orgs_members_page(org, page).then(function(members) {
    all_members.push.apply(all_members, members);
    if(members.length == 100) {
      return helper(all_members, org, ++page);
    } else {
      return all_members;
    }
  });
  return promise;
}

function orgs_members_page(org, page) {
  var endpoint = 'orgs/' + org + '/members' + '?page=' + page + '&per_page=100&client_id=' + client_id + '&client_secret=' + client_secret;
  var outputPromise = github_api_request(endpoint).then(function(response) {
    //console.log('Rate Limit Remainning: ' + response[0].headers['x-ratelimit-remaining']);
    return JSON.parse(response[0].body);
  }, function(error) {
    return [];
  });
  return outputPromise;
}

function github_api_request(endpoint) {
  var options = {
    url: 'https://api.github.com/' + endpoint,
    headers: {
    'User-Agent': 'github-org-track'
    }
  };
  return request_promise(options);
}

//console.log(response.headers['x-ratelimit-limit']);
//console.log('Rate Limit Remainning: ' + response.headers['x-ratelimit-remaining']);
//console.log(response.headers['x-ratelimit-reset']);