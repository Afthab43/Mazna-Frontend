'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ShieldCheck, Truck, RefreshCw, Zap, Star, ArrowRight } from 'lucide-react';

export default function ShopHomePage() {
  return (
    <div className="space-y-10">
      {/* Hero Banner Section (Figma Design) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs items-center">
        <div className="lg:col-span-2 space-y-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
            INDUSTRIAL GRADE STOREFRONT • APEXCOMMERCE OS
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything You Need, <br />
            <span className="text-blue-600">In One Place.</span>
          </h1>
          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            Engineered for elite productivity and enterprise reliability. Powered by direct real-time ERP inventory hooks to eliminate backorders and dispatch within 15 minutes.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-sm">
              Shop Featured Gear <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition">
              Explore New Arrivals
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div>
              <p className="font-bold text-slate-900">99.98%</p>
              <p className="text-[11px] text-slate-500">Fulfillment Rate</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">&lt; 15 min</p>
              <p className="text-[11px] text-slate-500">Auto Dispatch</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">3-Year</p>
              <p className="text-[11px] text-slate-500">Replacement</p>
            </div>
            <div>
              <p className="font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Sync
              </p>
              <p className="text-[11px] text-slate-500">Physical WH-01 Bin</p>
            </div>
          </div>
        </div>

        {/* Live Warehouse Node Status Card (Figma Design) */}
        <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" /> WAREHOUSE NODE: BLR-WH-01
            </span>
            <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
              Active Sync: 100%
            </span>
          </div>

          <div className="h-36 bg-slate-800 rounded-lg flex flex-col items-center justify-center p-4 text-center space-y-2 border border-slate-700">
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
              🟢 In Stock: 18 units in WH-01
            </span>
            <p className="font-bold text-sm text-slate-100">Apex Pro Dual-Wireless Suite</p>
            <p className="text-xs text-slate-400">SKU: APX-SET-900 • ₹3,899</p>
          </div>

          <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition">
            <Zap className="w-3.5 h-3.5" /> Dispatch Ready
          </button>
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Popular Workstation Categories</h2>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All Categories &rarr;</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Ergonomic Desks', count: '142 Products' },
            { name: 'Precision Mice', count: '38 Products' },
            { name: 'Keyboards', count: '64 Products' },
            { name: 'Audio & ANC', count: '52 Products' },
            { name: 'Docks & Hubs', count: '29 Products' },
            { name: 'Cables & Power', count: '48 Products' },
          ].map((cat) => (
            <div key={cat.name} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:shadow-sm transition cursor-pointer text-center space-y-1">
              <p className="font-bold text-xs text-slate-900">{cat.name}</p>
              <p className="text-[10px] text-slate-500 font-medium">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Hardware Grid (Figma Design) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Real-Time Catalog & Hardware</h2>
            <p className="text-xs text-slate-500">Direct live feed from WH-01 (Synced 2s ago)</p>
          </div>
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button className="px-3 py-1 bg-blue-600 text-white rounded">All Gear</button>
            <button className="px-3 py-1 text-slate-600 hover:text-slate-900">Keyboards</button>
            <button className="px-3 py-1 text-slate-600 hover:text-slate-900">Mice & Pointers</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Apex Wireless Master Mouse',
              sku: 'APX-MS-881',
              price: '₹850',
              mrp: '₹1,299',
              discount: '34% Off',
              stock: 'In Stock (18 units available)',
              stockType: 'in_stock',
              rating: '4.8 (112)',
            },
            {
              title: 'Apex RGB Mechanical Keyboard',
              sku: 'APX-KB-740',
              price: '₹2,400',
              mrp: '₹3,499',
              discount: '31% Off',
              stock: 'Only 2 left in stock! (Order soon)',
              stockType: 'low_stock',
              rating: '4.9 (240)',
            },
            {
              title: 'Ergonomic Aluminum Laptop Stand',
              sku: 'APX-ST-01',
              price: '₹1,499',
              mrp: '₹2,199',
              discount: '32% Off',
              stock: 'In Stock (75 units available)',
              stockType: 'in_stock',
              rating: '4.7 (89)',
            },
            {
              title: 'UltraSpeed USB-C Multi-Hub 7-in-1',
              sku: 'APX-HB-12',
              price: '₹1,899',
              mrp: '₹2,499',
              discount: 'MRP Sync',
              stock: 'Out of Stock (Restocking in 2 days)',
              stockType: 'out_of_stock',
              rating: '4.6 (64)',
            },
          ].map((item) => (
            <div key={item.sku} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    item.stockType === 'in_stock' ? 'bg-emerald-100 text-emerald-800' :
                    item.stockType === 'low_stock' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.stockType === 'in_stock' ? 'In Stock' : item.stockType === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                  </span>
                  <span className="text-slate-400 font-mono">SKU: {item.sku}</span>
                </div>

                <div className="h-36 bg-slate-100 rounded-lg flex items-center justify-center font-mono text-slate-400 text-xs">
                  [ {item.title} ]
                </div>

                <div>
                  <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">{item.stock}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-slate-900">{item.price}</span>
                  <span className="text-xs text-slate-400 line-through ml-1.5">{item.mrp}</span>
                </div>
                {item.stockType !== 'out_of_stock' ? (
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add
                  </button>
                ) : (
                  <button className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold cursor-not-allowed">
                    Notify Me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
