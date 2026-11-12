import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, Sparkles, ArrowRight,
  Flame, MessageCircle, AlertCircle, Maximize2, Minimize2, ExternalLink, 
  Check, Utensils, Compass
} from 'lucide-react';
import { TourPackage } from '../types/travel';

interface CoxsBazarTourPopupModalProps {
  pkg: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
  onViewDetails: (pkg: TourPackage) => void;
}

export const CoxsBazarTourPopupModal: React.FC<CoxsBazarTourPopupModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onBookNow,
  onViewDetails,
}) => {
  // Starts in compact mode; clicking "বিস্তারিত দেখুন" or thumbnail expands full details
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 14, hours: 10, minutes: 25, seconds: 40 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Cox's Bazar Special Tour departure: 21 December 2026 at 9:00 PM
      const targetTime = new Date('2026-12-21T21:00:00+06:00').getTime();
      const nowTime = Date.now();
      let diff = targetTime - nowTime;

      if (diff <= 0 || isNaN(diff)) {
        diff = 0;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDismissed(true);
    try {
      sessionStorage.setItem('ghurbe_coxs_bazar_popup_closed', 'true');
    } catch {}
    onClose();
  };

  // Keyboard Escape listener to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen || !pkg || isDismissed) return null;

  // Convert numbers to Bengali digits
  const toBn = (num: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
      .toString()
      .padStart(2, '0')
      .split('')
      .map((d) => (d >= '0' && d <= '9' ? bnDigits[parseInt(d, 10)] : d))
      .join('');
  };

  const toBnPrice = (num: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
      .toLocaleString('en-US')
      .split('')
      .map((d) => (d >= '0' && d <= '9' ? bnDigits[parseInt(d, 10)] : d))
      .join('');
  };

  const offerPrice = pkg.price || 4785;
  const regularPrice = pkg.originalPrice || 6500;
  const couplePrice = pkg.couplePrice || 9999;
  const seatsLeft = pkg.seatsLeft ?? 18;
  const totalSeats = pkg.totalSeats ?? 40;
  const bookedSeats = Math.max(0, totalSeats - seatsLeft);
  const bookedPercent = Math.min(100, Math.max(15, Math.round((bookedSeats / totalSeats) * 100)));
  const coverImg =
    pkg.coverImage ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';

  const handleBook = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    handleClose();
    onBookNow(pkg);
  };

  const handleWhatsApp = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const message = encodeURIComponent(
      `আসসালামু আলাইকুম! ঘুরবে ট্রাভেলস, আমি ২১ ডিসেম্বর ২০২৬ তারিখের রংপুর ও বগুড়া থেকে কক্সবাজার স্পেশাল ট্যুরের (${pkg.duration?.textBn || '৩ দিন ২ রাত'}, জনপ্রতি ${toBnPrice(offerPrice)}৳) সিট বুকিং করতে চাই।`
    );
    window.open(`https://wa.me/8801980297939?text=${message}`, '_blank');
  };

  const handleOpenPage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    handleClose();
    onViewDetails(pkg);
  };

  // ==========================================
  // 1. COMPACT POPUP VIEW ("ছোট পপ-আপ")
  // ==========================================
  if (!isExpanded) {
    return (
      <div 
        className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-24 z-50 max-w-sm sm:max-w-md mx-auto sm:mx-0 animate-slide-up"
        role="dialog"
        aria-label="কক্সবাজার আগামী ট্যুর অফার নোটিফিকেশন"
      >
        <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-sky-400 overflow-hidden ring-4 ring-sky-500/20 transition-all hover:shadow-sky-500/30">
          {/* Top Bar Header */}
          <div className="px-3.5 pt-3 pb-2 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs shrink-0">
                <Flame className="w-3 h-3 text-red-600 fill-red-600 animate-pulse" />
                <span>আর মাত্র {toBn(timeLeft.days)} দিন বাকি!</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-400 text-slate-950 shrink-0">
                {pkg.duration?.textBn || '৩ দিন ২ রাত'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 shrink-0">
                ২১ ডিসেম্বর ট্যুর
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Open to Dedicated Page Icon Button */}
              <button
                type="button"
                onClick={handleOpenPage}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-sky-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10"
                title="আলাদা পেজে বিস্তারিত দেখুন"
                aria-label="আলাদা পেজে বিস্তারিত দেখুন"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Close / Cancel Icon Button */}
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-rose-600 active:bg-rose-700 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md border border-white/30 group"
                title="পপ-আপটি বন্ধ করুন (Cancel)"
                aria-label="পপ-আপটি বন্ধ করুন"
              >
                <X className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Compact Body Content */}
          <div className="p-3.5 space-y-3">
            {/* Thumbnail + Core Announcement Info */}
            <div className="flex items-center gap-3.5">
              <div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-sky-400 shadow-md cursor-pointer group"
                onClick={() => setIsExpanded(true)}
              >
                <img
                  src={coverImg}
                  alt="কক্সবাজার সমুদ্রসৈকত"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute bottom-1 left-1 right-1 text-[10px] font-black text-center text-white bg-slate-950/85 rounded-md py-0.5 backdrop-blur-xs">
                  কক্সবাজার
                </span>
              </div>

              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-sm font-black text-slate-900 leading-snug truncate">
                  🏖️ কক্সবাজার ও মেরিন ড্রাইভ স্পেশাল ট্যুর
                </h4>
                
                {/* Scarcity Badge */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold my-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>আর মাত্র {toBn(seatsLeft)}টি সিট আছে!</span>
                  <span className="text-[10px] text-emerald-700/80 font-medium">({toBn(bookedSeats)}টি বুকড)</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-0.5 gap-1">
                  <span className="text-[11px] text-slate-500 font-medium truncate">রংপুর ও বগুড়া থেকে</span>
                  <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="line-through text-[11px] text-slate-400">৳{toBnPrice(regularPrice)}</span>
                    <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                      {toBnPrice(offerPrice)} ৳ <span className="text-[10px] font-normal text-slate-500">/জন</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Live Countdown */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white border-2 border-sky-400/40 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-sky-300 font-bold mb-1.5 pb-1 border-b border-white/10">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>২১ ডিসেম্বর ট্যুর শুরু হতে বাকি:</span>
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px]">
                  আর {toBn(timeLeft.days)} দিন {toBn(timeLeft.hours)} ঘণ্টা
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                <div className="bg-white/10 rounded-xl py-1.5 px-0.5 border border-amber-400/30">
                  <span className="block text-base sm:text-lg font-black text-amber-300 leading-tight">
                    {toBn(timeLeft.days)}
                  </span>
                  <span className="text-[10px] text-slate-200 font-sans font-bold">দিন</span>
                </div>
                <div className="bg-white/10 rounded-xl py-1.5 px-0.5 border border-white/10">
                  <span className="block text-base sm:text-lg font-black text-white leading-tight">
                    {toBn(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] text-slate-200 font-sans font-bold">ঘণ্টা</span>
                </div>
                <div className="bg-white/10 rounded-xl py-1.5 px-0.5 border border-white/10">
                  <span className="block text-base sm:text-lg font-black text-white leading-tight">
                    {toBn(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] text-slate-200 font-sans font-bold">মিনিট</span>
                </div>
                <div className="bg-white/10 rounded-xl py-1.5 px-0.5 border border-sky-400/30">
                  <span className="block text-base sm:text-lg font-black text-sky-300 leading-tight">
                    {toBn(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] text-slate-200 font-sans font-bold">সেকেন্ড</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Expand details in modal + Direct booking */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white font-bold text-xs shadow-sm border border-sky-400/30 flex items-center justify-center gap-1 cursor-pointer active:scale-97 transition-all"
                title="কক্সবাজার ট্যুরের বিস্তারিত প্ল্যান দেখুন"
              >
                <span>বিস্তারিত দেখুন</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleBook}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-black text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1 cursor-pointer active:scale-97 transition-all"
                title={`এখনই ${toBnPrice(offerPrice)} টাকায় বুক করুন`}
              >
                <span>বুকিং ({toBnPrice(offerPrice)}৳)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Links: Separate Page, WhatsApp & Close Actions */}
            <div className="flex items-center justify-between text-[11px] pt-1 px-1 border-t border-slate-100">
              <button
                type="button"
                onClick={handleOpenPage}
                className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                title="আলাদা পেজে বিস্তারিত দেখুন"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>সম্পূর্ণ পেজ</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp চ্যাট</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="text-slate-500 hover:text-white hover:bg-rose-600 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95 text-xs shadow-xs group"
                title="পপ-আপটি বন্ধ করুন (Cancel)"
                aria-label="পপ-আপটি বন্ধ করুন"
              >
                <X className="w-3.5 h-3.5 text-rose-500 group-hover:text-white" />
                <span>বন্ধ করুন (Cancel)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. EXPANDED FULL DETAILS VIEW ("সম্পূর্ণ বিস্তারিত")
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-sky-400 overflow-hidden my-auto transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-label="কক্সবাজার স্পেশাল ট্যুরের সম্পূর্ণ বিস্তারিত"
      >
        {/* Top Controls: Minimize button and Close button */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-sky-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer border border-white/20 active:scale-95"
            title="ছোট করুন (পপ-আপ মিনিমাইজ)"
            aria-label="মিনিমাইজ করুন"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg cursor-pointer border border-white/20 active:scale-95"
            title="বন্ধ করুন (Close)"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="relative h-44 sm:h-52 overflow-hidden bg-slate-950">
          <img
            src={coverImg}
            alt="কক্সবাজার সমুদ্রসৈকত ও মেরিন ড্রাইভ"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-transparent to-slate-950/70" />

          {/* Badges on Hero */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5 border border-amber-300">
              <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600 animate-pulse" />
              <span>আর মাত্র {toBn(timeLeft.days)} দিন বাকি!</span>
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-slate-950 shadow-md border border-emerald-300/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>২১ ডিসেম্বর ধামাকা ট্যুর</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-sky-400 text-slate-950 shadow-md">
              {pkg.duration?.textBn || '৩ দিন ২ রাত'}
            </span>
          </div>

          {/* Bottom Title on Hero */}
          <div className="absolute bottom-3 left-4 right-4 text-white text-left">
            <p className="text-xs font-bold text-sky-300 flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>রংপুর ও বগুড়া থেকে সরাসরি চেয়ারকোচ বাসে যাত্রা</span>
            </p>
            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight drop-shadow-md">
              🏖️ কক্সবাজার সমুদ্রসৈকত ও মেরিন ড্রাইভ ট্যুর 🌅
            </h3>
          </div>
        </div>

        {/* Modal Body with Full Details */}
        <div className="p-4 sm:p-5 space-y-3.5 text-left max-h-[calc(85vh-200px)] overflow-y-auto">
          {/* Date & Price Box */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-blue-900 uppercase">যাত্রার নির্ধারিত তারিখ</p>
                <p className="text-sm font-black text-slate-900">২১ ডিসেম্বর ২০২৬ (সোমবার রাত ৯:০০)</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white inline-block">
                {toBnPrice(offerPrice)}৳ / জন
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">কাপল: {toBnPrice(couplePrice)}৳</p>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-2 border-sky-400/40 shadow-inner">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                <span>অফার ও আসন্ন ব্যাচ: আর মাত্র {toBn(timeLeft.days)} দিন!</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                লাইভ সময়
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-amber-400/30">
                <span className="block text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  {toBn(timeLeft.days)}
                </span>
                <span className="text-[10px] text-slate-200 font-semibold">দিন</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">
                  {toBn(timeLeft.hours)}
                </span>
                <span className="text-[10px] text-slate-300 font-semibold">ঘণ্টা</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">
                  {toBn(timeLeft.minutes)}
                </span>
                <span className="text-[10px] text-slate-300 font-semibold">মিনিট</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
                <span className="block text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  {toBn(timeLeft.seconds)}
                </span>
                <span className="text-[10px] text-slate-300 font-semibold">সেকেন্ড</span>
              </div>
            </div>
          </div>

          {/* Scarcity Alert */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border-2 border-rose-300 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600 animate-bounce" />
                <span>⚠️ আর মাত্র {toBn(seatsLeft)}টি সিট আছে!</span>
              </div>
              <span className="text-[11px] font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                {toBn(bookedSeats)}টি বুকড (মোট {toBn(totalSeats)} সিট)
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: `${bookedPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-600 mt-1.5 flex items-center justify-between">
              <span>সিট সংখ্যা সীমিত, প্রথম বুকিংয়ে ফ্রন্ট সিট নিশ্চিত!</span>
              <span className="font-bold text-rose-700">{toBn(seatsLeft)}টি খালি</span>
            </p>
          </div>

          {/* Detailed Features: 3 Days 2 Nights Breakdown */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>ট্যুরের পূর্ণাঙ্গ বিস্তারিত ও প্ল্যান ({pkg.duration?.textBn || '৩ দিন ২ রাত'})</span>
            </h4>

            {/* Day By Day Plan */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-blue-700">🚌 ১ম রাত (২১ ডিসেম্বর):</span>
                <span className="ml-1 text-slate-600">রাত ৯:০০ মিনিটে রংপুর ও বগুড়া থেকে আরামদায়ক চেয়ারকোচ বাসে কক্সবাজারের উদ্দেশ্যে যাত্রা শুরু।</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-emerald-700">🏨 ২য় দিন (২২ ডিসেম্বর):</span>
                <span className="ml-1 text-slate-600">কক্সবাজার পৌঁছে মানসম্মত হোটেলে চেক-ইন। কলাতলী, সুগন্ধা ও লাবণী পয়েন্টে সমুদ্র স্নান এবং বিকেলে সূর্যাস্ত উপভোগ।</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-amber-700">🚗 ৩য় দিন (২৩ ডিসেম্বর):</span>
                <span className="ml-1 text-slate-600">খোলা জীপে ৮০ কিমি মেরিন ড্রাইভ রোড, হিমছড়ি পাহাড়, ইনানী পাথুরে সৈকত ও বার্মিজ মার্কেট ঘুরে ফিরতি যাত্রা।</span>
              </div>
            </div>
          </div>

          {/* Package Inclusions & Spots */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800">
              <span className="font-black text-emerald-800 block text-xs flex items-center gap-1 mb-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>প্যাকেজে যা থাকছে</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li>• রংপুর/বগুড়া-কক্সবাজার বাস</li>
                <li>• মানসম্মত হোটেলে রাত্রিযাপন</li>
                <li>• ৫ বেলা সুস্বাদু ফ্রেশ খাবার</li>
                <li>• মেরিন ড্রাইভ জীপ রাইড</li>
                <li>• সার্বক্ষণিক গাইড সার্ভিস</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-slate-800">
              <span className="font-black text-blue-800 block text-xs flex items-center gap-1 mb-1">
                <Utensils className="w-3.5 h-3.5 text-blue-600" />
                <span>প্রধান দর্শনীয় স্থান</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li>• লাবণী ও সুগন্ধা বিচ</li>
                <li>• ৮০ কিমি মেরিন ড্রাইভ</li>
                <li>• হিমছড়ি পাহাড় ও ঝর্ণা</li>
                <li>• ইনানী পাথুরে প্রবাল বিচ</li>
                <li>• পাটুয়ারটেক ও বার্মিজ মার্কেট</li>
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleBook}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ এখনই বুক করুন ({toBnPrice(offerPrice)}৳)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-97"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp-এ কনফার্ম</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-97 border border-rose-200"
                title="পপ-আপটি কেটে দিন"
              >
                <X className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                <span>কেটে দিন (বন্ধ)</span>
              </button>
            </div>
          </div>

          {/* Collapse back to Small Popup & Dismiss */}
          <div className="flex items-center justify-center gap-4 pt-1 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>ছোট করুন (Minimize)</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 underline cursor-pointer"
            >
              পরে বুক করব (বন্ধ করুন)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
