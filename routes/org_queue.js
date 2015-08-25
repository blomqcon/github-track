var github_api = require('./github_api');
var Q = require('q');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/github-track');

var org_queue = [];
var call_queue = [];
var updating_org = false;

setInterval(function() {
  console.log(org_queue);
	if(org_queue.length > 0 && !updating_org) {
		updating_org = true;
    var org = org_queue.shift();
    github_api.orgs(org, function(body) {
      var body = JSON.parse(body);
      var orgs = db.get("orgs");
      var orgs_promise = Q.nbind(orgs.insert, orgs);
      orgs_promise(body).then(function(doc, err) {
        //console.log(err);
        //console.log(doc);
        console.log("DONE");
        updating_org = false;
      }).then(function() {
        console.log("DONE2");
      });
    });
}
}, 3000);
/*
setInterval(function() {
  console.log(org_queue);
	if(org_queue.length > 0 && !updating_org) {
		updating_org = true;
		var org = org_queue.shift();
    github_api.orgs(org, function(body) {
      var body = JSON.parse(body);
      var orgs = db.get("orgs");
      //update if exsists
      orgs.insert(body, function (err, doc) {
        if(err) console.log(err);
        github_api.orgs_members(org, null);
      });
    
      console.log(org);
      updating_org = false;
    });
	}
}, 3000);*/

module.exports.add = function(org) {
  if(org_queue.indexOf(org) == -1) {
    org_queue.push(org);
  }
}

module.exports.queue = function() {
  return org_queue;
}

function next_call() {
  
}	
  

  