import mongoose, { Types } from 'mongoose';

import Level from '../models/level';

function getLevels({ pageNo, pageSize }) {
  return Level
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
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
  updateLevel
};
