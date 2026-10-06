'use client';

import React from 'react';
import { FileCheck, Download, Printer } from 'lucide-react';

export default function InvoicesPage() {
  const invoices = [
    { id: 'INV-2026-001', customer: 'Vikram Enterprises', order: 'SO-2026-901', date: '2026-10-02', gstin: '29AAACV1234F1Z5', amount: '₹1,45,200', gstAmount: '₹22,149', status: 'PAID' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">GST Invoices Ledger</h1>
        <p className="text-xs text-slate-500 mt-1">Generate, download, and file tax invoices for sales orders in accordance with Indian GST regulations.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Invoice Number</th>
                <th className="py-3 px-4">Customer & GSTIN</th>
                <th className="py-3 px-4">Sales Order</th>
                <th className="py-3 px-4">GST Tax Portion</th>
                <th className="py-3 px-4">Total Invoice Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{inv.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <p>{inv.customer}</p>
                    <span className="font-mono text-[10px] text-slate-400">{inv.gstin}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{inv.order}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">{inv.gstAmount}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{inv.amount}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
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
