import { get, post, put } from '../utils/fetch'
import API from '../constants/api'

export function getQuestions(query) {
  return get(API.QUESTIONS, query)
}

export function postQuestion(question) {
  return post(API.QUESTIONS, question)
}

export function delQuestion() {
}

export function putQuestion(question) {
  return put(API.QUESTIONS, question)
}