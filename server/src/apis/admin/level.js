import { successDec, failedDec } from '../../utils/api';
import {
  getLevels,
  getLevel,
  addLevel,
  delLevel,
  updateLevel
} from '../../services/level';
import { validator } from '../../utils/common';

async function listLevels({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1),
  );

  let levels = await getLevels(query);

  return successDec(levels);
}

async function createLevel({ request, checkBody }) {
  validator(
    checkBody('title').notEmpty(),
    checkBody('book').notEmpty()
  );

  let scene = request.body;

  let result = await addLevel(scene);

  return successDec(result);
}

async function removeLevel({ query, checkQuery }) {
  validator(
    checkQuery('id').notEmpty()
  );

  let { id } = query;

  let result = await delLevel(id);

  return successDec(result);
}

async function modifyLevel({ request, query, checkBody, checkQuery }) {
  validator(
    checkQuery('id').notEmpty(),
    checkBody('title').optional(),
    checkBody('book').optional()
  );

  let result = await updateLevel(id, request.body);

  return successDec(result);
}

export {
  listLevels,
  createLevel,
  removeLevel,
  modifyLevel
};