var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    companies: [String],
    publisher: String,
    published: Date,

});