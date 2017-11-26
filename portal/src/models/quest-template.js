import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestTemplateSchema = new Schema({
  title: { type: String, require: true, unique: true },
  type: { type: String, require: true },
  answers: [{
    text: { type: String },
  }],
  createdAt: { type: Number },
  updatedAt: { type: Number }
});

module.exports = mongoose.model('QuestTemplate', QuestTemplateSchema);