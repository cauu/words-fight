import { successDec, failedDec } from '../../utils/api';
import { 
  getQuestions, 
  addQuestion,
  delQuestion,
  updateQuestion,
  getQuestionPagination
} from '../../services/question';
import { validator } from '../../utils/common';

async function listQuestions({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1),
    checkQuery('sid').optional()
  );

  let data = await getQuestions(query);

  let pagination = await getQuestionPagination(query); 

  return successDec({
    data,
    pagination
  });
}

async function createQuestion({ request, checkBody }) {
  validator(
    checkBody('title').notEmpty(),
    checkBody('text').notEmpty(),
    checkBody('type').notEmpty()
  );

  let question = request.body;

  let result = await addQuestion(question);

  return successDec(result);
}

async function removeQuestion({ query, checkQuery }) {
  validator(
    checkQuery('id').notEmpty()
  );

  let { id } = query;

  let result = await delQuestion(id);

return successDec(result);
}

async function modifyQuestion({ request, query, checkQuery, checkBody }) {
  validator(
    checkQuery('id').notEmpty(),
    checkBody('title').optional().notEmpty(),
    checkBody('text').optional().notEmpty(),
    checkBody('type').optional().notEmpty(),
    checkBody('anwsers').optional()
  );

  let { id } = query;

  let result = await updateQuestion(id, request.body);

  return successDec(result);
}

export {
  listQuestions,
  createQuestion,
  removeQuestion,
  modifyQuestion
};