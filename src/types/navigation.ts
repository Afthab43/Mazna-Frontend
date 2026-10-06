export interface SidebarNavItemConfig {
  id: string;
  title: string;
  href: string;
  icon: string;
  permissionKey?: string; // e.g. "inventory.adjust"
  badgeKey?: string;       // e.g. "lowStockCount", "pendingPoCount"
  hiddenRoles?: string[];  // e.g. ["EMPLOYEE"]
  isCustomized?: boolean;
}

export interface SidebarGroupConfig {
  id: string;
  title: string;          // e.g. "MAIN", "CATALOG", "INVENTORY", "PURCHASES"
  defaultOpen: boolean;
  hiddenRoles?: string[];
  items: SidebarNavItemConfig[];
}

export interface UserNavigationPreference {
  roleId?: string;
  userId?: string;
  groupOrder: string[];
  groupItemMap: Record<string, string[]>;
  hiddenItemIds: string[];
  hiddenGroupIds: string[];
}
