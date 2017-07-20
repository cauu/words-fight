import mongoose, { Types } from 'mongoose';

import { getPagination } from '../services/global';

import Scene from '../models/scene';

function getScenes({ pageNo, pageSize, ...query }) {
  return Scene
    .find(query)
    .paginate(pageNo, pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function getSceneById(id) {
  return Scene.findOne({ _id: id });
}

async function getScenePagination(query) {
  return await getPagination(Scene, query);
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
  getScenePagination,
  addScene,
  delScene,
  updateScene,
  getSceneById
};