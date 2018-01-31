const customRedaxMiddleware = store => next => action => {
  const payload = action.payload;
  if (typeof payload === 'function' && payload.custom) {
    const res = payload.call({
      dispatch: store.dispatch,
      getState: store.getState.bind(store),
    })
    if (res && res.then && res.catch) {
      res.then(res => {
        const newAction = {
          ... action,
          payload: res
        }
        return next(newAction)
      }).catch((err) => {
        return next(err);
      });
      return res;
    }
    action.payload = res;
  }

  return next(action);
};

export default customRedaxMiddleware;