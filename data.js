var express = require('express');
var md5 = require('md5');
var app = express();
var fs = require("fs");

app.get('/listuser', function (req, res) {

        fs.readFile("data.js", function (err, data) {
            res.send(data);
        });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})