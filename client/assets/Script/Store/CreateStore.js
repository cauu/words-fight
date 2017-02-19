var Redux = require('../Libs/Redux.js');
var thunk = require('../Libs/Redux-thunk.js');

var rootReducer = require('../Reducer/index.js');

var createStoreWithMiddleware = Redux.applyMiddleware(
  thunk
)(Redux.createStore)

module.exports = function (initialState) {
  var store = createStoreWithMiddleware(rootReducer, initialState)
  // var store = Redux.createStore(rootReducer, initialState)

  return store
}

