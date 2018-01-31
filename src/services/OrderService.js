import BaseRESTService from './BaseRESTService';

export default class OrderService extends BaseRESTService {

  constructor() {
    super('riders');
  }

  upcomingDeliveries(riderId) {
    return this.run(`${riderId}/upcoming_deliveries`, {
      method: 'GET'
    });
  }

  pastDeliveries(riderId) {
    return this.run(`${riderId}/past_deliveries`, {
      method: 'GET'
    });
  }

  pickUpOrder(data) {
    return this.run(`pick_up`, {
      data: data,
      method: 'PATCH',
      customType: 'deliveries'
    });
  }

  deliverOrder(data) {
    return this.run(`deliver`, {
      data: data,
      method: 'PATCH',
      customType: 'deliveries'
    });
  }

}