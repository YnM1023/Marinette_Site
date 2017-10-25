var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Picture = require("./models/picture");
var TagAlgo = require("./models/tag-algo");
var Comment   = require("./models/comment");
var TagBlog   = require("./models/tag-blog");

// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         author:{
//             username:"Marinette"
//         }
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         author:{
//             username:"Marinette"
//         }
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//         author:{
//             username:"Marinette"
//         }
//     }
// ]

// function seedDB(){
//   //Remove all blogs
//   Blog.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed blogs!");
//          //add a few blogs
//         data.forEach(function(seed){
//             Blog.create(seed, function(err, blog){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log("added a blog");
//                     //create a comment
//                     Comment.create(
//                         {
//                             text: "This place is great, but I wish there was internet",
//                             author: {
//                                 username:"Marinette"
//                             }
//                         }, function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 blog.comments.push(comment);
//                                 blog.save();
//                                 console.log("Created new comment for blog");
//                             }
//                         });
//                 }
//             });
//         });
//     }); 
//     //remove all pictures
//     Picture.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//     }); 
//     //add a few comments
// }

var tags = [
    {name:"Daily"},
    {name:"Peking-University"},
    {name:"UTD"},
    {name:"Language"},
    {name:"Web-Development"},
    {name:"Travel-Notes"},
    {name:"Friends"},
    {name:"Algorithms"},
    {name:"Others"}
];

var tagsAlgo = [
    {name:"Array"},
    {name:"Linked-List"},
    {name:"String"},
    {name:"Hash-Table"},
    {name:"Math"},
    {name:"Two-Pointers"},
    {name:"Dynamic-Programming"},
    {name:"Backtracking"},
    {name:"Stack"},
    {name:"Heap"},
    {name:"Greedy"},
    {name:"Sort"},
    {name:"Bit-Manipulation"},
    {name:"Tree"},
    {name:"Search"},
    {name:"Union-Find"},
    {name:"Graph"},
    {name:"Recursion"},
    {name:"Queue"},
    {name:"Minimax"},
    {name:"Map"},
    {name:"Geometry"}
];

function seedDB(){
    // Blog.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("remove all blogs!");
    //     }
    // });
    // TagBlog.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("remove all tag-blogs");
    //         tags.forEach(function(seed){
    //             TagBlog.create(seed,function(err, tag){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     console.log(tag);
    //                 }
    //             })
    //         });
    //     }
    // })
    TagAlgo.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("remove all tag-algos!");
            tagsAlgo.forEach(function(seed){
                TagAlgo.create(seed,function(err, tag){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(tag);
                    }
                })
            })
        }
    })
};



module.exports = seedDB;
