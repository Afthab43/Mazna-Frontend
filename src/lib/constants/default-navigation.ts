import { SidebarGroupConfig } from '@/types/navigation';

export const FACTORY_DEFAULT_SIDEBAR: SidebarGroupConfig[] = [
  {
    id: 'group_main',
    title: 'MAIN',
    defaultOpen: true,
    items: [
      { id: 'item_dashboard', title: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' }
    ]
  },
  {
    id: 'group_catalog',
    title: 'CATALOG',
    defaultOpen: true,
    items: [
      { id: 'item_products', title: 'Products', href: '/admin/catalog/products', icon: 'Package', permissionKey: 'products.view' },
      { id: 'item_categories', title: 'Categories', href: '/admin/catalog/categories', icon: 'Grid', permissionKey: 'categories.manage' },
      { id: 'item_brands', title: 'Brands', href: '/admin/catalog/brands', icon: 'Bookmark', permissionKey: 'brands.manage' }
    ]
  },
  {
    id: 'group_inventory',
    title: 'INVENTORY',
    defaultOpen: true,
    items: [
      { id: 'item_inventory', title: 'Inventory', href: '/admin/inventory/overview', icon: 'Boxes', permissionKey: 'inventory.view' },
      { id: 'item_movements', title: 'Stock Movements', href: '/admin/inventory/movements', icon: 'Activity', permissionKey: 'stock_movements.view' },
      { id: 'item_low_stocks', title: 'Low Stocks', href: '/admin/inventory/low-stocks', icon: 'AlertTriangle', permissionKey: 'low_stock.view', badgeKey: 'lowStockCount' },
      { id: 'item_adjustments', title: 'Stock Adjustments', href: '/admin/inventory/adjustments', icon: 'Sliders', permissionKey: 'inventory.adjust' }
    ]
  },
  {
    id: 'group_sales',
    title: 'SALES',
    defaultOpen: true,
    items: [
      { id: 'item_sales_orders', title: 'Sales Order', href: '/admin/sales/orders', icon: 'ShoppingCart', permissionKey: 'sales.view' },
      { id: 'item_returns', title: 'Returns', href: '/admin/sales/returns', icon: 'RotateCcw', permissionKey: 'returns.approve' },
      { id: 'item_refunds', title: 'Refunds', href: '/admin/sales/refunds', icon: 'Receipt', permissionKey: 'payments.process' }
    ]
  },
  {
    id: 'group_purchases',
    title: 'PURCHASES',
    defaultOpen: true,
    items: [
      { id: 'item_pos', title: 'Purchase Orders', href: '/admin/purchasing/purchase-orders', icon: 'FileText', permissionKey: 'purchase.view', badgeKey: 'pendingPoCount' },
      { id: 'item_grn', title: 'Goods Received', href: '/admin/purchasing/goods-received', icon: 'Truck', permissionKey: 'goods_received.create' },
      { id: 'item_suppliers', title: 'Suppliers', href: '/admin/purchasing/suppliers', icon: 'Users', permissionKey: 'suppliers.manage' }
    ]
  },
  {
    id: 'group_customers',
    title: 'CUSTOMERS',
    defaultOpen: true,
    items: [
      { id: 'item_customers', title: 'Customers', href: '/admin/sales/customers', icon: 'UserCheck', permissionKey: 'customers.view' }
    ]
  },
  {
    id: 'group_billing',
    title: 'BILLING',
    defaultOpen: true,
    items: [
      { id: 'item_invoices', title: 'Invoices', href: '/admin/billing/invoices', icon: 'FileCheck', permissionKey: 'invoices.view' },
      { id: 'item_payments', title: 'Payments', href: '/admin/billing/payments', icon: 'CreditCard', permissionKey: 'payments.process' }
    ]
  },
  {
    id: 'group_system',
    title: 'SYSTEM',
    defaultOpen: false,
    items: [
      { id: 'item_employees', title: 'Employees', href: '/admin/system/employees', icon: 'UserCog', permissionKey: 'employees.manage' },
      { id: 'item_roles', title: 'Roles & Permissions', href: '/admin/system/roles', icon: 'ShieldCheck', permissionKey: 'roles.manage' },
      { id: 'item_settings', title: 'Settings', href: '/admin/system/settings', icon: 'Settings', permissionKey: 'settings.update' },
      { id: 'item_audit_logs', title: 'Audit Logs', href: '/admin/system/audit-logs', icon: 'History', permissionKey: 'audit_logs.view' }
    ]
  }
];
