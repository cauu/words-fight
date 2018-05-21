import mongoose, { Types } from 'mongoose';

import Tag from '../models/tag';

function getTags(query) {
  return Tag
    .find(query)
    .exec()
  ;
}

function addTag(tag) {
  return Tag
    .create(tag)
  ;
}

function delTag(id) {
  return Tag.findOneAndRemove({ _id: id }).exec();
}

function updateTag(id, tag) {
  return Tag
    .findOneAndUpdate({ _id: id }, { $set: tag }, { new: true, upsert: false})
  ;
}

export {
  getTags,
  addTag,
  delTag,
  updateTag
};