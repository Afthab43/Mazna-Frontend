'use client';

import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  Truck,
  FileText,
  Users,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Platform overview</h1>
        <p className="text-xs text-slate-500">
          Today&apos;s operating picture across inventory, purchases, fulfillment, and revenue.
        </p>
      </div>

      {/* 8 Metric Overview Cards (Figma Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Sale */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>TODAY&apos;S SALE</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">₹48,650</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center">
              +12.5% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Target: ₹50,000</span>
            <span className="font-semibold text-emerald-600">97.3% met</span>
          </div>
        </div>

        {/* Card 2: Today's Orders */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>TODAY&apos;S ORDERS</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">126</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center">
              +8.2% pace
            </span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Pending dispatch</span>
            <span className="font-semibold text-amber-600">18 orders</span>
          </div>
        </div>

        {/* Card 3: Total Products */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>TOTAL PRODUCTS</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">1,238</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Active SKUs</span>
            <span className="font-semibold text-slate-700">982 available</span>
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-red-600 font-medium">
            <span>LOW STOCK</span>
            <span className="p-1 bg-red-50 text-red-600 rounded">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-red-600">18</span>
            <span className="text-xs text-red-500 font-semibold">Needs attention</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Critical items</span>
            <span className="font-semibold text-red-600">5 critical</span>
          </div>
        </div>

        {/* Card 5: Pending Deliveries */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>PENDING DELIVERIES</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">32</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Out for delivery</span>
            <span className="font-semibold text-blue-600">14 today</span>
          </div>
        </div>

        {/* Card 6: Pending POs */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>PENDING POs</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">12</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Awaiting signoff</span>
            <span className="font-semibold text-amber-600">4 pending</span>
          </div>
        </div>

        {/* Card 7: Total Customers */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>TOTAL CUSTOMERS</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">126</span>
            <span className="text-xs text-emerald-600 font-semibold">+8.2%</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Repeat rate</span>
            <span className="font-semibold text-emerald-600">89% active</span>
          </div>
        </div>

        {/* Card 8: Overdue Value */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>OVERDUE VALUE</span>
            <span className="p-1 bg-amber-50 text-amber-600 rounded">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">₹24,500</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Overdue invoices</span>
            <span className="font-semibold text-red-600">6 invoices</span>
          </div>
        </div>
      </div>

      {/* Quick Shortcuts Bar (Figma Design) */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="font-semibold text-slate-700 uppercase text-[10px] tracking-wider px-2">
          Quick Shortcuts
        </span>
        <div className="flex items-center space-x-2 flex-wrap">
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-1 transition">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1 transition">
            <Plus className="w-3.5 h-3.5" /> Create PO
          </button>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1 transition">
            <Plus className="w-3.5 h-3.5" /> Create Sales Order
          </button>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1 transition">
            <Plus className="w-3.5 h-3.5" /> Add Supplier
          </button>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1 transition">
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        </div>
      </div>

      {/* Sales Trajectory & Order Lifecycle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trajectory Section (2 Columns) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Sales Trajectory & Revenue Overview</h2>
              <p className="text-xs text-slate-500">Aggregated gross order values and fulfillment volume trends.</p>
            </div>
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              <button className="px-2.5 py-1 rounded bg-white shadow-xs text-slate-900">30 Days</button>
              <button className="px-2.5 py-1 rounded text-slate-600 hover:text-slate-900">This Year</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500">TOTAL SALES (30D)</p>
              <p className="text-lg font-bold text-slate-900">₹4,85,600</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">TOTAL ORDERS</p>
              <p className="text-lg font-bold text-slate-900">1,245</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">AVG ORDER VALUE (AOV)</p>
              <p className="text-lg font-bold text-blue-600">₹390</p>
            </div>
          </div>

          {/* Chart Placeholder Box */}
          <div className="h-48 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs font-mono">
            [ Recharts Sales Trajectory Line Chart ]
          </div>
        </div>

        {/* Order Lifecycle Progress Section (1 Column) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Order Lifecycle</h2>
            <p className="text-xs text-slate-500">Current fulfillment funnel (270 total)</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Pending (18)</span>
              <span className="text-slate-600 font-semibold">Confirmed (24)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600">Processing (31)</span>
              <span className="text-slate-600 font-semibold">Shipped (28)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-blue-600 font-semibold">Out for Delivery (14)</span>
              <span className="text-emerald-600 font-bold">Delivered (145)</span>
            </div>
            <div className="flex justify-between text-xs border-t border-slate-100 pt-2">
              <span className="text-red-500">Cancelled (8)</span>
              <span className="text-amber-600">Returned / RTO (4)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sales Orders Table & Low Stock Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales Orders Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recent Sales Orders</h2>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View All Orders &rarr;
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="p-3">ORDER ID</th>
                  <th className="p-3">CUSTOMER</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">ITEMS</th>
                  <th className="p-3">AMOUNT</th>
                  <th className="p-3">PAYMENT</th>
                  <th className="p-3">FULFILLMENT</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '#ORD-10245', name: 'Rahul Sharma', date: '25 Sep 2026', items: 3, amount: '₹2,450', pay: 'Paid', status: 'Processing' },
                  { id: '#ORD-10244', name: 'Priya Patel', date: '25 Sep 2026', items: 1, amount: '₹899', pay: 'Paid', status: 'Shipped' },
                  { id: '#ORD-10243', name: 'Amit Verma', date: '24 Sep 2026', items: 5, amount: '₹5,200', pay: 'Pending', status: 'Pending' },
                  { id: '#ORD-10242', name: 'Sneha Rao', date: '24 Sep 2026', items: 2, amount: '₹1,450', pay: 'Paid', status: 'Delivered' },
                  { id: '#ORD-10241', name: 'Vikram Singh', date: '24 Sep 2026', items: 4, amount: '₹3,890', pay: 'Refunded', status: 'Cancelled' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-bold text-blue-600">{row.id}</td>
                    <td className="p-3 font-medium text-slate-900">{row.name}</td>
                    <td className="p-3 text-slate-500">{row.date}</td>
                    <td className="p-3 text-slate-700 font-semibold">{row.items}</td>
                    <td className="p-3 font-bold text-slate-900">{row.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.pay === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        row.pay === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {row.pay}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{row.status}</td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Audit Trail (1 Column) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Operational Activity</h2>
            <span className="text-[10px] text-slate-400 font-mono">LIVE FEED</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex space-x-3 items-start">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Wireless Mouse reached critical stock</p>
                <p className="text-[10px] text-slate-400">10 mins ago</p>
              </div>
            </div>
            <div className="flex space-x-3 items-start border-t border-slate-100 pt-2">
              <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">PO #PO-1021 received from ABC Suppliers</p>
                <p className="text-[10px] text-slate-400">45 mins ago</p>
              </div>
            </div>
            <div className="flex space-x-3 items-start border-t border-slate-100 pt-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Payment ₹2,450 settled for Order #ORD-10240</p>
                <p className="text-[10px] text-slate-400">1 hr ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
