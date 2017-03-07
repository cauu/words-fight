import { successDec, failedDec } from '../../utils/api';
import {
  getBook,
  getBooks,
  addBook,
  delBook,
  updateBook
} from '../../services/book';
import { validator } from '../../utils/common';

async function listBooks({ query, checkQuery }) {
  validator(
    checkQuery('pageNo').ge(1),
    checkQuery('pageSize').ge(1)
  );

  let books = await getBooks(query);

  return successDec(books);
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
    checkQuery('id').notEmpty()
  );

  let { id } = query;
  
  let result = await delBook(id);
  
  return successDec(result);
}

async function modifyBook({ request, query, checkBody, checkQuery}) {
  validator(
    checkQuery('id').notEmpty(),
    checkBody('title').optional()
  );

  let result = await updateBook(id, request.body);

  return successDec(result);
}

export {
  listBooks,
  createBook,
  removeBook,
  modifyBook
};