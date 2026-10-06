'use client';

import React from 'react';
import { Receipt } from 'lucide-react';

export default function RefundsPage() {
  const refunds = [
    { id: 'REF-501', rma: 'RMA-801', customer: 'Vikram Enterprises', date: '2026-10-02', mode: 'BANK TRANSFER', amount: '₹3,500', status: 'SETTLED' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Refunds</h1>
        <p className="text-xs text-slate-500 mt-1">Track financial payout settlements for approved customer returns.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Refund ID</th>
                <th className="py-3 px-4">Linked RMA</th>
                <th className="py-3 px-4">Customer Account</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Settled Amount</th>
                <th className="py-3 px-4 text-right">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {refunds.map((rf) => (
                <tr key={rf.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{rf.id}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{rf.rma}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{rf.customer}</td>
                  <td className="py-3 px-4 text-slate-600">{rf.mode}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{rf.amount}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {rf.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
