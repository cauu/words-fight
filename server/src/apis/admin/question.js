import { successDec, failedDec } from '../../utils/api';
import { 
  getQuestions, 
  addQuestion 
} from '../../services/question';

async function listQuestions({ pageNo=1, pageSize=15 }) {
  try {
    if(pageNo < 0 || pageSize < 0) {
      throw new Error('Incorrect Parameter.');
    }

    let questions = await getQuestions(pageNo, pageSize);

    return successDec(questions);
  } catch(e) {
    return failedDec(e.message);
  }
}

async function createQuestion(plan) {
  try {
    let result = await addQuestion(plan)();

    return successDec(result);
  } catch(e) {
    return failedDec(e.message);
  }
}

export {
  listQuestions,
  createQuestion
};