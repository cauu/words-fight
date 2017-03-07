import mongoose, { Types } from 'mongoose';

import Scene from '../models/scene';

function getScenes({ pageNo, pageSize }) {
  return Scene
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function addScene(scene) {
  return Scene
    .create(scene)
  ;
}

function getScene(id) {
  return Scene.findOne({ _id: id }).exec();
}

function delScene(id) {
  return Scene.findOneAndRemove({ _id: id }).exec();
}

function updateScene(id, scene) {
  return Scene
    .findOneAndUpdate({ _id: id }, { $set: scene }, { new: true, upsert: false})
  ;
}

export {
  getScenes,
  getScene,
  addScene,
  delScene,
  updateScene
};