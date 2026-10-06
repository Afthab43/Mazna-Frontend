'use client';

import React from 'react';
import { ShoppingCart, Plus, Search, Filter } from 'lucide-react';

export default function SalesOrdersPage() {
  const orders = [
    { id: 'SO-2026-901', customer: 'Vikram Enterprises (B2B)', date: '2026-10-02', items: 12, amount: '₹1,45,200', status: 'CONFIRMED', payment: 'PAID' },
    { id: 'SO-2026-902', customer: 'Anand Hardware Retail', date: '2026-10-01', items: 5, amount: '₹34,800', status: 'PROCESSING', payment: 'PARTIAL' },
    { id: 'SO-2026-903', customer: 'Apex Industrial Works', date: '2026-09-30', items: 25, amount: '₹4,12,000', status: 'DISPATCHED', payment: 'PAID' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Orders</h1>
          <p className="text-xs text-slate-500 mt-1">Manage B2B wholesale contract orders and storefront retail orders.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Create Sales Order
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Order Management Queue</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search order number or customer..."
              className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order Number</th>
                <th className="py-3 px-4">Customer Account</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Line Items</th>
                <th className="py-3 px-4">Total Value</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{o.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{o.customer}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{o.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{o.items} items</td>
                  <td className="py-3 px-4 font-bold text-slate-900 font-mono">{o.amount}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {o.payment}
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
