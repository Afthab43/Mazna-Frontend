'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Building2, Sliders, Check, Save, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigationStore } from '@/stores/useNavigationStore';

export default function SystemSettingsPage() {
  const { user } = useAuth();
  const { allowNonAdminCustomization, setAllowNonAdminCustomization } = useNavigationStore();

  const [companyName, setCompanyName] = useState('MAZNA ENTERPRISES');
  const [gstin, setGstin] = useState('29ABCDE1234F1ZH');
  const [address, setAddress] = useState('123 Business Hub, MG Road, Bangalore, Karnataka');
  const [email, setEmail] = useState('contact@mazna.com');
  const [phone, setPhone] = useState('+91 80 2233 4455');
  const [poThreshold, setPoThreshold] = useState('50000');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const isAdmin = user?.accountType === 'ADMIN';

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System & Display Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Admin Configuration
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure company settings, sidebar display allowances, and ERP accounting threshold rules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>System and navigation settings saved successfully!</span>
        </div>
      )}

      {/* Admin Customization Allowance Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sidebar Customization Controls</h3>
              <p className="text-xs text-slate-500">
                Grant or restrict drag-and-drop navigation edit rights to Subadmins and Employees.
              </p>
            </div>
          </div>
          {!isAdmin && (
            <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Lock className="w-3.5 h-3.5" /> Admin Only Toggle
            </span>
          )}
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="space-y-0.5 max-w-lg">
            <p className="text-xs font-bold text-slate-900">
              Allow Subadmins & Employees to Customize Navigation Layout
            </p>
            <p className="text-[11px] text-slate-500">
              When enabled, Subadmin and Employee accounts will see the &quot;Customize&quot; drag-and-drop toolbar in the sidebar. When disabled, only the System Admin can rearrange sidebar items.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              disabled={!isAdmin}
              checked={allowNonAdminCustomization}
              onChange={(e) => setAllowNonAdminCustomization(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Company Profile Form */}
      <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Company Master Details</h3>
            <p className="text-xs text-slate-500">Displayed on GST Tax Invoices and purchase orders.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company Legal Name *</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">GSTIN Registration Number *</label>
            <input
              type="text"
              required
              value={gstin}
              onChange={(e) => setGstin(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-mono uppercase outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official Contact Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Contact Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Registered Registered Office Address</label>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="pt-2">
          <label className="block font-semibold text-slate-700 mb-1">PO Approval Threshold Limit (₹)</label>
          <input
            type="number"
            value={poThreshold}
            onChange={(e) => setPoThreshold(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-mono outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-[10px] text-slate-500 mt-1">Purchase orders above this amount require Subadmin or Admin approval.</p>
        </div>
      </form>
    </div>
  );
}
