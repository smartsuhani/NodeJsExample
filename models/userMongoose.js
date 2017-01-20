/**
 * Created by lcom35new on 19/1/17.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema({
    fullname:String,
    username:String,
    email_id:String,
    password:String
});

module.exports = mongoose.model('user',user);


