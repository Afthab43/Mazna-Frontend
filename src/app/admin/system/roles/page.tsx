'use client';

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-client';
import { PermissionGate } from '@/components/shared/PermissionGate';
import { ShieldCheck, Lock, Check, Save, Loader2, AlertCircle } from 'lucide-react';

interface RoleDef {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permKeys: string[];
}

interface PermissionDef {
  id: string;
  key: string;
  module: string;
  action: string;
  description: string;
}

export default function RolesMatrixPage() {
  const [roles, setRoles] = useState<RoleDef[]>([]);
  const [permissionsList, setPermissionsList] = useState<PermissionDef[]>([]);
  const [activeRoleId, setActiveRoleId] = useState<string>('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchRoles(), fetchPermissions()]);
    setLoading(false);
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/system/roles`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setRoles(data.data);
        if (!activeRoleId) {
          // Default to Subadmin or non-Admin role if available
          const subadmin = data.data.find((r: RoleDef) => r.name === 'Subadmin');
          setActiveRoleId(subadmin ? subadmin.id : data.data[0].id);
        }
      }
    } catch (e) {
      console.error('Error fetching roles from backend', e);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/system/permissions`);
      const data = await res.json();
      if (data.success && data.data) {
        setPermissionsList(data.data);
      }
    } catch (e) {
      console.error('Error fetching permissions from backend', e);
    }
  };

  const activeRole = roles.find((r) => r.id === activeRoleId) || roles[0];

  const hasPermission = (role: RoleDef, permKey: string) => {
    if (!role || !role.permKeys) return false;
    if (role.permKeys.includes('all')) return true;
    return role.permKeys.includes(permKey);
  };

  const togglePermission = (roleId: string, permKey: string) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          if (r.isSystem && r.name === 'Admin') return r; // Admin has all immutable
          const hasIt = (r.permKeys || []).includes(permKey);
          const nextKeys = hasIt
            ? (r.permKeys || []).filter((k) => k !== permKey)
            : [...(r.permKeys || []), permKey];
          return { ...r, permKeys: nextKeys };
        }
        return r;
      })
    );
  };

  const handleSaveMatrix = async () => {
    if (!activeRole || activeRole.name === 'Admin') return;
    setSaving(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/system/roles/${activeRole.id}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permKeys: activeRole.permKeys }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to save role permissions to database');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save permission matrix');
    } finally {
      setSaving(false);
    }
  };

  // Group permissions by module name dynamically
  const groupedPermissions = permissionsList.reduce<Record<string, PermissionDef[]>>((acc, perm) => {
    const moduleName = perm.module ? perm.module.charAt(0).toUpperCase() + perm.module.slice(1) : 'General';
    if (!acc[moduleName]) acc[moduleName] = [];
    acc[moduleName].push(perm);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roles & RBAC Permission Matrix</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure access controls, module privileges, and granular action rights for Subadmins and Employees in PostgreSQL.
          </p>
        </div>

        <PermissionGate permission="roles.manage">
          <button
            onClick={handleSaveMatrix}
            disabled={saving || !activeRole || activeRole?.name === 'Admin'}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Permission Changes
          </button>
        </PermissionGate>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Role permission matrix updated and synced with PostgreSQL Drizzle ORM backend!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Role Cards Grid */}
      {loading ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading RBAC roles from database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRoleId(role.id)}
              className={`p-4 rounded-2xl border text-left transition ${
                activeRoleId === role.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{role.name}</span>
                {role.isSystem && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    System
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{role.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* Granular Permission Matrix Table */}
      {activeRole && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Editing Permissions for: <span className="text-blue-600 font-extrabold">{activeRole.name}</span>
              </h3>
              <p className="text-[11px] text-slate-500">{activeRole.description}</p>
            </div>
            {activeRole.name === 'Admin' && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                <Lock className="w-3.5 h-3.5" /> Admin permissions are system fixed.
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-1/3">Module & Action Key</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-center w-24">Granted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {Object.keys(groupedPermissions).length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-slate-400">
                      No permission definitions found in database.
                    </td>
                  </tr>
                ) : (
                  Object.entries(groupedPermissions).map(([moduleName, perms]) => (
                    <React.Fragment key={moduleName}>
                      <tr className="bg-slate-100/70 text-slate-900 font-bold uppercase text-[10px]">
                        <td colSpan={3} className="py-2 px-4 tracking-wider">
                          {moduleName} Module Permissions
                        </td>
                      </tr>
                      {perms.map((p) => {
                        const isGranted = hasPermission(activeRole, p.key);
                        return (
                          <tr key={p.key} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-4 font-mono text-[11px] font-semibold text-slate-800">
                              {p.key}
                            </td>
                            <td className="py-3 px-4 text-slate-600 text-xs">{p.description}</td>
                            <td className="py-3 px-4 text-center">
                              <input
                                type="checkbox"
                                disabled={activeRole.name === 'Admin'}
                                checked={isGranted}
                                onChange={() => togglePermission(activeRole.id, p.key)}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer disabled:cursor-not-allowed"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
