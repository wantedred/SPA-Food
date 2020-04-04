import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {


  constructor() { }

  public cache(key: string, data: any, expirationMins: number = 0): void {
    const expirationMS = expirationMins !== 0 ? expirationMins * 60 * 1000 : 0;

    const record = {
      value: typeof data === 'string' ? data : JSON.stringify(data),
      expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
      hasExpiration: expirationMS !== 0 ? true : false
    } 
    localStorage.setItem(key, JSON.stringify(record));
  }

  public getCachedValue(key: string): any {
    // Get cached data from localstorage
    const item = localStorage.getItem(key);

    if (item == null) {
      return null;
    }
    const record = JSON.parse(item);
    const now = new Date().getTime();

    if (!record || (record.hasExpiration && record.expiration <= now)) {
      return null;
    }
    return JSON.parse(record.value);
  }

  public uncache(key: string): void {
    localStorage.removeItem(key);
  }

}
