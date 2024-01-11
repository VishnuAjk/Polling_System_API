import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    link_to_vote: {
      type: String,
    },
    question:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'questions',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const OptionModel = mongoose.model('options', optionSchema);
export default OptionModel;

