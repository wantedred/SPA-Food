import { NotificationType } from './notification-type';

export interface Notification {
    notificationType: NotificationType;
    message: string;
}