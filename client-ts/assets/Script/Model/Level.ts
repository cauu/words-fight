import Http from '../Utils/Http';
import BaseModel from './Base';
import API from '../Constant/Api';

class Level extends BaseModel {
  constructor() {
    super();
  }

  state = {
    questions: [],
    scenes: []
  };

  effects = {
    async getLevelInfo() {
      const response = await Http.Get(API.GET_LEVEL_INFO('595e481a304673f19a3e84d6'));

      const { data } = response;
    }
  };

  actions = {};
}

export default Level;