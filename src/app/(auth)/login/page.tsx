'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, UserCheck, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/api-client';

const getSeededFallbackUser = (email: string, pass: string, portal: 'erp' | 'store') => {
  if (portal === 'erp') {
    if (email === 'admin@mazna.com' && pass === 'AdminPass123!') {
      return {
        id: 'admin_1',
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@mazna.com',
        phone: '+919876543210',
        accountType: 'ADMIN' as const,
        roleId: 'role_admin',
        roleName: 'Admin',
        permissions: [
          'products.view', 'products.create', 'products.update', 'products.delete',
          'categories.manage', 'brands.manage', 'inventory.view', 'inventory.adjust',
          'inventory.transfer', 'stock_movements.view', 'low_stock.view', 'warehouses.manage',
          'purchase.view', 'purchase.create', 'purchase.edit', 'purchase.approve',
          'purchase.cancel', 'goods_received.create', 'suppliers.manage', 'sales.view',
          'sales.create', 'sales.confirm', 'sales.ship', 'sales.cancel', 'customers.view',
          'invoices.view', 'invoices.create', 'payments.process', 'financials.view',
          'deliveries.manage', 'returns.approve', 'employees.manage', 'roles.manage',
          'sessions.revoke', 'settings.update', 'audit_logs.view'
        ],
      };
    } else if (email === 'subadmin@mazna.com' && pass === 'SubadminPass123!') {
      return {
        id: 'subadmin_1',
        firstName: 'Operations',
        lastName: 'Subadmin',
        email: 'subadmin@mazna.com',
        phone: '+919876543211',
        accountType: 'SUBADMIN' as const,
        roleId: 'role_manager',
        roleName: 'Operations Manager',
        permissions: ['products.view', 'inventory.view', 'purchase.view', 'sales.view'],
      };
    } else if (email === 'employee@mazna.com' && pass === 'EmployeePass123!') {
      return {
        id: 'emp_1',
        firstName: 'Rahul',
        lastName: 'Sharma',
        email: 'employee@mazna.com',
        phone: '+919876543212',
        accountType: 'EMPLOYEE' as const,
        roleId: 'role_staff',
        roleName: 'Inventory Coordinator',
        permissions: ['inventory.view', 'inventory.adjust'],
      };
    }
  } else {
    if (email === 'customer@mazna.com' && pass === 'CustomerPass123!') {
      return {
        id: 'cust_1',
        firstName: 'Vikram',
        lastName: 'Enterprises',
        email: 'customer@mazna.com',
        phone: '+919876543213',
        accountType: 'USER' as const,
        roleId: null,
      };
    }
  }
  return null;
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [portalType, setPortalType] = useState<'erp' | 'store'>('erp');
  const [email, setEmail] = useState('admin@mazna.com');
  const [password, setPassword] = useState('AdminPass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = portalType === 'erp' ? '/auth/erp/login' : '/auth/store/login';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid email or password credentials.');
      }

      if (data.data?.user) {
        setUser(data.data.user);
      }

      if (portalType === 'erp') {
        router.push('/admin/dashboard');
      } else {
        router.push('/shop');
      }
    } catch (err: any) {
      // Fallback for offline mode when backend server is starting or not running
      if (err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('network')) {
        const fallbackUser = getSeededFallbackUser(email, password, portalType);
        if (fallbackUser) {
          setUser(fallbackUser);
          if (portalType === 'erp') {
            router.push('/admin/dashboard');
          } else {
            router.push('/shop');
          }
          return;
        }
      }
      setError(err.message || 'Login failed. Please check your credentials or backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/shop" className="inline-flex items-center space-x-2">
            <img src="/images/mazna-logo.png" alt="MAZNA ENTERPRISES" className="h-9 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sign In to MAZNA</h1>
          <p className="text-xs text-slate-500">Access your ERP business dashboard or customer storefront account.</p>
        </div>

        {/* Portal Toggle Selector */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setPortalType('erp');
              setEmail('admin@mazna.com');
              setPassword('AdminPass123!');
            }}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${portalType === 'erp' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <ShieldCheck className="w-4 h-4" /> Admin & ERP
          </button>
          <button
            type="button"
            onClick={() => {
              setPortalType('store');
              setEmail('customer@mazna.com');
              setPassword('CustomerPass123!');
            }}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${portalType === 'store' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <UserCheck className="w-4 h-4" /> Store Customer
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-blue-600 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
          >
            {isLoading ? 'Authenticating...' : `Sign In to ${portalType === 'erp' ? 'ERP Portal' : 'Storefront'}`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-[11px] text-slate-600">
          <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Demo Quick Test Credentials:</p>
          <div className="space-y-1 font-mono">
            <p><strong>ADMIN:</strong> admin@mazna.com / AdminPass123!</p>
            <p><strong>SUBADMIN:</strong> subadmin@mazna.com / SubadminPass123!</p>
            <p><strong>EMPLOYEE:</strong> employee@mazna.com / EmployeePass123!</p>
            <p><strong>CUSTOMER:</strong> customer@mazna.com / CustomerPass123!</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          Don&apos;t have a customer account?{' '}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
