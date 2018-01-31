import { createAction, createReducer } from "redux-action";

export const TOGGLE_LOADER_ACTION = "TOGGLE_LOADER_ACTION";

const initialState = {};

const toggleLoaderAction = createAction(TOGGLE_LOADER_ACTION, (key, value) => {
  return { key, value };
});

export const commonActions = {
  toggleLoaderAction,
};

const loaderReducer = createReducer(initialState, ({
  [TOGGLE_LOADER_ACTION]: (actionPayload, state) => {
    let loader = state ? state : {};
    const { key, value } = actionPayload;
    if ( !key ) {
      loader.isLoading = value;
    } else {
      !!loader[ key ] && (loader[ key ] = {});
      loader[ key ].isLoading = value;
    }
    return { ...state, loader };
  },
}));

export default loaderReducer;
