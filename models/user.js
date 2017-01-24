/**
 * Created by lcom35new on 17/1/17.
 */
var dbconn = require("../core/db");
var md5 = require('md5');
var path = require('path');
function user() {
    this.get =function (username,res) {
        dbconn.aquire(function (err,con) {
            con.query("select * from user where username = '"+username+"'",function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (user,res) {
        query1 = "select * from user where username = '"+user.username+"' OR email_id = '"+user.email_id+"'";
        dbconn.aquire(function (err,con) {
            con.query(query1,function (err,result) {
                console.log(result);
                if(err){
                    console.log(err);
                    res.send({status:1,message:'User creation failed'});
                }else if(result.length > 0){
                    res.send({status: 0, message: 'Username or email id should be unique!!'});
                }else{
                    query1 = "insert into user (fullname,username,email_id,password,contact_no) values('"+(user.firstname+user.lastname)+"','"+user.username+"','"+user.email_id+"','"+user.password+"','"+user.contact_no+"')";
                    con.query(query1,function (err,result) {
                        con.release();
                        if(err){
                            res.send({status:1,message:'Database connection failed!!'},result);
                        }else{
                            res.sendFile(path.join(__dirname,'../reg.html'));
                        }
                    });
                }
            });
        });
    };

    this.update = function(user, res) {
        query1 = "update user set username = '"+user.newname+"' where username = '"+user.oldname+"'";
        dbconn.aquire(function(err, con) {
            con.query(query1, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'user update failed'});
                } else {
                    res.send({status: 0, message: 'user updated successfully'+result});
                }
            });
        });
    };

    this.delete = function(username, res) {
        query1  = "delete from user where username = '"+username+"'";
        dbconn.aquire(function(err, con) {
            con.query(query1, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    res.send({status: 0, message: 'Deleted successfully'+result});
                }
            });
        });
    };

    this.chk = function (pass,res) {
        query1 = "select password from user where username = '" + pass.username + "'";
        dbconn.aquire(function (err, con) {
            con.query(query1, function (err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Connection problem :' + err.toString()});
                } else {
                    //result = JSON.parse(result);
                    //res.send({message : result[0].password});
                    if (md5(pass.password) == result[0].password) {
                        res.sendFile(path.join(__dirname,'../log.html'));
                    } else {
                        res.send("failed");
                    }
                }
            });
        });
    };
}

module.exports = new user();
