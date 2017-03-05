import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SceneSchema = new Schema({
  title: { type: String, require: true, unique: true },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  next: { type: Schema.Types.ObjectId, ref: 'Scene'}
});

module.exports = mongoose.model('Scene', SceneSchema);