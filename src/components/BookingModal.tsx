import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  QrCode, 
  MessageCircle, 
  Download, 
  Info,
  ChevronDown,
  Clock,
  AlertCircle,
  Lock
} from 'lucide-react';
import { TourPackage, BookingRecord } from '../types/travel';
import { POPULAR_PACKAGES } from '../data/packagesData';
import { syncBookingToGoogleSheet } from '../utils/googleSheetsSync';
import { downloadGhurbeContactCard, getWhatsAppLink } from '../utils/contactCard';
import { 
  generateInvoiceImage, 
  downloadInvoiceImageFile, 
  formatWhatsAppInvoiceText, 
  InvoiceCardData 
} from '../utils/invoiceImageGenerator';

interface BookingModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookingConfirmed: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  pkg,
  onClose,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');

  // Selected package tracking (defaults to passed pkg or kuakata)
  const [selectedPkgId, setSelectedPkgId] = useState<string>(pkg?.id || 'kuakata-beach');
  const activePkg: TourPackage = 
    POPULAR_PACKAGES.find((p) => p.id === selectedPkgId) || pkg || POPULAR_PACKAGES[0];

  // Helper to determine scheduled tour departure date by package
  const getScheduledDate = (pkgId: string): string => {
    switch (pkgId) {
      case 'kuakata-beach':
      case 'kuakata':
        return '2026-11-12';
      case 'sajek-valley':
      case 'sajek':
        return '2026-11-20';
      case 'coxs-bazar':
      case 'cox':
        return '2026-11-28';
      case 'saint-martin':
      case 'saintmartin':
        return '2026-12-05';
      case 'tanguar-haor':
      case 'tangua':
        return '2026-11-15';
      case 'bandarban':
        return '2026-11-25';
      case 'sreemangal':
        return '2026-11-18';
      default:
        return '2026-11-12';
    }
  };

  // Form Fields
  const [travelerName, setTravelerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => getScheduledDate(selectedPkgId));

  // Plan Type: strictly 'single' or 'couple' (Replaces old room preference)
  const [planType, setPlanType] = useState<'single' | 'couple'>('single');
  // Guests count for single: 1 to 40
  const [singleGuestsCount, setSingleGuestsCount] = useState<number>(1);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'other'>('bkash');
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance');
  const [notes, setNotes] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [invoiceImageDataUrl, setInvoiceImageDataUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Update date when package changes
  const handlePackageChange = (newPkgId: string) => {
    setSelectedPkgId(newPkgId);
    setDate(getScheduledDate(newPkgId));
  };

  // Synchronize if prop pkg changes
  useEffect(() => {
    if (pkg?.id && pkg.id !== selectedPkgId) {
      setSelectedPkgId(pkg.id);
      setDate(getScheduledDate(pkg.id));
    }
  }, [pkg?.id]);

  if (!activePkg) return null;

  // Bill Calculations
  const effectiveGuests = planType === 'couple' ? 2 : singleGuestsCount;
  
  const totalPrice = planType === 'couple' && activePkg.couplePrice
    ? activePkg.couplePrice
    : activePkg.price * singleGuestsCount;

  // Booking money: ৳1,000 per person for single, ৳2,000 for couple
  const advanceAmount = planType === 'couple' ? 2000 : 1000 * singleGuestsCount;
  const payableAmount = paymentType === 'full' ? totalPrice : advanceAmount;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName || !phone || !date) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং ভ্রমণের তারিখ প্রদান করুন।');
      return;
    }
    setStep('payment');
  };

  // Helper to generate full WhatsApp Invoice link (formatted as an official invoice receipt)
  const getWhatsAppInvoiceLink = (booking: BookingRecord, senderNum?: string, transactionId?: string) => {
    const text = formatWhatsAppInvoiceText(booking, senderNum || senderPhone, transactionId || trxId);
    return `https://wa.me/8801911050270?text=${encodeURIComponent(text)}`;
  };

  const handleProcessPayment = () => {
    const bookingCode = `GH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentNote = `বিকাশ পেমেন্ট (01711085960 / কিউআর) ${senderPhone ? `| প্রেরক: ${senderPhone}` : ''} ${trxId ? `| TrxID/লাস্ট ৪ ডিজিট: ${trxId}` : ''}`;
    const consolidatedNotes = [notes, paymentNote].filter(Boolean).join(' · ');

    const newBooking: BookingRecord = {
      id: `booking-${Date.now()}`,
      bookingCode,
      packageId: activePkg.id,
      packageTitle: activePkg.title,
      travelerName,
      phone,
      email: email || 'not-provided@ghurbe.com',
      date,
      guestsCount: effectiveGuests,
      roomType: planType === 'couple' ? 'couple' : 'standard',
      totalPrice,
      advancePaid: payableAmount,
      paymentMethod: 'bkash',
      paymentStatus: 'pending', // Pending admin verification as requested
      bookedAt: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      notes: consolidatedNotes,
    };

    // 1. Generate crisp Invoice Card Image (PNG) and automatically download it
    // User requested: "and whats app e jaor somoy pic akare jabe invoice akare jabe"
    setIsGeneratingImage(true);
    const invoiceCardData: InvoiceCardData = {
      bookingCode,
      packageTitle: activePkg.title,
      travelerName,
      phone,
      email: email || undefined,
      date,
      guestsCount: effectiveGuests,
      planType,
      totalPrice,
      advancePaid: payableAmount,
      senderPhone: senderPhone || undefined,
      trxId: trxId || undefined,
      bookedAt: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    generateInvoiceImage(invoiceCardData)
      .then((imgDataUrl) => {
        setInvoiceImageDataUrl(imgDataUrl);
        // Automatically download the invoice picture file to user's device/gallery
        downloadInvoiceImageFile(imgDataUrl, bookingCode);
      })
      .catch((err) => console.error('Invoice image creation failed:', err))
      .finally(() => setIsGeneratingImage(false));

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    syncBookingToGoogleSheet(newBooking);
    setStep('success');

    // 2. Automatically trigger WhatsApp with invoice text link to official number 01911-050270
    const waUrl = getWhatsAppInvoiceLink(newBooking, senderPhone, trxId);
    try {
      const waAnchor = document.createElement('a');
      waAnchor.href = waUrl;
      waAnchor.target = '_blank';
      waAnchor.rel = 'noopener noreferrer';
      document.body.appendChild(waAnchor);
      waAnchor.click();
      document.body.removeChild(waAnchor);
    } catch {}
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/80 backdrop-blur-sm p-2.5 sm:p-5 flex justify-center items-start min-h-screen py-4 sm:py-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200/90 max-h-[90vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 text-white p-4 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                অফিসিয়াল বুকিং পোর্টাল
              </span>
              <span className="text-xs text-slate-300 font-medium">ঘুরবে ট্যুর অ্যান্ড ট্রাভেল</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black mt-1 text-white">
              {step === 'form' && 'ভ্রমণ বুকিং ফর্ম'}
              {step === 'payment' && 'বুকিং মানি ও পেমেন্ট'}
              {step === 'success' && 'বুকিং সফলভাবে সম্পন্ন হয়েছে!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-left">
          {/* STEP 1: Traveler Details Form */}
          {step === 'form' && (
            <form onSubmit={handleSubmitDetails} className="space-y-4">
              
              {/* Package Selector (User requested: Kuakata, Cox's Bazar, Sajek etc. with auto date fill) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wide">
                    ট্যুর প্যাকেজ নির্বাচন করুন <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                    তারিখ স্বয়ংক্রিয়ভাবে পূরণ হবে
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={selectedPkgId}
                    onChange={(e) => handlePackageChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border-2 border-blue-500/80 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 appearance-none pr-10 cursor-pointer shadow-xs"
                  >
                    {POPULAR_PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} — ৳ {p.price.toLocaleString('en-IN')}/জন
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-blue-600 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Package Quick Summary Strip */}
                <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-600 font-medium">
                    সময়কাল: <strong>{activePkg.duration.textBn || '৩ রাত ২ দিন'}</strong>
                  </span>
                  <span className="text-blue-700 font-black">
                    জনপ্রতি: ৳ {activePkg.price.toLocaleString('en-IN')} {activePkg.couplePrice ? `| কাপল: ৳ ${activePkg.couplePrice.toLocaleString('en-IN')}` : ''}
                  </span>
                </div>
              </div>

              {/* Package Type: Single (সিঙ্গেল) or Couple (কাপল) - User requested only these two */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-900">
                  প্যাকেজ প্ল্যান নির্বাচন করুন (Single or Couple) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Single Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setPlanType('single');
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      planType === 'single'
                        ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>👤 সিঙ্গেল (Single)</span>
                      </span>
                      {planType === 'single' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-xs text-blue-700 font-extrabold block">
                      ৳ {activePkg.price.toLocaleString('en-IN')} / জন
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      ১ থেকে ৪০ জন পর্যন্ত নির্বাচনযোগ্য
                    </span>
                  </button>

                  {/* Couple Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setPlanType('couple');
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      planType === 'couple'
                        ? 'border-rose-600 bg-rose-50/80 ring-2 ring-rose-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-rose-950 flex items-center gap-1.5">
                        <span>💑 কাপল (Couple)</span>
                      </span>
                      {planType === 'couple' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <span className="text-xs text-rose-700 font-extrabold block">
                      ৳ {(activePkg.couplePrice || activePkg.price * 2).toLocaleString('en-IN')} (২ জন)
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      ২ জনের পূর্ণাঙ্গ কাপল প্রাইভেট রুম
                    </span>
                  </button>
                </div>
              </div>

              {/* Number of Travelers & Departure Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Travelers Count: 1 to 40 for Single */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ভ্রমণকারী সংখ্যা (Travelers) {planType === 'single' ? '(১ থেকে ৪০ জন)' : ''}
                  </label>
                  {planType === 'single' ? (
                    <select
                      value={singleGuestsCount}
                      onChange={(e) => setSingleGuestsCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px] cursor-pointer"
                    >
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} জন
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-rose-200 bg-rose-50/60 text-rose-900 min-h-[46px] flex items-center justify-between">
                      <span>২ জন (১ কাপল ইউনিট)</span>
                      <span className="text-xs font-extrabold text-rose-700">ফিক্সড</span>
                    </div>
                  )}
                </div>

                {/* Tour Date (Auto-filled on package select, but editable) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ভ্রমণের তারিখ (স্বয়ংক্রিয় পূরণ) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  />
                </div>
              </div>

              {/* Traveler Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ভ্রমণকারীর পূর্ণ নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="০১৭xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ইমেইল ঠিকানা (ঐচ্ছিক — ডিজিটাল ভাউচার পাওয়ার জন্য)
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিশেষ কোনো অনুরোধ বা নির্দেশনা (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  placeholder="যেমন: সামনের সিট প্রয়োজন, নিরামিষ খাবার..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white"
                />
              </div>

              {/* Dynamic Bill & Pricing Summary Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">প্যাকেজ প্ল্যান:</span>
                  <span className="font-bold text-slate-900">
                    {planType === 'couple' ? '💑 কাপল প্যাকেজ (২ জন)' : `👤 সিঙ্গেল (${singleGuestsCount} জন)`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">মোট প্যাকেজ মূল্য (Total Bill):</span>
                  <span className="font-black text-slate-900 text-sm tabular-nums">
                    ৳ {totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-blue-200 font-bold">
                  <span className="text-blue-900 font-extrabold">প্রাথমিক বুকিং মানি (পরিশোধ্য):</span>
                  <span className="font-black text-emerald-700 text-base tabular-nums">
                    ৳ {advanceAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {planType === 'couple' 
                    ? 'কাপল প্যাকেজে প্রাথমিক বুকিং মানি মাত্র ২,০০০ টাকা।' 
                    : `সিঙ্গেল প্যাকেজে জনপ্রতি ১,০০০ টাকা অগ্রিম বুকিং মানি (${singleGuestsCount} × ১,০০০৳ = ${advanceAmount.toLocaleString('en-IN')}৳)।`}
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <span>পেমেন্ট ধাপে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Step (Official Bangla QR Scanner) */}
          {step === 'payment' && (
            <div className="space-y-5">
              {/* Summary Header */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>নির্বাচিত প্যাকেজ:</span>
                  <span className="font-bold text-slate-900">{activePkg.title}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>ভ্রমণকারী ও প্ল্যান:</span>
                  <span className="font-bold text-slate-900">
                    {travelerName} ({planType === 'couple' ? 'কাপল প্যাকেজ - ২ জন' : `সিঙ্গেল - ${singleGuestsCount} জন`})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>যাত্রার তারিখ:</span>
                  <span className="font-bold text-slate-900">{date}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>মোট প্যাকেজ মূল্য:</span>
                  <span className="font-black text-slate-900 tabular-nums">৳ {totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Type Selection (Advance vs Full) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType('advance')}
                  className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    paymentType === 'advance'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[11px] text-slate-500 block">বুকিং মানি পরিশোধ</span>
                  <span className="text-base font-black text-emerald-800 tabular-nums">
                    ৳ {advanceAmount.toLocaleString('en-IN')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                    paymentType === 'full'
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[11px] text-slate-500 block">একবারে সম্পূর্ণ পেমেন্ট</span>
                  <span className="text-base font-black text-blue-900 tabular-nums">
                    ৳ {totalPrice.toLocaleString('en-IN')}
                  </span>
                </button>
              </div>

              {/* bKash Official Payment Box (01711085960 & Bangla QR Scanner) */}
              <div className="p-4 sm:p-5 rounded-3xl border-2 border-pink-400 bg-gradient-to-b from-pink-50/90 via-white to-pink-50/40 space-y-4 shadow-sm animate-fade-in text-left">
                <div className="flex items-center justify-between border-b border-pink-200/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-black text-xs shadow-xs">
                      বিকাশ
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                        বিকাশ পেমেন্ট (মার্চেন্ট নম্বর ও কিউআর)
                      </h4>
                      <p className="text-[11px] text-pink-700 font-medium">
                        01711-085960 নম্বরে পেমেন্ট করুন অথবা বাংলা কিউআর স্ক্যান করুন
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-pink-100 text-[#E2136E] px-2.5 py-0.5 rounded-full border border-pink-200">
                    অফিসিয়াল পেমেন্ট
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Left: Instructions, Number & Payable Amount */}
                  <div className="sm:col-span-7 space-y-2.5">
                    {/* Amount Payable */}
                    <div className="bg-white p-3 rounded-2xl border border-pink-200 shadow-xs flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">পরিশোধের পরিমাণ:</span>
                      <span className="text-base sm:text-lg font-black text-blue-950 font-mono tabular-nums">
                        ৳ {payableAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Official bKash Number with 1-click Copy */}
                    <div className="bg-white p-3 rounded-2xl border-2 border-pink-300 shadow-xs space-y-1">
                      <span className="text-[11px] font-bold text-pink-700 block">
                        বিকাশ মার্চেন্ট / পেমেন্ট নম্বর:
                      </span>
                      <div className="flex items-center justify-between gap-2 bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-200">
                        <span className="text-sm sm:text-base font-black font-mono text-slate-950 tracking-wider">
                          01711-085960
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('01711085960', 'bkash_num')}
                          className="px-2.5 py-1 bg-[#E2136E] hover:bg-[#c20f5e] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer active:scale-95 shrink-0"
                        >
                          {copiedKey === 'bkash_num' ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>কপি হয়েছে</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>নম্বর কপি</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        বিকাশ অ্যাপে ‘পেমেন্ট’ অপশনে <strong>01711085960</strong> নম্বরে টাকা পাঠান অথবা ডানে দেওয়া বাংলা কিউআর স্ক্যান করুন।
                      </p>
                    </div>

                    <div className="bg-pink-100/60 p-2.5 rounded-2xl border border-pink-200/70 text-xs text-slate-700">
                      <p className="font-bold text-pink-900 text-[11px]">পেমেন্ট শেষে নিচের বক্সে TrxID বা লাস্ট ৪ ডিজিট লিখুন:</p>
                    </div>
                  </div>

                  {/* Right: Bangla QR Image */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center">
                    <div className="bg-white p-2.5 rounded-2xl border-2 border-pink-300 shadow-md max-w-[160px] sm:max-w-[180px] w-full text-center">
                      <div className="rounded-xl overflow-hidden border border-slate-200">
                        <img
                          src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1792223909/WhatsApp_Image_2026-10-17_at_1.54.57_PM.jpg"
                          alt="বিকাশ বাংলা কিউআর কোড"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-black text-pink-700 mt-1.5 block">
                        বাংলা কিউআর স্ক্যান করুন
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sender Phone and TrxID inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-pink-200/70">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      আপনার বিকাশ নম্বর (যে নম্বর থেকে পরিশোধ করেছেন)
                    </label>
                    <input
                      type="tel"
                      placeholder="যেমন: 017XXXXXXXX"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-pink-600 outline-hidden bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      বিকাশ TrxID বা লাস্ট ৪ ডিজিট <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: 9J82K3 বা নম্বরের শেষ ৪ ডিজিট (যেমন: 4589)"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:border-pink-600 outline-hidden bg-white"
                    />
                  </div>
                </div>

                {/* Direct WhatsApp Assistance for Payment */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 bg-white p-3 rounded-2xl border border-pink-200">
                  <span>পেমেন্টে যেকোনো সহায়তায় সরাসরি WhatsApp:</span>
                  <a
                    href={getWhatsAppLink(`আসসালামু আলাইকুম! ঘুরবে ট্যুর অ্যান্ড ট্রাভেল, আমি ${activePkg.title} প্যাকেজের জন্য ৳${payableAmount} পেমেন্ট সংক্রান্ত তথ্য জানতে চাই।`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp: 01911-050270</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all cursor-pointer"
                >
                  ← তথ্যে ফিরে যান
                </button>
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>পেমেন্ট রিকোয়েস্ট পাঠান ও WhatsApp এ মেসেজ দিন</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success & Verification Pending Notice */}
          {step === 'success' && confirmedBooking && (
            <div className="space-y-5 animate-fade-in text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-amber-300">
                <Clock className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wide">
                  পেমেন্ট যাচাই প্রক্রিয়াধীন (Pending Verification)
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
                  আপনার পেমেন্ট তথ্য অ্যাডমিন প্যানেলে জমা হয়েছে। অ্যাডমিন টিম বিকাশ বাংলা কিউআর পেমেন্ট ও TrxID/লাস্ট ৪ ডিজিট যাচাই করার পর আপনার বুকিং কনফার্ম করা হবে এবং ‘আমার বুকিং’ থেকে আপনি অফিসিয়াল ভাউচার ও ইনভয়েস ডাউনলোড করতে পারবেন।
                </p>
              </div>

              {/* Visual Invoice Picture Card Showcase */}
              {invoiceImageDataUrl && (
                <div className="bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-blue-400 shadow-md space-y-2 text-left animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>📸 ডিজিটাল ইনভয়েস ছবি (Invoice Picture Card)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => downloadInvoiceImageFile(invoiceImageDataUrl, confirmedBooking.bookingCode)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ছবি ডাউনলোড</span>
                    </button>
                  </div>

                  <div className="max-h-60 sm:max-h-80 overflow-y-auto rounded-2xl border border-slate-200 shadow-inner bg-slate-50 flex justify-center p-2">
                    <img
                      src={invoiceImageDataUrl}
                      alt="বুকিং ইনভয়েস ছবি"
                      className="w-full max-w-sm h-auto object-contain rounded-xl shadow-xs"
                    />
                  </div>

                  <p className="text-[11px] text-slate-600">
                    ✅ আপনার ইনভয়েসের ছবি (PNG Image) স্বয়ংক্রিয়ভাবে ডাউনলোড হয়েছে। নিচের WhatsApp বাটনে ক্লিক করে ছবিটি ও স্ক্রিনশট পাঠিয়ে দিন।
                  </p>
                </div>
              )}

              {/* Direct WhatsApp Action Banner */}
              <div className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900">
                      দ্রুত যাচাইয়ের জন্য WhatsApp-এ ইনভয়েস ও ছবি পাঠান
                    </h5>
                    <p className="text-[11px] text-slate-600">
                      নিচের বাটনে চাপ দিলে আপনার বুকিং ইনভয়েস সরাসরি আমাদের নম্বরে (01911-050270) চলে যাবে। সেখানে পেমেন্টের স্ক্রিনশট বা লাস্ট ৪ ডিজিট ও ইনভয়েস ছবি পাঠিয়ে দিন।
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {invoiceImageDataUrl && (
                    <button
                      type="button"
                      onClick={() => downloadInvoiceImageFile(invoiceImageDataUrl, confirmedBooking.bookingCode)}
                      className="py-3 px-4 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>ইনভয়েস ছবি ডাউনলোড (.png)</span>
                    </button>
                  )}
                  <a
                    href={getWhatsAppInvoiceLink(confirmedBooking, senderPhone, trxId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp এ ইনভয়েস পাঠান (01911-050270)</span>
                  </a>
                </div>
              </div>

              {/* Pending Request Summary Card */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200 text-left space-y-3 font-sans">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      বুকিং ও পেমেন্ট রিকোয়েস্ট
                    </span>
                    <h5 className="text-base font-black text-slate-900 mt-1">
                      {confirmedBooking.packageTitle}
                    </h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">বুকিং কোড</span>
                    <span className="text-sm font-mono font-black text-blue-700">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-[11px] text-slate-500 block">ভ্রমণকারীর নাম</span>
                    <strong className="text-slate-900">{confirmedBooking.travelerName} ({confirmedBooking.phone})</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">যাত্রার তারিখ</span>
                    <strong className="text-slate-900">{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">সদস্য সংখ্যা ও প্ল্যান</span>
                    <strong className="text-slate-900">
                      {confirmedBooking.guestsCount} জন ({planType === 'couple' ? 'কাপল প্যাকেজ' : 'সিঙ্গেল প্যাকেজ'})
                    </strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">পরিশোধিত অগ্রিম বুকিং মানি</span>
                    <strong className="text-emerald-700 font-bold tabular-nums">
                      ৳ {confirmedBooking.advancePaid.toLocaleString('en-IN')} (যাচাই অপেক্ষমান)
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 block">পেমেন্ট মাধ্যম</span>
                    <strong className="text-slate-900">বিকাশ বাংলা কিউআর</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">TrxID / লাস্ট ৪ ডিজিট</span>
                    <strong className="text-slate-900 font-mono text-xs truncate block">
                      {trxId || 'WhatsApp-এ স্ক্রিনশট দিন'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
                  <span>হটলাইন: <strong>09658-865593</strong> · WhatsApp: <strong>01911-050270</strong></span>
                  <span className="text-amber-700 font-bold">স্ট্যাটাস: অ্যাডমিন যাচাই প্রক্রিয়াধীন</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center pt-2">
                <button
                  type="button"
                  onClick={downloadGhurbeContactCard}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Ghurbe Contact সেভ করুন (.vcf)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer"
                >
                  ঠিক আছে, বন্ধ করুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
