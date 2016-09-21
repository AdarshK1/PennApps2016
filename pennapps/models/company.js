var mongoose = require('mongoose');
var Article = require('article.js');

var companySchema = new mongoose.Schema({
    symbol: {ticker: String, name: String},
    price: number,
    pastArticles: [Article]

});

mongoose.model("Company", companySchema);