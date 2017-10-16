var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");
var middleware = require("../middleware");

// root route
router.get("/", function(req, res){
    res.render("home");
});

// profile page of current user
router.get("/profile", middleware.isLoggedIn, function(req,res){
    res.render("profile/profile");
});

// edit form for user profile
router.get("/profile/edit",middleware.isLoggedIn,function(req, res){
    res.render("profile/edit");
});

// Update profile router
router.put("/profile/edit",middleware.isLoggedIn,function(req,res){
    // update the profile of current user
    User.findByIdAndUpdate(req.user._id,{$set:{avatar:req.body.avatar,gender:req.body.gender,info:req.body.info}},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            res.redirect("/profile");
        }
    });
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, avatar:"https://i.imgur.com/K73KHQv.jpg"});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        console.log("success in creating user!");
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Marinette Blog" + user.username);
            res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","You have logged out!");
   res.redirect("/");
});

module.exports = router;