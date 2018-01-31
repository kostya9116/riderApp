import axios from 'axios';
import qs from 'qs';

export default class BaseRESTService {

  static baseApiUrl;
  static token;
  static defaultParser;

  constructor(type) {
    this.type = type;
  }

  run(url, options = {}) {
    options = {
      withCredentials: true,
      headers: {},
      ...options
    };

    let requestUrl = `${this.getServiceURL(options.customType)}/${url}`;
    options.customType && delete options.customType;

    let data = (options && options.data) ? options.data : {};

    if ( options.withCredentials ) {
      options.headers = {
        ...options.headers, ...this.getCredentialsHeader()
      }
    }

    if ( options.method === 'GET' || options.method === 'DELETE' ) {
      requestUrl = this.urlWithParams(requestUrl, data);
    } else if ( options.method === 'PUT' || options.method === 'POST' || options.method === 'PATCH' ) {
      options.body = this.formWithParams(data);
      options.headers = { ... { 'Accept': 'application/json' }, ...options.headers };
    }

    delete options.withCredentials;

    return fetch(requestUrl, options).then(response => BaseRESTService.defaultParser ? BaseRESTService.defaultParser(response) : response).catch(err => {
      throw err;
    });
  }

  formWithParams(params, fData, namespace = '') {
    const formData = fData || new FormData();

    for ( const key in params ) {
      if ( params.hasOwnProperty(key) ) {
        const value = params[ key ];
        const fullNS = namespace ? `${namespace}[${key}]` : key;
        if ( typeof value === 'object' && !(value instanceof File) ) {
          this.formWithParams(value, formData, key)
        } else {
          formData.append(fullNS, params[ key ]);
        }
      }
    }
    return formData;
  }

  urlWithParams(urlString, params = {}) {
    let paramsStr = '';
    Object.keys(params).forEach((key) => {
      let state = '';
      if ( Array.isArray(params[ key ]) ) {
        state = params[ key ].map(item => {
          return `${key}[]=${item}&`;
        });
        state = state.join('');
        paramsStr += state;
      } else {
        paramsStr += `${encodeURIComponent(key)}=${encodeURIComponent(params[ key ])}&`;
      }
    });
    paramsStr = paramsStr ? paramsStr.substring(0, paramsStr.length - 1) : '';
    const splitter = urlString.lastIndexOf('?') === -1 ? '?' : '&';
    const url = urlString + splitter + paramsStr;
    return url.slice(0, -1);
  }

  getCredentialsHeader() {
    const token = (!!`${BaseRESTService.token}` && `${BaseRESTService.token}` !== 'undefined') ? `${BaseRESTService.token}` : '';
    const email = (!!`${BaseRESTService.email}` && `${BaseRESTService.email}` !== 'undefined') ? `${BaseRESTService.email}` : '';
    return {
      "X-Rider-Token": token,
      "X-Rider-Email": email,
    };
  }

  getServiceURL(customType) {
    const type = customType ? customType : this.type;
    return `${BaseRESTService.baseApiUrl}/${type}`;
  }


}
