var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET Insights page. */

router.get('/insights', function(req, res) {
    var db = req.db;
    var portfolio = db.get('portfolio');
    portfolio.find({},{},function(e,docs) {
        res.render('insights', {
            "portfolio": docs
        });
    });
});


/* GET Portfolio page. */
router.get('/portfolio', function(req, res) {
    var db = req.db;

    var collection = db.get('portfolio');
    collection.find({},{},function(e,docs){
        res.render('portfolio', {
            "portfolio" : docs
        });
    });
});


/* POST portfolio to database*/
router.post('/addStock', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get form values

    var companyName = req.body.companyName;
    var quantity = parseInt(req.body.quantity);

    var collection = db.get('portfolio');

    collection.insert({
        "companyName" : companyName,
        "quantity" : quantity
    }, function (err, doc){
        if (err){
            res.send("There was a problem adding in the information to the database")
        } else {
            res.redirect("portfolio")
        }
    });
});

module.exports = router;
