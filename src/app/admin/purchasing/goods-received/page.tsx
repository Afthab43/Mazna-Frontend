'use client';

import React from 'react';
import { Truck, Plus, CheckCircle2 } from 'lucide-react';

export default function GoodsReceivedPage() {
  const grns = [
    { id: 'GRN-2026-001', po: 'PO-2026-001', supplier: 'Apex Fastener Industries', warehouse: 'Central Bangalore WH-BLR-01', date: '2026-10-02', status: 'VERIFIED & INGESTED' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Goods Received Notes (GRN)</h1>
          <p className="text-xs text-slate-500 mt-1">Record inward stock deliveries, quality checks, and PO line item receipts.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Receive Shipment (GRN)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">GRN Number</th>
                <th className="py-3 px-4">Purchase Order</th>
                <th className="py-3 px-4">Supplier Partner</th>
                <th className="py-3 px-4">Receiving Warehouse</th>
                <th className="py-3 px-4">Receipt Date</th>
                <th className="py-3 px-4 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {grns.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{g.id}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{g.po}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{g.supplier}</td>
                  <td className="py-3 px-4 text-slate-600">{g.warehouse}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{g.date}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {g.status}
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
