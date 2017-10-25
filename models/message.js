var mongoose = require("mongoose");

var messageSchema = mongoose.Schema({
    text: String,
    created:{type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Message", messageSchema);