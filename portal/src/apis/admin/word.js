import { successDec, failedDec } from '../../utils/api';
import {
  getWords,
  addWord,
  delWord,
  updateWord
} from '../../services/word';

import { validator } from '../../utils/common';

async function listWords({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1)
  );

  let data = await getWords(query);

  return successDec();
}

async function createWord({ request, checkBody }){
  validator(
    checkBody('text').notEmpty(),
    checkBody('phonetic').notEmpty(),
    checkBody('translation').notEmpty(),
    checkBody('tags').optional()
  );

  const result = await addWord({
    ...request.body,
  })

  return successDec(result);
}

export {
  listWords,
  createWord
};