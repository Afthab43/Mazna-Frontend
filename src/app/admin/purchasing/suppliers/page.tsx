'use client';

import React, { useState } from 'react';
import { Users, Plus, Star, Phone, Mail, MapPin } from 'lucide-react';

export default function SuppliersPage() {
  const [suppliers] = useState([
    { id: 'sup-1', code: 'SUP-APEX-01', name: 'Apex Fastener Industries', contact: 'Anand Kumar', email: 'orders@apexfasteners.com', phone: '+91 98112 23344', gstin: '27AAACA1234B1Z2', rating: 4.8 },
    { id: 'sup-2', code: 'SUP-TITAN-01', name: 'Titan Tools & Equipment Co.', contact: 'Priya Verma', email: 'sales@titantools.in', phone: '+91 98223 34455', gstin: '29AAACT9876C1Z9', rating: 4.9 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Supplier Master Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Vendor accounts, commercial GST contacts, lead times, and performance ratings.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Vendor / Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{s.code}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{s.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {s.rating}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Contact Person: {s.contact}</p>
              <p className="flex items-center gap-2 text-slate-500"><Mail className="w-3.5 h-3.5" /> {s.email}</p>
              <p className="flex items-center gap-2 text-slate-500"><Phone className="w-3.5 h-3.5" /> {s.phone}</p>
              <p className="font-mono text-[11px] text-slate-500">GSTIN: {s.gstin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
