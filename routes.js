var todo = require('./models/user');
var mg = require('./models/userMG');
var md5 = require('md5');
var mongoose = require('mongoose');
var user = require('./models/userMongoose');
var url = "mongodb://127.0.0.1:27017/post";
mongoose.connect(url);


module.exports = {
    configure: function (app) {
        app.get('/user/', function (req, res) {
            todo.get(req.query.username, res);
        });

        app.post('/user/', function (req, res) {
            todo.create(req.body, res);
        });

        app.put('/user/', function (req, res) {
            todo.update(req.body, res);
        });

        app.delete('/user/:username/', function (req, res) {
            todo.delete(req.params.username, res);
        });

        app.post('/user/pass', function (req, res) {
            todo.chk(req.body, res);
        });

        app.get('/mongo/', function (req, res) {
            mg.get(res);
        });

        app.post('/mongo/', function (req, res) {
            console.log(req.body);
            if (req.body.username == "" || req.body.email_id == "" || req.body.password == "" || req.body.firstname == "" || req.body.lastname == ""
                || req.body.username == undefined || req.body.email_id == undefined || req.body.password == undefined || req.body.firstname == undefined
                || req.body.lastname == undefined) {
                if (req.body.username == "" || req.body.username == undefined) {
                    res.send("Username field required!");
                } else if (req.body.firstname == "" || req.body.firstname == undefined) {
                    res.send("firstname field required!");
                } else if (req.body.lastname == "" || req.body.lastname == undefined) {
                    res.send("lastname field required!");
                } else if (req.body.password == "" || req.body.password == undefined) {
                    res.send("password field required!");
                } else if (req.body.email_id == "" || req.body.email_id == undefined) {
                    res.send("email_id field required!");
                }
            } else {
                var u = new user();
                u.password = req.body.password;
                u.email_id = req.body.email_id;
                u.username = req.body.username;
                u.fullname = req.body.firstname + " " + req.body.lastname;
                user.find(function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        u.user_id = data.length+1;
                        u.save(function (err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send({message: "user successfully registered!"});
                            }
                        });
                    }
                });
            }
        });

        app.get('/mongoose/', function (req, res) {
            user.find(function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(data);
                    res.send(data);
                }
            });
        });

        app.post('/mongoose/', function (req, res) {

            console.log(req.body.username)
            user.find({"username": req.body.username}, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        });

        app.delete('/mongoose', function (req, res) {
            console.log(req.body.username);
            user.remove({
                "username": req.body.username

            }, function (err, data) {
                if (err)
                    res.send(err);
                else

                    res.json({message: 'Successfully deleted'}, data);
            });
        });

    }
};