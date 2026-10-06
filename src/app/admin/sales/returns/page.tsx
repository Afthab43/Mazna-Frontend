'use client';

import React from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

export default function ReturnsPage() {
  const returns = [
    { id: 'RMA-801', order: 'SO-2026-901', customer: 'Vikram Enterprises', date: '2026-10-01', reason: 'Size Fit Issue', status: 'INSPECTED & APPROVED', refund: '₹3,500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Returns (RMA)</h1>
        <p className="text-xs text-slate-500 mt-1">Process customer return requests, warehouse inspections, and credit note issuance.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">RMA Number</th>
                <th className="py-3 px-4">Original Order</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Return Reason</th>
                <th className="py-3 px-4">Inspection Status</th>
                <th className="py-3 px-4 text-right">Credit Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {returns.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-purple-600">{r.id}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{r.order}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.customer}</td>
                  <td className="py-3 px-4 text-slate-600">{r.reason}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{r.refund}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
