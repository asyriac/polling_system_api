const mongoose = require("mongoose");

// Schema for options
const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  link_to_vote: {
    type: String
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question"
  }
});

module.exports = mongoose.model("Option", OptionSchema);
