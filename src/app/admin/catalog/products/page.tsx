'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api-client';
import {
  Search,
  Package,
  Plus,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Sliders,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Archive,
  Layers,
  Trash2,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  unit?: string;
  costPricePaise: number | string;
  mrpPaise: number | string;
  sellingPricePaise: number | string;
  b2bPricePaise?: number | string;
  b2bMinQty?: number;
  status: string;
  description?: string;
  categoryName?: string;
  brandName?: string;
  taxRate?: number;
  hsnCode?: string;
  stock?: number;
  images?: Array<{
    id: string;
    url: string;
    name: string;
    size: string;
    storagePath: string;
  }>;
}

const DrawerImageGallery = ({ images }: { images: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 font-mono text-sm border border-slate-200">
        NO IMAGE
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-3">
      <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group">
        <img 
          src={images[activeIndex].url} 
          alt={images[activeIndex].name} 
          className="w-full h-full object-contain bg-white" 
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-white ${
                activeIndex === idx ? 'border-blue-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AdminProductsPage() {
  const router = useRouter();
  const [productsList, setProductsList] = useState<Product[]>([
    {
      id: 'prod-1',
      name: 'Logitech MX Master 3S Wireless Mouse',
      sku: 'LOG-MX3-BLK',
      barcode: '890123456789',
      unit: 'PCS',
      costPricePaise: 620000,
      mrpPaise: 899900,
      sellingPricePaise: 899900,
      b2bPricePaise: 749900,
      status: 'ACTIVE',
      categoryName: 'Peripherals',
      brandName: 'Logitech â€¢ Performance Series',
      taxRate: 18,
      hsnCode: '84716060',
      stock: 34,
    },
    {
      id: 'prod-2',
      name: 'Dell Pro Wireless Keyboard KB500',
      sku: 'DEL-KB-500',
      barcode: '890123456790',
      unit: 'PCS',
      costPricePaise: 100000,
      mrpPaise: 145000,
      sellingPricePaise: 145000,
      status: 'ACTIVE',
      categoryName: 'Office Tech',
      brandName: 'Dell â€¢ Office Standard',
      taxRate: 18,
      hsnCode: '84716060',
      stock: 120,
    },
    {
      id: 'prod-3',
      name: 'Galvanized Hex Bolt M12 x 50mm',
      sku: 'MZN-BOLT-M12-50',
      barcode: '8901234567890',
      unit: 'BOX',
      costPricePaise: 45000,
      mrpPaise: 75000,
      sellingPricePaise: 65000,
      status: 'ACTIVE',
      categoryName: 'Heavy Fasteners & Bolts',
      brandName: 'Mazna Pro',
      taxRate: 18,
      hsnCode: '73181500',
      stock: 500,
    },
    {
      id: 'prod-4',
      name: 'Industrial Steel Toe Safety Boot Size 42',
      sku: 'MZN-BOOT-IND-42',
      barcode: '8901234567891',
      unit: 'PAIR',
      costPricePaise: 120000,
      mrpPaise: 249900,
      sellingPricePaise: 189900,
      status: 'ACTIVE',
      categoryName: 'Safety Equipment & PPE',
      brandName: '3M Safety',
      taxRate: 5,
      hsnCode: '64034000',
      stock: 48,
    },
    {
      id: 'prod-5',
      name: 'Cordless SDS Plus Rotary Hammer Drill 20V',
      sku: 'MZN-DRIL-RH20V',
      barcode: '8901234567892',
      unit: 'PCS',
      costPricePaise: 650000,
      mrpPaise: 1299900,
      sellingPricePaise: 949900,
      status: 'ACTIVE',
      categoryName: 'Power Tools & Machinery',
      brandName: 'Bosch Industrial',
      taxRate: 18,
      hsnCode: '84672100',
      stock: 21,
    },
    {
      id: 'prod-6',
      name: 'Apple MacBook Pro M3',
      sku: 'APP-MBP-M3-14',
      barcode: '190199222333',
      unit: 'PCS',
      costPricePaise: 12000000,
      mrpPaise: 16990000,
      sellingPricePaise: 15990000,
      status: 'ACTIVE',
      categoryName: 'Computers',
      brandName: 'Apple',
      taxRate: 18,
      hsnCode: '84713010',
      stock: 12,
    },
    {
      id: 'prod-7',
      name: 'Samsung 34" Ultrawide Monitor',
      sku: 'SAM-UW-34',
      barcode: '880111222333',
      unit: 'PCS',
      costPricePaise: 3500000,
      mrpPaise: 5500000,
      sellingPricePaise: 4899900,
      status: 'ACTIVE',
      categoryName: 'Peripherals',
      brandName: 'Samsung',
      taxRate: 18,
      hsnCode: '85285200',
      stock: 5,
    },
    {
      id: 'prod-8',
      name: 'Sony WH-1000XM5 Headphones',
      sku: 'SONY-WH-M5-BLK',
      barcode: '4548736132573',
      unit: 'PCS',
      costPricePaise: 1800000,
      mrpPaise: 3499000,
      sellingPricePaise: 2999000,
      status: 'ACTIVE',
      categoryName: 'Electronics',
      brandName: 'Sony',
      taxRate: 18,
      hsnCode: '85183000',
      stock: 45,
    },
    {
      id: 'prod-9',
      name: 'Herman Miller Aeron Chair',
      sku: 'HM-AERON-BLK',
      barcode: '990111222333',
      unit: 'PCS',
      costPricePaise: 7500000,
      mrpPaise: 12500000,
      sellingPricePaise: 11500000,
      status: 'ACTIVE',
      categoryName: 'Furniture',
      brandName: 'Herman Miller',
      taxRate: 18,
      hsnCode: '94013000',
      stock: 8,
    },
    {
      id: 'prod-10',
      name: 'Stanley 65-Piece Tool Set',
      sku: 'STAN-TS-65',
      barcode: '890111222444',
      unit: 'SET',
      costPricePaise: 220000,
      mrpPaise: 450000,
      sellingPricePaise: 380000,
      status: 'ACTIVE',
      categoryName: 'Hardware Tools',
      brandName: 'Stanley',
      taxRate: 18,
      hsnCode: '82060010',
      stock: 150,
    },
    {
      id: 'prod-11',
      name: '3M N95 Respirator Masks (Pack of 20)',
      sku: '3M-N95-20PK',
      barcode: '890111222555',
      unit: 'BOX',
      costPricePaise: 40000,
      mrpPaise: 120000,
      sellingPricePaise: 95000,
      status: 'ACTIVE',
      categoryName: 'Safety Equipment & PPE',
      brandName: '3M Safety',
      taxRate: 5,
      hsnCode: '63079090',
      stock: 320,
    },
    {
      id: 'prod-12',
      name: 'Makita 18V LXT Lithium-Ion Battery',
      sku: 'MAK-18V-BAT',
      barcode: '88381123456',
      unit: 'PCS',
      costPricePaise: 450000,
      mrpPaise: 890000,
      sellingPricePaise: 750000,
      status: 'ACTIVE',
      categoryName: 'Power Tools & Machinery',
      brandName: 'Makita',
      taxRate: 18,
      hsnCode: '85076000',
      stock: 0,
    },
    {
      id: 'prod-13',
      name: 'WD Black 2TB NVMe SSD',
      sku: 'WD-BLK-2TB',
      barcode: '718037856789',
      unit: 'PCS',
      costPricePaise: 1100000,
      mrpPaise: 1850000,
      sellingPricePaise: 1599900,
      status: 'ACTIVE',
      categoryName: 'Components',
      brandName: 'Western Digital',
      taxRate: 18,
      hsnCode: '85235100',
      stock: 65,
    },
    {
      id: 'prod-14',
      name: 'Keychron K8 Pro Mechanical Keyboard',
      sku: 'KEY-K8-PRO',
      barcode: '697123456789',
      unit: 'PCS',
      costPricePaise: 420000,
      mrpPaise: 850000,
      sellingPricePaise: 799900,
      status: 'ACTIVE',
      categoryName: 'Peripherals',
      brandName: 'Keychron',
      taxRate: 18,
      hsnCode: '84716060',
      stock: 18,
    },
    {
      id: 'prod-15',
      name: 'Epson EcoTank L3250 Printer',
      sku: 'EPS-L3250',
      barcode: '871594668245',
      unit: 'PCS',
      costPricePaise: 950000,
      mrpPaise: 1499900,
      sellingPricePaise: 1350000,
      status: 'ARCHIVED',
      categoryName: 'Office Tech',
      brandName: 'Epson',
      taxRate: 18,
      hsnCode: '84433100',
      stock: 0,
    }
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStock, setFilterStock] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch real data from Express Backend
  useEffect(() => {
    fetchBackendProducts();
  }, []);

  const fetchBackendProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.data) {
        setProductsList(data.data);
      }
    } catch (e) {
      console.log('Backend connection offline, using seeded products dataset');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(productsList.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatRupees = (paise: number | string) => {
    const val = typeof paise === 'string' ? parseFloat(paise) : paise;
    return `₹${(val / 100).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProductsList((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  const handleEditProduct = (p: Product) => {
    sessionStorage.setItem('editProduct', JSON.stringify(p));
    router.push('/admin/catalog/products/new');
  };

  // Derived filtered items
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brandName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.barcode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.categoryName || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === '' || filterCategory.includes('All Categories') ? true : p.categoryName === filterCategory;
    const matchesBrand = filterBrand === '' || filterBrand.includes('All Brands') ? true : (p.brandName || '').includes(filterBrand);
    const matchesStatus = filterStatus === '' || filterStatus.includes('All Status') ? true : p.status.toLowerCase() === filterStatus.toLowerCase();
    
    let matchesStock = true;
    if (filterStock === 'In Stock') matchesStock = (p.stock || 0) >= 30;
    if (filterStock === 'Low Stock') matchesStock = (p.stock || 0) > 0 && (p.stock || 0) < 30;
    if (filterStock === 'Out of Stock') matchesStock = (p.stock || 0) === 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus && matchesStock;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterCategory('');
    setFilterBrand('');
    setFilterStatus('');
    setFilterStock('');
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterBrand, filterStatus, filterStock]);

  // Computed Top Metrics
  const activeProductsCount = productsList.filter(p => p.status === 'ACTIVE').length;
  const lowStockCount = productsList.filter(p => (p.stock || 0) > 0 && (p.stock || 0) < 30).length;
  const outOfStockCount = productsList.filter(p => (p.stock || 0) === 0).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Products</h1>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-mono text-[10px] font-bold rounded">
              v4.8 ERP
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Manage product catalogue, SKUs, inventory thresholds and commercial pricing.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export
          </button>
          
          <Link
            href="/admin/catalog/products/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* 4 Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Products */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>TODAY&apos;S PRODUCTS</span>
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">{productsList.length}</span>
            <span className="text-xs text-emerald-600 font-semibold">+12.5%</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>All registered master SKUs</span>
            <span className="font-semibold text-emerald-600">98% synced</span>
          </div>
        </div>

        {/* Card 2: Active Products */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>ACTIVE PRODUCTS</span>
            <span className="p-1 bg-emerald-50 text-emerald-600 rounded">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-slate-900">{activeProductsCount}</span>
            <span className="text-xs text-slate-500 font-semibold">{((activeProductsCount / productsList.length) * 100).toFixed(1)}% ratio</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Live on e-com &amp; retail POS</span>
            <span className="font-semibold text-emerald-600">Normal</span>
          </div>
        </div>

        {/* Card 3: Low Stock */}
        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-700 font-medium">
            <span>LOW STOCK</span>
            <span className="p-1 bg-amber-50 text-amber-600 rounded">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-amber-700">{lowStockCount}</span>
            <span className="text-xs text-amber-600 font-semibold">+6 this week</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Below reorder safety threshold</span>
            <span className="font-semibold text-amber-700">Action req.</span>
          </div>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-red-600 font-medium">
            <span>OUT OF STOCK</span>
            <span className="p-1 bg-red-50 text-red-600 rounded">
              <XCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-red-600">{outOfStockCount}</span>
            <span className="text-xs text-red-500 font-semibold">Immediate backorder</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
            <span>Purchase orders pending</span>
            <span className="font-semibold text-red-600">Critical</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search by Product, Brand, SKU, Barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)} 
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="">Category: All Categories</option>
              <option value="Peripherals">Peripherals</option>
              <option value="Computers">Computers</option>
              <option value="Electronics">Electronics</option>
              <option value="Office Tech">Office Tech</option>
              <option value="Furniture">Furniture</option>
              <option value="Heavy Fasteners & Bolts">Heavy Fasteners & Bolts</option>
              <option value="Hardware Tools">Hardware Tools</option>
              <option value="Safety Equipment & PPE">Safety Equipment & PPE</option>
              <option value="Power Tools & Machinery">Power Tools & Machinery</option>
              <option value="Components">Components</option>
            </select>
            <select 
              value={filterBrand} 
              onChange={(e) => setFilterBrand(e.target.value)} 
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="">Brand: All Brands</option>
              <option value="Logitech">Logitech</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="Herman Miller">Herman Miller</option>
              <option value="Dell">Dell</option>
              <option value="Mazna Pro">Mazna Pro</option>
              <option value="Stanley">Stanley</option>
              <option value="3M Safety">3M Safety</option>
              <option value="Makita">Makita</option>
              <option value="Western Digital">Western Digital</option>
              <option value="Keychron">Keychron</option>
              <option value="Epson">Epson</option>
              <option value="Bosch Industrial">Bosch Industrial</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="">Status: All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            <select 
              value={filterStock} 
              onChange={(e) => setFilterStock(e.target.value)} 
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="">Stock: All Stock Levels</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> More Filters
            </button>
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Active Criteria Tags */}
        <div className="flex items-center space-x-2 text-xs pt-2 border-t border-slate-100 flex-wrap gap-y-1">
          <span className="text-slate-400 font-semibold uppercase text-[10px]">ACTIVE CRITERIA:</span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium flex items-center gap-1">
            Channel: <strong className="text-slate-900">All Depots</strong> &times;
          </span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium flex items-center gap-1">
            Pricing Tier: <strong className="text-slate-900">Retail Standard</strong> &times;
          </span>
          <button className="text-blue-600 hover:underline font-semibold ml-2">Clear all tags</button>
        </div>
      </div>

      {/* Batch Operations Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between text-xs">
          <span className="font-semibold text-blue-900">
            <span className="w-5 h-5 bg-blue-600 text-white rounded-full inline-flex items-center justify-center mr-2 text-[10px]">
              {selectedIds.length}
            </span>
            {selectedIds.length} product selected for batch operations
          </span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Batch Update Pricing
            </button>
            <button className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Stock Adjustment
            </button>
            <button className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg font-semibold flex items-center gap-1">
              <Archive className="w-3.5 h-3.5" /> Archive
            </button>
          </div>
        </div>
      )}

      {/* Products Data Grid Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === productsList.length && productsList.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-3">PRODUCT / BRAND</th>
                <th className="p-3">SKU</th>
                <th className="p-3">BARCODE</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">TAX (GST)</th>
                <th className="p-3">HSN / SAC</th>
                <th className="p-3">STOCK</th>
                <th className="p-3">PRICE</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedProducts.map((p) => {
                const isChecked = selectedIds.includes(p.id);
                return (
                  <tr key={p.id} className={`hover:bg-slate-50 transition ${isChecked ? 'bg-blue-50/40' : ''}`}>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(p.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative group shrink-0">
                          <div className="w-9 h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden text-slate-400 font-mono text-[10px]">
                            {p.images && p.images.length > 0 ? (
                              <img src={p.images[0].url} className="w-full h-full object-cover" alt={p.name} />
                            ) : (
                              <span>IMG</span>
                            )}
                          </div>
                          
                          {/* Enlarge on Hover Tooltip */}
                          {p.images && p.images.length > 0 && (
                            <div className="absolute left-11 top-1/2 -translate-y-1/2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl rounded-xl border border-slate-200 overflow-hidden bg-white w-48 h-48 pointer-events-none">
                              <img src={p.images[0].url} className="w-full h-full object-contain p-2" alt={p.name} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{p.name}</p>
                          <p className="text-[10px] text-slate-500">{p.brandName || 'No Brand'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-blue-600 font-bold">{p.sku}</td>
                    <td className="p-3 font-mono text-slate-500">{p.barcode || '-'}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded font-medium text-[11px]">
                        {p.categoryName || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-700">{p.taxRate !== undefined && p.taxRate !== null ? `${p.taxRate}%` : '-'}</td>
                    <td className="p-3 font-mono text-slate-500 text-[11px]">{p.hsnCode || '-'}</td>
                    <td className="p-3 font-bold text-slate-900">
                      <span className={`px-2 py-0.5 rounded ${p.stock !== undefined && p.stock < 30 ? (p.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800') : 'bg-slate-100 text-slate-700'}`}>
                        {p.stock} {p.unit}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{formatRupees(p.sellingPricePaise)}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button 
                          onClick={() => setViewProduct(p)}
                          className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition" 
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition" 
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 hover:bg-red-50 rounded text-slate-500 hover:text-red-600 transition" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition" title="Adjust">
                          <Sliders className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition" title="More">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Showing <strong>{filteredProducts.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
          </span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 border border-slate-300 rounded hover:bg-white text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 rounded font-bold ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 text-slate-700'}`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 border border-slate-300 rounded hover:bg-white text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Product</h3>
            <p className="text-sm text-slate-600 mb-4">
              Are you sure you want to delete <strong>{productToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteProduct}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Side Drawer */}
      {viewProduct && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm" 
            onClick={() => setViewProduct(null)} 
          />
          <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Product Details</h3>
              <button 
                onClick={() => setViewProduct(null)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <DrawerImageGallery images={viewProduct.images || []} />
                <h4 className="text-xl font-bold text-slate-900">{viewProduct.name}</h4>
                <p className="text-sm text-slate-500">{viewProduct.brandName || 'Logitech'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">SKU</span>
                  <p className="font-mono text-sm font-bold text-blue-600">{viewProduct.sku}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Barcode</span>
                  <p className="font-mono text-sm text-slate-700">{viewProduct.barcode || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Pricing</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Cost Price</span>
                    <span className="font-bold text-slate-900">{formatRupees(viewProduct.costPricePaise)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Selling Price</span>
                    <span className="font-bold text-blue-600">{formatRupees(viewProduct.sellingPricePaise)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">MRP</span>
                    <span className="font-bold text-slate-900">{formatRupees(viewProduct.mrpPaise)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Tax & Inventory</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Tax Rate (GST)</span>
                    <span className="font-bold text-slate-900">{viewProduct.taxRate ? `${viewProduct.taxRate}%` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">HSN / SAC Code</span>
                    <span className="font-mono text-sm text-slate-900">{viewProduct.hsnCode || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-slate-100">
                    <span className="text-sm text-slate-600">Current Stock</span>
                    <span className="font-bold text-slate-900">{viewProduct.stock !== undefined ? `${viewProduct.stock} ${viewProduct.unit || 'PCS'}` : 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Status & Info</h5>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                    {viewProduct.status}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                    {viewProduct.categoryName || 'General'}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => handleEditProduct(viewProduct)}
                className="flex-1 py-2 bg-blue-600 text-white text-center rounded-xl text-sm font-bold shadow-xs hover:bg-blue-700 transition"
              >
                Edit Product
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}








