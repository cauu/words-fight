import { successDec, failedDec } from '../../utils/api';
import {
  getLevels,
  getLevel,
  addLevel,
  delLevel,
  updateLevel,
  getLevelPagination
} from '../../services/level';
import {
  getBookById
} from '../../services/book.js';
import { validator } from '../../utils/common';

async function listLevels({ query, checkQuery }) {
  validator(
    checkQuery('book').optional(),
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1),
  );

  let nav = await getBookById(query.book);

  let data = await getLevels(query);

  let pagination = await getLevelPagination(query);

  return successDec({
    nav,
    data,
    pagination
  });
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
    checkBody('_id').notEmpty(),
    checkBody('title').optional(),
    checkBody('book').optional()
  );

  const { _id } = request.body;

  let result = await updateLevel(_id, request.body);

  return successDec(result);
}

export {
  listLevels,
  createLevel,
  removeLevel,
  modifyLevel
};