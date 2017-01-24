var todo = require('./models/user');
var mg = require('./models/userMG');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var multer = require('multer');
var user = require('./models/userMongoose');
var pic = require('./models/file');
var path = require('path');
var fs = require('fs');
var url = "mongodb://127.0.0.1:27017/test";
mongoose.connect(url);

var storage  = multer.diskStorage({
    destination:function (req,file,callback) {
        req.body.path = "./uploads/";
        callback(null,'./uploads/');
    },
    filename:function (req,file,callback) {
        console.log(file);
        file1=file.originalname.split(".");
        req.body.file = file1[0]+"_"+Date.now()+"."+file1[file1.length -1];
        callback(null,req.body.file);
    }
});

var upload = multer({storage:storage}).array('file',10);


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

        app.post('/mongo/reg', function (req, res) {
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

        app.get('/mongoose/fetchall', function (req, res) {
            user.find(function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(data);
                    res.send(data);
                }
            });
        });

        app.post('/mongoose/fetchone', function (req, res) {

            console.log(req.body.username)
            user.find({"username": req.body.username}, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        });

        app.post('/mongoose/login', function (req, res) {

            console.log(req.body.username)
            user.find({"username": req.body.username}, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    if(data.length == 0){
                        res.send("user not found!");
                    }else{
                        if(data[0].password == req.body.password){
                            var token1 =  jwt.sign({username:data[0].username},app.get('token'),{expiresIn:'10s'});
                            res.send({success:true,message:"successfully logged in",token:token1});
                        }else{
                            res.send({success:false,message:"authentication failed"});
                        }
                    }
                }
            });
        });

        app.delete('/mongoose/rmone', function (req, res) {
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

        app.post('/file/',function (req,res) {
            upload(req, res, function(err) {
                if(err) {
                    console.log('Error Occured');
                    return;
                }
                console.log("hello  :"+req.body.file);
                res.end('Your File Uploaded');
                console.log('Photo Uploaded');
                var pic1 = new pic();
                pic1.pic_name = req.body.file;
                pic1.pic_path = req.body.path+req.body.file;

                pic1.save(function (err,data) {
                    if(err) {
                        console.log(err);
                    }else{
                        console.log(data);
                    }
                });
            });
        });
        app.get('/download/',function (req,res) {
            pic.find(function (err,data) {
                if(err){
                    res.send("error to fetch file!");
                }else{
                    res.sendFile(path.join(__dirname,data[data.length-1].pic_path));
                }
            });
        });
    }
};