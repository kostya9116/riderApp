import { createAction, createReducer } from "redux-action";
import { Actions } from 'react-native-router-flux';
import { commonActions } from "./common-module";
import { RiderService, StorageService, BaseRESTService, AuthService } from "../services";
import createCustomAction from "../utils/customActionCreater";

export const SIGN_IN_USER_ACTION = "SIGN_IN_USER_ACTION";
export const SIGN_OUT_USER_ACTION = "SIGN_OUT_USER_ACTION";
export const TRIAL_SIGN_IN_ACTION = "TRIAL_SIGN_IN_ACTION";
export const RESET_PASSWORD_ACTION = "RESET_PASSWORD_ACTION";

const initialState = {};


//////////////////////////////////////////////
// ACTIONS

const signInUserAction = createCustomAction(SIGN_IN_USER_ACTION, function (userData) {
  const service = new AuthService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  return attachLoginHandler.bind(this)(
    service.login(userData)
  );
});

const signOutUserAction = createCustomAction(SIGN_OUT_USER_ACTION, function () {
  const storageService = new StorageService();
  const authService = new AuthService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  return authService.logout()
    .then(result => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      setTimeout(() => Actions.signIn({ type: 'reset' }), 0);
      storageService.removeRiderInfo();
      return { isLoggedIn: false };
    }).catch(err => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        err: err.response.data,
      };
    });
});

const trialSignInAction = createCustomAction(TRIAL_SIGN_IN_ACTION, function () {
  const storageService = new StorageService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  const me = this;
  return storageService.checkRiderInfo()
    .then(result => {
      const rider = result.rider ? result.rider : result;
      this.dispatch(commonActions.toggleLoaderAction('', false));
      if ( !rider || !rider.authentication_token ) {
        Actions.signIn({ type: 'reset' });
        return { isLoggedIn: false };
      }
      BaseRESTService.token = rider.authentication_token;
      BaseRESTService.email = rider.email;
      const riderService = new RiderService();
      return riderService.getCurrentRiderInfo().then(res => {
        const { rider } = res.data.data;
        return successLoginHandler.call(me, rider)
      });
    }).catch(err => {
      Actions.signIn({ type: 'reset' });
      return { isLoggedIn: false };
    });
});

async function successLoginHandler(rider) {
  BaseRESTService.token = rider.authentication_token;
  BaseRESTService.email = rider.email;
  this.dispatch(commonActions.toggleLoaderAction('', false));
  const storageService = new StorageService();
  await storageService.saveRiderInfo(rider);
  this.dispatch(commonActions.toggleLoaderAction('', false));
  setTimeout(() => Actions.upcomingDeliveries({ type: 'reset' }), 0);
  return {
    data: rider,
    message: '',
    isLoggedIn: true
  };
}

function faultLoginHandler(err) {
  this.dispatch(commonActions.toggleLoaderAction('', false));
  return {
    err: err.response ? err.response.data : err.name,
    isLoggedIn: false
  };
}

function attachLoginHandler(promise) {
  const me = this;
  return promise.then(result => {
    const { rider } = result.data.data;
    return successLoginHandler.call(me, rider);
  }).catch(err => {
    return faultLoginHandler.call(this, err);
  })
}

export const actions = {
  signInUserAction,
  signOutUserAction,
  trialSignInAction,
};


const authReducer = createReducer(initialState, ({
  [SIGN_IN_USER_ACTION]: (actionPayload, state) => {
    if ( !!actionPayload.err ) {
      return {
        ...state,
        isLoggedIn: false,
        signInMessage: actionPayload.err.message,
      };
    }
    return {
      ...state,
      user: actionPayload.data,
      isLoggedIn: actionPayload.isLoggedIn,
      signInMessage: actionPayload.message,
    };
  },

  [SIGN_OUT_USER_ACTION]: (actionPayload, state) => {
    return { ...state, isLoggedIn: false, user: {} };
  },

  [TRIAL_SIGN_IN_ACTION]: (actionPayload, state) => {
    const data = actionPayload.data || {};
    return { ...state, isLoggedIn: actionPayload.isLoggedIn, user: data };
  },
}));

export default authReducer;
