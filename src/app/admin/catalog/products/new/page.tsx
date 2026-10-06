'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api-client';
import ProductImageUploader from './ProductImageUploader';
import {
  Package,
  Barcode,
  Upload,
  CheckCircle2,
  Trash2,
  Building2,
  Calculator,
  Landmark,
  Boxes,
  Check,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info,
} from 'lucide-react';

export default function AddNewProductPage() {
  const router = useRouter();

  // 01. Basic Information State
  const [productTitle, setProductTitle] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('Electronics > Computer Peripherals');
  const [brand, setBrand] = useState('Logitech');
  const [description, setDescription] = useState('');
  const [descriptionTab, setDescriptionTab] = useState<'editor' | 'preview'>('editor');

  // 02. Pricing & Commercials State
  const [purchaseCost, setPurchaseCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [b2bPrice, setB2bPrice] = useState('');

  // 03. Tax Configuration State
  const [gstRate, setGstRate] = useState('18');
  const [manualTax, setManualTax] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [taxIncluded, setTaxIncluded] = useState(true);
  const [showHsnModal, setShowHsnModal] = useState(false);

  // 04. Inventory & Stock Rules State
  const [openingStock, setOpeningStock] = useState('');
  const [minAlertLevel, setMinAlertLevel] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [reorderBatch, setReorderBatch] = useState('');
  const [warehouseBin, setWarehouseBin] = useState('');

  // Publishing State
  const [publishState, setPublishState] = useState<'active' | 'draft' | 'inactive'>('active');
  const [channels, setChannels] = useState({
    online: true,
    pos: true,
    b2b: true,
  });

  const [productId, setProductId] = useState<string | null>(null);

  // Images state
  const [images, setImages] = useState<any[]>([]);

  // Load Edit Data
  useEffect(() => {
    const editData = sessionStorage.getItem('editProduct');
    if (editData) {
      const p = JSON.parse(editData);
      setProductId(p.id);
      setProductTitle(p.name);
      setSku(p.sku);
      setBarcode(p.barcode || '');
      setCategory(p.categoryName || '');
      setBrand(p.brandName || '');
      setPurchaseCost((p.costPricePaise / 100).toString());
      setSellingPrice((p.sellingPricePaise / 100).toString());
      setB2bPrice(p.b2bPricePaise ? (p.b2bPricePaise / 100).toString() : '');
      if (p.taxRate) {
        setGstRate(p.taxRate.toString());
      }
      setHsnCode(p.hsnCode || '');
      setOpeningStock(p.stock ? p.stock.toString() : '');
      if (p.status) {
        setPublishState(p.status.toLowerCase() as any);
      }
      if (p.images && Array.isArray(p.images)) {
        setImages(p.images);
      }
      // cleanup
      sessionStorage.removeItem('editProduct');
    }
  }, []);

  // Submission Toast State
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculated Spread Calculations
  const costNum = parseFloat(purchaseCost) || 0;
  const sellNum = parseFloat(sellingPrice) || 0;
  const unitProfit = Math.max(0, sellNum - costNum);
  const marginPercent = sellNum > 0 ? ((unitProfit / sellNum) * 100).toFixed(1) : '0.0';
  const markupFactor = costNum > 0 ? (sellNum / costNum).toFixed(2) : '1.00';
  const estimatedAssetValue = (parseFloat(openingStock) || 0) * sellNum;

  const autoGenerateSku = () => {
    const cleanName = productTitle.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    setSku(`# MZN-${cleanName}-${randomNum}`);
  };

  const handleSaveProduct = async () => {
    setIsLoading(true);

    const costPaise = Math.round(costNum * 100);
    const sellingPaise = Math.round(sellNum * 100);

    const payload = {
      name: productTitle,
      sku: sku.replace('#', '').trim(),
      barcode,
      unit: 'PCS',
      costPricePaise: costPaise,
      sellingPricePaise: sellingPaise,
      mrpPaise: sellingPaise,
      b2bPricePaise: b2bPrice ? Math.round(parseFloat(b2bPrice) * 100) : undefined,
      description,
      status: publishState.toUpperCase(),
      taxRate: parseFloat(manualTax || gstRate || '0'),
      hsnCode: hsnCode,
      categoryName: category,
      brandName: brand,
      stock: parseInt(openingStock) || 0,
      images: images,
    };

    try {
      const url = productId ? `${API_BASE_URL}/products/${productId}` : `${API_BASE_URL}/products`;
      const method = productId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errMsg = 'Failed to save product';
        try {
          const errData = await response.json();
          if (errData && errData.message) {
            errMsg = errData.message;
          }
        } catch(e) {}
        throw new Error(errMsg);
      }

      setIsLoading(false);
      setShowToast(true);

      setTimeout(() => {
        window.location.href = '/admin/catalog/products';
      }, 2000);

    } catch (err: any) {
      console.error('Failed to save product to backend API', err);
      alert('Failed to save product: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-top-5 duration-300">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Product Created & Published Successfully!</h4>
            <p className="text-[11px] text-slate-300">
              Record saved to Drizzle ORM database. Redirecting to catalog table...
            </p>
          </div>
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Product</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create a new inventory item with pricing, barcode, tax configuration, and stock reorder levels.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/catalog/products"
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <X className="w-4 h-4 text-slate-400" /> Discard / Cancel
          </Link>

          <button
            type="button"
            onClick={handleSaveProduct}
            disabled={isLoading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isLoading ? 'Saving Product...' : 'Save & Publish Product'}
          </button>
        </div>
      </div>

      {/* 2-Column Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 4 Structured Step Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* 01. Basic Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Basic Information</h3>
                  <p className="text-[11px] text-slate-500">Primary item nomenclature, identification, and catalog taxonomy.</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                SKU ID Enabled
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Product Title / Name *</label>
                  <span className="text-[10px] text-slate-400">Max 120 chars</span>
                </div>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="e.g. Logitech MX Master 3S Wireless Mouse"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Stock Keeping Unit (SKU) *</label>
                    <button
                      type="button"
                      onClick={autoGenerateSku}
                      className="text-[10px] font-bold text-blue-600 hover:underline"
                    >
                      Auto-generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. # LOG-MX3-BLK"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-blue-50/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Barcode / EAN / UPC</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="e.g. 890123456789"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <Barcode className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Electronics > Computer Peripherals">Electronics &gt; Computer Peripherals</option>
                    <option value="Heavy Fasteners & Bolts">Heavy Fasteners &amp; Bolts</option>
                    <option value="Safety Equipment & PPE">Safety Equipment &amp; PPE</option>
                    <option value="Power Tools & Machinery">Power Tools &amp; Machinery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand / Manufacturer</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="" disabled>Select Brand</option>
                    <option value="Logitech">Logitech</option>
                    <option value="Dell">Dell</option>
                    <option value="Mazna Pro">Mazna Pro</option>
                    <option value="3M Safety">3M Safety</option>
                    <option value="Bosch Industrial">Bosch Industrial</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Product Description</label>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setDescriptionTab('editor')}
                      className={`px-2 py-0.5 rounded ${
                        descriptionTab === 'editor' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setDescriptionTab('preview')}
                      className={`px-2 py-0.5 rounded ${
                        descriptionTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      Preview Markdown
                    </button>
                  </div>
                </div>

                {descriptionTab === 'editor' ? (
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Ergonomic wireless performance mouse with Quiet Clicks..."
                    className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none leading-relaxed"
                  />
                ) : (
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 min-h-[100px] text-slate-700 text-xs">
                    {description || 'No description entered.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 02. Pricing & Commercials */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                  02
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Pricing & Commercials</h3>
                  <p className="text-[11px] text-slate-500">
                    Configure purchase procurement valuation, MSRP targets, and trade discounts.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Healthy Gross Margin
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Purchase Cost (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={purchaseCost}
                    onChange={(e) => setPurchaseCost(e.target.value)}
                    placeholder="6200.00"
                    className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Standard vendor landing price</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Selling Price / MRP (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="8999.00"
                    className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl font-mono text-blue-600 focus:ring-2 focus:ring-blue-600 outline-none font-extrabold"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Recommended retail tag</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Wholesale / B2B Price (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={b2bPrice}
                    onChange={(e) => setB2bPrice(e.target.value)}
                    placeholder="7499.00"
                    className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl font-mono text-purple-700 focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Volume tier (&gt;10 units)</p>
              </div>
            </div>

            {/* Calculated Spread Banner */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex flex-wrap items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">CALCULATED SPREAD</span>
                  <p className="font-extrabold text-slate-900 text-sm">
                    Unit Profit: ₹{unitProfit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
                  +{marginPercent}% Gross Margin
                </span>
                <span className="text-xs text-slate-600 font-semibold">
                  Markup Factor: <strong>{markupFactor}x</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 03. Tax Configuration */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                03
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Tax Configuration</h3>
                <p className="text-[11px] text-slate-500">Statutory GST parameters and fiscal classification alignment.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tax Slab / GST Rate {manualTax ? '' : '*'}
                  </label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    disabled={!!manualTax}
                    className={`w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none ${manualTax ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="18">GST -- 18% (standard Electronics)</option>
                    <option value="12">GST -- 12% (Hardware Tools)</option>
                    <option value="5">GST -- 5% (Essential Goods)</option>
                    <option value="28">GST -- 28% (Luxury Items)</option>
                    <option value="0">GST -- 0% (Exempt)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Manual Tax Rate (%) <span className="text-slate-400 font-normal">(Optional override for custom tax)</span>
                  </label>
                  <input
                    type="number"
                    value={manualTax}
                    onChange={(e) => setManualTax(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center font-semibold text-slate-700 mb-1">
                  Harmonized System of Nomenclature / Services Accounting Code (HSN / SAC Code) *
                  <button 
                    type="button" 
                    onClick={() => setShowHsnModal(true)} 
                    className="ml-2 text-slate-400 hover:text-blue-600 transition"
                    title="What is this?"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  placeholder="e.g. 84716060"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="taxInc"
                checked={taxIncluded}
                onChange={(e) => setTaxIncluded(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <label htmlFor="taxInc" className="text-xs text-slate-700 font-medium">
                Tax Included in Selling Price
                <p className="text-[10px] text-slate-400">
                  When checked, checkout and invoices calculate net base cost retrospectively from MRP.
                </p>
              </label>
            </div>
          </div>

          {/* 04. Inventory & Stock Rules */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                04
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Inventory & Stock Rules</h3>
                <p className="text-[11px] text-slate-500">Define initial allocations, reorder limits, and aisle bin assignations.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">OPENING STOCK</label>
                <input
                  type="number"
                  value={openingStock}
                  onChange={(e) => setOpeningStock(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-extrabold text-slate-900 text-sm outline-none"
                />
                <p className="text-[10px] text-slate-400">Physical units on hand</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">MIN ALERT LEVEL</label>
                <input
                  type="number"
                  value={minAlertLevel}
                  onChange={(e) => setMinAlertLevel(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-extrabold text-amber-600 text-sm outline-none"
                />
                <p className="text-[10px] text-slate-400">Triggers replenish alert</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">MAX CAPACITY</label>
                <input
                  type="number"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-extrabold text-slate-900 text-sm outline-none"
                />
                <p className="text-[10px] text-slate-400">Shelf volume boundary</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">REORDER BATCH</label>
                <input
                  type="number"
                  value={reorderBatch}
                  onChange={(e) => setReorderBatch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-extrabold text-blue-600 text-sm outline-none"
                />
                <p className="text-[10px] text-slate-400">Default PO order size</p>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-700 mb-1">Warehouse Location & Bin Identifier</label>
              <input
                type="text"
                value={warehouseBin}
                onChange={(e) => setWarehouseBin(e.target.value)}
                placeholder="e.g. WH-East / Shelf B-14"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-6">
          {/* Product Images Widget */}
          <ProductImageUploader images={images} setImages={setImages} />

          {/* Status & Publishing Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Status & Publishing
            </h3>

            <div>
              <p className="font-bold text-slate-500 text-[10px] uppercase mb-2">PUBLISH STATE</p>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="state"
                      checked={publishState === 'active'}
                      onChange={() => setPublishState('active')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-bold text-slate-900">Active</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                    Published
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="state"
                      checked={publishState === 'draft'}
                      onChange={() => setPublishState('draft')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-700">Draft</span>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold rounded text-[10px]">
                    Unlisted
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="state"
                      checked={publishState === 'inactive'}
                      onChange={() => setPublishState('inactive')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-700">Inactive / Archived</span>
                  </div>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded text-[10px]">
                    Archived
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="font-bold text-slate-500 text-[10px] uppercase mb-2">AVAILABLE SALES CHANNELS</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={channels.online}
                    onChange={(e) => setChannels({ ...channels, online: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-slate-800">Online E-commerce Store</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={channels.pos}
                    onChange={(e) => setChannels({ ...channels, pos: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-slate-800">In-Store POS Terminals</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={channels.b2b}
                    onChange={(e) => setChannels({ ...channels, b2b: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-slate-800">B2B Distributor Portal</span>
                </label>
              </div>
            </div>
          </div>

          {/* Inventory Valuation Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Inventory Valuation
            </h3>

            <div className="p-3 bg-blue-50/50 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold">Estimated Asset Value</span>
              <p className="text-xl font-extrabold text-blue-600">
                ₹{estimatedAssetValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-blue-600 h-full" style={{ width: '34%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>{openingStock} in stock</span>
                <span>Capacity {maxCapacity}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold">Est. Stock Turnover</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">14 Days</p>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 font-semibold">Lead Time</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">3-5 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Changes will synchronize across connected inventory nodes</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/catalog/products"
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Discard
          </Link>

          <button
            type="button"
            onClick={handleSaveProduct}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={handleSaveProduct}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition"
          >
            Save &amp; Continue Editing
          </button>

          <button
            type="button"
            onClick={handleSaveProduct}
            disabled={isLoading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      {showHsnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setShowHsnModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-2">What is HSN / SAC?</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              <strong>HSN (Harmonized System of Nomenclature)</strong> is a 6-digit uniform code that classifies 5000+ products and is accepted worldwide.<br/><br/>
              <strong>SAC (Services Accounting Code)</strong> is used for the classification of services under GST.<br/><br/>
              These codes are mandatory for tax invoicing and compliance.
            </p>
            <button onClick={() => setShowHsnModal(false)} className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold">
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
