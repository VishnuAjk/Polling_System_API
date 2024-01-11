import OptionModel from '../model/optionSchema.js';
import QuestionModel from '../model/questionSchema.js';

// Delete an Option
export const deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await OptionModel.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'option not found',
      });
    }

    // If option has at least one vote it can't be deleted
    if (option.votes > 0) {
      return res.status(400).json({
        message: 'this option has at least one vote',
      });
    }

    const question = await QuestionModel.findById(option.question);

    // Remove ref: id of this option from question's options array
    await question.updateOne({ $pull: { options: optionId } });

    // Delete the option
    await OptionModel.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: 'option deleted successfully!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//Add Vote
export const addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await OptionModel.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'option not found',
      });
    }

    //Increment the vote count by 1
    option.votes += 1;

    option.save();

    //Increment value of total votes of question by 1
    const question = await QuestionModel.findById(option.question);
    question.totalVotes += 1;

    question.save();

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
