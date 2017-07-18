import fetch from 'isomorphic-fetch'
import param from  'jquery-param'
import _ from 'underscore'

interface ResponseError extends Error {
  response: Object
}

function checkContentStatus(content) {
  if (content.status === 'SUCCESS') {
    return content
  }

  let error: ResponseError = <ResponseError>new Error(content.result);
  error.response = content
  throw error
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  let error: ResponseError = <ResponseError>new Error(response.statusText);
  error.response = response
  throw error
}

function parseJSON(response) {
  return response.json().then(resJson => resJson)
}

export function put(url, params={}) {
  const config = {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(params)
  }

  return fetch(url, config).then(checkStatus).then(parseJSON).then(checkContentStatus)
}


export function post(url, params={}) {
  const config = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(params)
  };

  return fetch(url, config).then(checkStatus).then(parseJSON).then(checkContentStatus);
}

export function postForm(url, params) {
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include',
    body: param(params)
  };

  return fetch(url, config).then(checkStatus).then(parseJSON).then(checkContentStatus);
}

export function get(url, query = {}) {
  const config = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  url = ( _.isEmpty(query) && `${url}` ) || `${url}?${param(query)}`;

  return fetch(`${url}`, config).then(checkStatus).then(parseJSON).then(checkContentStatus);
}
