import Http from '../Utils/Http';
import BaseModel from './Base';

class UserModel extends BaseModel {
  name: string = '';

  effects = {
  };

  actions = {
  };
  
  constructor() {
    super();
  }
}

export default UserModel;