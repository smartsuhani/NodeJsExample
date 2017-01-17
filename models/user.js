/**
 * Created by lcom35new on 17/1/17.
 */
var dbconn = require("../core/db");
var md5 = require('md5');

function user() {
    this.get =function (res) {
        dbconn.aquire(function (err,con) {
            con.query('select * from user',function (err,result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function (user,res) {
        query1 = "insert into user (fullname,username,email_id,password,contact_no) values('"+(user.firstname+user.lastname)+"','"+user.username+"','"+user.email_id+"','"+user.password+"','"+user.contact_no+"')";
        dbconn.aquire(function (err,con) {
            con.query(query1,function (err,result) {
                con.release();
                if(err){
                    console.log(err);
                    res.send({status:1,message:'User creation failed'});
                }else{
                    res.send({status:0,message:'User created successfully'+result});
                }
            });
        });
    };

    this.update = function(user, res) {
        query1 = "update user set username = '"+user.newname+"' where username = '"+user.oldname+"'";
        connection.acquire(function(err, con) {
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
        connection.acquire(function(err, con) {
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
}

module.exports = new user();