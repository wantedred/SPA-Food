import { BasicHttpResponse } from './basic-http-response';
import { InventoryItem } from 'src/app/users/inventory/inventory-item';

export interface InventoryResponse extends BasicHttpResponse {
    inventoryItems: InventoryItem[];
}