import { BasicHttpResponse } from './basic-http-response';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';

export interface NourishmentsResponse extends BasicHttpResponse {
    nourishments: Nourishment[];
}