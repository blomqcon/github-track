var github_api = require('./github_api');
var Q = require('q');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/github-track');
var orgs = db.get("orgs");
var orgs_insert = Q.nbind(orgs.insert, orgs);
var orgs_update = Q.nbind(orgs.update, orgs);

var org_queue = [];
var updating_org = false;

setInterval(function() {
	if(org_queue.length > 0 && !updating_org) {
		updating_org = true;
    var org = org_queue.shift();
    var org_id;
    
    github_api.orgs(org).then(function(org_data) {
      org_id = org_data.id
      return orgs_update({'id': org_id}, org_data, {upsert:true});
    }).then(function(doc, err) {
      console.log("Upserted");
      return github_api.orgs_members(org);
    }).then(function(members_data) {
      return orgs_update({'id': org_id}, {$set: {"members": members_data}});
    }).then(function(doc, err) {
      console.log('added members');
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

function next_call() {
  
}	
  

  