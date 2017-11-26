import mongoose, { Types } from 'mongoose';

async function getPagination(Model, { pageNo, pageSize, ...query }) {
  let total, nextPageNo;

  pageNo = parseInt(pageNo, 10) || 1;
  pageSize = parseInt(pageSize, 10) || 1;
  total = await Model.count(query).exec();
  nextPageNo = pageNo + 1;

  if(pageNo * pageSize > total) {
    nextPageNo = pageNo;
  }

  return {
    total,
    totalPages: Math.ceil(total / pageSize),
    pageNo,
    nextPageNo,
    pageSize,
  }
}

export {
  getPagination
};