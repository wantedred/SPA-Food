import { Injectable } from '@angular/core';
import { NotificationType } from './notification-type';
import { SiteNotification } from './site-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public notifs: SiteNotification[] = [];

  constructor() { }


  public hasNotifications(): boolean {
    return this.notifs.length > 0;
  }

  public addNotificiation(notif: SiteNotification): void {
    this.notifs.push(notif);
  }

  public removeNotification(notif: SiteNotification): void {
    this.notifs[this.notifs.indexOf(notif)] = null;
  }

  public getSortedNotifications(): SiteNotification[] {
    let sorted: SiteNotification[] = [];

    this.notifs.forEach(n => {
      if (n.notificationType == NotificationType.Error) {
        sorted.push(n)
      }
    });
    this.notifs.forEach(n => {
      if (n.notificationType == NotificationType.Announcement) {
        sorted.push(n)
      }
    });
    this.notifs.forEach(n => {
      if (n.notificationType == NotificationType.Warning) {
        sorted.push(n)
      }
    });
    this.notifs.forEach(n => {
      if (n.notificationType == NotificationType.Information) {
        sorted.push(n)
      }
    });
    this.notifs.forEach(n => {
      if (n.notificationType == NotificationType.Advertisment) {
        sorted.push(n)
      }
    });
    return sorted;
  }

}
