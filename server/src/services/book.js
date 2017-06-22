import mongoose, { Types } from 'mongoose';

import { paginate } from '../utils/common';

import Book from '../models/book';

async function getBooks({ pageNo, pageSize }) {
  paginate(Book, {}, { pageNo, pageSize })
  return Book
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize * 1)
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