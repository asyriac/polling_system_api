const Question = require("../../models/questions");
const Option = require("../../models/options");

// @desc    Create a question
// @route   POST /api/v1/questions/create
exports.create_question = async (req, res) => {
  try {
    // Create a new question
    const question = await Question.create(req.body);

    // Return response
    return res.status(201).json({
      success: true,
      body: question
    });
  } catch (err) {
    // Error handling
    return res.status(400).json({
      success: false
    });
  }
};

// @desc    Delete a question
// @route   DELETE /api/v1/questions/:id/delete
exports.destroy_question = async (req, res) => {
  try {
    // Delete a question
    let question = await Question.findById(req.params.id).populate("options");

    // If any of the options has votes, then do not delete the question
    if (question.options.length > 0) {
      for (let i = 0; i < question.options.length; i++) {
        if (question.options[i].votes > 0) {
          return res.status(400).json({
            success: false,
            message: "This question has options with votes and cannot be deleted"
          });
        }
      }
    }

    // Remove the question and its corresponding options
    question.remove();
    await Option.deleteMany({ question: question._id });

    // Return response
    return res.status(201).json({
      success: true
    });
  } catch (err) {
    // Error handling
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create an option
// @route   POST /api/v1/questions/:id/options/create
exports.create_option = async (req, res) => {
  try {
    const text = req.body.text;
    const question = req.params.id;
    // Create an option
    const option = await Option.create({
      text,
      question
    });
    // Generate the link to vote for the option
    const link_to_vote = req.protocol + "://" + req.headers.host + "/options/" + option.id + "/add_vote";

    // Update the option in db with link to vote
    option.link_to_vote = link_to_vote;
    await option.save();

    // Add the option under the corresponding question
    const correspondigQuestion = await Question.findById(question);
    correspondigQuestion.options.push(option);
    await correspondigQuestion.save();

    // Return response
    return res.status(400).json({
      success: true,
      body: option
    });
  } catch (err) {
    // Error handling
    return res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};

// @desc    Get all details of a question
// @route   GET /api/v1/questions/:id
exports.get_question = async (req, res) => {
  try {
    // Get the question from the db based on id passed in params and populate it
    const question = await Question.findById(req.params.id).populate("options");

    // Return response
    return res.status(400).json({
      success: true,
      body: question
    });
  } catch (error) {
    // Error handling
    return res.status(400).json({
      success: false
    });
  }
};
