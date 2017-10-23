var express    = require("express");
var router     = express.Router();
var middleware = require("../middleware");
var Blog       = require("../models/blog");
var TagBlog    = require("../models/tag-blog");

// OVERVIEW - show all blogs at one page
router.get("/",function(req,res){
    Blog.find({},function(err,allSelected){
        if(err){
            console.log(err);
        }else{
            TagBlog.find({}).populate(["blogs"]).exec(function(err,allTags){
                if(err){
                    console.log(err);
                }else{
                    res.render("blogs/index",{blogs:allSelected,tags:allTags});
                }
            })
        }
    });
});

// NEW - show the form to create a new blog db
router.get("/new", middleware.isLoggedIn, function(req,res){
    if(req.user.username === "Marinette"){
        res.render("blogs/new");
    }else{
        req.flash("error","You cannot do this operation!");
        res.redirect("/");
    }
});

// Create - add created blog to db
router.post("/",middleware.isLoggedIn,function(req,res){
    if(req.user.username === "Marinette"){
        Blog.create(req.body.blog,function(err,newlyCreated){
            if(err){
                console.log(err);
            }else{
                TagBlog.findOne({name:newlyCreated.tag},function(err,foundTag){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(foundTag);
                        foundTag.blogs.push(newlyCreated);
                        foundTag.save();
                        console.log(foundTag);
                        res.redirect("/blogs");
                    }
                });
            }
        });
    }else{
        req.flash("error","You cannot do this operation!");
        return res.redirect("/");
    }
});

// SHOW - show the specified blog
router.get("/:id", function(req, res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err || !foundBlog){
            console.log(err);
            req.flash('error','Sorry, that blog dose not exist!')
            return res.redirect('/blogs');
        }else{
            res.render("blogs/pages/"+foundBlog.filename,{blog:foundBlog});
        }
    })
});


module.exports = router;