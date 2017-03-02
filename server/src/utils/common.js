function validator(...validateFunc) {
  if(validateFunc.includes(true)) {
    throw new Error('Parameter Error');
  }
}

export {
  validator
};