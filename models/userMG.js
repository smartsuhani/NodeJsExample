/**
 * Created by lcom35new on 19/1/17.
 */
var mongo = require('mongodb').MongoClient,format = require('util').format;
var url = "mongodb://127.0.0.1:27017/test";

function userMG(){
    this.get = function(res){
        mongo.connect(url,function (err,db) {
            if(err){
                console.log(err);
                res.send(err);
            }else{
                db.collection('user').find().toArray(function (err,result) {
                    if(err){
                        res.send({message : "collection error!", errorcode:err});
                    }else{
                        console.log(result);
                        res.send(result);
                    }
                });
            }
            db.close();
        });
    };
}

module.exports  = new userMG();
