import BaseRESTService from './BaseRESTService';

export default class AuthService extends BaseRESTService {

  constructor() {
    super('riders');
  }

  login(data) {
    return this.run(`sign_in`, {
      data: data,
      withCredentials: false,
      method: 'POST'
    });
  }

  logout() {
    return this.run(`sign_out`, {
      method: 'GET'
    });
  }

}