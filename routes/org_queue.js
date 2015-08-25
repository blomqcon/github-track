var org_queue = [];
var updating = false;

setInterval(function() {
  if(org_queue.length > 0) {
    console.log(org_queue);
    if(!updating) {
      updating = true;
      update(queue.shift());
    }
  }
}, 3000);


module.exports.add = function(org) {
  org_queue.push(org);
}

function update(org) {
  
}