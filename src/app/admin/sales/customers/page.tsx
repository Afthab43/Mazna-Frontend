'use client';

import React, { useState } from 'react';
import { UserCheck, Plus, Building2, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function CustomersPage() {
  const [customers] = useState([
    { id: 'c-1', name: 'Vikram Enterprises', type: 'B2B Wholesale', gstin: '29AAACV1234F1Z5', email: 'customer@mazna.com', phone: '+91 98765 43213', orders: 18, spent: '₹12,45,000' },
    { id: 'c-2', name: 'Priya Patel', type: 'Retail Buyer', gstin: 'N/A', email: 'priya@gmail.com', phone: '+91 98220 11223', orders: 3, spent: '₹14,500' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Accounts Directory</h1>
          <p className="text-xs text-slate-500 mt-1">B2B Wholesale clients, retail buyers, credit terms, and purchase histories.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Account Type</th>
                <th className="py-3 px-4">GSTIN / Contact</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4 text-right">Lifetime Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.type.includes('B2B') ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <p className="font-mono text-[11px]">{c.gstin}</p>
                    <p className="text-[11px] text-slate-400">{c.email}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{c.orders} orders</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{c.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
