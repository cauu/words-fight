import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookShema = new Schema({
  title: { type: String, require: true, unique: true }
});

module.exports = mongoose.model('Book', BookShema);