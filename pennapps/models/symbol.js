var mongoose = require('mongoose');

var symbolSchema = new mongoose.Schema({
    ticker: String,
    name : String
});

mongoose.model("Symbol", symbolSchema);