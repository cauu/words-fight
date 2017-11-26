import { get, post } from '../utils/fetch';
import API from '../constants/api';

export function login(user) {
  return get(API.LOGIN, user);
}

export function register(user) {
  return post(API.REGISTER, user);
}

export function checkAuth() {
  return get(API.CHECK_AUTH);
}