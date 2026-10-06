'use client';

import React, { useState } from 'react';
import {
  Plus,
  Download,
  Filter,
  RefreshCw,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText,
  Truck,
  Printer,
  Send,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CreatePoModal } from '@/components/admin/modals/CreatePoModal';

export default function PurchaseOrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(['po_124', 'po_123']);

  const toggleSelectAll = () => {
    if (selectedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(['po_124', 'po_123', 'po_120', 'po_121', 'po_125']);
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
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
            PO PROCUREMENT LIFECYCLE
          </span>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Purchase Orders</h1>
          <p className="text-xs text-slate-500">
            Create, track and manage supplier purchase orders, deliveries and receiving status.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition">
            <Download className="w-4 h-4 text-slate-500" /> Export CSV / Excel
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Create Purchase Order
          </button>
        </div>
      </div>

      {/* 6 Metric Overview Cards (Figma Grid Layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total POs */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>TOTAL POS</span>
            <FileText className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">1,248</p>
          <p className="text-[10px] text-emerald-600 font-semibold">+8.2% this mo</p>
        </div>

        {/* Card 2: Pending Approval */}
        <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-amber-700 font-medium">
            <span>PENDING APPROVAL</span>
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">24</span>
          </div>
          <p className="text-xl font-extrabold text-amber-700">24</p>
          <p className="text-[10px] text-slate-500 font-medium">Requires signoff</p>
        </div>

        {/* Card 3: Pending Delivery */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>PENDING DELIVERY</span>
            <Truck className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">32</p>
          <p className="text-[10px] text-blue-600 font-semibold">In transit</p>
        </div>

        {/* Card 4: Delayed */}
        <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-red-600 font-medium">
            <span>DELAYED</span>
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <p className="text-xl font-extrabold text-red-600">7</p>
          <p className="text-[10px] text-red-600 font-semibold">Exceeds SLA</p>
        </div>

        {/* Card 5: Partial Received */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>PARTIAL RECEIVED</span>
            <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">12</p>
          <p className="text-[10px] text-slate-500 font-medium">Active GRN</p>
        </div>

        {/* Card 6: Total Value */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>TOTAL VALUE</span>
            <span className="text-[10px] font-bold text-slate-400">FY26 Q3</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">₹48.5 Lakhs</p>
          <p className="text-[10px] text-slate-500">Procurement spend</p>
        </div>
      </div>

      {/* Filter Tabs Bar (Figma Design) */}
      <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'all', label: 'All', count: 1248 },
          { id: 'draft', label: 'Draft', count: 24 },
          { id: 'pending_approval', label: 'Pending Approval', count: 18 },
          { id: 'approved', label: 'Approved', count: 42 },
          { id: 'pending_delivery', label: 'Pending Delivery', count: 32 },
          { id: 'partially_received', label: 'Partially Received', count: 12 },
          { id: 'received', label: 'Received', count: 145 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Active POs & Escalations Grid (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Purchase Orders List (1 Column) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Active Purchase Orders</h3>
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">View All (88)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-600">PO-2026-00124</p>
                <p className="text-slate-700 font-medium">Apex Technologies</p>
                <p className="text-[10px] text-slate-400">3 SKUs • Due 30 Sep</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-slate-900">₹1,43,600</p>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded text-[10px]">
                  Pending Delivery
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-600">PO-2026-00123</p>
                <p className="text-slate-700 font-medium">ABC Office Supplies</p>
                <p className="text-[10px] text-red-500 font-semibold">8 SKUs • Delayed 5d</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-slate-900">₹86,400</p>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded text-[10px]">
                  Delayed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delayed POs Escalation Box (1 Column) */}
        <div className="bg-red-50/50 p-4 rounded-xl border border-red-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-red-700">
            <div className="flex items-center space-x-2 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Delayed POs Escalation</span>
            </div>
            <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">
              7 Exceeding SLA
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-red-200 text-xs space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-red-600">PO-2026-00118 Critical Backlog</p>
                <p className="text-[11px] text-slate-600">Supplier: ABC Office Supplies</p>
              </div>
              <span className="px-1.5 py-0.5 bg-red-600 text-white font-bold rounded text-[10px]">
                5 Days Delayed
              </span>
            </div>
            <p className="text-sm font-extrabold text-slate-900 pt-1">₹72,500</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex-1 py-1.5 bg-white border border-red-200 text-red-700 hover:bg-red-100 font-bold text-xs rounded-lg transition">
              View All Delayed
            </button>
            <button className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1">
              <Send className="w-3.5 h-3.5" /> Send Reminders
            </button>
          </div>
        </div>

        {/* Recent Purchase History (1 Column) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900">Recent Purchase History</h3>
            <span className="text-[10px] text-slate-400 font-medium">Last 48 Hours</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
            <p className="text-[10px] font-semibold text-slate-500 uppercase">WEEKLY INTAKE RATE</p>
            <p className="text-xl font-extrabold text-slate-900">94.8%</p>
            <p className="text-[11px] text-emerald-600 font-semibold">On-time GRN reconciliation</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search PO number, supplier, SKU, invoice..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Supplier: All Suppliers</option>
            <option>Apex Technologies Pvt Ltd</option>
            <option>ABC Office Supplies</option>
          </select>

          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Warehouse: Central Hub - Mumbai</option>
            <option>Delhi Logistics Hub</option>
          </select>

          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Date Range: This Month</option>
          </select>

          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none">
            <option>Payment: All</option>
            <option>Paid</option>
            <option>Partially Paid</option>
          </select>

          <button className="px-3 py-1.5 text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Action Toolbar (When Rows Checked) */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between text-xs flex-wrap gap-2 shadow-md">
          <span className="font-semibold">
            Selected: <strong>{selectedIds.length} Purchase Orders</strong> | Combined Value: <strong>₹2,30,000</strong>
          </span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export Selected
            </button>
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold flex items-center gap-1">
              <Printer className="w-3.5 h-3.5" /> Print Selected
            </button>
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold flex items-center gap-1">
              <Send className="w-3.5 h-3.5" /> Send Supplier Reminder
            </button>
            <button className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg font-bold">
              Cancel Selected
            </button>
          </div>
        </div>
      )}

      {/* Main Purchase Orders Data Grid Table (Figma Design) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === 5}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-3">PO NUMBER</th>
                <th className="p-3">SUPPLIER</th>
                <th className="p-3">PO DATE</th>
                <th className="p-3">EXPECTED DELIVERY</th>
                <th className="p-3">ITEMS</th>
                <th className="p-3">ORDERED / RECEIVED</th>
                <th className="p-3">TOTAL AMOUNT</th>
                <th className="p-3">PAYMENT STATUS</th>
                <th className="p-3">PO STATUS</th>
                <th className="p-3">CREATED BY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  id: 'po_124',
                  number: 'PO-2026-00124',
                  supplier: 'Apex Technologies Pvt Ltd',
                  code: 'Code: SUP-001 • GSTIN Verified',
                  date: '27 Sep 2026',
                  expected: '30 Sep 2026',
                  expectedTag: 'On Schedule',
                  expectedTagColor: 'text-emerald-600',
                  items: '5 SKUs',
                  orderedRec: '40 / 85 units',
                  pct: '47%',
                  pctColor: 'bg-blue-600',
                  amount: '₹1,43,600',
                  payStatus: 'Partially Paid',
                  payColor: 'bg-blue-100 text-blue-700',
                  poStatus: 'Partially Received',
                  poColor: 'bg-blue-100 text-blue-700',
                  createdBy: 'Admin User',
                },
                {
                  id: 'po_123',
                  number: 'PO-2026-00123',
                  supplier: 'ABC Office Supplies',
                  code: 'Code: SUP-014 • Delivery SLA at Risk',
                  date: '22 Sep 2026',
                  expected: '24 Sep 2026',
                  expectedTag: '5 days late',
                  expectedTagColor: 'text-red-600 font-bold',
                  items: '8 SKUs',
                  orderedRec: '0 / 64 units',
                  pct: '0%',
                  pctColor: 'bg-red-500',
                  amount: '₹86,400',
                  payStatus: 'Overdue',
                  payColor: 'bg-red-100 text-red-700',
                  poStatus: 'Delayed',
                  poColor: 'bg-red-100 text-red-700',
                  createdBy: 'John Doe',
                },
                {
                  id: 'po_120',
                  number: 'PO-2026-00120',
                  supplier: 'Tech Distributors Corp',
                  code: 'Code: SUP-008 • Preferred Partner',
                  date: '18 Sep 2026',
                  expected: '25 Sep 2026',
                  expectedTag: 'Completed',
                  expectedTagColor: 'text-emerald-600',
                  items: '12 SKUs',
                  orderedRec: '120 / 120 units',
                  pct: '100%',
                  pctColor: 'bg-emerald-500',
                  amount: '₹3,84,100',
                  payStatus: 'Paid',
                  payColor: 'bg-emerald-100 text-emerald-700',
                  poStatus: 'Received',
                  poColor: 'bg-emerald-100 text-emerald-700',
                  createdBy: 'Sarah J.',
                },
                {
                  id: 'po_121',
                  number: 'PO-2026-00121',
                  supplier: 'Global Silicon Logistics',
                  code: 'Code: SUP-023 • High Value Order',
                  date: '26 Sep 2026',
                  expected: '08 Oct 2026',
                  expectedTag: 'Awaiting Signoff',
                  expectedTagColor: 'text-amber-600',
                  items: '18 SKUs',
                  orderedRec: '0 / 450 units',
                  pct: '0%',
                  pctColor: 'bg-amber-500',
                  amount: '₹8,92,000',
                  payStatus: 'Pending',
                  payColor: 'bg-slate-100 text-slate-600',
                  poStatus: 'Pending Approval',
                  poColor: 'bg-amber-100 text-amber-800',
                  createdBy: 'Admin User',
                },
                {
                  id: 'po_125',
                  number: 'PO-2026-00125',
                  supplier: 'Paramount Electronics',
                  code: 'Code: SUP-031 • Unassigned Terms',
                  date: '28 Sep 2026',
                  expected: 'TBD',
                  expectedTag: 'Incomplete Form',
                  expectedTagColor: 'text-slate-400',
                  items: '2 SKUs',
                  orderedRec: 'Draft Specification',
                  pct: '0%',
                  pctColor: 'bg-slate-300',
                  amount: '₹38,200',
                  payStatus: 'Unbilled',
                  payColor: 'bg-slate-100 text-slate-500',
                  poStatus: 'Draft',
                  poColor: 'bg-slate-100 text-slate-700',
                  createdBy: 'John Doe',
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
                    <td className="p-3 font-bold text-blue-600 font-mono">{row.number}</td>
                    <td className="p-3">
                      <p className="font-bold text-slate-900 leading-tight">{row.supplier}</p>
                      <p className="text-[10px] text-slate-400">{row.code}</p>
                    </td>
                    <td className="p-3 text-slate-500 font-medium">{row.date}</td>
                    <td className="p-3">
                      <p className="font-semibold text-slate-900">{row.expected}</p>
                      <p className={`text-[10px] ${row.expectedTagColor}`}>{row.expectedTag}</p>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{row.items}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-700">{row.orderedRec}</span>
                        <span className="font-bold text-slate-900">{row.pct}</span>
                      </div>
                      <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${row.pctColor}`} style={{ width: row.pct }} />
                      </div>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">{row.amount}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.payColor}`}>
                        {row.payStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.poColor}`}>
                        {row.poStatus}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-600">{row.createdBy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Showing <strong>1–25</strong> of <strong>1,248</strong> purchase orders</span>
          <div className="flex items-center space-x-2">
            <button className="p-1 border border-slate-300 rounded hover:bg-white text-slate-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 bg-blue-600 text-white font-bold rounded">1</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">2</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">3</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">4</span>
            <span>...</span>
            <span className="px-2.5 py-1 hover:bg-slate-200 rounded font-medium">50</span>
            <button className="p-1 border border-slate-300 rounded hover:bg-white text-slate-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Accounting Rule Footer Banner (Figma Requirement) */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start space-x-3 text-xs text-blue-950">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900">ERP Inventory Accounting Rule:</p>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Purchase Order issuance does not increment physical warehouse inventory levels or affect balance sheet stock valuation. Stock ledger updates and ledger journals execute exclusively upon Goods Received Note (GRN) verification and quality acceptance.
          </p>
        </div>
      </div>
    </div>
  );
}
