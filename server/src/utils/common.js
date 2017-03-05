function validator(...validateFunc) {
  for(let i = 0; i < validateFunc.length; i++) {
    if(validateFunc[i].hasError()) {
      throw new Error('Incorrect type of Parameter');
    }
  }
}

export {
  validator
};