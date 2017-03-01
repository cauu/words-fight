import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**@property
 * type: enum('select', 'blank')
 */
const QuestionSchema = new Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  type: { type: String, require: true },
  slug: { type: String },
  fullSlug: { type: String },
  answers: [{
    text: { type: String },
    isCorrect: { type: Boolean },
    next: { type: Schema.Types.ObjectId, ref: 'Question' }
  }],
  afterCorrect: { type: Schema.Types.ObjectId, ref: 'Question' },
  afterError: { type: Schema.Types.ObjectId, ref: 'Question' },
  createdAt: { type: Number },
  updatedAt: { type: Number }
});

module.exports = mongoose.model('Question', QuestionSchema);