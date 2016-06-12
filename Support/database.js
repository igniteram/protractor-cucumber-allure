var pg = require('pg');

var connectDB = function() {
    var conString = "postgres://username:password@localhost:5432/database_name";
    this.client = new pg.Client(conString);
    this.client.connect(function(err){
        if(err){
            return console.error('could not connect to postgres', err);
        }
    });
};
module.exports = connectDB;
