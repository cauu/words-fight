import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true},
  nickName: { type: String },
  isAdmin: { type: Boolean }
});

module.exports = mongoose.model('User', UserSchema);