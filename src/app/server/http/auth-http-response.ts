import { BasicHttpResponse } from './basic-http-response';

export interface AuthHttpResponse extends BasicHttpResponse {
    success: boolean;
    message: string;
    token: string;
    refreshToken: string;
}