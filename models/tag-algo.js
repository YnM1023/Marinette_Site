var mongoose = require("mongoose");

var TagAlgoSchema = new mongoose.Schema({
    name: String,
    algos:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Algorithm"
        }
    ]
});

module.exports = mongoose.model("algoTag", TagAlgoSchema);