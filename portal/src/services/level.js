import mongoose, { Types } from 'mongoose';

import { getPagination } from '../services/global';

import Level from '../models/level';

async function getLevelPagination(query) {
  return await getPagination(Level, query);
}

function getLevels({ pageNo, pageSize, ...query }) {
  return Level
    .find(query)
    .paginate(pageNo, pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function getLevelById(id) {
  return Level.findOne({ _id: id });
}

function addLevel(level) {
  return Level
    .create(level)
  ;
}

function getLevel(id) {
  return Level.findOne({ _id: id }).exec();
}

function delLevel(id) {
  return Level.findOneAndRemove({ _id: id }).exec();
}

function updateLevel(id, level) {
  return Level
    .findOneAndUpdate({ _id: id }, { $set: level }, { new: true, upsert: false })
  ;
}

export {
  getLevels,
  addLevel,
  getLevel,
  delLevel,
  updateLevel,
  getLevelPagination,
  getLevelById
};
