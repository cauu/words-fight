import mongoose, { Types } from 'mongoose';
import thunkify from 'thunkify';

import { getPagination } from '../services/global';

import Question from '../models/question';

function getAllQuestions(query) {
  return Question
    .find(query)
    .exec()
  ;
}

/**@arg {number} pageNo 页码数*/
/**@arg {number} pageSize 页数*/
function getQuestions({ pageNo, pageSize, ...query }) {
  return Question
    .find(query)
    .paginate(pageNo, pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

async function getQuestionPagination(query) {
  return await getPagination(Question, query);
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
  getAllQuestions,
  getQuestions,
  addQuestion,
  delQuestion,
  updateQuestion,
  getQuestionPagination
};