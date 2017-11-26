function successDec(result) {
  return {
    status: 'SUCCESS',
    result
  }
}

function failedDec(errMsg) {
  return {
    status: 'FAILED',
    result: errMsg
  }
}

export {
  successDec,
  failedDec
};