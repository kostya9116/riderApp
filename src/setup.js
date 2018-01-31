import { AsyncStorage, Platform } from 'react-native';
import Storage from 'react-native-storage';
import { StorageService, BaseRESTService } from './services';

const setupStorage = () => {
  const storage = new Storage({

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 50 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
  });

  StorageService.defaultStorage = storage;
}

const setupServices = () => {
  BaseRESTService.baseApiUrl = 'http://epic.nurindustries.com/v1';
  BaseRESTService.defaultParser = (response) => response.json().then((res) => {
    response.data = res;
    return response;
  }).then(res => {
    if (res.status > 400) {
      const err = new Error('Server error');
      err.response = res;
      throw err;
    }
    return res;
  });
};


const setupProject = () => {
  setupServices();
  setupStorage();
};

export default setupProject();