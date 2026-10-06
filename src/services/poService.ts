import { apiClient } from '../lib/api-client';

export class POService {
  public static async getPurchaseOrders(params?: any) {
    const response = await apiClient.get('/purchase-orders', { params });
    return response.data;
  }

  public static async getPurchaseOrderById(id: string) {
    const response = await apiClient.get(`/purchase-orders/${id}`);
    return response.data;
  }

  public static async createPurchaseOrder(data: any) {
    const response = await apiClient.post('/purchase-orders', data);
    return response.data;
  }

  public static async approvePurchaseOrder(id: string) {
    const response = await apiClient.post(`/purchase-orders/${id}/approve`);
    return response.data;
  }

  public static async cancelPurchaseOrder(id: string) {
    const response = await apiClient.post(`/purchase-orders/${id}/cancel`);
    return response.data;
  }
}
