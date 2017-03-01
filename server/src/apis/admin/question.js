import { successDec, failedDec } from '../../utils/api';
import { 
  getQuestions, 
  addQuestion 
} from '../../services/question';
import { validator } from '../../utils/common';

async function listQuestions({ query, checkQuery }) {
  let errors = validator(
    checkQuery('pageNo').ge(1).hasError(),
    checkQuery('pageSize').ge(1).hasError()
  );

  const { pageNo, pageSize } = query;

  let questions = await getQuestions(pageNo, pageSize);

  return successDec(questions);
}

async function createQuestion({ request, checkBody }) {
  let { plan } = request.body;

  let result = await addQuestion(plan);

  return successDec(result);
}

async function removeQuestion(pid) {
}

export {
  listQuestions,
  createQuestion
};