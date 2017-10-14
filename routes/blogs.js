var express = require("express");
var router  = express.Router();
var Blog    = require("../models/blog");

// OVERVIEW - show all blogs at one page
router.get("/",function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err){
            console.log(err);
        }else{
            res.render("blogs/overview",{blogs:allBlogs});
        }
    })
});

// SHOW - show the specified blog
router.get("/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            console.log(foundBlog)
            res.render("blogs/show",{blog:foundBlog});
        }
    });
});


module.exports = router;