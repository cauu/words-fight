import { successDec, failedDec } from '../../utils/api';
import {
  getScenes,
  addScene,
  delScene,
  updateScene
} from '../../services/scene';
import { validator } from '../../utils/common';

async function listScenes({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1),
    checkQuery('lid').optional()
  );

  let scenes = await getScenes(query);

  return successDec(scenes);
}

async function createScene({ request, checkBody }) {
  validator(
    checkBody('title').notEmpty(),
    checkBody('nextSid').optional().notEmpty()
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
    checkQuery('id').notEmpty(),
    checkBody('title').optional()
  );

  let result = await updateScene(id, request.body);

  return successDec(result);
}

export {
  listScenes,
  createScene,
  removeScene,
  modifyScene
}