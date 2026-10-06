'use client';

import React, { useState } from 'react';
import { Grid, Plus, Search, FolderTree, Edit, Trash2 } from 'lucide-react';

export default function CategoriesPage() {
  const [categories] = useState([
    { id: 'cat-1', name: 'Heavy Fasteners & Bolts', slug: 'heavy-fasteners-bolts', count: 42, description: 'High tensile industrial bolts and nuts' },
    { id: 'cat-2', name: 'Safety Equipment & PPE', slug: 'safety-equipment-ppe', count: 18, description: 'Protective footwear, helmets, and gloves' },
    { id: 'cat-3', name: 'Power Tools & Machinery', slug: 'power-tools-machinery', count: 29, description: 'Heavy-duty power drills and saws' },
    { id: 'cat-4', name: 'Pneumatics & Hydraulics', slug: 'pneumatics-hydraulics', count: 15, description: 'Air hoses, valves, and high pressure fittings' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Categories</h1>
          <p className="text-xs text-slate-500 mt-1">Organize catalog hierarchy, taxonomies, and storefront groupings.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Grid className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {cat.count} SKUs
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-400">/{cat.slug}</span>
              <button className="text-blue-600 hover:underline font-semibold flex items-center gap-1">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
