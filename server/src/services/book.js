import mongoose, { Types } from 'mongoose';

import { getPagination } from '../services/global';

import { paginate } from '../utils/common';

import Book from '../models/book';

async function getBookAmount(query) {
  return await getPagination(Book, query);
}

async function getBooks({ pageNo, pageSize }) {
  return Book
    .find({})
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
  getBookAmount
};