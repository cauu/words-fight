function validator(...validateFunc) {
  return validateFunc.includes(true);
}

export {
  validator
};