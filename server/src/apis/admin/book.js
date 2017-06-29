import { successDec, failedDec } from '../../utils/api';
import {
  getBook,
  getBooks,
  addBook,
  delBook,
  updateBook,
  getBookPagination
} from '../../services/book';

import { validator } from '../../utils/common';

async function listBooks({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1)
  );

  let data = await getBooks(query);

  let pagination = await getBookPagination(query);

  return successDec({
    data,
    pagination
  });
}

async function createBook({ request, checkBody }) {
  validator(
    checkBody('title').notEmpty()
  )

  let book = request.body;

  let result = await addBook(book);

  return successDec(result);
}

async function removeBook({ query, checkQuery }) {
  validator(
    checkQuery('_id').notEmpty()
  );

  let { _id } = query;
  
  let result = await delBook(_id);
  
  return successDec(result);
}

async function modifyBook({ request, query, checkBody, checkQuery}) {
  validator(
    checkBody('_id').notEmpty(),
    checkBody('title').optional()
  );

  let { _id } = request.body

  let result = await updateBook(_id, request.body)

  return successDec(result);
}

export {
  listBooks,
  createBook,
  removeBook,
  modifyBook
};