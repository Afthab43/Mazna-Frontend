'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, UserCheck, Building2, Lock, Mail, Phone, User, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api-client';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'retail' | 'b2b'>('retail');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }

    if (accountType === 'b2b' && !gstNumber) {
      setError('GSTIN Number is required for B2B Wholesale Accounts.');
      return;
    }

    if (!consentAccepted) {
      setError('You must accept the Terms of Service and GST Billing Policy.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          gstNumber: accountType === 'b2b' ? gstNumber : null,
          consentAccepted,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Account Created Successfully!</h2>
            <p className="text-xs text-slate-500 mt-2">
              Welcome to MAZNA ENTERPRISES. Your account <span className="font-semibold text-slate-800">{email}</span> has been activated. You can now sign in to browse products, request B2B quotes, and manage orders.
            </p>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
          >
            Proceed to Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-8 space-y-6 my-8">
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <Link href="/shop" className="inline-flex items-center space-x-2">
            <img src="/images/mazna-logo.png" alt="MAZNA ENTERPRISES" className="h-9 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create Your MAZNA Account</h1>
          <p className="text-xs text-slate-500">Register as an Individual Buyer or B2B Wholesale Business Partner.</p>
        </div>

        {/* Account Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAccountType('retail')}
            className={`py-2.5 rounded-lg transition flex items-center justify-center gap-2 ${
              accountType === 'retail'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Retail Customer
          </button>
          <button
            type="button"
            onClick={() => setAccountType('b2b')}
            className={`py-2.5 rounded-lg transition flex items-center justify-center gap-2 ${
              accountType === 'b2b'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" /> B2B Wholesale Business
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Rahul"
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sharma"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@company.com"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          {accountType === 'b2b' && (
            <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Building2 className="w-4 h-4" /> B2B Corporate Details
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Registered Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Mazna Heavy Industries Pvt Ltd"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">GSTIN Number *</label>
                <input
                  type="text"
                  required
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  placeholder="29ABCDE1234F1ZH"
                  maxLength={15}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-mono bg-white uppercase focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">Required for GST tax invoicing and credit terms.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="consent"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <label htmlFor="consent" className="text-[11px] text-slate-600 leading-tight">
              I agree to MAZNA ENTERPRISES <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>,{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> & GST Invoicing Regulations.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
          >
            {isLoading ? 'Creating Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
