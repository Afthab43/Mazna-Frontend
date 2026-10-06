import { apiClient } from '../lib/api-client';

export class ProductService {
  public static async getProducts(params?: any) {
    const response = await apiClient.get('/products', { params });
    return response.data;
  }

  public static async getProductById(id: string) {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  }

  public static async createProduct(data: any) {
    const response = await apiClient.post('/products', data);
    return response.data;
  }

  public static async updateProduct(id: string, data: any) {
    const response = await apiClient.patch(`/products/${id}`, data);
    return response.data;
  }

  public static async archiveProduct(id: string) {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  }
}
