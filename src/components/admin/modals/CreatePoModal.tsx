'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  AlertCircle,
  Package,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Search,
  Building2,
  Calendar,
  Truck,
  CreditCard,
  FileText,
} from 'lucide-react';

interface CreatePoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePoModal: React.FC<CreatePoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: Supplier & Order Details
  const [poNumber] = useState('PO-2026-00126');
  const [poDate, setPoDate] = useState('2026-10-01');
  const [expectedDelivery, setExpectedDelivery] = useState('2026-10-15');
  const [supplier, setSupplier] = useState('Apex Technologies Pvt Ltd');
  const [warehouse, setWarehouse] = useState('Central Hub Mumbai');
  const [shippingMethod, setShippingMethod] = useState('Express Logistics');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [notes, setNotes] = useState('');

  // Step 2 State: Selected Products
  const [items, setItems] = useState([
    { id: '1', name: 'Logitech MX Master 3S', sku: 'LOG-MX3-BLK', qty: 50, price: 6200, tax: 18, discount: 0 },
    { id: '2', name: 'Dell Pro Wireless Keyboard KB500', sku: 'DEL-KB-500', qty: 30, price: 1450, tax: 18, discount: 0 },
  ]);

  // Step 3 Confirmation Checkbox
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleDiscard = () => {
    // Turning off / closing the PO modal cleanly
    setStep(1);
    setIsConfirmed(false);
    onClose();
  };

  const calculateSubtotal = () =>
    items.reduce((acc, item) => acc + item.qty * item.price, 0);

  const calculateTax = () =>
    items.reduce((acc, item) => acc + (item.qty * item.price * (item.tax / 100)), 0);

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">
                STEP {step} OF 4
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {step === 1 && 'Create Purchase Order — PO & Supplier'}
                {step === 2 && 'Create Purchase Order — Products & Quantities'}
                {step === 3 && 'Create Purchase Order — Review & Submit'}
                {step === 4 && 'Purchase Order Created Successfully'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === 1 && 'Select supplier, warehouse destination, and procurement delivery terms.'}
              {step === 2 && 'Search and add SKU items, set order quantities and cost prices.'}
              {step === 3 && 'Verify procurement line totals, tax breakdown, and submit PO for manager approval.'}
              {step === 4 && 'Purchase order has been assigned and queued for approval.'}
            </p>
          </div>

          <button
            onClick={handleDiscard}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            title="Close / Discard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Wizard Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STEP 1: PO & SUPPLIER */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company (Issuer)</label>
                  <input
                    type="text"
                    disabled
                    value="MAZNA ENTERPRISES"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">PO Number (Auto)</label>
                  <input
                    type="text"
                    disabled
                    value={poNumber}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold text-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">PO Date</label>
                  <input
                    type="date"
                    value={poDate}
                    onChange={(e) => setPoDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={expectedDelivery}
                    onChange={(e) => setExpectedDelivery(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supplier</label>
                  <select
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option>Apex Technologies Pvt Ltd (Code: SUP-001)</option>
                    <option>ABC Office Supplies (Code: SUP-014)</option>
                    <option>Tech Distributors Corp (Code: SUP-008)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Warehouse Destination</label>
                  <select
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option>Central Hub Mumbai</option>
                    <option>Delhi Logistics Hub</option>
                    <option>Bangalore Depot</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shipping Method</label>
                  <input
                    type="text"
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option>Net 30</option>
                    <option>Net 15</option>
                    <option>Advance 100%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs">Supplier & Internal Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special handling instructions or delivery requirements..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: PRODUCTS & QUANTITIES */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Inventory Accounting Alert (Figma Requirement) */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start space-x-2 text-xs text-blue-900">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Inventory Accounting Notice:</p>
                  <p className="text-[11px] text-blue-700">
                    Creating this Purchase Order will <strong>NOT</strong> increase physical warehouse stock. Stock increases only after Goods Received Note (GRN) verification.
                  </p>
                </div>
              </div>

              {/* Selected Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">PRODUCT</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">QTY</th>
                      <th className="p-3">UNIT PRICE</th>
                      <th className="p-3">TAX %</th>
                      <th className="p-3">TOTAL</th>
                      <th className="p-3 text-right">REMOVE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="p-3 font-semibold text-slate-900">{item.name}</td>
                        <td className="p-3 font-mono text-blue-600 font-bold">{item.sku}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              const updated = [...items];
                              updated[index].qty = newQty;
                              setItems(updated);
                            }}
                            className="w-16 px-2 py-1 border border-slate-200 rounded font-bold text-slate-900 text-center"
                          />
                        </td>
                        <td className="p-3 font-bold text-slate-900">₹{item.price}</td>
                        <td className="p-3 font-medium text-slate-700">{item.tax}%</td>
                        <td className="p-3 font-bold text-slate-900">
                          ₹{(item.qty * item.price * (1 + item.tax / 100)).toLocaleString()}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setItems(items.filter((i) => i.id !== item.id))}
                            className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & CREATE */}
          {step === 3 && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <p className="text-slate-500 font-medium">SUPPLIER</p>
                  <p className="font-bold text-slate-900 text-sm">{supplier}</p>
                  <p className="text-slate-500 text-[11px]">Warehouse: {warehouse}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">PO DETAILS</p>
                  <p className="font-bold text-blue-600 text-sm">{poNumber}</p>
                  <p className="text-slate-500 text-[11px]">Expected: {expectedDelivery} • Terms: {paymentTerms}</p>
                </div>
              </div>

              {/* Financial Calculation Summary */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} line items)</span>
                  <span className="font-bold text-slate-900">₹{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated GST Tax (18%)</span>
                  <span className="font-bold text-slate-900">₹{calculateTax().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-200 pt-2">
                  <span>Grand Total Spend</span>
                  <span className="text-blue-600">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">
                  I confirm that the purchase order details, pricing, and supplier items are correct.
                </span>
              </label>
            </div>
          )}

          {/* STEP 4: SUCCESS STATE */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Purchase Order Created</h3>
                <p className="text-xs text-slate-500">
                  PO Number: <strong className="text-blue-600 font-mono">{poNumber}</strong>
                </p>
                <p className="text-xs text-slate-500">Supplier: <strong>{supplier}</strong></p>
                <p className="text-sm font-bold text-slate-900">Total Spend: ₹{calculateTotal().toLocaleString()}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-800 font-bold rounded-full text-xs">
                  Status: Pending Approval
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          {step < 4 ? (
            <>
              {/* Discard Button cleanly closes / turns off modal state */}
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold rounded-lg transition"
              >
                Discard
              </button>

              <div className="flex items-center space-x-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as any)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}

                {step < 3 && (
                  <button
                    type="button"
                    onClick={() => setStep((step + 1) as any)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                  >
                    Save & Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="button"
                    disabled={!isConfirmed}
                    onClick={() => setStep(4)}
                    className={`px-5 py-2 text-white font-bold rounded-lg transition shadow-xs flex items-center gap-1 ${
                      isConfirmed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    Create Purchase Order
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition"
              >
                Create Another
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
