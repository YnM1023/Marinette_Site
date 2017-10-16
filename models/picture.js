var mongoose = require("mongoose");

var PictureSchema = new mongoose.Schema({
   name: String,
   tag: String,
   image: String,
   description: String,
   copyright: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Picture", PictureSchema);