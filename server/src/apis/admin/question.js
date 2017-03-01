import { successDec, failedDec } from '../../utils/api';
import { 
  getQuestions, 
  addQuestion 
} from '../../services/question';

async function listQuestions({ query, checkQuery }) {
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