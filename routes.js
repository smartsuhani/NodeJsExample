var todo = require('./models/user');
var mg = require('./models/userMG');
var md5 = require('md5');
var mongoose = require('mongoose');
var user = require('./models/userMongoose');
var url = "mongodb://127.0.0.1:27017/test";
var u = new user();
mongoose.connect(url);

module.exports = {
    configure: function(app) {
        app.get('/user/', function(req, res) {
            todo.get(req.query.username,res);
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

        app.post('/user/pass',function (req,res) {
            todo.chk(req.body,res);
        });

        app.get('/mongo/',function (req,res) {
            mg.get(res);
        });

        app.post('/mongo/',function (req,res) {

            u.fullname = req.body.firstname+" "+req.body.lastname;
            u.username = req.body.username;
            u.email_id = req.body.email_id;
            u.password = md5(req.body.password);

            u.save(function (err) {
                if(err){
                    res.send(err);
                }else{
                    res.send({message:"user successfully registered!"});
                }
            });
        });

        app.get('/mongoose/',function (req,res) {
            user.find(function (err,data) {
                if(err){
                    res.send(err);
                }else{
                    console.log(data);
                    res.send(data);
                }
            });
        });

        app.post('/mongoose/',function (req,res) {

            console.log(req.body.username)
            user.find({"username" : req.body.username},function (err,data) {
               if(err){
                   res.send(err);
               }else{
                   res.send(data);
               }
            });
        });

        app.delete('/mongoose',function (req,res) {
            console.log(req.body.username);
            user.remove({
                "username": req.body.username

            }, function(err, data) {
                if (err)
                    res.send(err);
                else

                    res.json({ message: 'Successfully deleted' });
            });
        });

    }
};