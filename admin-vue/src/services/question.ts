import { get, post } from '../utils/fetch'
import API from '../constants/api'

export function listQuetions() {
  return get(API.QUESTIONS)
}

export function createQuetion() {
  return post(API.QUESTIONS)
}

export function delQuestion() {
}

export function updateQuestion() {
}