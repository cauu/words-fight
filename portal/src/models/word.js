import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WordSchema = new Schema({
  key: { type: Number, require: true, unique: true},
  text: { type: String, require: true, unique: true },
  phonetic: { type: String },
  translation: { type: String },
  tags: [{ type: String }]
});

module.exports = mongoose.model('Word', WordSchema);