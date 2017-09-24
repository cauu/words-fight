import axios from 'axios';

class Http {
  static Get(url) {
    return axios
      .get(url)
    ;
  }

  static Post(url, data) {
    return axios
      .post(url, data)
    ;
  }
}

export default Http;