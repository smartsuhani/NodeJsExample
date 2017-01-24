var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./core/db');
var routes = require('./routes');
var morgan = require('morgan');

var app = express();

app.set('token','A((e$$@me');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(morgan('dev'));

connection.init();
routes.configure(app);

app.get('/checkup/',function (req,res) {
    res.send('for web token!');
});

var server = app.listen(8085, function() {
    console.log('Server listening on port http://'+(server.address().address)+":"+ server.address().port);
});