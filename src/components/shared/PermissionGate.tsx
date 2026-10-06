'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface PermissionGateProps {
  permission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const { user } = useAuth();

  // If no permission key specified or user is ADMIN, allow access
  if (!permission || user?.accountType === 'ADMIN') {
    return <>{children}</>;
  }

  // Check if user has permission key
  const hasPermission = user?.permissions?.includes(permission);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
