'use client';

import React, { useState } from 'react';
import { Bookmark, Plus, Search, Edit } from 'lucide-react';

export default function BrandsPage() {
  const [brands] = useState([
    { id: 'b-1', name: 'Mazna Pro', slug: 'mazna-pro', origin: 'India', status: 'ACTIVE', count: 120 },
    { id: 'b-2', name: 'Bosch Industrial', slug: 'bosch-industrial', origin: 'Germany', status: 'ACTIVE', count: 85 },
    { id: 'b-3', name: '3M Safety', slug: '3m-safety', origin: 'USA', status: 'ACTIVE', count: 45 },
    { id: 'b-4', name: 'DeWalt Power', slug: 'dewalt-power', origin: 'USA', status: 'ACTIVE', count: 62 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manufacturer Brands</h1>
          <p className="text-xs text-slate-500 mt-1">Manage partner brand master directory, OEM tags, and manufacturer profiles.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brands.map((b) => (
          <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {b.status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{b.name}</h3>
              <p className="text-xs text-slate-500">Origin: {b.origin}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>{b.count} Products</span>
              <button className="text-blue-600 hover:underline flex items-center gap-1">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
