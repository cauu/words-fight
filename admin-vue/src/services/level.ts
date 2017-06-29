import { get, post, put } from '../utils/fetch'
import API from '../constants/api'

export function getLevel(query) {
  return get(API.LEVELS, query)
}

export function postLevel(level) {
  return post(API.LEVELS, level)
}

export function putLevel(level) {
  return put(API.LEVELS, level)
}