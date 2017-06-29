import mongoose, { Types } from 'mongoose';

import { getPagination } from '../services/global';

import Book from '../models/book';

async function getBookPagination(query) {
  return await getPagination(Book, query);
}

function getBooks({ pageNo, pageSize, ...query }) {
  return Book
    .find(query)
    .paginate(pageNo, pageSize)
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
  updateBook,
  getBookPagination
};