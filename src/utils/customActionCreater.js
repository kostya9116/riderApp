import {createAction} from "redux-action";

const createCustomAction = (action, actionBuilder) => {
  const customDispatch = (args) => {
    function fun () {
      return actionBuilder.apply(this, args);
    }
    fun.custom = true;
    return fun;
  };
  return createAction(action, (...args) => customDispatch(args));
};

export default createCustomAction;