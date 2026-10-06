'use client';

import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function PaymentsPage() {
  const payments = [
    { id: 'PAY-901', invoice: 'INV-2026-001', customer: 'Vikram Enterprises', date: '2026-10-02', gateway: 'RAZORPAY / UPI', amount: '₹1,45,200', status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payments & Receipts Ledger</h1>
        <p className="text-xs text-slate-500 mt-1">Track incoming customer payments, Razorpay gateway receipts, and bank settlements.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4">Invoice Number</th>
                <th className="py-3 px-4">Customer Account</th>
                <th className="py-3 px-4">Payment Gateway</th>
                <th className="py-3 px-4">Amount Received</th>
                <th className="py-3 px-4 text-right">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{p.id}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{p.invoice}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{p.customer}</td>
                  <td className="py-3 px-4 text-slate-600">{p.gateway}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.amount}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {p.status}
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
