var mongoose = require("mongoose");

var TagBlogSchema = new mongoose.Schema({
    name: String,
    blogs:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Blog"
        }
    ]
});

module.exports = mongoose.model("blogTag", TagBlogSchema);