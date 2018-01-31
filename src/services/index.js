import AuthService from './AuthService';
import RiderService from './RiderService';
import OrderService from './OrderService';
import StorageService from './StorageService';
import BaseRESTService from './BaseRESTService';

import * as axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const serviceMap = {
};

export const createService = (name) => {
  if (name in serviceMap) {
    return new serviceMap[name]();
  }

  throw new Error(`Service with name "${name}" not exist`);
};


export {
  BaseRESTService,
  AuthService,
  RiderService,
  StorageService,
  OrderService,
};
