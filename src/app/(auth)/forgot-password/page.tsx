'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/shop" className="inline-flex items-center space-x-2">
            <img src="/images/mazna-logo.png" alt="MAZNA ENTERPRISES" className="h-9 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reset Password</h1>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Reset Email Sent!</h3>
            <p className="text-xs text-slate-600">
              We have sent password reset instructions to <span className="font-semibold text-slate-800">{email}</span>. Please check your inbox or spam folder.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-2"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mazna.com"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
            >
              {isLoading ? 'Sending Link...' : 'Send Reset Instructions'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs text-slate-500 hover:text-slate-800 transition font-medium">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
