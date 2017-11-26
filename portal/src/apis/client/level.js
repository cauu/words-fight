import { successDec, failedDec } from '../../utils/api';
import { validator } from '../../utils/common';

import { getAllScenes } from '../../services/scene';
import { getAllQuestions } from '../../services/question';

const mapArray = (key) => (array) => {
  const result = {};

  array.forEach((item) => {
    result[item[key]] = item;
  });

  return result;
};

const formatAnswer = (ruleNextQuestion) => (ruleNextScene) => (answers) => {
  return answers.map((answer) => {
    answer = answer.toObject();
    if(ruleNextQuestion[answer.code].shouldLeave) {
        answer.nextScene = ruleNextScene[answer.code] && ruleNextScene[answer.code].scene;
    } else {
        answer.nextQuestion = ruleNextQuestion[answer.code] && ruleNextQuestion[answer.code].question;
    }
    return answer;
  });
};

const formatQuestions = (scenes) => (questionArr=[]) => {
  const mapArrayByCode = mapArray('code');

  let result = [];

  questionArr.forEach((questions) => {
    result = result.concat(questions.map((question) => {
      const ruleNextScene = mapArrayByCode(scenes[question.scene].next);
      const ruleNextQuestion = mapArrayByCode(question.next);

      return Object.assign({}, question.toObject(), { answers: formatAnswer(ruleNextQuestion)(ruleNextScene)(question.answers) });
    }));
  });

  return result;
}

async function getLevelInfo({ query, checkQuery }) {
  validator(
    checkQuery('lid').notEmpty()
  );

  const { lid: level } = query;

  const sceneArr = await getAllScenes({ level });

  const getSceneQuestion = (scene) => getAllQuestions({ scene: scene._id });

  const questionArr = await Promise.all(sceneArr.map(getSceneQuestion));

  const mapArrayById = mapArray('_id');

  return successDec({
    questions: formatQuestions(mapArrayById(sceneArr))(questionArr),
    scenes: mapArrayById(sceneArr)
  });
}

export {
  getLevelInfo
};