import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: { type: String },
  type: { type: Number },
  slug: { type: String },
  fullSlug: { type: String },
  afterCorrect: { type: Schema.Types.ObjectId },
  afterError: { type: Schema.Types.ObjectId },
  answers: [{
    text: { type: String },
    next: { type: Schema.Types.ObjectId }
  }],
  createdAt: { type: Date }
});

module.exports = mongoose.model('Question', QuestionSchema);
