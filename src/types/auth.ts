export type AccountType = 'ADMIN' | 'SUBADMIN' | 'EMPLOYEE' | 'USER';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  accountType: AccountType;
  roleId: string | null;
  roleName?: string;
  permissions?: string[];
  employeeId?: string | null;
  designation?: string | null;
  profileImage?: string | null;
  warehouseAccess?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
