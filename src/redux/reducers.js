import authReducer from "../modules/auth-module";
import orderReducer from "../modules/order-module";
import commonReducer from "../modules/common-module";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  common: commonReducer,
});

export default rootReducer;
