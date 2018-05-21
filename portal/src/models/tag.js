import mongoose from 'mongoose';

const TagSchema = new Schema({
  name: { type: String, require: true }
});

module.exports = mongoose.model('Tag', TagSchema);