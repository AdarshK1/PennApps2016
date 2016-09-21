var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

    router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

router.route('/')
//GET Portfolio
    .get(function(req, res, next) {
        //retrieve portfolio from Mongo
        mongoose.model('Portfolio').find({}, function (err, blobs) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('portfolio/index', {
                            title: 'The Portfolio',
                            "Portfolio" : blobs
                        });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
            }
        });
    })
    //PUT a new company to the portfolio
    .put(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var company = req.body.company;
        var quantity = req.body.quantity;
        //call the create function for our database
        mongoose.model('Portfolio').update({

        }, {
            company : company,
            quantity : quantity
        }, function (err, blob) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                console.log('POST creating new blob: ' + blob);
                res.format({
                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("blobs");
                        // And forward to success page
                        res.redirect("/blobs");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(blob);
                    }
                });
            }
        })
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
