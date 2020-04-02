import { BasicHttpResponse } from './basic-http-response';

export interface AuthHttpResponse extends BasicHttpResponse {
    token: string;
    refreshToken: string;
}