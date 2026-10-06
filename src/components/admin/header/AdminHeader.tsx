'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, Settings, LogOut, ShieldCheck, UserCheck, ChevronDown, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/api-client';

export const AdminHeader: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
    } catch (e) {}
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Global Search Bar (Figma Design) */}
      <div className="w-96 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search products, orders, suppliers, SKUs..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
        />
      </div>

      {/* Top Controls & User Actions */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Settings Link */}
        <Link
          href="/admin/system/settings"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          title="System Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* Top Header Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        {/* User Profile Dropdown Area */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2.5 p-1.5 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 border border-blue-200">
              {user?.firstName?.[0] || 'A'}
              {user?.lastName?.[0] || 'M'}
            </div>
            <div className="text-left hidden sm:block text-xs">
              <p className="font-bold text-slate-900 leading-tight">
                {user?.firstName || 'System'} {user?.lastName || 'Admin'}
              </p>
              <p className="text-[10px] font-semibold text-slate-500">
                {user?.roleName || user?.accountType || 'ADMIN'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Interactive Profile Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              {/* Profile Card Header */}
              <div className="px-4 py-3 border-b border-slate-100 space-y-1">
                <p className="font-bold text-slate-900 text-xs">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[11px] text-slate-500 font-mono truncate">{user?.email || 'admin@mazna.com'}</p>
                <div className="pt-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user?.accountType === 'ADMIN'
                        ? 'bg-rose-100 text-rose-800'
                        : user?.accountType === 'SUBADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user?.roleName || user?.accountType || 'ADMIN'}
                  </span>
                </div>
              </div>

              {/* Menu Options */}
              <div className="py-1">
                <Link
                  href="/admin/system/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> System Settings & Display
                </Link>
                <Link
                  href="/admin/system/employees"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition font-medium"
                >
                  <UserCheck className="w-4 h-4 text-slate-400" /> Manage Employees & Subadmins
                </Link>
              </div>

              {/* Logout Option */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" /> Sign Out of Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
