var mongoose = require("mongoose");

var AlgorithmSchema = new mongoose.Schema({
   title: String,
   tag: String,
   image: String,
   problem: String,
   solution: String,
   conclusion: String,
   created: {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   messages: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Message"
      }
   ]
});

module.exports = mongoose.model("Algorithm", AlgorithmSchema);