import React, { useState } from 'react';
import { 
  ArrowLeft, 
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
  Sparkles,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { BookingRecord, ContactMessage } from '../types/travel';
import { 
  getGoogleSheetUrl, 
  setGoogleSheetUrl, 
  GOOGLE_APPS_SCRIPT_CODE,
  syncBookingToGoogleSheet,
  syncMessageToGoogleSheet
} from '../utils/googleSheetsSync';

interface AdminPageProps {
  onBackToHome: () => void;
  bookings: BookingRecord[];
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => void;
  onDeleteBooking: (id: string) => void;
  messages: ContactMessage[];
  onDeleteMessage: (id: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onBackToHome,
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
  const [batchSyncStatus, setBatchSyncStatus] = useState<string | null>(null);

  // Default admin PIN is 815029 as requested
  const getAdminPin = () => {
    try {
      return localStorage.getItem('ghurbe_admin_pin') || '815029';
    } catch {
      return '815029';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = pinInput.trim();
    if (entered === getAdminPin() || entered === '815029') {
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
    const dummyBooking: BookingRecord = {
      id: 'test-' + Date.now(),
      bookingCode: 'GH-TEST-' + Math.floor(1000 + Math.random() * 9000),
      travelerName: 'টেস্ট কাস্টমার (Ghurbe)',
      phone: '01700000000',
      email: 'test@ghurbe.com',
      packageId: 'kuakata-beach',
      packageTitle: 'কুয়াকাটা স্পেশাল ট্যুর (টেস্ট ডাটা)',
      date: '১২ নভেম্বর ২০২৬',
      guestsCount: 2,
      roomType: 'couple',
      totalPrice: 7198,
      advancePaid: 2000,
      paymentMethod: 'bkash',
      paymentStatus: 'pending',
      transactionId: 'TEST987654321',
      bookedAt: new Date().toLocaleString('bn-BD'),
      notes: 'অটোমেটিক সিস্টেম টেস্ট সংযোগ',
    };

    const success = await syncBookingToGoogleSheet(dummyBooking);
    if (success) {
      setTestStatus('success');
    } else {
      setTestStatus('error');
    }
    setTimeout(() => setTestStatus(null), 5000);
  };

  // Batch sync all existing bookings and messages to Google Sheet
  const handleSyncAllToGoogleSheet = async () => {
    if (!sheetUrl) return;
    setBatchSyncStatus('syncing');
    let successCount = 0;

    for (const b of bookings) {
      try {
        await syncBookingToGoogleSheet(b);
        successCount++;
        await new Promise((resolve) => setTimeout(resolve, 150));
      } catch (err) {
        console.warn('Sync booking error', err);
      }
    }

    for (const m of messages) {
      try {
        await syncMessageToGoogleSheet(m);
        successCount++;
        await new Promise((resolve) => setTimeout(resolve, 150));
      } catch (err) {
        console.warn('Sync message error', err);
      }
    }

    setBatchSyncStatus(`success:${successCount}`);
    setTimeout(() => setBatchSyncStatus(null), 6000);
  };

  // Export Bookings to CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = [
      'Booking Code', 'Traveler Name', 'Phone', 'Email', 'Package',
      'Date', 'Guests', 'Room Type', 'Total Price', 'Advance Paid',
      'Payment Method', 'Payment Status', 'Transaction ID', 'Booked At', 'Notes'
    ];

    const rows = bookings.map((b) => [
      `"${b.bookingCode}"`,
      `"${b.travelerName.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${(b.email || '').replace(/"/g, '""')}"`,
      `"${b.packageTitle.replace(/"/g, '""')}"`,
      `"${b.date}"`,
      b.guestsCount,
      `"${b.roomType}"`,
      b.totalPrice,
      b.advancePaid,
      `"${b.paymentMethod}"`,
      `"${b.paymentStatus}"`,
      `"${b.transactionId || ''}"`,
      `"${b.bookedAt}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ghurbe_All_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Messages to CSV
  const handleExportMessagesCSV = () => {
    if (messages.length === 0) return;
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Destination', 'Guests', 'Message'];
    const rows = messages.map((m) => [
      `"${m.createdAt}"`,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.phone}"`,
      `"${(m.email || '').replace(/"/g, '""')}"`,
      `"${(m.destination || '').replace(/"/g, '""')}"`,
      `"${m.guests || ''}"`,
      `"${m.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ghurbe_Contact_Messages_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
  const confirmedCount = bookings.filter((b) => b.paymentStatus === 'confirmed').length;
  const pendingCount = bookings.filter((b) => b.paymentStatus === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 text-xs font-bold transition-all border border-slate-700 active:scale-95 cursor-pointer"
              title="ওয়েবসাইটে ফিরে যান"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">মূল ওয়েবসাইটে ফিরুন</span>
              <span className="sm:hidden">হোম</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
                <ShieldCheck className="w-4 h-4 text-sky-200" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                  <span>ঘুরবে এডমিন ড্যাশবোর্ড</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ghurbe.com/adminn
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  সকল বুকিং, মেসেজ নিয়ন্ত্রণ এবং অফিশিয়াল ডাটা স্প্রেডশিট
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                title="লগআউট"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            )}
            <button
              onClick={onBackToHome}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              title="হোমে ফিরে যান"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="my-auto py-12 sm:py-20 flex justify-center items-center">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-2xl text-center space-y-6 backdrop-blur-md">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-sky-400 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">গোপন পিন প্রবেশ করুন</h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  ঘুরবে-এর অনুমোদিত কর্মকর্তা ও এডমিন ছাড়া এই পেজ অন্য কারও জন্য উন্মুক্ত নয়।
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    এডমিন পাসওয়ার্ড / পিন:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="পাসওয়ার্ড লিখুন"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white font-mono text-sm tracking-widest placeholder:text-slate-600"
                      autoFocus
                    />
                    <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                  </div>
                  {pinError && (
                    <p className="text-xs text-rose-400 font-bold mt-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all active:scale-98 cursor-pointer"
                >
                  প্যানেলে প্রবেশ করুন →
                </button>
              </form>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={onBackToHome}
                  className="text-xs font-bold text-slate-400 hover:text-sky-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>মূল ওয়েবসাইটে ফিরে যান</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="space-y-6">
            {/* Top KPI Statistics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">সর্বমোট বুকিং</span>
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">
                  {bookings.length} <span className="text-xs font-normal text-slate-400">টি</span>
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">কনফার্মড বুকিং</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 tabular-nums font-mono">
                  {confirmedCount} <span className="text-xs font-normal text-slate-400">টি</span>
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">পেন্ডিং যাচাইকরণ</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 tabular-nums font-mono">
                  {pendingCount} <span className="text-xs font-normal text-slate-400">টি</span>
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">মোট অগ্রিম জমা</span>
                <span className="text-xl sm:text-2xl font-black text-sky-300 tabular-nums font-mono">
                  ৳{totalAdvance.toLocaleString('en-US')}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">গ্রাহক মেসেজ</span>
                <span className="text-2xl sm:text-3xl font-black text-purple-300 tabular-nums font-mono">
                  {messages.length} <span className="text-xs font-normal text-slate-400">টি</span>
                </span>
              </div>
            </div>

            {/* Navigation Tabs and Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>বুকিং তালিকা ({bookings.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'messages'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  <span>গ্রাহক বার্তা / মেসেজ ({messages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('sheets')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'sheets'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Google Sheets সিঙ্ক</span>
                </button>
              </div>

              {/* 1-Click Export CSV Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {activeTab === 'bookings' && bookings.length > 0 && (
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>বুকিং এক্সেল (CSV) ডাউনলোড</span>
                  </button>
                )}

                {activeTab === 'messages' && messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleExportMessagesCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>মেসেজ এক্সেল (CSV) ডাউনলোড</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB 1: BOOKINGS LIST */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="নাম, ফোন নম্বর, বুকিং কোড বা প্যাকেজ দিয়ে খুঁজুন..."
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="all">সকল স্ট্যাটাস ({bookings.length})</option>
                      <option value="pending">⏳ যাচাই অপেক্ষমান ({pendingCount})</option>
                      <option value="confirmed">কনফার্মড ({confirmedCount})</option>
                      <option value="completed">সম্পন্ন</option>
                      <option value="cancelled">বাতিলকৃত</option>
                    </select>
                  </div>
                </div>

                {/* Pending Verification Notice */}
                {pendingCount > 0 && (
                  <div className="bg-amber-950/70 border-2 border-amber-500/70 text-amber-200 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-fade-in">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
                      <div>
                        <h5 className="text-xs sm:text-sm font-black text-amber-100">
                          {pendingCount}টি নতুন পেমেন্ট যাচাই রিকোয়েস্ট জমা রয়েছে!
                        </h5>
                        <p className="text-[11px] text-amber-300/90">
                          গ্রাহকরা বিকাশ বাংলা কিউআরে পেমেন্ট করে ভেরিফিকেশনের জন্য রিকোয়েস্ট পাঠিয়েছেন। যাচাই সম্পন্ন হলে গ্রাহকের কাছে অফিসিয়াল ইনভয়েস উন্মুক্ত হবে।
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('pending')}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shrink-0 cursor-pointer self-start sm:self-center transition-all"
                    >
                      অপেক্ষমান দেখুন ({pendingCount})
                    </button>
                  </div>
                )}

                {/* Bookings List Cards */}
                {filteredBookings.length > 0 ? (
                  <div className="space-y-3">
                    {filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 hover:border-slate-700 transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-xs font-black font-mono text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800">
                              {b.bookingCode}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {b.travelerName}
                            </span>
                            <span className="text-xs text-slate-400">
                              ({b.guestsCount} জন যাত্রী · {b.roomType})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status badge */}
                            <span
                              className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                                b.paymentStatus === 'confirmed'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : b.paymentStatus === 'cancelled'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : b.paymentStatus === 'completed'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {b.paymentStatus === 'confirmed' && <CheckCircle2 className="w-3 h-3" />}
                              {b.paymentStatus === 'pending' && <Clock className="w-3 h-3" />}
                              <span>
                                {b.paymentStatus === 'confirmed' ? 'কনফার্মড' : b.paymentStatus === 'cancelled' ? 'বাতিল' : b.paymentStatus === 'completed' ? 'সম্পন্ন' : 'পেন্ডিং'}
                              </span>
                            </span>

                            {/* Direct Call & WhatsApp */}
                            <a
                              href={`tel:${b.phone}`}
                              className="px-2.5 py-1 rounded-lg bg-blue-900/40 text-sky-300 hover:bg-blue-800/50 border border-blue-700/50 font-bold text-xs inline-flex items-center gap-1"
                              title="কল দিন"
                            >
                              <Phone className="w-3 h-3" />
                              <span className="hidden sm:inline">কল</span>
                            </a>
                            <a
                              href={`https://wa.me/88${b.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(b.travelerName)},%20Ghurbe%20Tours%20theke%20apnar%20booking%20(${b.bookingCode})%20er%20bapare%20jogajog%20korchi.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-900/40 text-emerald-300 hover:bg-emerald-800/50 border border-emerald-700/50 font-bold text-xs inline-flex items-center gap-1"
                              title="হোয়াটসঅ্যাপে চ্যাট করুন"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`আপনি কি সত্যিই বুকিং ${b.bookingCode} মুছে ফেলতে চান?`)) {
                                  onDeleteBooking(b.id);
                                }
                              }}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer"
                              title="মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-slate-500 block">প্যাকেজ:</span>
                            <strong className="text-slate-200">{b.packageTitle}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block">ভ্রমণের তারিখ:</span>
                            <strong className="text-slate-200">{b.date}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block">পেমেন্ট মেথড ও TrxID:</span>
                            <strong className="text-slate-200">{b.paymentMethod}: {b.transactionId || 'ক্যাশে/অপেক্ষমাণ'}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block">অগ্রিম ও মোট ভাড়া:</span>
                            <span className="text-emerald-400 font-bold font-mono">৳{b.advancePaid}</span>
                            <span className="text-slate-400 font-mono"> / ৳{b.totalPrice}</span>
                          </div>
                        </div>

                        {/* Quick Verification & Approval Action for Pending Payments */}
                        {b.paymentStatus === 'pending' && (
                          <div className="bg-amber-950/60 border border-amber-500/60 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                              <div>
                                <strong className="text-xs font-black text-amber-200 block">
                                  পেমেন্ট যাচাই ও অনুমোদন প্রয়োজন
                                </strong>
                                <span className="text-[11px] text-amber-300/80">
                                  গ্রাহকের বিকাশ TrxID/লাস্ট ৪ ডিজিট ও পেমেন্ট মিলিয়ে নিয়ে অনুমোদন দিন।
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap shrink-0">
                              <button
                                type="button"
                                onClick={() => onUpdateBookingStatus(b.id, 'confirmed')}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-lg shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>✓ যাচাই সম্পন্ন ও অনুমোদন</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Status Change Buttons Strip */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60">
                          <span className="text-[11px] text-slate-400">
                            বুকিংয়ের সময়: {b.bookedAt} {b.notes && `· নোট: "${b.notes}"`}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-500 mr-1">স্ট্যাটাস পরিবর্তন:</span>
                            {b.paymentStatus !== 'confirmed' && (
                              <button
                                type="button"
                                onClick={() => onUpdateBookingStatus(b.id, 'confirmed')}
                                className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/60 cursor-pointer"
                              >
                                কনফার্ম করুন
                              </button>
                            )}
                            {b.paymentStatus !== 'pending' && (
                              <button
                                type="button"
                                onClick={() => onUpdateBookingStatus(b.id, 'pending')}
                                className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-900/60 hover:bg-amber-800 text-amber-300 border border-amber-700/60 cursor-pointer"
                              >
                                পেন্ডিং
                              </button>
                            )}
                            {b.paymentStatus !== 'completed' && (
                              <button
                                type="button"
                                onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                                className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-900/60 hover:bg-purple-800 text-purple-300 border border-purple-700/60 cursor-pointer"
                              >
                                সম্পন্ন
                              </button>
                            )}
                            {b.paymentStatus !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                                className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700/60 cursor-pointer"
                              >
                                বাতিল
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-slate-900 rounded-3xl border border-dashed border-slate-800 space-y-2">
                    <p className="text-sm font-bold text-slate-400">কোনো বুকিং রেকর্ড পাওয়া যায়নি।</p>
                    <p className="text-xs text-slate-600">ওয়েবসাইট থেকে নতুন কোনো পর্যটক বুকিং সম্পন্ন করলে সাথে সাথে এখানে দেখা যাবে।</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-slate-400">
                    ওয়েবসাইট থেকে আসা গ্রাহকদের বার্তা ও ইনকোয়ারি ({messages.length}টি)
                  </p>
                </div>

                {messages.length > 0 ? (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <strong className="text-sm font-bold text-white block">{m.name}</strong>
                          <p className="text-xs text-slate-400">
                            তারিখ: {m.createdAt} · গন্তব্য: <strong className="text-sky-300">{m.destination || 'সাধারণ ইনকোয়ারি'}</strong> {m.guests && `· যাত্রী: ${m.guests}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${m.phone}`}
                            className="px-2.5 py-1 rounded-lg bg-blue-900/40 text-sky-300 hover:bg-blue-800/50 border border-blue-700/50 font-bold text-xs inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>কল দিন</span>
                          </a>
                          <a
                            href={`https://wa.me/88${m.phone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(m.name)},%20Ghurbe%20Tours%20theke%20apnar%20message%20er%20uttor%20dite%20jogajog%20korchi.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-900/40 text-emerald-300 hover:bg-emerald-800/50 border border-emerald-700/50 font-bold text-xs inline-flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => onDeleteMessage(m.id)}
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer"
                            title="মুছুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300">
                        <p className="whitespace-pre-wrap leading-relaxed">{m.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-slate-900 rounded-3xl border border-dashed border-slate-800">
                    <p className="text-sm font-bold text-slate-400">এখনো কোনো মেসেজ জমা পড়েনি।</p>
                    <p className="text-xs text-slate-600 mt-1">যোগাযোগ ফর্ম থেকে পর্যটক কোনো প্রশ্ন পাঠালে তা এখানে আসবে।</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GOOGLE SHEETS */}
            {activeTab === 'sheets' && (
              <div className="space-y-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Google Sheets অটোমেটিক রিয়েল-টাইম সিঙ্ক
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        আপনি যদি গুগল শিট যুক্ত করতে চান, তবে ওয়েবহুক লিংক দিয়ে স্বয়ংক্রিয় সিঙ্ক করতে পারবেন।
                      </p>
                    </div>
                  </div>

                  {/* Webhook URL Input */}
                  <form onSubmit={handleSaveSheetUrl} className="pt-2 space-y-3">
                    <label className="text-xs font-bold text-slate-300 block">
                      Google Apps Script Web App URL (ওয়েবহুক লিংক):
                    </label>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <input
                        type="url"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                        className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                      >
                        {sheetSaved ? '✓ সংরক্ষিত হয়েছে!' : 'লিংক সেভ করুন'}
                      </button>
                    </div>

                    {sheetUrl && (
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={handleTestSheet}
                            disabled={testStatus === 'testing'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                            <span>১টি টেস্ট ডাটা পাঠিয়ে দেখুন</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleSyncAllToGoogleSheet}
                            disabled={batchSyncStatus === 'syncing'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Layers className={`w-3.5 h-3.5 ${batchSyncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                            <span>সব রেকর্ড ({bookings.length} বুকিং + {messages.length} মেসেজ) শিটে সিঙ্ক করুন</span>
                          </button>
                        </div>

                        <a
                          href="https://docs.google.com/spreadsheets/u/0/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Google Sheets খুলুন ↗</span>
                        </a>
                      </div>
                    )}

                    {testStatus === 'success' && (
                      <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>টেস্ট ডাটা সফলভাবে গুগল শিটে যোগ হয়েছে!</span>
                      </div>
                    )}
                    {testStatus === 'error' && (
                      <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-800 text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>সংযোগ করা যায়নি। Access "Anyone" দেওয়া আছে কিনা যাচাই করুন।</span>
                      </div>
                    )}
                    {batchSyncStatus && batchSyncStatus.startsWith('success') && (
                      <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>সফল! {batchSyncStatus.split(':')[1]} টি রেকর্ড স্বয়ংক্রিয়ভাবে গুগল শিটে পাঠানো হয়েছে!</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* Instructions & Script Code */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-300">
                      Google Apps Script Code (রেডি কোড)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      {codeCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{codeCopied ? 'কপি হয়েছে!' : 'কোড কপি করুন'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto max-h-48">
                    {GOOGLE_APPS_SCRIPT_CODE}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
