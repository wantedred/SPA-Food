import { BasicHttpResponse } from './basic-http-response';

export interface NotificationsResponse extends BasicHttpResponse {
    notifications: Notification[];
    message: string;
}