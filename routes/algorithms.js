var express = require("express");
var router  = express.Router();
var Algorithm = require("../models/algorithms");
var TagAlgo = require("../models/tag-algo")
var Massage = require("../models/message");
var User    = require("../models/user");
var middleware = require("../middleware");

// OVERVIEW - show all algorithms at one page
router.get("/",function(req,res){
    TagAlgo.find({}).populate(["algos"]).exec(function(err,allTags){
        if(err){
            console.log(err);
        }else{
            res.render("algorithms/index",{tags:allTags});
        }
    })
});

//NEW - show form to create new algorithm
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("algorithms/new"); 
});

//CREATE - add new algorithm to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // Create a new picture and save to DB
    Algorithm.create(req.body.algorithm, function(err, newlyCreated){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            newlyCreated.author.id = req.user._id;
            newlyCreated.author.username = req.user.username;
            newlyCreated.save();
            console.log(newlyCreated);
            TagAlgo.findOne({name:newlyCreated.tag},function(err,foundTag){
                if(err){
                    console.log(err);
                }else{
                    foundTag.algos.push(newlyCreated);
                    foundTag.save();
                    //redirect back to pictures page
                    req.flash("success", "Successfully post a new algorithm!");
                    res.redirect("/algorithms");
                }
            })
        }
    });
});

// SHOW - show the specified picture
router.get("/:id", function(req, res){
    Algorithm.findById(req.params.id).populate(["messages"]).exec(function(err, foundAlgo){
        if(err || !foundAlgo){
            console.log(err);
            req.flash('error', 'Sorry, that algorithm topic does not exist!');
            return res.redirect('/algorithms');
        } else {
            User.findById(foundAlgo.author.id, function(err,foundUser){
                console.log(foundUser);
                res.render("algorithms/show",{algorithm:foundAlgo, author:foundUser});
            })
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkAlgorithmOwnership, function(req, res){
    Algorithm.findById(req.params.id, function(err, foundAlgo){
        res.render("algorithms/edit", {algorithm: foundAlgo});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkAlgorithmOwnership, function(req, res){
    // find and update the correcurrentct algorithm topic
    Algorithm.findByIdAndUpdate(req.params.id, req.body.algorithm, function(err, updatedAlgo){
      if(err){
          res.redirect("/algorithms");
      } else {
          //redirect somewhere(show page)
          res.redirect("/algorithms/" + req.params.id);
      }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkAlgorithmOwnership, function(req, res){
  Algorithm.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/algorithms");
      } else {
          req.flash("success","Algorithm topic has been deleted sucessfully!")
          res.redirect("/algorithms");
      }
  });
});

module.exports = router;