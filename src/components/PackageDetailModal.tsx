import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Users, 
  Bus, 
  Utensils, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  HeartHandshake, 
  PhoneCall, 
  MessageCircle,
  Building2,
  Waves,
  SunMedium
} from 'lucide-react';
import { TourPackage } from '../types/travel';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onBookNow,
}) => {
  const [activeTab, setActiveTab] = useState<'spots' | 'itinerary' | 'includes' | 'whyUs'>('spots');

  if (!pkg) return null;

  const defaultSightseeing = [
    'কুয়াকাটা সমুদ্রসৈকত',
    'সূর্যোদয় ও সূর্যাস্ত উপভোগ',
    'কুয়াকাটা বৌদ্ধ মন্দির ও বৌদ্ধ বিহার',
    'কুয়াকাটার ঐতিহাসিক কুয়া ও মিষ্টি পানির কূপ',
    'গঙ্গামতীর চর',
    'ঝাউবন',
    'লাল কাঁকড়ার চর',
    'কাউয়ার চর',
    'লেবুর চর',
    'ভাইরাল ঝিনুক বিচ',
    'তিন নদীর মোহনা',
    'ফাতরার বন — সুন্দরবনের পূর্বাংশের প্রাকৃতিক সৌন্দর্য',
    'রাখাইন পল্লী',
    'বার্মিজ মার্কেট',
    'শুঁটকি পল্লী',
    'রূপালী দ্বীপ'
  ];

  const spotsList = pkg.sightseeingSpots && pkg.sightseeingSpots.length > 0 
    ? pkg.sightseeingSpots 
    : (pkg.id === 'kuakata-beach' ? defaultSightseeing : pkg.highlights);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/80 backdrop-blur-sm p-2.5 sm:p-5 flex justify-center items-start min-h-screen py-4 sm:py-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200/90 max-h-[90vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer border border-white/20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Image - Compacted for instant visibility on all devices */}
        <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden bg-slate-950">
          <img
            src={pkg.coverImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
              {pkg.isHighlighted && (
                <span className="px-3 py-0.5 sm:py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#be123c] text-white shadow-md flex items-center gap-1 border border-rose-300/30">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>{pkg.highlightBadge || 'স্পেশাল হাইলাইটেড অফার'}</span>
                </span>
              )}
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                {pkg.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {pkg.duration.textBn}
              </span>
              {pkg.departureDateText && (
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-sky-500 text-white flex items-center gap-1 shadow-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{pkg.departureDateText}</span>
                </span>
              )}
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              {pkg.title}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-200 mt-1 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1 text-sky-300 font-semibold">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{pkg.location}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-sky-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span className="font-bold">{pkg.rating}</span> ({pkg.reviewCount} রিভিউ)
              </span>
            </p>
          </div>
        </div>

        {/* Pricing Spotlight Banner - Akashi, Nil, Kalo, Sada, with Maroon touch */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 px-4 sm:px-5 py-3 border-y border-sky-500/30 text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <p className="text-xs text-sky-300 font-bold uppercase tracking-wider">
                {pkg.id === 'kuakata-beach' ? '🌴 KUAKATA TOUR PACKAGE 2026' : 'প্যাকেজ রেট ও বুকিং অফার'}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-300">
                {pkg.targetAudience || 'বগুড়া, রংপুর ও গাইবান্ধার ভ্রমণপ্রেমীদের জন্য বিশেষ আয়োজন'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Solo Price */}
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-right">
              <span className="text-[10px] uppercase text-slate-300 font-semibold block">👤 জনপ্রতি</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-extrabold text-sky-300 tabular-nums">
                  ৳ {pkg.price.toLocaleString('en-IN')}
                </span>
                {pkg.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through tabular-nums">
                    ৳{pkg.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Couple Price with Maroon Accent ("Ektu Hat Merun") */}
            {pkg.couplePrice && (
              <div className="bg-gradient-to-br from-[#881337] to-[#9f1239] px-3 py-1.5 rounded-xl border border-rose-400/40 text-right shadow-sm">
                <span className="text-[10px] uppercase text-rose-100 font-bold block">💑 কাপল প্যাকেজ</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-extrabold text-white tabular-nums">
                    ৳ {pkg.couplePrice.toLocaleString('en-IN')}
                  </span>
                  {pkg.coupleOriginalPrice && (
                    <span className="text-[10px] text-rose-200 line-through tabular-nums">
                      ৳{pkg.coupleOriginalPrice}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Body Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Overview text / User brief description */}
          <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-slate-50 rounded-2xl p-4 sm:p-5 border border-blue-200/70">
            <div className="flex items-center gap-2 mb-2">
              <SunMedium className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                {pkg.id === 'kuakata-beach'
                  ? '🌊 মাত্র ৩,৫৯৯ টাকায় সাগরকন্যা কুয়াকাটা ভ্রমণ! 🌅'
                  : 'প্যাকেজ সারসংক্ষেপ'}
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-normal">
              {pkg.fullDesc}
            </p>
          </div>

          {/* Quick Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium block">📅 যাত্রা শুরুর তারিখ</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {pkg.departureDateText || pkg.departureDates[0] || '১২ নভেম্বর ২০২৬'}
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium block">📍 যাত্রার স্থান</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate" title={pkg.pickupPoint}>
                {pkg.departureLocation ? 'রংপুর (বগুড়া/গাইবান্ধা)' : pkg.pickupPoint}
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium block">🏨 আবাসন ব্যবস্থা</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                মানসম্মত হোটেল (১ রাত)
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 font-medium block">🍽️ মোট খাবার</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                মোট ৫ বেলা সুস্বাদু খাবার
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold overflow-x-auto pb-0.5">
              <button
                onClick={() => setActiveTab('spots')}
                className={`pb-3 px-1 relative cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'spots'
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>যে দর্শনীয় স্থানগুলো দেখবেন ({spotsList.length}টি)</span>
              </button>

              <button
                onClick={() => setActiveTab('itinerary')}
                className={`pb-3 px-1 relative cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'itinerary'
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>দিনভিত্তিক ভ্রমণসূচি</span>
              </button>

              <button
                onClick={() => setActiveTab('includes')}
                className={`pb-3 px-1 relative cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'includes'
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>প্যাকেজে যা যা থাকছে / থাকছে না</span>
              </button>

              <button
                onClick={() => setActiveTab('whyUs')}
                className={`pb-3 px-1 relative cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'whyUs'
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>কেন ঘুরবে সঙ্গে যাবেন?</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Sightseeing Spots (16 Spots with visual badges) */}
          {activeTab === 'spots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Waves className="w-5 h-5 text-blue-600" />
                    <span>📍 যে দর্শনীয় স্থানগুলো ঘুরে দেখবেন</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    কুয়াকাটার মনোরম সৈকত, দ্বীপ ও স্থানীয় আকর্ষণীয় ১৬টি স্থান
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-900 rounded-full">
                  মোট ১৬টি স্পট
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2.5">
                {spotsList.map((spot, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {spot}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl text-xs text-blue-900 leading-relaxed">
                ℹ️ <strong>বিশেষ দ্রষ্টব্য:</strong> এ ছাড়া ভ্রমণসূচি ও স্থানীয় যাতায়াতের সুযোগ অনুযায়ী আরও আকর্ষণীয় স্থান ঘুরে দেখার সুযোগ থাকতে পারে।
              </div>
            </div>
          )}

          {/* TAB 2: Day-by-Day Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {pkg.itinerary.map((item) => (
                <div
                  key={item.day}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 relative shadow-2xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      ০{item.day}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      দিন {item.day}: {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    {item.description}
                  </p>
                  <div className="mt-3 pl-10 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-blue-600" />
                      খাবার:
                    </span>
                    {item.meals.map((meal, mi) => (
                      <span
                        key={mi}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Includes & Excludes */}
          {activeTab === 'includes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-2xs">
                <h4 className="text-sm sm:text-base font-bold text-emerald-900 flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>✨ প্যাকেজে যা যা থাকছে</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
                  {pkg.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 shadow-2xs">
                <h4 className="text-sm sm:text-base font-bold text-rose-900 flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>🚫 প্যাকেজের বাইরে যা থাকবে</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950">
                  {pkg.excludes.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold mt-0.5">✕</span>
                      <span className="leading-relaxed">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: Why Choose Ghurbe & Booking Guidelines */}
          {activeTab === 'whyUs' && (
            <div className="space-y-5">
              {/* Why Ghurbe Tour & Travel */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
                <h4 className="text-sm sm:text-base font-bold text-blue-950 flex items-center gap-2 mb-3">
                  <HeartHandshake className="w-5 h-5 text-blue-600" />
                  <span>❤️ কেন ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের সঙ্গে যাবেন?</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(pkg.whyChooseUs || [
                    'সাশ্রয়ী বাজেটে আনন্দময় ভ্রমণ',
                    'বন্ধু ও প্রিয়জনদের সঙ্গে সুন্দর সময় কাটানোর সুযোগ',
                    'সমুদ্র, প্রকৃতি ও স্থানীয় সংস্কৃতি উপভোগ',
                    'দৈনন্দিন ব্যস্ততা থেকে একটু প্রশান্তির ছুটি',
                    'ঘুরবে ট্যুর অ্যান্ড ট্রাভেল — আপনার ভ্রমণ, আমাদের আয়োজন'
                  ]).map((point, pi) => (
                    <div key={pi} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 bg-white/90 p-2.5 rounded-xl border border-blue-200/60 shadow-2xs">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seat Notice & Slogan with Akashi, Nil, Kalo and touch of Maroon */}
              <div className="bg-gradient-to-r from-slate-950 via-[#3b0717] to-blue-950 text-white rounded-2xl p-5 border border-rose-900/60 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-rose-200 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>{pkg.seatNotice || '📢 সিট সীমিত — বুকিংয়ের জন্য আজই যোগাযোগ করুন!'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  আপনার পরবর্তী ভ্রমণ হোক আনন্দময়, নিরাপদ ও স্মরণীয়। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল সর্বদাই আপনার পাশে।
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/10">
                  <span className="font-semibold text-sky-200">
                    🌍 ঘুরবে ট্যুর অ্যান্ড ট্রাভেল — আপনার ভ্রমণ, আমাদের আয়োজন।
                  </span>
                  <span className="text-slate-300">
                    📩 বুকিং ও বিস্তারিত তথ্যের জন্য ইনবক্স বা সরাসরি কল করুন।
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing & Sticky CTA */}
        <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg z-20">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
              বুকিং মূল্য বিবরণ
            </span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-black text-slate-950 tabular-nums">
                ৳ {pkg.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ জন</span>
              {pkg.couplePrice && (
                <span className="text-xs font-bold text-white bg-gradient-to-r from-[#881337] to-[#9f1239] px-2.5 py-0.5 rounded-md shadow-2xs">
                  💑 কাপল: ৳{pkg.couplePrice.toLocaleString('en-IN')}
                </span>
              )}
              {pkg.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ৳ {pkg.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/3 sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>

            {/* Direct WhatsApp / Helpline query button */}
            <a
              href="https://wa.me/8801700000000?text=%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%95%E0%A7%81%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%95%E0%A6%BE%E0%A6%9F%E0%A6%BE%20%E0%A7%A9%E0%A7%AB%E0%A7%AF%E0%A7%AF%E0%A7%B3%20%E0%A6%AA%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%95%E0%A7%87%E0%A6%9C%20%E0%A6%AC%E0%A7%81%E0%A6%95%20%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="ইনবক্স / হোয়াটসঅ্যাপে কথা বলুন"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">ইনবক্স করুন</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-xl shadow-md shadow-blue-500/25 transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>এখনই বুক করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
