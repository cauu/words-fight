import { get, post, put } from '../utils/fetch'
import API from '../constants/api'

export function getBooks(query) {
  return get(API.BOOKS, query)
}

export function postBook(book) {
  return post(API.BOOKS, book)
}

export function putBook(book) {
  return put(API.BOOKS, book)
}