module.exports = function(app, express, connection) {
	
	var api_github = require('./api_github');
  var org_queue = require('./org_queue');
	var api = express.Router();
  
    api.get('/updateOrg/:org', function(req, res) {
      var org = req.params.org;
      org_queue.add(org);
      res.status(200).send('added');
    });
    
    /*api.get('/updateOrg/:org', function(req, res) {
    	var org = req.params.org;
      api_github.orgs(org, res, process_github_org);

      function process_github_org(body) {
        var json = JSON.parse(body);
        
        connection.query(query_generator.update_org(connection, json), function(err, rows, fields) {
            if (err)
              console.log(err);
            else
              console.log(org + ' updated');
          });
        connection.query('SELECT login FROM Organization', function(err, rows, fields) {
            if (err)
              console.log(err);
            else
              console.log(rows);
          });
          console.log(query_generator.createUpdateQuery());
          res.status(200).send(org + ' updated')
        
        
      }
    });*/
    
    // init api route, all api routes will begin with /api
    app.use('/api', api);
};



var query_generator = {
  update_org: function(connection, json) {
    var query = 'INSERT INTO Organization ' +
                    'VALUES (DEFAULT, ' +
                    connection.escape(json['id']) + ', ' +
                    connection.escape(json['login']) + ', ' +
                    connection.escape(json['avatar_url']) + ', ' +
                    connection.escape(json['description']) + ', ' +
                    connection.escape(json['name']) + ', ' +
                    connection.escape(json['company']) + ', ' +
                    connection.escape(json['blog']) + ', ' +
                    connection.escape(json['location']) + ', ' +
                    connection.escape(json['email']) + ', ' +
                    connection.escape(json['public_repos']) + ', ' +
                    connection.escape(json['public_gists']) + ', ' +
                    connection.escape(json['followers']) + ', ' +
                    connection.escape(json['following']) + ', ' +
                    connection.escape(json['created_at']) + ', ' +
                    connection.escape(json['updated_at']) + ', ' +
                    'CURRENT_TIMESTAMP) ' +
                    'ON DUPLICATE KEY UPDATE ' +
                    'login=' + connection.escape(json['login']) + ', ' +
                    'avatar_url=' + connection.escape(json['avatar_url']) + ', ' +
                    'description=' + connection.escape(json['description']) + ', ' +
                    'name=' + connection.escape(json['name']) + ', ' +
                    'company=' + connection.escape(json['company']) + ', ' +
                    'blog=' + connection.escape(json['blog']) + ', ' +
                    'location=' + connection.escape(json['location']) + ', ' +
                    'email=' + connection.escape(json['email']) + ', ' +
                    'public_repos=' + connection.escape(json['public_repos']) + ', ' +
                    'public_gists=' + connection.escape(json['public_gists']) + ', ' +
                    'followers=' + connection.escape(json['followers']) + ', ' +
                    'following=' + connection.escape(json['following']) + ', ' +
                    'created_at=' + connection.escape(json['created_at']) + ', ' +
                    'updated_at=' + connection.escape(json['updated_at']) + ', ' +
                    'data_updated=CURRENT_TIMESTAMP';
    
    return query;
  }
  
  
}