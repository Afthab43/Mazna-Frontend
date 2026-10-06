'use client';

import React from 'react';
import { AlertTriangle, Plus, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function LowStocksPage() {
  const lowStockItems = [
    { id: 'ls-1', sku: 'MZN-HOSE-AIR-15M', name: 'High Pressure Pneumatic Air Hose 15m', current: 3, reorderPoint: 15, deficit: 12, warehouse: 'Central Bangalore WH-BLR-01', supplier: 'Apex Fastener Industries' },
    { id: 'ls-2', sku: 'MZN-DRIL-RH20V', name: 'Cordless Rotary Hammer Drill 20V', current: 2, reorderPoint: 10, deficit: 8, warehouse: 'Mumbai WH-BOM-01', supplier: 'Titan Tools Co.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Low Stock & Reorder Alerts</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {lowStockItems.length} Urgent Items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Products approaching or below safety threshold points requiring purchase replenishment.</p>
        </div>
        <Link
          href="/admin/purchasing/purchase-orders"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Replenishment PO
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-amber-50/50 flex items-center gap-2 text-xs text-amber-800 font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Automated reorder point rules triggered. Review stock deficits and issue POs to suppliers.</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Item SKU & Name</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Reorder Level</th>
                <th className="py-3 px-4">Deficit Qty</th>
                <th className="py-3 px-4">Warehouse Location</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {lowStockItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <p>{item.name}</p>
                    <span className="font-mono text-[11px] text-slate-500">{item.sku}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-red-600 font-mono">{item.current} units</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{item.reorderPoint} units</td>
                  <td className="py-3 px-4 font-bold text-amber-700 font-mono">+{item.deficit} required</td>
                  <td className="py-3 px-4 text-slate-600">{item.warehouse}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/admin/purchasing/purchase-orders"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
                    >
                      Issue PO
                    </Link>
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
