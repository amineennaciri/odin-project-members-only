const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  textMsg: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Messages", MessageSchema);