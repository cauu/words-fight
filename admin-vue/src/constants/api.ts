import * as config from './config'

const prefix = (url: String) => `config.host${url}`

export default {
  QUESTIONS: prefix('questions'),

  SCENES: prefix('scenes'),

  LEVELS: prefix('levels'),

  BOOKS: prefix('books')
}