const mongoose = require("mongoose");

// Schema for question
const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Option"
    }
  ]
});

module.exports = mongoose.model("Question", QuestionSchema);
