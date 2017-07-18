import { successDec, failedDec } from '../../utils/api';
import {
  getScenes,
  addScene,
  delScene,
  updateScene,
  getScenePagination
} from '../../services/scene';
import { validator } from '../../utils/common';

async function listScenes({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1),
    checkQuery('lid').optional()
  );

  let data = await getScenes(query);

  let pagination = await getScenePagination(query);

  return successDec({
    data,
    pagination
  });
}

async function createScene({ request, checkBody }) {
  validator(
    checkBody('title').notEmpty(),
    checkBody('level').notEmpty(),
    checkBody('createdAt').default(new Date().getTime()),
    checkBody('next').optional().notEmpty()
  );
  
  let scene = request.body;

  let result = await addScene(scene);

  return successDec(result);
}

async function removeScene({ query, checkQuery }) {
  validator(
    checkQuery('id').notEmpty()
  );

  let { id } = query;

  let result = await delScene(id);

  return successDec(result);
}

async function modifyScene({ request, query, checkQuery, checkBody }) {
  validator(
    checkBody('_id').notEmpty(),
    checkBody('title').optional()
  );

  const { _id } = request.body;

  console.log(_id);

  let result = await updateScene(_id, request.body);

  return successDec(result);
}

export {
  listScenes,
  createScene,
  removeScene,
  modifyScene
}