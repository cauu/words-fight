import 'isomorphic-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
   return response.json().then(resJson => resJson);
}

export function Post(url, params) {
  const config = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(params)
  };

  return fetch(url, config)
    .then(checkStatus)
    .then(parseJSON);
}

export function Get(url) {
  const config = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };
  return fetch(url, config)
    .then(checkStatus)
    .then(parseJSON);
}

export function Delete(url) {
  const config = {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };
  return fetch(url, config)
    .then(checkStatus)
    .then(parseJSON);
}
