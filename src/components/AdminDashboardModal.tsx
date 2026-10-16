import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  FileSpreadsheet, 
  Search, 
  Download, 
  Trash2, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Layers, 
  Users, 
  TrendingUp,
  Inbox,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { BookingRecord, ContactMessage } from '../types/travel';
import { 
  getGoogleSheetUrl, 
  setGoogleSheetUrl, 
  GOOGLE_APPS_SCRIPT_CODE,
  syncBookingToGoogleSheet,
  syncMessageToGoogleSheet
} from '../utils/googleSheetsSync';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => void;
  onDeleteBooking: (id: string) => void;
  messages: ContactMessage[];
  onDeleteMessage: (id: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  messages,
  onDeleteMessage,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ghurbe_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'sheets'>('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Google Sheet Webhook State
  const [sheetUrl, setSheetUrl] = useState(getGoogleSheetUrl());
  const [sheetSaved, setSheetSaved] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  // Default admin PIN (customizable by admin)
  const getAdminPin = () => {
    try {
      return localStorage.getItem('ghurbe_admin_pin') || 'ghurbe2026';
    } catch {
      return 'ghurbe2026';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === getAdminPin()) {
      setIsAuthenticated(true);
      setPinError(false);
      try {
        sessionStorage.setItem('ghurbe_admin_auth', 'true');
      } catch {}
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    try {
      sessionStorage.removeItem('ghurbe_admin_auth');
    } catch {}
  };

  const handleSaveSheetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleSheetUrl(sheetUrl);
    setSheetSaved(true);
    setTimeout(() => setSheetSaved(false), 3000);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE).then(() => {
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2500);
      });
    }
  };

  const handleTestSheet = async () => {
    if (!sheetUrl) return;
    setTestStatus('testing');
    try {
      await fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'new_booking',
          type: 'booking',
          bookingCode: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
          travelerName: 'ঘুরবে টেস্ট বুকিং',
          phone: '01700000000',
          email: 'test@ghurbe.com',
          packageTitle: 'টেস্ট কানেকশন প্যাকেজ',
          date: '২০২৬-১১-১২',
          guestsCount: 2,
          roomType: 'standard',
          totalPrice: 3599,
          advancePaid: 1000,
          paymentMethod: 'bkash',
          paymentStatus: 'confirmed',
          bookedAt: new Date().toLocaleDateString('bn-BD'),
          notes: 'Google Sheet কানেকশন সফলভাবে কাজ করছে!',
        }),
      });
      setTestStatus('success');
      setTimeout(() => setTestStatus(null), 4000);
    } catch (e) {
      setTestStatus('error');
      setTimeout(() => setTestStatus(null), 4000);
    }
  };

  // Batch sync all existing bookings and messages to Google Sheet
  const [batchSyncStatus, setBatchSyncStatus] = useState<string | null>(null);

  const handleSyncAllToGoogleSheet = async () => {
    if (!sheetUrl) return;
    setBatchSyncStatus('syncing');
    try {
      let count = 0;
      for (const b of bookings) {
        await syncBookingToGoogleSheet(b);
        count++;
      }
      for (const m of messages) {
        await syncMessageToGoogleSheet(m);
        count++;
      }
      setBatchSyncStatus(`success:${count}`);
      setTimeout(() => setBatchSyncStatus(null), 5000);
    } catch {
      setBatchSyncStatus('error');
      setTimeout(() => setBatchSyncStatus(null), 5000);
    }
  };

  // Export Bookings to CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = [
      'Booking Code', 'Traveler Name', 'Phone', 'Email', 'Package',
      'Date', 'Guests', 'Room Type', 'Total Price', 'Advance Paid',
      'Payment Method', 'Status', 'Transaction ID', 'Booked At', 'Notes'
    ];

    const rows = bookings.map(b => [
      `"${b.bookingCode}"`,
      `"${b.travelerName}"`,
      `"${b.phone}"`,
      `"${b.email || ''}"`,
      `"${b.packageTitle}"`,
      `"${b.date}"`,
      `"${b.guestsCount}"`,
      `"${b.roomType}"`,
      `"${b.totalPrice}"`,
      `"${b.advancePaid}"`,
      `"${b.paymentMethod}"`,
      `"${b.paymentStatus}"`,
      `"${b.transactionId || ''}"`,
      `"${b.bookedAt}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ghurbe_All_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Messages to CSV
  const handleExportMessagesCSV = () => {
    if (messages.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'Destination', 'Guests', 'Message', 'Date', 'Status'];
    const rows = messages.map(m => [
      `"${m.id}"`,
      `"${m.name}"`,
      `"${m.phone}"`,
      `"${m.destination || ''}"`,
      `"${m.guests || ''}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${m.createdAt}"`,
      `"${m.status}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ghurbe_Customer_Messages_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.travelerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.packageTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAdvance = bookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/85 backdrop-blur-md p-2 sm:p-5 flex justify-center items-start min-h-screen py-4 sm:py-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-sky-500/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldCheck className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black">ঘুরবে অ্যাডমিন পোর্টাল</h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                সকল বুকিং নিয়ন্ত্রণ, গ্রাহক মেসেজ এবং গুগল শিট অটোমেশন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                title="লগআউট"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY */}
        {!isAuthenticated ? (
          /* Authentication Form */
          <div className="p-8 sm:p-14 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">এডমিন পাসওয়ার্ড দিন</h3>
              <p className="text-xs text-slate-500 mt-1">
                ঘুরবে-এর সম্মানিত কর্মকর্তা ও এডমিন ছাড়া এই তথ্য অন্য কারও কাছে প্রদর্শনযোগ্য নয়।
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  এডমিন পিন / পাসওয়ার্ড:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="ডিফল্ট পাসওয়ার্ড: ghurbe2026"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    autoFocus
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন (ডিফল্ট: ghurbe2026)।</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                প্যানেলে প্রবেশ করুন →
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Admin Workspace */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* KPI Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-50 border-b border-slate-200/80 shrink-0">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">সর্বমোট বুকিং</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
                  {bookings.length} <span className="text-xs font-normal text-slate-500">টি</span>
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">মোট অগ্রিম সংগ্রহ</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">
                  ৳{totalAdvance.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">গ্রাহকদের মেসেজ</span>
                <span className="text-xl sm:text-2xl font-black text-blue-600 tabular-nums">
                  {messages.length} <span className="text-xs font-normal text-slate-500">টি</span>
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">গুগল শিট স্ট্যাটাস</span>
                <span className={`text-xs font-black inline-flex items-center gap-1 mt-1 px-2.5 py-1 rounded-full ${
                  sheetUrl ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {sheetUrl ? '✓ সিঙ্ক সংযুক্ত' : '⚠ সংযুক্ত নয়'}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between px-4 sm:px-6 pt-3 border-b border-slate-200 bg-white shrink-0">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>সকল বুকিং ({bookings.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'messages'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  <span>গ্রাহক মেসেজ ({messages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('sheets')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'sheets'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Google Sheet অটোমেশন</span>
                </button>
              </div>

              {activeTab === 'bookings' && bookings.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="CSV / Excel হিসেবে ডাউনলোড করুন"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>বুকিং (CSV) ডাউনলোড</span>
                </button>
              )}

              {activeTab === 'messages' && messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportMessagesCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="মেসেজ তালিকা CSV হিসেবে ডাউনলোড করুন"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>মেসেজ (CSV) ডাউনলোড</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* TAB 1: ALL BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {/* Search and Filter Tools */}
                  <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="নাম, ফোন বা বুকিং কোড খুঁজুন..."
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                      <span className="text-[11px] font-bold text-slate-500 shrink-0">ফিল্টার:</span>
                      {['all', 'confirmed', 'pending', 'cancelled'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStatusFilter(st)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                            statusFilter === st
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st === 'all' && 'সব'}
                          {st === 'confirmed' && 'কনফার্মড'}
                          {st === 'pending' && 'অপেক্ষমান'}
                          {st === 'cancelled' && 'বাতিল'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bookings List */}
                  {filteredBookings.length > 0 ? (
                    <div className="space-y-3">
                      {filteredBookings.map((b) => (
                        <div
                          key={b.id}
                          className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-blue-400 transition-all space-y-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-mono font-black bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md border border-blue-200">
                                  {b.bookingCode}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  b.paymentStatus === 'confirmed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : b.paymentStatus === 'pending'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {b.paymentStatus === 'confirmed' ? '✓ কনফার্মড' : b.paymentStatus === 'pending' ? '⏳ অপেক্ষমান' : '✕ বাতিল'}
                                </span>
                              </div>
                              <h4 className="text-base font-black text-slate-900 mt-1">
                                {b.packageTitle}
                              </h4>
                              <p className="text-xs text-slate-500">
                                তারিখ: <strong>{b.date}</strong> · যাত্রী: <strong>{b.guestsCount} জন</strong> · রুম: <strong>{b.roomType}</strong>
                              </p>
                            </div>

                            {/* Status Changer Actions */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <select
                                value={b.paymentStatus}
                                onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                                className="text-xs font-bold bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 cursor-pointer"
                              >
                                <option value="confirmed">কনফার্মড</option>
                                <option value="pending">অপেক্ষমান</option>
                                <option value="cancelled">বাতিল</option>
                                <option value="completed">ট্যুর সম্পন্ন</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => onDeleteBooking(b.id)}
                                className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                                title="বুকিং মুছুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Customer Details Row */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px] font-bold uppercase">যাত্রীর নাম ও ফোন</span>
                              <strong className="text-slate-900 text-sm">{b.travelerName}</strong>
                              <div className="flex items-center gap-2 mt-1">
                                <a
                                  href={`tel:${b.phone}`}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{b.phone}</span>
                                </a>
                                <a
                                  href={`https://wa.me/88${b.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(b.travelerName)},%20Ghurbe%20Tours%20er%20pokkho%20theke%20apnar%20booking%20niye%20jogajog%20korchi.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] font-bold uppercase">পেমেন্ট বিবরণ</span>
                              <p className="text-slate-800 mt-0.5">
                                পরিশোধ: <strong className="text-emerald-600 tabular-nums">৳{b.advancePaid.toLocaleString('en-IN')}</strong> / মোট: ৳{b.totalPrice.toLocaleString('en-IN')}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                মেথড: <span className="font-bold uppercase">{b.paymentMethod}</span>
                                {b.transactionId && ` (Trx: ${b.transactionId})`}
                              </p>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-[10px] font-bold uppercase">বুকিং সময় ও নোট</span>
                              <p className="text-slate-700 mt-0.5">{b.bookedAt}</p>
                              {b.notes && (
                                <p className="text-[11px] text-slate-500 italic mt-0.5 truncate">
                                  নোট: "{b.notes}"
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <p className="text-sm font-bold text-slate-600">কোনো বুকিং রেকর্ড পাওয়া যায়নি।</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CONTACT MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-slate-500">
                      ওয়েবসাইট থেকে আসা গ্রাহকদের বার্তা ও ইনকোয়ারি ({messages.length}টি)
                    </p>
                  </div>

                  {messages.length > 0 ? (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs hover:border-blue-400 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <strong className="text-sm font-bold text-slate-900 block">{m.name}</strong>
                            <p className="text-xs text-slate-500">
                              তারিখ: {m.createdAt} · গন্তব্য: <strong>{m.destination || 'সাধারণ ইনকোয়ারি'}</strong> {m.guests && `· যাত্রী: ${m.guests}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${m.phone}`}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs inline-flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>কল দিন</span>
                            </a>
                            <a
                              href={`https://wa.me/88${m.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(m.name)},%20Ghurbe%20Tours%20theke%20apnar%20message%20er%20uttor%20dite%20jogajog%20korchi.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs inline-flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => onDeleteMessage(m.id)}
                              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                              title="মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-700">
                          <p className="whitespace-pre-wrap">{m.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <p className="text-sm font-bold text-slate-600">এখনো কোনো মেসেজ জমা পড়েনি।</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: GOOGLE SHEETS SYNC SETUP */}
              {activeTab === 'sheets' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-emerald-950">
                          Google Sheets অটোমেটিক রিয়েল-টাইম সিঙ্ক
                        </h4>
                        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                          ওয়েবসাইটে গ্রাহক কোনো ট্যুর বুক করলে কিংবা মেসেজ পাঠালে তা স্বয়ংক্রিয়ভাবে আপনার গুগল শিটে নতুন রো (Row) হিসেবে সাথে সাথে যুক্ত হয়ে যাবে!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Webhook URL Input */}
                  <form onSubmit={handleSaveSheetUrl} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <label className="text-xs font-bold text-slate-800 block">
                      Google Apps Script Web App URL (ওয়েবহুক লিংক):
                    </label>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <input
                        type="url"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                        className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
                      >
                        {sheetSaved ? '✓ সংরক্ষিত হয়েছে!' : 'লিংক সেভ করুন'}
                      </button>
                    </div>

                    {sheetUrl && (
                      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={handleTestSheet}
                            disabled={testStatus === 'testing'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                            <span>১টি টেস্ট ডাটা পাঠিয়ে দেখুন</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSyncAllToGoogleSheet}
                            disabled={batchSyncStatus === 'syncing'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold transition-all cursor-pointer"
                            title="সব বুকিং ও মেসেজ গুগল শিটে পাঠান"
                          >
                            <Layers className={`w-3.5 h-3.5 ${batchSyncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                            <span>বিদ্যমান সব বুকিং ({bookings.length}) ও মেসেজ ({messages.length}) শিটে সিঙ্ক করুন</span>
                          </button>
                        </div>

                        <a
                          href="https://docs.google.com/spreadsheets/u/0/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Google Sheets খুলুন ↗</span>
                        </a>
                      </div>
                    )}

                    {testStatus === 'success' && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>টেস্ট ডাটা সফলভাবে গুগল শিটে যোগ হয়েছে! আপনার শিটে Bookings ট্যাবটি চেক করুন।</span>
                      </div>
                    )}
                    {testStatus === 'error' && (
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>সংযোগ করা যায়নি। দয়া করে নিশ্চিত করুন Web app-এর Access "Anyone" দেওয়া হয়েছে।</span>
                      </div>
                    )}
                    {batchSyncStatus && batchSyncStatus.startsWith('success') && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>সফল! সর্বমোট {batchSyncStatus.split(':')[1]} টি রেকর্ড স্বয়ংক্রিয়ভাবে গুগল শিটে পাঠানো হয়েছে!</span>
                      </div>
                    )}
                  </form>

                  {/* 3-Step Setup Instructions */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h5 className="text-sm font-black text-slate-900">
                      গুগল শিট কানেক্ট করার সহজ ৩টি ধাপ (মাত্র ২ মিনিট সময় লাগবে):
                    </h5>

                    <ol className="text-xs text-slate-700 space-y-3 list-decimal list-inside leading-relaxed">
                      <li>
                        <strong>নতুন গুগল শিট তৈরি করুন:</strong> <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">sheets.new</a> তে গিয়ে একটি নতুন গুগল শিট খুলুন (যেমন নাম দিন: <em>Ghurbe Bookings 2026</em>)।
                      </li>
                      <li>
                        <strong>Apps Script কোড পেস্ট করুন:</strong> গুগল শিটের ওপরের মেনু থেকে <strong>Extensions &gt; Apps Script</strong>-এ ক্লিক করুন। যে কোডটি আসবে তা সম্পূর্ণ মুছে নিচের স্ক্রিপ্ট কোডটি হুবহু কপি করে পেস্ট করুন:
                        <div className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-xl flex items-center justify-between">
                          <span className="font-mono text-[11px] text-emerald-400">
                            Ghurbe Google Apps Script Code (Ready-to-use)
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-all cursor-pointer"
                          >
                            {codeCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{codeCopied ? 'কপি হয়েছে!' : 'কোড কপি করুন'}</span>
                          </button>
                        </div>
                      </li>
                      <li>
                        <strong>Deploy করুন:</strong> Apps Script পেজের ডানপাশে ওপরে <strong>Deploy &gt; New deployment</strong> এ চাপ দিন। 
                        <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 text-slate-600">
                          <li>Select type: <strong>Web app</strong></li>
                          <li>Execute as: <strong>Me</strong> (আপনার জিমেইল)</li>
                          <li>Who has access: <strong>Anyone</strong> (যেকোনো ভিজিটর যাতে বুকিং তথ্য পাঠাতে পারে)</li>
                        </ul>
                        এরপর <strong>Deploy</strong>-এ চাপ দিয়ে পারমিশন দিন এবং প্রাপ্ত <strong>Web app URL</strong> কপি করে ওপরের বক্সে পেস্ট করে 'লিংক সেভ করুন' দিন!
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
