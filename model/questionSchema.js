import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true
    },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
    totalVotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const QuestionModel = mongoose.model('questions', questionSchema);
export default QuestionModel;