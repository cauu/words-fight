import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  title: { type: String, require: true, unique: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  createdAt: { type: Date }
});

module.exports = mongoose.model('Level', LevelSchema);