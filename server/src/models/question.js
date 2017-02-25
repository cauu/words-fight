import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**@property
 * type: enum('select', 'blank')
 */
const QuestionSchema = new Schema({
  text: { type: String },
  type: { type: String },
  slug: { type: String },
  fullSlug: { type: String },
  answers: [{
    text: { type: String },
    isCorrect: { type: Boolean },
    next: { type: Schema.Types.ObjectId, ref: 'Question' }
  }],
  afterCorrect: { type: Schema.Types.ObjectId, ref: 'Question' },
  afterError: { type: Schema.Types.ObjectId, ref: 'Question' },
  createdAt: { type: Date }
});

module.exports = mongoose.model('Question', QuestionSchema);