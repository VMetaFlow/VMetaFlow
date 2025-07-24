var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataDB = mongoose.createConnection("mongodb://localhost/vmetaflow_data");

var Session = new Schema({
    data: String,
    username: String,
    id: Number,
    lastModified: String,
    title: String,
    description: String
});

module.exports = dataDB.model('Session', Session);