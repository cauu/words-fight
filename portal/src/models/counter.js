import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  name: { type: String, require: true, unique: true },
  seq: { type: Number, require: true, unique: true }
});

module.exports = mongoose.model('Counter', CounterSchema);