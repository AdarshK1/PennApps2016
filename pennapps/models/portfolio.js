var mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
    stocks: [{company: String, quantity: Number}]
});

mongoose.model("Portfolio", portfolioSchema);