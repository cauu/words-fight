function validator(...validateFunc) {
  for(let i = 0; i < validateFunc.length; i++) {
    if(validateFunc[i].hasError()) {
      throw new Error('Incorrect type of Parameter');
    }
  }
}

async function paginate(Model, query, { pageSize, pageNo }) {
  const total = await Model
    .count(query)
    // .skip((pageNo - 1) * pageSize)
    // .limit(pageSize * 1)
    .exec()
  ;

  console.log(total);

  return {
    totalPages: Math.ceil(total/pageSize)
  };
}

export {
  validator,
  paginate
};