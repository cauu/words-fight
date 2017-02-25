import mongoose, { Types } from 'mongoose';

import Question from '../models/question';

/**@arg {number} pageNo 页码数*/
/**@arg {number} pageSize 页数*/
function getQuestions({ pageNo, pageSize }) {
  if(pageNo <= 0) {
    pageNo = 1;
  }
  
  return Question
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function getQuestion(id) {
  return Question.findOne({ _id: id }).exec();
}

function delQuestion(id) {
  return Question.findOneAndRemove({ _id: id }).exec();
}

function addQuestion(question) {
}

async function updateQuestion(param) {
  await Question.findOneAndUpdate(
    {
      
    },
    {
    }
  )
}
