import { NotificationType } from './notification-type';

export interface SiteNotification {
    notificationType: NotificationType;
    message: string;
}