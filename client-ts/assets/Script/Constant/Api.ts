const prefix = (url) => `http://localhost:3000/client-api/v1/${url}`;
const bws = 'ws://localhost:3653';

export default {
  BATTLE_WS: bws,

  GET_LEVEL_INFO: (levelId) => prefix(`level-info?lid=${levelId}`),
};