'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Plus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Truck,
  RotateCcw,
  Sliders,
  Download,
  Filter,
  RefreshCw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  FileText,
} from 'lucide-react';
import { CreatePoModal } from '@/components/admin/modals/CreatePoModal';

export default function AdminInventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(['inv_1', 'inv_3']);
  const [activeTab, setActiveTab] = useState('all');

  const toggleSelectAll = () => {
    if (selectedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(['inv_1', 'inv_2', 'inv_3', 'inv_4', 'inv_5', 'inv_6', 'inv_7']);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* 4-Step Create PO Wizard Modal */}
      <CreatePoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inventory & Stock Levels</h1>
          <p className="text-xs text-slate-500">
            Real-time stock valuation, warehouse distribution, reserved allocation, and reorder alerts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
        >
          <Plus className="w-4 h-4" /> New Purchase Order
        </button>
      </div>

      {/* 6 Metric Overview Cards (Figma Grid Layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Products */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>TOTAL PRODUCTS</span>
            <Boxes className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">1,248</p>
          <p className="text-[10px] text-slate-500 font-medium">Valuation: <strong className="text-slate-700">₹42.8 Lakhs</strong></p>
        </div>

        {/* Card 2: In Stock */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>IN STOCK</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">982</p>
          <p className="text-[10px] text-emerald-600 font-semibold">Items healthy (78.6%)</p>
        </div>

        {/* Card 3: Low Stock */}
        <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-amber-700 font-medium">
            <span>LOW STOCK</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-amber-700">48</p>
          <p className="text-[10px] text-amber-700 font-semibold">Reorder suggested</p>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-red-600 font-medium">
            <span>OUT OF STOCK</span>
            <XCircle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <p className="text-xl font-extrabold text-red-600">21</p>
          <p className="text-[10px] text-red-600 font-semibold">0 units in bin</p>
        </div>

        {/* Card 5: Incoming */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>INCOMING</span>
            <Truck className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="text-xl font-extrabold text-blue-600">197</p>
          <p className="text-[10px] text-blue-600 font-semibold">In PO / transit (5 POs)</p>
        </div>

        {/* Card 6: Restocked Stock */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>RESTOCKED STOCK</span>
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">143</p>
          <p className="text-[10px] text-slate-500 font-medium">Active SO allocations</p>
        </div>
      </div>

      {/* Warehouse Capacity Utilization Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg font-semibold">
            {[
              { id: 'all', label: 'All Warehouses (4)' },
              { id: 'mumbai', label: 'Central Hub Mumbai' },
              { id: 'delhi', label: 'Delhi Logistics Hub' },
              { id: 'blr', label: 'Bangalore Depot' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded transition ${
                  activeTab === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs" /> Available: <strong>24,707 units (72%)</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-slate-300 rounded-xs" /> Reserved: <strong>143 units (11%)</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs" /> Incoming Transit: <strong>197 units (17%)</strong>
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
          <div className="bg-blue-600 h-full w-[72%]" title="Available (72%)" />
          <div className="bg-slate-300 h-full w-[11%]" title="Reserved (11%)" />
          <div className="bg-emerald-500 h-full w-[17%]" title="Incoming Transit (17%)" />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Capacity Utilization: 68.4% across 85,000 sq ft</span>
          <span>Operational Sync: 32s ago</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Category: All</option>
            <option>Peripherals</option>
            <option>Office Tech</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Brand: All</option>
            <option>Logitech</option>
            <option>Dell</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Status: All</option>
            <option>Active</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Stock Status: All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Warehouse: All</option>
            <option>Central Hub Mumbai</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Incoming: All</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Last Updated: Any</option>
          </select>
        </div>
      </div>

      {/* Batch Operations Toolbar (When Checkboxes Selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between text-xs flex-wrap gap-2">
          <span className="font-semibold text-blue-900">
            <span className="w-5 h-5 bg-blue-600 text-white rounded-full inline-flex items-center justify-center mr-2 text-[10px]">
              {selectedIds.length}
            </span>
            {selectedIds.length} Products Selected | Total Available Combined: <strong>144 units</strong>
          </span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Stock Adjustment
            </button>
            <button className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold">
              Change Min. Stock
            </button>
            <button className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export Selected
            </button>
            <button className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg font-semibold">
              Deactivate
            </button>
            <button onClick={() => setSelectedIds([])} className="text-blue-600 font-semibold hover:underline">
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Inventory and Stocks Data Grid Table (15 Columns with Horizontal Axis Scrollable Container matching Inventory and Stocks.pdf) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1350px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === 7}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-3">PRODUCT / BRAND</th>
                <th className="p-3">SKU</th>
                <th className="p-3">BARCODE</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">PURCHASED</th>
                <th className="p-3">SELLING</th>
                <th className="p-3">CURRENT</th>
                <th className="p-3">RESERVED</th>
                <th className="p-3">AVAILABLE</th>
                <th className="p-3">MIN</th>
                <th className="p-3">STOCK STATUS</th>
                <th className="p-3">INCOMING (PO)</th>
                <th className="p-3">LAST UPDATED</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  id: 'inv_1',
                  name: 'Logitech MX Master 3S',
                  brand: 'Logitech • Performance Series',
                  sku: 'LOG-MX3-BLK',
                  barcode: '890123456789',
                  cat: 'Peripherals',
                  purchased: '₹6,200',
                  selling: '₹8,800',
                  current: 128,
                  reserved: 12,
                  available: '116 units',
                  min: 20,
                  status: 'In Stock',
                  statusBg: 'bg-emerald-100 text-emerald-800',
                  incoming: '50 units',
                  lastUpdated: '27 Sep 2026 10:42 AM',
                },
                {
                  id: 'inv_2',
                  name: 'Dell Pro Wireless Keyboard KB500',
                  brand: 'Dell • Office Standard',
                  sku: 'DEL-KB-500',
                  barcode: '890123456790',
                  cat: 'Office Tech',
                  purchased: '₹1,450',
                  selling: '₹3,150',
                  current: 15,
                  reserved: 5,
                  available: '10 units',
                  min: 20,
                  status: '10 units Below min.',
                  statusBg: 'bg-amber-100 text-amber-800',
                  incoming: '50 units',
                  lastUpdated: '27 Sep 2026 09:15 AM',
                },
                {
                  id: 'inv_3',
                  name: 'Anker 65W GaN Charger',
                  brand: 'Logitech • Performance Series',
                  sku: 'ANK-GAN-65',
                  barcode: '890123456791',
                  cat: 'Accessories',
                  purchased: '₹1,800',
                  selling: '₹3,000',
                  current: 0,
                  reserved: 0,
                  available: '0 units',
                  min: 10,
                  status: '0 units',
                  statusBg: 'bg-red-100 text-red-700',
                  incoming: '20 incoming',
                  lastUpdated: '26 Sep 2026 04:30 AM',
                },
                {
                  id: 'inv_4',
                  name: 'UltraFlex USB-C Braided Cable 2M',
                  brand: 'BusinessERP Core • FastData',
                  sku: 'CAB-UC-02M',
                  barcode: '890123456792',
                  cat: 'Cables',
                  purchased: '₹180',
                  selling: '₹650',
                  current: 35,
                  reserved: 6,
                  available: '28 units',
                  min: 15,
                  status: 'In Stock',
                  statusBg: 'bg-emerald-100 text-emerald-800',
                  incoming: '20 units',
                  lastUpdated: '26 Sep 2026 06:30 AM',
                },
                {
                  id: 'inv_5',
                  name: 'Ergonomic Aluminum Laptop Stand',
                  brand: 'BusinessERP Core • Ergonomics',
                  sku: 'STD-ALU-PRO',
                  barcode: '890123456793',
                  cat: 'Furniture',
                  purchased: '₹1,100',
                  selling: '₹2,700',
                  current: 12,
                  reserved: 4,
                  available: '8 units',
                  min: 25,
                  status: '10 units Below min.',
                  statusBg: 'bg-amber-100 text-amber-800',
                  incoming: '50 units',
                  lastUpdated: '27 Sep 2026 10:42 AM',
                },
                {
                  id: 'inv_6',
                  name: 'Sony WH-1000XM5 Headphones',
                  brand: 'Sony • Premium Noise-Cancelling',
                  sku: 'SNY-XM5-SLV',
                  barcode: '890123456794',
                  cat: 'Audio',
                  purchased: '₹19,500',
                  selling: '₹24,500',
                  current: 58,
                  reserved: 12,
                  available: '46 units',
                  min: 20,
                  status: 'In Stock',
                  statusBg: 'bg-emerald-100 text-emerald-800',
                  incoming: '-',
                  lastUpdated: '27 Sep 2026 10:42 AM',
                },
                {
                  id: 'inv_7',
                  name: 'Smart Surge Protector 6-Socket',
                  brand: 'BusinessERP Core • SafePower',
                  sku: 'SRG-6S-IND',
                  barcode: '890123456795',
                  cat: 'Electricals',
                  purchased: '₹650',
                  selling: '₹1,600',
                  current: 18,
                  reserved: 8,
                  available: '10 units',
                  min: 10,
                  status: '10 units Below min.',
                  statusBg: 'bg-amber-100 text-amber-800',
                  incoming: '100 units',
                  lastUpdated: '27 Sep 2026 10:42 AM',
                },
              ].map((row) => {
                const isChecked = selectedIds.includes(row.id);
                return (
                  <tr key={row.id} className={`hover:bg-slate-50 transition ${isChecked ? 'bg-blue-50/40' : ''}`}>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(row.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 font-mono text-[10px] shrink-0">
                          BIN
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
                          <p className="text-[10px] text-slate-500">{row.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-blue-600 font-bold">{row.sku}</td>
                    <td className="p-3 font-mono text-slate-500">{row.barcode}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium text-[11px]">
                        {row.cat}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{row.purchased}</td>
                    <td className="p-3 font-bold text-emerald-600">{row.selling}</td>
                    <td className="p-3 font-bold text-slate-900">{row.current}</td>
                    <td className="p-3 font-medium text-slate-500">{row.reserved}</td>
                    <td className="p-3 font-extrabold text-blue-600">{row.available}</td>
                    <td className="p-3 text-slate-500 font-medium">{row.min}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.statusBg}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-blue-600">{row.incoming}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{row.lastUpdated}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition"
                        title="Action Menu"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Showing <strong>1 to 7</strong> of <strong>1,248</strong> products</span>
          <div className="flex items-center space-x-2">
            <button className="p-1 border border-slate-300 rounded hover:bg-white text-slate-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 bg-blue-600 text-white font-bold rounded">1</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">2</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">3</span>
            <span>...</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">125</span>
            <button className="p-1 border border-slate-300 rounded hover:bg-white text-slate-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
