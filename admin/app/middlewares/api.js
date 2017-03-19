import { remote } from '../utils/fetch';

function createActionPromise(actionCreator, next, getState, dispatch) {
  return (prevBody) => {
    const action = actionCreator(prevBody);

    const { url, method, query, data, successType, errorType, afterSuccess, afterError, payload } = action;

    if(!action.blockLoading) {
      dispatch({
        type: ACTIONS.SHOW_BLOCK_LOADING
      });
    }

    return new Promise((resolve, reject) => {
      remote({
        url: url,
        method: method,
        data: data,
        query: query
      })
        .then((result) => {
          if(!action.blockLoading) {
            dispatch({
              type: ACTIONS.HIDE_BLOCK_LOADING
            });
          }

          if(!successType) {
            throw new Error('No successType defined!');
          }

          dispatch({
            type: successType,
            payload: Object.assign({}, result, payload)
          })

          if(_.isFunction(afterSuccess)) {
            afterSuccess({ getState });
          }

          resolve(result);
        })
        .catch((e) => {
          if(!!errorType) {
            dispatch({
              type: errorType,
              error: e
            });
          }

          if(_.isFunction(afterError)) {
            afterError({ getState });
          }

          reject(new Error());
        });
    });
  };
}

function createActionPromiseChain(chainCreator, next, getState, dispatch) {
  const chain = chainCreator.map((creator) => {
    return createActionPromise(creator, next, getState, dispatch);
  });

  return chain;
}

/*
 * params:
 *  action: {
 *    url,
 *    method,
 *    successType,
 *    errorType,
 *    blockLoading,
 *    query,
 *    data,
 *    afterSuccess,
 *    afterError,
 *    payload
 *  }
 *
 */
const apiMiddleware = ({dispatch, getState}) => (next) => (action) => {
  if(action[CALL_API]) {
    return dispatch({
      [CHAIN_API]: [
        () => {
          return action[CALL_API];
        }
      ]
    });
  }

  if(!action[CHAIN_API]) {
    return next(action);
  }

  const actionPromises = createActionPromiseChain(action[CHAIN_API], next, getState, dispatch);

  return new Promise((resolve, reject) => {
    let overall = actionPromises.reduce((promise, nextPromise) => {
      return promise.then((prevBody) => {
        return nextPromise(prevBody);
      });
    }, new Promise((initResolve) => initResolve()));

    overall.finally(() => {
      resolve();
    }).catch(() => { reject(); });
  });
};

export default apiMiddleware;