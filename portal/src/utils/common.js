import SHA256 from 'crypto-js/sha256';

function validator(...validateFunc) {
  for(let i = 0; i < validateFunc.length; i++) {
    if(validateFunc[i].hasError()) {
      throw new Error('Incorrect type of Parameter');
    }
  }
}

function Sha256(string) {
  return SHA256(string).toString();
}

export {
  validator,
  Sha256
};