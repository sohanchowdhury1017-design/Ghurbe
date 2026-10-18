import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Printer, Calendar, Users, MapPin, Phone, CreditCard, Sparkles, ArrowRight, Copy, Check, QrCode, MessageCircle, Download, Landmark } from 'lucide-react';
import { TourPackage, BookingRecord } from '../types/travel';
import { syncBookingToGoogleSheet } from '../utils/googleSheetsSync';
import { downloadGhurbeContactCard, getWhatsAppLink } from '../utils/contactCard';

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
  const [travelerName, setTravelerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [packageType, setPackageType] = useState<'individual' | 'couple'>('individual');
  const [date, setDate] = useState(pkg?.departureDateText ? '2026-11-12' : '');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomType, setRoomType] = useState<'standard' | 'deluxe' | 'couple' | 'tent'>('couple');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'bank' | 'rocket' | 'card' | 'cash'>('bkash');
  const [paymentType, setPaymentType] = useState<'full' | 'advance'>('advance');
  const [notes, setNotes] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!pkg) return null;

  const totalPrice = packageType === 'couple' && pkg.couplePrice
    ? pkg.couplePrice
    : pkg.price * guestsCount;
  // Booking money is exactly 1,000 taka per traveler (or 2,000 for couple)
  const advanceAmount = packageType === 'couple' ? 2000 : 1000 * guestsCount;
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

  const handleProcessPayment = () => {
    const bookingCode = `GH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    let paymentNote = '';
    if (paymentMethod === 'bkash') {
      paymentNote = `বিকাশ (বাংলা QR: 01711085960 / সেন্ড মানি: 01831841017) ${senderPhone ? `| প্রেরক: ${senderPhone}` : ''} ${trxId ? `| TrxID: ${trxId}` : ''}`;
    } else if (paymentMethod === 'nagad') {
      paymentNote = `নগদ পার্সোনাল (01831841017) ${senderPhone ? `| প্রেরক: ${senderPhone}` : ''} ${trxId ? `| TrxID: ${trxId}` : ''}`;
    } else if (paymentMethod === 'bank') {
      paymentNote = `পূবালী ব্যাংক (হিসাব: 3116901000653) ${senderPhone ? `| প্রেরক/হিসাব: ${senderPhone}` : ''} ${trxId ? `| রেফারেন্স/রশিদ: ${trxId}` : ''}`;
    } else if (paymentMethod === 'rocket') {
      paymentNote = `রকেট ${senderPhone ? `| প্রেরক: ${senderPhone}` : ''} ${trxId ? `| TrxID: ${trxId}` : ''}`;
    } else {
      paymentNote = `কার্ড/অনলাইন পেমেন্ট ${trxId ? `| TrxID: ${trxId}` : ''}`;
    }
    const consolidatedNotes = [notes, paymentNote].filter(Boolean).join(' · ');

    const newBooking: BookingRecord = {
      id: `booking-${Date.now()}`,
      bookingCode,
      packageId: pkg.id,
      packageTitle: pkg.title,
      travelerName,
      phone,
      email: email || 'not-provided@ghurbe.com',
      date,
      guestsCount,
      roomType,
      totalPrice,
      advancePaid: payableAmount,
      paymentMethod,
      paymentStatus: 'confirmed',
      bookedAt: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      notes: consolidatedNotes,
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    syncBookingToGoogleSheet(newBooking);
    setStep('success');
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
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-between shrink-0 border-b border-sky-500/20">
          <div>
            <span className="text-xs text-sky-300 font-semibold uppercase tracking-wider block">
              ট্যুর প্যাকেজ বুকিং
            </span>
            <h2 className="text-lg sm:text-xl font-bold">{pkg.title}</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {pkg.duration.textBn} · ৳ {pkg.price.toLocaleString('en-IN')} / জন
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
          {/* STEP 1: Traveler Details Form */}
          {step === 'form' && (
            <form onSubmit={handleSubmitDetails} className="space-y-4">
              <div className="bg-sky-50/80 border border-sky-200/90 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-900 uppercase">নির্বাচিত প্যাকেজ</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-bold text-slate-950">{pkg.title}</p>
                    <span className="text-[10px] font-black bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded">
                      {pkg.duration.textBn || '৩ রাত ২ দিন'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">মূল্য প্রতি জন</p>
                  <p className="text-base font-bold text-blue-700 tabular-nums">৳ {pkg.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {pkg.couplePrice && (
                <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-2xl p-3.5">
                  <span className="text-xs font-bold text-slate-800 block mb-2">প্যাকেজ প্ল্যান নির্বাচন করুন:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPackageType('individual')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        packageType === 'individual'
                          ? 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-600'
                          : 'bg-white/60 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-bold block text-slate-900">👤 জনপ্রতি প্যাকেজ</span>
                      <span className="text-xs text-blue-700 font-extrabold">৳ {pkg.price.toLocaleString('en-IN')} / জন</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPackageType('couple');
                        setGuestsCount(2);
                        setRoomType('couple');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        packageType === 'couple'
                          ? 'bg-rose-50 border-[#881337] shadow-sm ring-2 ring-[#881337]'
                          : 'bg-white/60 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-bold block text-[#881337]">💑 কাপল প্যাকেজ</span>
                      <span className="text-xs text-[#881337] font-extrabold">৳ {pkg.couplePrice.toLocaleString('en-IN')} (২ জন)</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ভ্রমণকারীর পূর্ণ নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সোহান চৌধুরী"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
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
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ইমেইল ঠিকানা (ভাউচার পাঠানোর জন্য)
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ভ্রমণের কাঙ্ক্ষিত তারিখ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ভ্রমণকারী সংখ্যা (Travelers)
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} জন
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আবাসন পছন্দ (Room Preference)
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white min-h-[46px]"
                  >
                    <option value="couple">কাপল / প্রাইভেট রুম</option>
                    <option value="deluxe">ডিলাক্স ব্যালকনি ভিউ রুম</option>
                    <option value="standard">স্ট্যান্ডার্ড শেয়ারিং রুম</option>
                    <option value="tent">বিচ / হিলসাইড ক্যাম্পিং টেন্ট</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিশেষ কোনো অনুরোধ বা নির্দেশনা (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  placeholder="যেমন: নিরামিষ খাবার প্রয়োজন, বয়স্ক সদস্য সাথে আছেন..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden bg-white"
                />
              </div>

              {/* Price Breakdown Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>
                    {packageType === 'couple'
                      ? '💑 কাপল প্যাকেজ দর (২ জন বিশেষ প্যাকেজ)'
                      : `প্যাকেজ দর (${guestsCount} জন × ৳ ${pkg.price.toLocaleString('en-IN')})`}
                  </span>
                  <span className="font-semibold text-slate-900 tabular-nums">৳ {totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>সার্ভিস ও গাইড চার্জ</span>
                  <span className="font-semibold">ফ্রি (০%)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>মোট প্রদেয় বিল</span>
                  <span className="text-blue-700 text-base tabular-nums">৳ {totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>পেমেন্ট অপশনে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>ভ্রমণকারী: {travelerName} ({phone})</span>
                  <span>{guestsCount} জন সদস্য</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                  <span className="text-sm font-bold text-slate-800">মোট প্যাকেজ মূল্য</span>
                  <span className="text-xl font-bold text-blue-700 tabular-nums">৳ {totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  পেমেন্ট পদ্ধতি নির্ধারণ করুন
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentType('advance')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentType === 'advance'
                        ? 'border-blue-600 bg-sky-50/80 ring-2 ring-blue-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-blue-900">মাত্র ১,০০০৳ বুকিং মানি</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">৳ {advanceAmount.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">বাকি টাকা যাত্রা শুরুর দিন প্রদেয়</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('full')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentType === 'full'
                        ? 'border-blue-600 bg-sky-50/80 ring-2 ring-blue-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold text-blue-900">১০০% সম্পূর্ণ পরিশোধ</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">৳ {totalPrice.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">কোনো ঝামেলা ছাড়া পূর্ণ প্রস্তুতি</p>
                  </button>
                </div>
              </div>

              {/* Gateway Channels */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  পেমেন্ট মাধ্যম বেছে নিন
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50 ring-2 ring-pink-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg bg-[#E2136E] text-white font-black text-xs flex items-center justify-center">
                      বিকাশ
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg bg-[#E31C24] text-white font-black text-xs flex items-center justify-center">
                      নগদ
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">Nagad</span>
                  </button>

                  {/* Bank - Pubali Bank */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">পূবালী ব্যাংক</span>
                  </button>

                  {/* Card / Rocket */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg bg-blue-700 text-white font-black text-xs flex items-center justify-center">
                      কার্ড
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">Visa/Master</span>
                  </button>
                </div>
              </div>

              {/* 1. bKash Payment Box with QR and Send Money */}
              {paymentMethod === 'bkash' && (
                <div className="p-4 sm:p-5 rounded-2xl border-2 border-pink-400 bg-gradient-to-b from-pink-50/80 via-white to-pink-50/30 space-y-4 shadow-sm animate-fade-in text-left">
                  <div className="flex items-center justify-between border-b border-pink-200/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E2136E] text-white flex items-center justify-center font-black text-xs shadow-xs">
                        বিকাশ
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">
                          বিকাশ পেমেন্ট (bKash Send Money & Bangla QR)
                        </h4>
                        <p className="text-[11px] text-pink-700 font-medium">
                          সেন্ড মানি করুন অথবা বাংলা কিউআর স্ক্যান করে পেমেন্ট সম্পন্ন করুন
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-pink-100 text-[#E2136E] px-2 py-0.5 rounded-full border border-pink-200">
                      অফিসিয়াল
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                    {/* Left: Number Cards & Instructions */}
                    <div className="sm:col-span-7 space-y-2.5">
                      {/* bKash Send Money (Personal) */}
                      <div className="bg-white p-3 rounded-xl border border-pink-200 shadow-xs flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">
                            বিকাশ সেন্ড মানি (পার্সোনাল নম্বর)
                          </span>
                          <span className="text-lg sm:text-xl font-black font-mono text-pink-700 tracking-wider">
                            01831841017
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('01831841017', 'bkash_personal')}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#E2136E] hover:bg-[#c40e5e] rounded-lg shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedKey === 'bkash_personal' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'bkash_personal' ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                        </button>
                      </div>

                      {/* bKash Merchant / Bangla QR number */}
                      <div className="bg-white p-3 rounded-xl border border-pink-200 shadow-xs flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">
                            বিকাশ মার্চেন্ট / বাংলা কিউআর নম্বর
                          </span>
                          <span className="text-lg sm:text-xl font-black font-mono text-pink-700 tracking-wider">
                            01711085960
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('01711085960', 'bkash_qr')}
                          className="px-3 py-1.5 text-xs font-bold text-pink-700 bg-pink-100 hover:bg-pink-200 rounded-lg shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedKey === 'bkash_qr' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'bkash_qr' ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                        </button>
                      </div>

                      <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex justify-between items-center text-slate-700 font-semibold">
                          <span>পরিশোধের পরিমাণ:</span>
                          <span className="text-sm font-black text-blue-900 tabular-nums">৳ {payableAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          রেফারেন্সে আপনার নাম লিখুন। পেমেন্ট সম্পন্ন হলে নিচের বক্সে TrxID লিখুন।
                        </p>
                      </div>
                    </div>

                    {/* Right: Bangla QR Image */}
                    <div className="sm:col-span-5 flex flex-col items-center justify-center">
                      <div className="bg-white p-2 rounded-2xl border-2 border-pink-300 shadow-md max-w-[150px] sm:max-w-[170px] w-full text-center">
                        <div className="rounded-xl overflow-hidden border border-slate-200">
                          <img
                            src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1792223909/WhatsApp_Image_2026-10-17_at_1.54.57_PM.jpg"
                            alt="বিকাশ বাংলা কিউআর কোড - 01711085960"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <span className="text-[9px] font-black text-pink-700 mt-1 block">
                          বাংলা কিউআর স্ক্যান করুন
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verification inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-pink-200/70">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        আপনার বিকাশ নম্বর (যে নম্বর থেকে পাঠিয়েছেন)
                      </label>
                      <input
                        type="tel"
                        placeholder="যেমন: 018XXXXXXXX"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-pink-600 outline-hidden bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        বিকাশ ট্রানজেকশন আইডি (TrxID)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: 9J82K3L4"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:border-pink-600 outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Support note & Save contact */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 bg-pink-100/70 p-2.5 rounded-xl">
                    <span>পেমেন্টে সহায়তায় WhatsApp (01911-050270):</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={downloadGhurbeContactCard}
                        className="font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        title="ফোনে Ghurbe Tours & Travel নাম সেভ করুন"
                      >
                        <Download className="w-3 h-3 text-emerald-600" />
                        <span>কন্টাক্ট সেভ</span>
                      </button>
                      <a
                        href={getWhatsAppLink('আসসালামু আলাইকুম! আমি বিকাশ পেমেন্ট করেছি')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>চ্যাট করুন</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Nagad Payment Box (Personal Send Money) */}
              {paymentMethod === 'nagad' && (
                <div className="p-4 sm:p-5 rounded-2xl border-2 border-orange-400 bg-gradient-to-b from-orange-50/80 via-white to-orange-50/30 space-y-4 shadow-sm animate-fade-in text-left">
                  <div className="flex items-center justify-between border-b border-orange-200/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E31C24] text-white flex items-center justify-center font-black text-xs shadow-xs">
                        নগদ
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">
                          নগদ পার্সোনাল পেমেন্ট (Nagad Personal Send Money)
                        </h4>
                        <p className="text-[11px] text-orange-700 font-medium">
                          নগদ অ্যাপ বা *167# ডায়াল করে 'Send Money' করুন
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-orange-100 text-[#E31C24] px-2 py-0.5 rounded-full border border-orange-200">
                      পার্সোনাল একাউন্ট
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Number Card */}
                    <div className="bg-white p-3.5 rounded-xl border border-orange-200 shadow-xs flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">
                          নগদ পার্সোনাল নম্বর (Send Money)
                        </span>
                        <span className="text-xl sm:text-2xl font-black font-mono text-[#E31C24] tracking-wider">
                          01831841017
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('01831841017', 'nagad')}
                        className="px-3.5 py-2 text-xs font-bold text-white bg-[#E31C24] hover:bg-[#c4141c] rounded-lg shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {copiedKey === 'nagad' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'nagad' ? 'কপি হয়েছে!' : 'নম্বর কপি করুন'}</span>
                      </button>
                    </div>

                    <div className="bg-white/90 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex justify-between items-center text-slate-700 font-semibold">
                        <span>পরিশোধের পরিমাণ:</span>
                        <span className="text-sm font-black text-orange-700 tabular-nums">৳ {payableAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        <strong>পেমেন্টের নিয়ম:</strong> নগদ অ্যাপে ঢুকে <strong>Send Money</strong> সিলেক্ট করে প্রাপক নম্বর <strong>01831841017</strong> লিখুন। রেফারেন্সে আপনার নাম লিখুন। পেমেন্ট সম্পন্ন হলে ফিরতি মেসেজের <strong>TrxID</strong> নিচের ঘরে বসিয়ে বুকিং নিশ্চিত করুন।
                      </p>
                    </div>

                    {/* Verification inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-orange-200/70">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          আপনার নগদ নম্বর (যে নম্বর থেকে পাঠিয়েছেন)
                        </label>
                        <input
                          type="tel"
                          placeholder="যেমন: 018XXXXXXXX"
                          value={senderPhone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-orange-600 outline-hidden bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          নগদ ট্রানজেকশন আইডি (TrxID)
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: 7K92P8L1"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:border-orange-600 outline-hidden bg-white"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Support note */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 bg-orange-100/70 p-2.5 rounded-xl">
                      <span>নগদ পেমেন্টে সহায়তায় WhatsApp (01911-050270):</span>
                      <a
                        href={getWhatsAppLink('আসসালামু আলাইকুম! আমি নগদ 01831841017 নম্বরে পেমেন্ট করেছি')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>চ্যাট করুন</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Pubali Bank PLC Account Box */}
              {paymentMethod === 'bank' && (
                <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/80 via-white to-teal-50/30 space-y-4 shadow-sm animate-fade-in text-left">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-xs shadow-xs">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">
                          পূবালী ব্যাংক পিএলসি (Pubali Bank PLC)
                        </h4>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          অনলাইন ব্যাংকিং, অ্যাপ (PI Banking) বা যেকোনো শাখা থেকে জমা
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      অফিসিয়াল ব্যাংক হিসাব
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Bank Account Details Card */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-300 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">
                            পূবালী ব্যাংক হিসাব নম্বর (A/C No)
                          </span>
                          <span className="text-xl sm:text-2xl font-black font-mono text-emerald-900 tracking-wider">
                            3116901000653
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('3116901000653', 'pubali')}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedKey === 'pubali' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'pubali' ? 'কপি হয়েছে!' : 'হিসাব নম্বর কপি'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        <div>
                          <span className="text-slate-500 block text-[10px]">ব্যাংকের নাম:</span>
                          <strong className="font-bold text-slate-900">পূবালী ব্যাংক পিএলসি (Pubali Bank PLC)</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">হিসাবের নাম (Account Name):</span>
                          <strong className="font-bold text-slate-900">ঘুরবে ট্যুরস অ্যান্ড ট্রাভেলস (Ghurbe Tours & Travel)</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">শাখা / অ্যাকাউন্ট টাইপ:</span>
                          <strong className="font-bold text-slate-900">অনলাইন শাখা / কারেন্ট একাউন্ট (Current A/C)</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">ট্রান্সফার মাধ্যম:</span>
                          <strong className="font-bold text-emerald-800">PI Banking App, BEFTN, NPSB, কাউন্টার জমা</strong>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between items-center text-slate-700 font-semibold">
                      <span>পরিশোধের পরিমাণ:</span>
                      <span className="text-sm font-black text-emerald-800 tabular-nums">৳ {payableAmount.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Verification inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-emerald-200">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          আপনার ব্যাংক বা প্রেরকের নাম / হিসাব
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: আপনার ব্যাংক ও অ্যাকাউন্ট নাম"
                          value={senderPhone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          ডিপোজিট স্লিপ নম্বর বা রেফারেন্স আইডি
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: স্লিপ নম্বর বা ট্রানজেকশন রেফারেন্স"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden bg-white"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Support note */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 bg-emerald-100/70 p-2.5 rounded-xl">
                      <span>স্লিপ পাঠাতে WhatsApp (01911-050270):</span>
                      <a
                        href={getWhatsAppLink('আসসালামু আলাইকুম! আমি পূবালী ব্যাংক (হিসাব: 3116901000653) নম্বরে পেমেন্ট করেছি, স্লিপ পাঠাতে চাই')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>স্লিপ পাঠান</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Card or other methods note */}
              {paymentMethod === 'card' && (
                <div className="p-4 sm:p-5 rounded-2xl border-2 border-blue-400 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/30 space-y-3 shadow-sm animate-fade-in text-left">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-black text-slate-900">
                      ভিসা, মাস্টারকার্ড ও রকেট পেমেন্ট
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    কার্ড বা রকেটের মাধ্যমে পেমেন্ট করতে আমাদের সহায়তা প্রতিনিধির সাথে সরাসরি কথা বলুন বা অনলাইনে পেমেন্ট নিশ্চিত করুন।
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        আপনার কার্ড বা মোবাইল নম্বর
                      </label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        ট্রানজেকশন / রেফারেন্স আইডি
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: কার্ড স্লিপ নম্বর"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono uppercase rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-1/3 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  ফিরে যান
                </button>
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  className="w-2/3 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>৳ {payableAmount.toLocaleString('en-IN')} প্রদান নিশ্চিত করুন</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Booking Success & Printable Voucher */}
          {step === 'success' && confirmedBooking && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">বুকিং সফল হয়েছে!</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  ঘুরবে পরিবারের সাথে আপনার যাত্রা নিশ্চিত করা হলো। একটি কনফার্মেশন এসএমএস পাঠানো হয়েছে।
                </p>
              </div>

              {/* Printable Voucher Box */}
              <div id="printable-voucher" className="bg-slate-50 border-2 border-dashed border-blue-400/50 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  অফিসিয়াল ট্রাভেল ভাউচার
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-white p-0.5 border border-slate-200 flex items-center justify-center shrink-0">
                    <img
                      src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
                      alt="ঘুরবে লোগো"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-blue-900 text-base leading-tight block">ঘুরবে</span>
                    <span className="text-[10px] text-slate-500 font-medium block -mt-0.5">ট্যুরস অ্যান্ড ট্রাভেলস বাংলাদেশ</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">বুকিং কোড</span>
                    <strong className="text-slate-900 font-mono text-sm">{confirmedBooking.bookingCode}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">তারিখ</span>
                    <strong className="text-slate-900">{confirmedBooking.date}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">প্যাকেজের নাম</span>
                    <strong className="text-slate-900">{confirmedBooking.packageTitle}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">ভ্রমণকারী সংখ্যা</span>
                    <strong className="text-slate-900">{confirmedBooking.guestsCount} জন</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">যাত্রীর নাম ও মোবাইল</span>
                    <strong className="text-slate-900">{confirmedBooking.travelerName} ({confirmedBooking.phone})</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">পরিশোধিত অ্যামাউন্ট</span>
                    <strong className="text-blue-700 font-bold tabular-nums">৳ {confirmedBooking.advancePaid.toLocaleString('en-IN')} (সফল)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">পেমেন্ট মাধ্যম</span>
                    <strong className="text-slate-900">
                      {confirmedBooking.paymentMethod === 'bkash'
                        ? 'বিকাশ (QR: 01711085960 / সেন্ড মানি: 01831841017)'
                        : confirmedBooking.paymentMethod === 'nagad'
                        ? 'নগদ পার্সোনাল (01831841017)'
                        : confirmedBooking.paymentMethod === 'bank'
                        ? 'পূবালী ব্যাংক (হিসাব: 3116901000653)'
                        : confirmedBooking.paymentMethod.toUpperCase()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">ট্রানজেকশন তথ্য</span>
                    <strong className="text-slate-900 font-mono text-xs truncate block">
                      {trxId ? `TrxID / রেফারেন্স: ${trxId}` : 'ডিজিটাল পেমেন্ট ভেরিফাইড'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
                  <span>জরুরি সহায়তা: <strong>09658-865593</strong> · WhatsApp: <strong>01911-050270</strong></span>
                  <span className="text-blue-700 font-semibold">স্ট্যাটাস: নিশ্চিতকৃত</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>ভাউচার প্রিন্ট / ডাউনলোড</span>
                </button>

                <button
                  type="button"
                  onClick={downloadGhurbeContactCard}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="ফোনে Ghurbe Tours & Travel নাম সেভ করুন"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>ফোনে নাম সেভ করুন (.vcf)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
                >
                  সম্পন্ন করুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
