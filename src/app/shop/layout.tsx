import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Ticker Bar (Figma Design) */}
      <div className="bg-blue-600 text-white text-[11px] py-1.5 px-4 font-medium flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-6 whitespace-nowrap mx-auto">
          <span>⚡ Same-Day Delivery</span>
          <span>•</span>
          <span>Available for Bangalore, Mumbai & NCR Metro Hubs</span>
          <span>•</span>
          <span>🟢 Real-Time ERP Inventory Hooks</span>
          <span>•</span>
          <span>📄 GST Compliant Invoicing for Business</span>
        </div>
      </div>

      {/* Main Storefront Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/shop" className="flex items-center space-x-2.5">
            <img
              src="/images/mazna-logo.png"
              alt="MAZNA ENTERPRISES"
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col text-left font-sans leading-tight hidden sm:flex">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">MAZNA</span>
              <span className="font-extrabold text-blue-600 text-xs tracking-tight">ENTERPRISES</span>
            </div>
          </Link>

          {/* Search Input */}
          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search products, SKU, categories, industrial supplies..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Nav Links & Cart */}
          <div className="flex items-center space-x-6 text-xs font-semibold text-slate-700">
            <Link href="/shop" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/shop/catalog" className="hover:text-blue-600 transition hidden md:inline">Catalog</Link>
            <Link href="/shop/track" className="hover:text-blue-600 transition hidden md:inline">Track Order</Link>
            
            {/* Cart Drawer Trigger Button */}
            <Link
              href="/shop/cart"
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center space-x-2 transition shadow-xs"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              <span className="w-5 h-5 bg-blue-800 text-white rounded-full flex items-center justify-center text-[10px]">
                3
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Storefront Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">{children}</main>

      {/* Storefront Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 MAZNA ENTERPRISES Group. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-medium">
            <Link href="#" className="hover:text-slate-900">Terms</Link>
            <Link href="#" className="hover:text-slate-900">Privacy</Link>
            <Link href="#" className="hover:text-slate-900">GST Compliance</Link>
            <Link href="/admin/dashboard" className="text-blue-600 font-bold hover:underline">
              Employee ERP Portal &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
