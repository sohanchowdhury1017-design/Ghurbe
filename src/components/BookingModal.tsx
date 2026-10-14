import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Printer, Calendar, Users, MapPin, Phone, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { TourPackage, BookingRecord } from '../types/travel';

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
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'card' | 'cash'>('bkash');
  const [paymentType, setPaymentType] = useState<'full' | 'advance'>('advance');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!pkg) return null;

  const totalPrice = packageType === 'couple' && pkg.couplePrice
    ? pkg.couplePrice
    : pkg.price * guestsCount;
  // Booking money is exactly 1,000 taka per traveler (or 2,000 for couple)
  const advanceAmount = packageType === 'couple' ? 2000 : 1000 * guestsCount;
  const payableAmount = paymentType === 'full' ? totalPrice : advanceAmount;

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
      notes,
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
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
                    <div className="w-8 h-8 mx-auto rounded-lg bg-pink-600 text-white font-black text-xs flex items-center justify-center">
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
                    <div className="w-8 h-8 mx-auto rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                      নগদ
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">Nagad</span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('rocket')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'rocket'
                        ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg bg-purple-700 text-white font-black text-xs flex items-center justify-center">
                      রকেট
                    </div>
                    <span className="text-xs font-bold text-slate-800 mt-1 block">Rocket</span>
                  </button>

                  {/* Card / Bank */}
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

              {/* Payment Details Note */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  নিরাপদ মার্চেন্ট গেটওয়ে। পেমেন্ট সম্পন্ন হওয়া মাত্র আপনার মোবাইল নম্বরে ও স্ক্রিনে অফিসিয়াল ডিজিটাল বুকিং ভাউচার প্রদর্শিত হবে।
                </p>
              </div>

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

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
                  <span>জরুরি সহায়তা: <strong>09658-865593</strong> · ghurbebd@gmail.com</span>
                  <span className="text-blue-700 font-semibold">স্ট্যাটাস: নিশ্চিতকৃত</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>ভাউচার প্রিন্ট / ডাউনলোড করুন</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
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
