const prefix = (url) => `http://localhost:3000/client-api/v1/${url}`;

export default {
  GET_LEVEL_INFO: (levelId) => prefix(`level-info?lid=${levelId}`)
};