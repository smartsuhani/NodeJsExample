var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./core/db');
var routes = require('./routes');


var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);

var server = app.listen(8085, function() {
    console.log('Server listening on port http://'+(server.address().address)+":"+ server.address().port);
});