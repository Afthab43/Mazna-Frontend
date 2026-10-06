import { apiClient } from '@/lib/api-client';
import { SidebarGroupConfig } from '@/types/navigation';

export interface NavigationResponse {
  groups: SidebarGroupConfig[];
  allowNonAdminCustomization: boolean;
}

export class NavigationService {
  public static async getNavigationConfig(): Promise<NavigationResponse> {
    const res = await apiClient.get('/system/navigation');
    if (!res.data || !res.data.success) {
      throw new Error(res.data?.message || 'Failed to fetch sidebar navigation config');
    }
    return res.data.data;
  }

  public static async saveNavigationConfig(
    groups: SidebarGroupConfig[],
    allowNonAdminCustomization: boolean = false
  ): Promise<NavigationResponse> {
    const res = await apiClient.put('/system/navigation', { groups, allowNonAdminCustomization });
    if (!res.data || !res.data.success) {
      throw new Error(res.data?.message || 'Failed to save sidebar navigation config');
    }
    return res.data.data;
  }

  public static async resetNavigationConfig(): Promise<NavigationResponse> {
    const res = await apiClient.post('/system/navigation/reset');
    if (!res.data || !res.data.success) {
      throw new Error(res.data?.message || 'Failed to reset sidebar navigation config');
    }
    return res.data.data;
  }
}
