import { createAction, createReducer } from "redux-action";
import { Actions } from 'react-native-router-flux';
import { commonActions } from "./common-module";
import { BaseRESTService, OrderService } from "../services";
import createCustomAction from "../utils/customActionCreater";

export const GET_UPCOMING_DELIVERIES = "GET_UPCOMING_DELIVERIES";
export const GET_ORDER_HISTORY = "GET_ORDER_HISTORY";
export const SELECT_ORDER = "SELECT_ORDER";
export const MAKE_ORDER_PICKED_UP = "MAKE_ORDER_PICKED_UP";
export const CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS";

const initialState = {};


//////////////////////////////////////////////
// ACTIONS

const getUpcomingDeliveriesAction = createCustomAction(GET_UPCOMING_DELIVERIES, function (riderId) {
  const service = new OrderService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  return service.upcomingDeliveries(riderId)
    .then(response => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        data: response.data.data.upcoming_deliveries
      };
    })
    .catch(err => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        err: err.response.data,
      };
    })
});

const getOrderHistoryAction = createCustomAction(GET_ORDER_HISTORY, function (riderId) {
  const service = new OrderService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  return service.pastDeliveries(riderId)
    .then(response => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        data: response.data.data.past_deliveries
      };
    })
    .catch(err => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        err: err.response.data,
      };
    })
});

const pickUpOrderAction = createCustomAction(CHANGE_ORDER_STATUS, function (data) {
  const service = new OrderService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  return service.pickUpOrder(data)
    .then(response => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        data: response.data.data.delivery
      };
    })
    .catch(err => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        err: err.response.data,
      };
    })
});

const deliverOrderAction = createCustomAction(CHANGE_ORDER_STATUS, function (data) {
  const service = new OrderService();
  this.dispatch(commonActions.toggleLoaderAction('', true));
  return service.deliverOrder(data)
    .then(response => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        data: response.data.data.delivery
      };
    })
    .catch(err => {
      this.dispatch(commonActions.toggleLoaderAction('', false));
      return {
        err: err.response.data,
      };
    })
});

const selectOrderAction = createCustomAction(SELECT_ORDER, function (data) {
  setTimeout(() => Actions.orderDetails({ type: 'replace' }), 0);
  return { ...data };
});


export const actions = {
  getUpcomingDeliveriesAction,
  getOrderHistoryAction,
  selectOrderAction,
  pickUpOrderAction,
  deliverOrderAction
};


const orderReducer = createReducer(initialState, ({
  [GET_UPCOMING_DELIVERIES]: (actionPayload, state) => {
    if ( !!actionPayload.err ) {
      return {
        ...state,
        upcomingDeliveries: {},
        errorMessage: actionPayload.err.message
      };
    }
    console.log('UPCOMING', actionPayload.data)
    return {
      ...state,
      upcomingDeliveries: actionPayload.data,
      errorMessage: ''
    };
  },

  [GET_ORDER_HISTORY]: (actionPayload, state) => {
    if ( !!actionPayload.err ) {
      return {
        ...state,
        pastDeliveries: {},
        errorMessage: actionPayload.err.message
      };
    }
    console.log('PAST', actionPayload.data)
    return {
      ...state,
      pastDeliveries: actionPayload.data,
      errorMessage: ''
    };
  },

  [SELECT_ORDER]: (actionPayload, state) => {
    return {
      ...state,
      selectedOrder: actionPayload,
    };
  },

  [CHANGE_ORDER_STATUS]: (actionPayload, state) => {
    if ( !!actionPayload.err ) {
      return {
        ...state,
        selectedOrder: {},
      };
    }
    return {
      ...state,
      selectedOrder: actionPayload.data,
    };
  },
}));

export default orderReducer;
