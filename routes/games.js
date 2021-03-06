var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

router.get("/games/rgbGame", middleware.isLoggedIn, function(req,res){
    res.render("games/rgbGame/RGBGame");
});

router.get("/games/patpat",middleware.isLoggedIn,function(req,res){
    res.render("games/patpat/patpat");
})

module.exports = router;