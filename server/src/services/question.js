import mongoose, { Types } from 'mongoose';
import thunkify from 'thunkify';

import Question from '../models/question';

/**@arg {number} pageNo 页码数*/
/**@arg {number} pageSize 页数*/
function getQuestions({ pageNo, pageSize, sid, title }) {
  return Question
    .find({
      sid
    })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function addQuestion(quest) {
  return Question
    .create(quest)
  ;
}

function getQuestion(id) {
  return Question.findOne({ _id: id }).exec();
}

function delQuestion(id) {
  return Question.findOneAndRemove({ _id: id }).exec();
}

function updateQuestion(id, quest) {
  return Question
    .findOneAndUpdate({ _id: id }, { $set: quest }, { new: true, upsert: false })
  ;
}

export {
  getQuestions,
  addQuestion,
  delQuestion,
  updateQuestion
};