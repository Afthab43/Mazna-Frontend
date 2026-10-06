import { apiClient } from '../lib/api-client';

export class InventoryService {
  public static async getInventoryOverview(params?: any) {
    const response = await apiClient.get('/inventory/overview', { params });
    return response.data;
  }

  public static async adjustStock(data: { productId: string; warehouseId: string; quantity: number; reason: string }) {
    const response = await apiClient.post('/inventory/adjust', data);
    return response.data;
  }

  public static async transferStock(data: { productId: string; sourceWarehouseId: string; targetWarehouseId: string; quantity: number }) {
    const response = await apiClient.post('/inventory/transfer', data);
    return response.data;
  }

  public static async getStockMovements(params?: any) {
    const response = await apiClient.get('/inventory/movements', { params });
    return response.data;
  }
}
