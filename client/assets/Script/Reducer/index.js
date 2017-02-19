var Redux = require('../Libs/Redux.js');

var initialState = {
  test: 'hehe'
}

function testReducer(state, action) {
  if(typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case 'test': 
      console.log('test success')
      return { test: 'success' }
    default: 
      return {}
  }
}

var root = Redux.combineReducers({
  test: testReducer
});

module.exports = root;
