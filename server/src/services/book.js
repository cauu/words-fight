import mongoose, { Types } from 'mongoose';

import Book from '../models/book';

function getBooks({ pageNo, pageSize }) {
  return Book
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function addBook(book) {
  return Book
    .create(book)
  ;
}

function getBook(id) {
  return Book.findOne({ _id: id }).exec();
}

function delBook(id) {
  return Book.findOneAndRemove({ _id: id }).exec();
}

function updateBook(id, book) {
  return Book
    .findOneAndUpdate({ _id: id }, { $set: book }, { new: true, upsert: false })
  ;
}

export {
  getBook,
  getBooks,
  addBook,
  delBook,
  updateBook
};