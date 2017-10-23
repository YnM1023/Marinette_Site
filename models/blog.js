var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
    filename: String,
	title: String,
	tag: String,
	description: String,
	created: {type: Date, default: Date.now},
    message: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Blog", BlogSchema);