import jwt from 'jsonwebtoken';

import { successDec, failedDec } from '../../utils/api';
import {
  getUserById,
  getUserByNameAndPwd,
  getUsers,
  addUser
} from '../../services/user.js';
import { validator, Sha256 } from '../../utils/common';
import config from '../../config/config';

async function register({ request, checkBody }) {
  validator(
    checkBody('username').notEmpty(),
    checkBody('password').notEmpty(),
    checkBody('isAmin').optional()
  );

  const user = request.body;

  let result = await addUser({
    ...user,
    password: Sha256(user.password)
  });

  return successDec(result);
}

function login(isAdmin) {
  return async ({ query, checkQuery }) => {
    validator(
      checkQuery('username').notEmpty(),
      checkQuery('password').notEmpty()
    );

    const {
      username,
      password
    } = query;

    const user = await getUserByNameAndPwd(username, Sha256(password));

    if(user && isAdmin === user.isAdmin) {
      /** @todo generate token & return */
      let token = jwt.sign({ user }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

      return successDec({
        username: user.username,
        token
      });
    } else {
      return failedDec('Login Error');
    }
  }
}

async function logout({ query, checkQuery }) {
  /**@todo 清除用户的token*/
}

function checkAuth(isAdmin) {
  return async ({ header, query, checkQuery }) => {
    const token = header.authorization;

    const decode = await jwt.verify(token, config.jwt.secret);

    if(isAdmin && decode.user.isAdmin !== isAdmin) {
      throw new Error('No permission');
    }

    return successDec(decode);
  }
}

export {
  register,
  login,
  logout,
  checkAuth
};
