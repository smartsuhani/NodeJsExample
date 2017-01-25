/**
 * Created by lcom35new on 24/1/17.
 */
var mong = require('mongoose');
var pic = mong.Schema;

var det = new pic({
    pic_name:String,
    pic_path:String
});

module.exports = mong.model('pic',det);