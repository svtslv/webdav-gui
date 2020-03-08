import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  getLocalStorage(key: string) {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(key));
    }
  }

  setLocalStorage(key: string, data: any) {
    if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, JSON.stringify(data));
    }
  }
}
