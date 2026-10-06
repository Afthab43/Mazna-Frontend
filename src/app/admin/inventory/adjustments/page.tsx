'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Check } from 'lucide-react';

export default function StockAdjustmentsPage() {
  const [adjustments] = useState([
    { id: 'adj-1', date: '2026-10-01', sku: 'MZN-BOLT-M12-50', reason: 'Physical Count Audit Variance', qtyBefore: 140, qtyAfter: 150, delta: '+10', user: 'Rahul Sharma (EMP-003)' },
    { id: 'adj-2', date: '2026-09-28', sku: 'MZN-BOOT-IND-42', reason: 'Damaged Packaging Return', qtyBefore: 90, qtyAfter: 85, delta: '-5', user: 'Operations Subadmin' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Stock Adjustments</h1>
          <p className="text-xs text-slate-500 mt-1">Manual stock count corrections, audit reconciliations, and damage write-offs.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> New Stock Adjustment
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Adjustment Date</th>
                <th className="py-3 px-4">Item SKU</th>
                <th className="py-3 px-4">Adjustment Reason</th>
                <th className="py-3 px-4">Before / After</th>
                <th className="py-3 px-4">Delta Variance</th>
                <th className="py-3 px-4">Auditor / User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {adjustments.map((adj) => (
                <tr key={adj.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{adj.date}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{adj.sku}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{adj.reason}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{adj.qtyBefore} → {adj.qtyAfter}</td>
                  <td className={`py-3 px-4 font-bold font-mono ${adj.delta.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {adj.delta}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{adj.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
