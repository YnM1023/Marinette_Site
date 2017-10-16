var express = require("express");
var router  = express.Router();
var Picture = require("../models/picture");
var middleware = require("../middleware");

// OVERVIEW - show all blogs at one page
router.get("/",function(req,res){
    var Picture_ACG;
    var Picture_PtP;
    var Picture_PSc;
    Picture.find({tag:"ACG"},function(err,allSelected){
        if(err){
            console.log(err);
        }else{
            Picture_ACG = allSelected;
            Picture.find({tag:"Photo-Person"},function(err,allSelected){
                if(err){
                    console.log(err);
                }else{
                    Picture_PtP=allSelected;
                    Picture.find({tag:"Photo-Scenery"},function(err,allSelected){
                        if(err){
                            console.log(err);
                        }else{
                            Picture_PSc=allSelected;
                            res.render("pictures/overview",{Picture_ACG:Picture_ACG,Picture_PtP:Picture_PtP,Picture_PSc:Picture_PSc});
                        }
                    });
                }
            });
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("pictures/new"); 
});

//CREATE - add new picture to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to picture array
    var name = req.body.name;
    var tag = req.body.tag;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPicture = {name: name, tag:tag, image: image, description: desc, author:author}
    // Create a new picture and save to DB
    Picture.create(newPicture, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to pictures page
            console.log(newlyCreated);
            res.redirect("/pictures");
        }
    });
});

// SHOW - show the specified blog
router.get("/:id", function(req, res){
    Picture.findById(req.params.id).populate("comments").exec(function(err, foundPicture){
        if(err || !foundPicture){
            console.log(err);
            req.flash('error', 'Sorry, that picture does not exist!');
            return res.redirect('/pictures');
        } else {
            console.log(foundPicture)
            res.render("pictures/show",{picture:foundPicture});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkPictureOwnership, function(req, res){
    Picture.findById(req.params.id, function(err, foundPicture){
        res.render("pictures/edit", {picture: foundPicture});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkPictureOwnership, function(req, res){
    // find and update the correct campground
    Picture.findByIdAndUpdate(req.params.id, req.body.picture, function(err, updatedPicture){
       if(err){
           res.redirect("/pictures");
       } else {
           //redirect somewhere(show page)
           res.redirect("/pictures/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkPictureOwnership, function(req, res){
   Picture.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/pictures");
      } else {
          req.flash("success","Picture has been deleted sucessfully!")
          res.redirect("/pictures");
      }
   });
});

module.exports = router;