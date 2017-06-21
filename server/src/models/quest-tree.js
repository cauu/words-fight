import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestRootSchema = new Schema({
  title: { type: String, require: true },
  root: { type: Schema.Types.ObjectId, ref: 'Question' }
});

module.exports = mongoose.model('QuestRoot', QuestRootSchema);