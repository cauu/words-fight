import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SceneSchema = new Schema({
  title: { type: String, require: true, unique: true },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  rootQuest: { type: Schema.Types.ObjectId, ref: 'Question' },
  createdAt: { type: Date },
  next: [{
    code: { type: Number },
    scene: { type: Schema.Types.ObjectId, ref: 'Scene' }
  }]
});

module.exports = mongoose.model('Scene', SceneSchema);