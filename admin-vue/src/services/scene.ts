import { get, post, put } from '../utils/fetch'
import API from '../constants/api'

export function getScene(query) {
  return get(API.SCENES, query)
}

export function postScene(scene) {
  return post(API.SCENES, scene)
}

export function putScene(scene) {
  return put(API.SCENES, scene)
}