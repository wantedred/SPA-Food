import { BasicHttpResponse } from './basic-http-response';

export interface AuthHttpResponse extends BasicHttpResponse {
    success: boolean,
    message: string,
    id: string,
    token: string,
    expiresAt: number
}