import config from './config'

const prefix = (url: String) => `${config.host}${url}`

export default {
  CHECK_AUTH: prefix('auth/check'),

  LOGIN: prefix('auth/login'),

  REGISTER: prefix('auth/register'),

  QUESTIONS: prefix('questions'),

  SCENES: prefix('scenes'),

  LEVELS: prefix('levels'),

  BOOKS: prefix('books')
}