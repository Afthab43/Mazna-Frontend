'use client';

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api-client';
import { PermissionGate } from '@/components/shared/PermissionGate';
import { useAuth } from '@/hooks/useAuth';
import {
  Users,
  UserPlus,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Plus,
  UserCheck,
  ShieldCheck,
  X,
  Loader2,
} from 'lucide-react';

interface EmployeeUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: 'ADMIN' | 'SUBADMIN' | 'EMPLOYEE' | 'USER';
  roleId: string | null;
  roleName?: string;
  employeeId: string;
  designation: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  createdAt: string;
}

interface RoleItem {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
}

export default function EmployeeManagementPage() {
  const { user: currentUser } = useAuth();

  const [usersList, setUsersList] = useState<EmployeeUser[]>([]);
  const [rolesList, setRolesList] = useState<RoleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'SUBADMIN' | 'EMPLOYEE' | 'SUSPENDED'>('ALL');
  
  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for New User
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAccountType, setNewAccountType] = useState<'SUBADMIN' | 'EMPLOYEE'>('EMPLOYEE');
  const [newRoleId, setNewRoleId] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newEmployeeId, setNewEmployeeId] = useState('');

  // Form State for Inline New Role
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');

  // Fetch real data from Express Backend
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchRoles()]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`);
      const data = await res.json();
      if (data.success && data.data) {
        setUsersList(data.data);
      }
    } catch (e) {
      console.error('Error fetching users from backend', e);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/system/roles`);
      const data = await res.json();
      if (data.success && data.data) {
        setRolesList(data.data);
      }
    } catch (e) {
      console.error('Error fetching roles from backend', e);
    }
  };

  // Handle Add User via Express Backend API
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const selectedRole = rolesList.find(r => r.id === newRoleId);
      const res = await fetch(`${API_BASE_URL}/admin/users/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
          phone: newPhone,
          password: newPassword,
          accountType: newAccountType,
          roleId: newRoleId || null,
          employeeId: newEmployeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          designation: newDesignation || (newAccountType === 'SUBADMIN' ? 'Operations Subadmin' : 'Staff Member'),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create employee user account');
      }

      const createdUser: EmployeeUser = {
        ...data.data,
        roleName: selectedRole ? selectedRole.name : data.data.roleName,
      };

      setUsersList(prev => [createdUser, ...prev]);
      setIsAddUserOpen(false);
      resetUserForm();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while creating user');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Create Role via Express Backend API
  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/system/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newRoleName,
          description: newRoleDesc,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create custom role in database');
      }

      const createdRole: RoleItem = data.data;

      setRolesList(prev => [...prev, createdRole]);
      setNewRoleId(createdRole.id);
      setIsAddRoleOpen(false);
      setNewRoleName('');
      setNewRoleDesc('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while creating role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(prev =>
          prev.map(u => (u.id === userId ? { ...u, status: nextStatus as any } : u))
        );
      }
    } catch (e) {
      console.error('Error toggling user status', e);
    }
  };

  const resetUserForm = () => {
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewPhone('');
    setNewPassword('');
    setNewAccountType('EMPLOYEE');
    setNewRoleId('');
    setNewDesignation('');
    setNewEmployeeId('');
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch =
      u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.employeeId && u.employeeId.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'SUBADMIN') return matchesSearch && u.accountType === 'SUBADMIN';
    if (activeTab === 'EMPLOYEE') return matchesSearch && u.accountType === 'EMPLOYEE';
    if (activeTab === 'SUSPENDED') return matchesSearch && u.status === 'SUSPENDED';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employee & Subadmin Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Admin Console
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create employee and subadmin accounts, assign roles, define custom roles, and configure warehouse permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Action to Create Role Directly - Guarded by roles.manage */}
          <PermissionGate permission="roles.manage">
            <button
              onClick={() => { setErrorMsg(null); setIsAddRoleOpen(true); }}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" /> + Create New Role
            </button>
          </PermissionGate>
          
          <PermissionGate permission="employees.manage">
            <button
              onClick={() => { setErrorMsg(null); setIsAddUserOpen(true); }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Add Subadmin / Employee
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total System Accounts</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">{usersList.length}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Subadmins</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {usersList.filter(u => u.accountType === 'SUBADMIN').length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Employees</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {usersList.filter(u => u.accountType === 'EMPLOYEE').length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Configured Roles</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">{rolesList.length}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Table Filter & Search Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Users ({usersList.length})
            </button>
            <button
              onClick={() => setActiveTab('SUBADMIN')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'SUBADMIN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subadmins ({usersList.filter(u => u.accountType === 'SUBADMIN').length})
            </button>
            <button
              onClick={() => setActiveTab('EMPLOYEE')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'EMPLOYEE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Employees ({usersList.filter(u => u.accountType === 'EMPLOYEE').length})
            </button>
            <button
              onClick={() => setActiveTab('SUSPENDED')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'SUSPENDED' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Suspended ({usersList.filter(u => u.status === 'SUSPENDED').length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search user, ID, email..."
              className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Account Type</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Employee ID & Title</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    Loading database accounts...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No matching users found in PostgreSQL database.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {user.firstName?.[0] || 'U'}
                          {user.lastName?.[0] || ''}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-[11px] text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          user.accountType === 'ADMIN'
                            ? 'bg-rose-100 text-rose-800'
                            : user.accountType === 'SUBADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : user.accountType === 'EMPLOYEE'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {user.accountType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {user.roleName || user.accountType}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-mono text-[11px] text-slate-900 font-semibold">{user.employeeId || 'N/A'}</p>
                      <p className="text-[11px] text-slate-500">{user.designation || 'Staff Member'}</p>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-600">
                      {user.phone || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          user.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status === 'ACTIVE' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {user.accountType !== 'ADMIN' && (
                        <button
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            user.status === 'ACTIVE'
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Create Employee / Subadmin User */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Create Subadmin / Employee Account</h3>
                <p className="text-xs text-slate-500">Admin direct user provisioning portal.</p>
              </div>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              {/* Account Type Toggle */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Account Type *</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setNewAccountType('SUBADMIN')}
                    className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                      newAccountType === 'SUBADMIN' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" /> Subadmin Person
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewAccountType('EMPLOYEE')}
                    className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                      newAccountType === 'EMPLOYEE' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" /> Employee Person
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newFirstName}
                    onChange={e => setNewFirstName(e.target.value)}
                    placeholder="Suresh"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newLastName}
                    onChange={e => setNewLastName(e.target.value)}
                    placeholder="Kulkarni"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="suresh@mazna.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Role Selection Column WITH direct inline "+ Create Role" button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Assigned RBAC Role *</label>
                  <PermissionGate permission="roles.manage">
                    <button
                      type="button"
                      onClick={() => setIsAddRoleOpen(true)}
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Create Role Directly
                    </button>
                  </PermissionGate>
                </div>
                <select
                  value={newRoleId}
                  onChange={e => setNewRoleId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- Select Role for {newAccountType} --</option>
                  {rolesList.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.description})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={newEmployeeId}
                    onChange={e => setNewEmployeeId(e.target.value)}
                    placeholder="EMP-104"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation Title</label>
                  <input
                    type="text"
                    value={newDesignation}
                    onChange={e => setNewDesignation(e.target.value)}
                    placeholder="Senior Stock Auditor"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Temporary Account Password *</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save & Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Create Inline Role Directly (Guarded by roles.manage) */}
      {isAddRoleOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Define Custom Role directly</h3>
                <p className="text-xs text-slate-500">Create role for Subadmin or Employee persons.</p>
              </div>
              <button
                onClick={() => setIsAddRoleOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Name *</label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  placeholder="e.g. Regional Dispatch Supervisor"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newRoleDesc}
                  onChange={e => setNewRoleDesc(e.target.value)}
                  placeholder="Handles stock transfers, dispatches, and warehouse inventory checks."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddRoleOpen(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Create & Select Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
