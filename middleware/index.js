var Picture  = require("../models/picture");
var Comment  = require("../models/comment");
var User     = require("../models/user");
var Blog     = require("../models/blog");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkPictureOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Picture.findById(req.params.id, function(err, foundPicture){
            if(err || !foundPicture){
               req.flash("error", "This picture is not found");
               res.redirect("back");
            } else if(foundPicture.author.id.equals(req.user._id) || req.user.isAdmin){
                req.picture = foundPicture;
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash('error',"Sorry, that comment does not exist!");
                res.redirect("back");
            } else if(foundComment.author.id.equals(req.user._id)) {
                req.comment = foundComment;
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

// middlewareObj.checkProfileOwnership = function(req, res, next) {
//     if(req.isAuthenticated()){
//         User.findById(req.params.id, function(err, foundUser){
//             if(err || !foundUser){
//               req.flash("error", "This User is not exist!");
//               res.redirect("back");
//             } else if(foundUser.author.id.equals(req.user._id) || req.user.isAdmin){
//                 req.picture = foundPicture;
//                 next();
//             } else {
//                 req.flash("error", "You don't have permission to do that");
//                 res.redirect("back");
//             }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("back");
//     }
// }

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;