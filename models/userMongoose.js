/**
 * Created by lcom35new on 19/1/17.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var schema = mongoose.Schema;


var user = new schema({
    pic:{type : String, unique : false},
    password:{type : String, required : true, unique : false},
    email_id:{type : String, required : true, unique : true},
    username:{type : String, required : true, unique : true},
    fullname:{type : String, required : true, unique : false},
    user_id :{type : String, required : true, unique : true}
});

module.exports = mongoose.model('user1',user);


