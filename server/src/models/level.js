import mongoose from 'mongoose';
import deepPopulate from 'mongoose-deep-populate';

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  title: { type: String, require: true, unique: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  createdAt: { type: Date }
});

LevelSchema.plugin(deepPopulate(mongoose));

module.exports = mongoose.model('Level', LevelSchema);