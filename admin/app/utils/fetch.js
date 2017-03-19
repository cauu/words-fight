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

function concatUrl(url, query) {
  let concatStr = '?';
  let keys = Object.keys(query);
  let result = url;

  if(url.indexOf(concatStr) > -1) {
    concatStr = '&';
  }

  for(let i = 0; i < keys.length; i++) {
    if(i > 0) {
      concatStr = '&';
    }
    reuslt = result + concatStr + keys[i]  + '=' + query[keys[i]];
  }

  return result;
}

function Post(url, data) {
  const config = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  };

  return fetch(url, config);
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
  return fetch(url, config);
}

function Delete(url) {
  const config = {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };
  return fetch(url, config);
}


function remote(options) {
  const funcs = {
    delete: Delete,
    get: GET,
    post: POST
  };

  let { method, url, query, data } = options;

  if(funcs[method.toLowerCase()]) {
    return funcs[method.toLowerCase()](concatUrl(url, query), data)
      .then(checkStatus)
      .then(parseJSON)
    ;
  } else {
    throw new Error('No such http request.');
  }
}