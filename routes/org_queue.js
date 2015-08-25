var github_api = require('./github_api');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/github-track');

var org_queue = [];
var updating_org = false;

setInterval(function() {
  console.log(org_queue);
	if(org_queue.length > 0 && !updating_org) {
		updating_org = true;
		var org = org_queue.shift();
    github_api.orgs(org, function(body) {
      var body = JSON.parse(body);
      var orgs = db.get("orgs");
      orgs.insert(body, function (err, doc) {
        if(err) console.log(err);
        github_api.orgs_members(org, null);
      });
    
      console.log(org);
      updating_org = false;
    });
	}
}, 3000);

module.exports.add = function(org) {
  if(org_queue.indexOf(org) == -1) {
    org_queue.push(org);
  }
}

module.exports.queue = function() {
  return org_queue;
}

	