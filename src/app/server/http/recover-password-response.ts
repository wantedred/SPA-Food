import { BasicHttpResponse } from './basic-http-response';

export interface RecoverPasswordResponse extends BasicHttpResponse {
    username: string;
    resetToken: string;
    expiresIn: number;
}