var todo = require('./models/user');

module.exports = {
    configure: function(app) {
        app.get('/user/', function(req, res) {
            todo.get(res);
        });

        app.post('/user/', function(req, res) {
            todo.create(req.body, res);
        });

        app.put('/user/', function(req, res) {
            todo.update(req.body, res);
        });

        app.delete('/user/:username/', function(req, res) {
            todo.delete(req.params.username, res);
        });
    }
};