'use client';

import React from 'react';
import { History, ShieldCheck, Lock } from 'lucide-react';

export default function AuditLogsPage() {
  const logs = [
    { id: 'log-1', timestamp: '2026-10-02 11:30:15', user: 'System Admin (admin@mazna.com)', action: 'UPDATE_COMPANY_SETTINGS', module: 'SYSTEM', ip: '127.0.0.1' },
    { id: 'log-2', timestamp: '2026-10-02 10:45:00', user: 'Operations Subadmin (subadmin@mazna.com)', action: 'CREATE_PURCHASE_ORDER', module: 'PURCHASING', ip: '192.168.1.45' },
    { id: 'log-3', timestamp: '2026-10-01 18:20:00', user: 'Rahul Sharma (employee@mazna.com)', action: 'ADJUST_STOCK_QUANTITY', module: 'INVENTORY', ip: '192.168.1.102' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Immutable System Audit Trail</h1>
        <p className="text-xs text-slate-500 mt-1">Compliance ledger recording all administrative actions, stock adjustments, and security events.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Event Timestamp</th>
                <th className="py-3 px-4">User Account</th>
                <th className="py-3 px-4">Action Code</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{l.timestamp}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{l.user}</td>
                  <td className="py-3 px-4 font-mono text-blue-600 font-bold">{l.action}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{l.module}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-500">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
