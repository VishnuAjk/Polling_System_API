import QuestionModel from '../model/questionSchema.js';
import OptionModel from '../model/optionSchema.js';

//Create a Question
export const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Title is required for creating question',
      });
    }

    const question = new QuestionModel({title});

    await question.save();

    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//Create an Option
export const createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: 'text required for creating option',
      });
    }

    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: 'question not found!',
      });
    }

    const option = new OptionModel({
      text,
      question,
    });

    // create link to vote using id of option

    // const link_to_vote = `http://localhost:3000/option/${option.id}/add_vote`;

    // Get the base URL dynamically
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Create link_to_vote using _id of option
    const link_to_vote = `${baseUrl}/option/${option.id}/add_vote`;


    option.link_to_vote = link_to_vote; //pushing url to document

    option.save();

    //adding id of option to question document
    await question.updateOne({ $push: { options: option } });

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

//Delete a Question
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: 'question not found',
      });
    }

    //Even if one of the options of question has votes. It can't be deleted
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message: 'at least one of options has votes',
      });
    }

    //Deleting all the options of the question
    await OptionModel.deleteMany({ question: questionId });

    // Deleting question
    await QuestionModel.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: 'question and associated options deleted successfully!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// To view a question and its options
export const viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // populate question with all of its options
    const question = await QuestionModel.findById(questionId).populate({
      path: 'options',
      model: 'options',
    });

    if (!question) {
      return res.status(400).json({
        message: 'question not found',
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
