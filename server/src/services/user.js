import User from '../models/user';

function addUser(user) {
  return User.create(user);
}

function updateUser({ _id, ...user }) {
  return User.findOneAndUpdate({ _id }, { $set: user }, { new: true, upsert: false });
}

function delUser(_id) {
  return User.findOneAndRemove({ _id }).exec();
}

function getUsers({ pageNo, pageSize, ...query }) {
  return User
    .find(query)
    .paginate(pageNo, pageSize)
    .sort({ createdAt: -1 })
    .exec()
  ;
}

function getUserById(_id) {
  return User.findOne({ _id });
}

function getUserByNameAndPwd(username, password) {
  return User.findOne({ username, password }).exec();
}

export {
  addUser,
  getUsers,
  getUserById,
  getUserByNameAndPwd
}