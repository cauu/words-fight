import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  title: { type: String, require: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book' }
});

module.exports = mongoose.model('Level', LevelSchema);