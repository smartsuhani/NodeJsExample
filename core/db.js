var mysql = require('mysql');

function db() {
    this.pool = null;
    this.init =function () {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            password: "root",
            database: "test"
        });
    };

    this.aquire = function (callback) {
        this.pool.getConnection(function (err,connection) {
            callback(err,connection);
        });
    };
}

module.exports = new db();
