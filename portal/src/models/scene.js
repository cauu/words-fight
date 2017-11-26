import mongoose from 'mongoose';
import deepPopulate from 'mongoose-deep-populate';

const Schema = mongoose.Schema;

const SceneSchema = new Schema({
  title: { type: String, require: true, unique: true },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  rootQuest: { type: Schema.Types.ObjectId, ref: 'Question' },
  createdAt: { type: String },
  next: [{
    code: { type: Number },
    scene: { type: Schema.Types.ObjectId, ref: 'Scene' }
  }]
});

SceneSchema.plugin(deepPopulate(mongoose));

module.exports = mongoose.model('Scene', SceneSchema);