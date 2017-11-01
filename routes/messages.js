var express = require("express");
var router  = express.Router({mergeParams: true});
var Algorithm = require("../models/algorithms");
var Message = require("../models/message");
var middleware = require("../middleware");

//Messages New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find picture by id
    console.log(req.params.id);
    Algorithm.findById(req.params.id, function(err, algorithm){
        if(err){
            console.log(err);
        } else {
             res.render("messages/new", {algorithm: algorithm});
        }
    })
});

//Messages Create
router.post("/",middleware.isLoggedIn,function(req, res){
    //lookup picture using ID
    Algorithm.findById(req.params.id, function(err, algorithm){
        if(err){
            console.log(err);
            res.redirect("/algorithms");
        } else {
        Message.create(req.body.message, function(err, message){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to comment
               message.author.id = req.user._id;
               message.author.username = req.user.username;
               //save comment
               message.save();
               algorithm.messages.push(message);
               algorithm.save();
               console.log(message);
               req.flash("success", "Successfully post a message");
               res.redirect('/algorithms/' + algorithm._id);
           }
        });
       }
   });
});

// MESSAGE EDIT ROUTE
router.get("/:message_id/edit", middleware.checkMessageOwnership, function(req, res){
   Message.findById(req.params.message_id, function(err, foundMessage){
      if(err){
          res.redirect("back");
      } else {
        res.render("messages/edit", {algorithm_id: req.params.id, message: foundMessage});
      }
   });
});

// COMMENT UPDATE
router.put("/:message_id", middleware.checkMessageOwnership, function(req, res){
   Message.findByIdAndUpdate(req.params.message_id, req.body.message, function(err, updatedMessage){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/algorithms/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:message_id", middleware.checkMessageOwnership, function(req, res){
    //findByIdAndRemove
    Message.findByIdAndRemove(req.params.message_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Message deleted");
           res.redirect("/algorithms/" + req.params.id);
       }
    });
});

module.exports = router;