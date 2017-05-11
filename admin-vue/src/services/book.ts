import { get, post } from '../utils/fetch'
import API from '../constants/api'

export function listBooks() {
  return get(API.BOOKS)
}

export function createBook() {
  return post(API.BOOKS)
}



