import { AsyncStorage, Platform } from 'react-native';

export default class StorageService {
  static defaultStorage = null;

  constructor(storage = null) {
    if (!storage) {
      if (!StorageService.defaultStorage) {
        throw new Error("Please supply storage or set defaultStorage");
      }
      storage = StorageService.defaultStorage;
    }
    this.storage = storage;
  }

  saveRiderInfo(data) {
    this.storage.save({
      key: 'riderInfo',
      data,
      expires: null
    });
  }

  removeRiderInfo() {
    this.storage.remove({
      key: 'riderInfo'
    });
  }

  checkRiderInfo() {
    return this.storage.load({
      key: 'riderInfo',
    }).then(data => {
      return data;
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          return false;
        case 'ExpiredError':
          return false;
      }
    });
  }

}