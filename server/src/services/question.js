import mongoose, { Types } from 'mongoose';
import thunkify from 'thunkify';

import Question from '../models/question';

/**@arg {number} pageNo 页码数*/
/**@arg {number} pageSize 页数*/
function getQuestions({ pageNo, pageSize }) {
  return Question
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function addQuestion({ text, type, afterCorrect, afterError, answers }) {
  let quest = new Question({
    text,
    type, 
    afterCorrect,
    afterError,
    answers,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });

  console.log(quest);

  return thunkify(quest.save);
}

function getQuestion(id) {
  return Question.findOne({ _id: id }).exec();
}

function delQuestion(id) {
  return Question.findOneAndRemove({ _id: id }).exec();
}

async function updateQuestion(param) {
  await Question.findOneAndUpdate(
    {
      
    },
    {
    }
  )
}

export {
  getQuestions,
  addQuestion
};