'use client';

import React from 'react';
import { Activity, ArrowUpRight, ArrowDownLeft, RefreshCw, Search } from 'lucide-react';

export default function StockMovementsPage() {
  const movements = [
    { id: 'mov-1', sku: 'MZN-BOLT-M12-50', name: 'Galvanized Hex Bolt M12', qty: '+150', type: 'GRN RECEIPT', warehouse: 'Central Bangalore WH-BLR-01', time: '10 mins ago', ref: 'PO-2026-001' },
    { id: 'mov-2', sku: 'MZN-BOOT-IND-42', name: 'Steel Toe Safety Boot', qty: '-12', type: 'SALES DISPATCH', warehouse: 'Mumbai WH-BOM-01', time: '45 mins ago', ref: 'SO-9942' },
    { id: 'mov-3', sku: 'MZN-DRIL-RH20V', name: 'Cordless Rotary Hammer Drill', qty: '20 Transferred', type: 'INTER-WH TRANSFER', warehouse: 'WH-BLR-01 → WH-DEL-01', time: '2 hours ago', ref: 'TR-104' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Stock Movement Audit Trail</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time ledger of stock receipts, customer dispatches, and warehouse transfers.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Movement Ledger</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by SKU or Reference..."
              className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Item SKU & Product</th>
                <th className="py-3 px-4">Movement Type</th>
                <th className="py-3 px-4">Quantity Change</th>
                <th className="py-3 px-4">Warehouse Node</th>
                <th className="py-3 px-4">Timestamp & Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <p>{m.name}</p>
                    <span className="font-mono text-[11px] text-slate-500">{m.sku}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {m.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{m.qty}</td>
                  <td className="py-3 px-4 text-slate-600">{m.warehouse}</td>
                  <td className="py-3 px-4 text-[11px] text-slate-500">
                    <p>{m.time}</p>
                    <span className="font-mono font-bold text-slate-800">{m.ref}</span>
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
