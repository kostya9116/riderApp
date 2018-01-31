import { createStore, applyMiddleware } from "redux";
import customReduxMiddleware from "../mmiddleware/redux-custom";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers";

const initialState = {};

let middlewares = [ thunkMiddleware, customReduxMiddleware ];

if ( process.env.NODE_ENV === `development` ) {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}


const createStoreWithMiddleware = applyMiddleware(
  ...middlewares
)(createStore);


const store = createStoreWithMiddleware(rootReducer, initialState);
export default store;





