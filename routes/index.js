// Main application view
exports.index = function(req, res) {
	res.render('index.html');
};




var org_queue = require('./org_queue');
//api
module.exports.update_org = function(req, res) {
  var org = req.params.org;
  org_queue.add(org);
  res.status(200).send('added');
}