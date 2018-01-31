import BaseRESTService from './BaseRESTService';

export default class RiderService extends BaseRESTService {

  constructor() {
    super('riders');
  }

  getCurrentRiderInfo() {
    return this.run(`profile`, {
      method: 'GET'
    });
  }

}