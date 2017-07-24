import mongoose from 'mongoose';
import deepPopulate from 'mongoose-deep-populate';

const Schema = mongoose.Schema;

/**@property
 * type: enum('select', 'blank')
 */
const QuestionSchema = new Schema({
  title: { type: String, require: true, unique: true },
  scene: { type: Schema.Types.ObjectId, ref: 'Scene' },
  text: { type: String, require: true },
  type: { type: String, require: true },
  slug: { type: String },
  fullSlug: { type: String },
  answers: [{
    text: { type: String },
    code: { type: Number }
  }],
  next: [{
    code: { type: Number },
    shouldLeave: { type: Boolean },
    question: { type: Schema.Types.ObjectId, ref: 'Question' }
  }],
  createdAt: { type: Number },
  updatedAt: { type: Number }
});

QuestionSchema.plugin(deepPopulate(mongoose));

module.exports = mongoose.model('Question', QuestionSchema);