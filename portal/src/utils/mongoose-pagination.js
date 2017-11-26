import mongoose from 'mongoose';

mongoose.Query.prototype.paginate = function (pageNo, pageSize, cb) {
  pageNo = parseInt(pageNo, 10) || 1;
  pageSize = parseInt(pageSize, 10) || 10;

  let query = this;
  const model = this.model;
  const skipFrom = pageNo * pageSize - pageSize;

  query = query.skip(skipFrom).limit(pageSize);

  return this;
}