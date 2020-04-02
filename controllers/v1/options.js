const Question = require("../../models/questions");
const Option = require("../../models/options");

// @desc    Destroy a option
// @route   DELETE /api/v1/options/:id/delete
exports.destroy_option = async (req, res) => {
  try {
    // Find the option to be deleted
    const option = await Option.findById(req.params.id);

    // If the option has votes, do not delete the option
    if (option.votes > 0) {
      return res.status(200).json({
        sucess: false,
        message: "This option has votes and cannot be deleted"
      });
    }

    // Find the corresponding question to delete the entry from question collection
    const question = await Question.findById(option.question);
    option.remove();

    // Delete the option from the question collection
    question.options.pull(option._id);
    question.save();

    // Return response
    return res.status(200).json({
      sucess: true
    });
  } catch (error) {
    // Error handling
    return res.status(400).json({
      success: false
    });
  }
};

// @desc    Increase vote for an option
// @route   POST /api/v1/options/:id/add_vote
exports.add_vote = async (req, res) => {
  try {
    // Find the option based on id passed in params
    const option = await Option.findById(req.params.id);

    // Update the vote and save it
    option.votes = option.votes + 1;
    await option.save();

    // Return response
    return res.status(400).json({
      success: true,
      body: option
    });
  } catch (error) {
    // Error handling
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
