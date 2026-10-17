import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  X,
  Share2, 
  Check, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Users, 
  Bus, 
  Utensils, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  Sparkles, 
  Waves, 
  SunMedium, 
  Building2, 
  Compass, 
  HeartHandshake,
  ChevronRight,
  Info,
  BadgePercent
} from 'lucide-react';
import { TourPackage } from '../types/travel';

interface PackageDetailPageProps {
  pkg: TourPackage;
  onBackToHome: () => void;
  onBookNow: (pkg: TourPackage) => void;
  onOpenBookings?: () => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({
  pkg,
  onBackToHome,
  onBookNow,
}) => {
  const [activeTab, setActiveTab] = useState<'spots' | 'itinerary' | 'meals' | 'includes' | 'whyUs' | 'reviews'>('spots');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'regular' | 'couple'>('regular');

  // Available images
  const allImages = pkg.gallery && pkg.gallery.length > 0 
    ? [pkg.coverImage, ...pkg.gallery.filter(img => img !== pkg.coverImage)]
    : [pkg.coverImage];

  // Slug URL display (e.g. ghurbe.com/Kuakata)
  const displaySlug = pkg.slug === 'kuakata' ? 'Kuakata' : (pkg.slug.charAt(0).toUpperCase() + pkg.slug.slice(1));
  const fullUrl = `https://ghurbe.com/${displaySlug}`;

  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${pkg.title} | ghurbe.com/${displaySlug}`;

    // Close page on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBackToHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pkg, displaySlug, onBackToHome]);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

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

  const calculatePrice = (): number => {
    if (selectedPlan === 'couple') {
      return pkg.couplePrice || (pkg.price * 2 - 500);
    }
    return pkg.price;
  };

  const calculateOriginalPrice = (): number => {
    const orig = pkg.originalPrice ?? pkg.price;
    if (selectedPlan === 'couple') {
      return pkg.coupleOriginalPrice ?? (orig * 2);
    }
    return orig;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 sm:pb-16 animate-fade-in">
      {/* Top Breadcrumb & Close/Share Action Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
          {/* Back & Close button group */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors py-1.5 px-2.5 rounded-xl hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
              title="সব প্যাকেজ / হোমপেজে ফিরুন"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600 stroke-[2.5]" />
              <span className="hidden xs:inline">সব প্যাকেজ</span>
              <span className="xs:hidden">হোম</span>
            </button>

            {/* সুস্পষ্ট কাটার বাটন (Close/Cut this page) */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-black rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 shadow-xs cursor-pointer active:scale-95 transition-all"
              title="এই আলাদা পেজটি কেটে দিন (Close)"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>কেটে দিন</span>
            </button>
          </div>

          {/* URL & Share action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-100 text-xs font-mono font-medium border border-slate-700 shadow-xs">
              <span className="text-sky-400 font-bold">ghurbe.com/</span>
              <span className="text-white font-extrabold">{displaySlug}</span>
            </div>

            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                copiedLink 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
              title="লিংক কপি করুন"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">লিংক কপি</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Close Button (Screen corner quick exit) */}
      <button
        onClick={onBackToHome}
        className="fixed top-28 right-3 z-40 sm:hidden flex items-center gap-1 py-1.5 px-3 rounded-full bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-white/20 active:scale-95 transition-all text-xs font-bold cursor-pointer hover:bg-rose-600"
        aria-label="আলাদা পেজটি কেটে দিন"
        title="পেজটি কেটে দিন (✕)"
      >
        <X className="w-3.5 h-3.5 text-rose-400" />
        <span>কাটুন</span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Package Header Banner (Akashi, Nil, Kalo, Sada, with Maroon Accent) */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl mb-8 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] lg:min-h-[460px]">
            {/* Visual Media Section (Gallery & Cover) */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full bg-slate-900 overflow-hidden">
              <img
                src={allImages[activeImageIndex] || pkg.coverImage}
                alt={pkg.title}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/80" />
              
              {/* Badges on Top of Photo */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                {pkg.isHighlighted && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#be123c] text-white shadow-lg flex items-center gap-1.5 border border-rose-300/40">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>{pkg.highlightBadge || '🔥 ধামাকা অফার'}</span>
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                  {pkg.categoryLabel}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-sky-400 text-slate-950 shadow-md flex items-center gap-1.5 border border-sky-300">
                  <Clock className="w-3.5 h-3.5 text-slate-950" />
                  <span>{pkg.duration.textBn || '৩ রাত ২ দিন'}</span>
                </span>
              </div>

              {/* Thumbnail Bar */}
              {allImages.length > 1 && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto pb-1 z-10 scrollbar-none">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-sky-400 scale-105 shadow-md' : 'border-white/40 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content & High-Impact Summary */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 border-t lg:border-t-0 lg:border-l border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{pkg.rating} ({pkg.reviewCount}+ রিভিউ)</span>
                  </div>
                  <span className="text-xs text-sky-300 font-semibold">• ১০০% ভেরিফাইড ট্যুর</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
                  {pkg.title}
                </h1>

                {pkg.englishTitle && (
                  <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">
                    {pkg.englishTitle}
                  </p>
                )}

                <div className="space-y-2.5 mb-5 text-sm text-slate-200">
                  <div className="flex items-start gap-2 bg-sky-950/60 p-2 rounded-xl border border-sky-400/30">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>সময়কাল: <strong className="text-white font-black text-base">{pkg.duration.textBn || '৩ রাত ২ দিন'}</strong> <span className="text-sky-300 text-xs font-semibold">(১ রাত হোটেল + ২ রাত বাস জার্নি)</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{pkg.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>যাত্রার তারিখ: <strong className="text-white">{pkg.departureDateText || '১২ নভেম্বর ২০২৬'}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bus className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>যাতায়াত: <span className="text-sky-200">{pkg.departureLocation}</span></span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {pkg.shortDesc}
                </p>
              </div>

              {/* Price Callout Banner with Akashi, Nil & Maroon Highlights */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-sky-500/30">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-slate-400">জনপ্রতি স্পেশাল অফার</span>
                    <span className="text-xs text-[#be123c] bg-[#881337]/20 border border-rose-900/40 px-2 py-0.5 rounded font-bold">
                      {pkg.badge || '🔥 বিশেষ ছাড়'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-white tabular-nums">
                      ৳{pkg.price.toLocaleString('bn-BD')}
                    </span>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ৳{pkg.originalPrice.toLocaleString('bn-BD')}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-sky-300 ml-auto">
                      (কাপল ৳{(pkg.couplePrice || 7999).toLocaleString('bn-BD')})
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => onBookNow(pkg)}
                    className="flex-1 py-3 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-base"
                  >
                    <span>বুকিং শুরু করুন</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <a
                    href={`https://wa.me/8801911050270?text=${encodeURIComponent(`আসসালামু আলাইকুম! ঘুরবে ট্রাভেলস, আমি ${pkg.title} সম্পর্কে বিস্তারিত জানতে চাই`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 flex items-center justify-center gap-1.5 transition-colors"
                    title="হোয়াটসঅ্যাপ পরামর্শ"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:inline text-xs">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar: Duration (৩ রাত ২ দিন), Hotel, Meals, Spots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-sky-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200">
              <Clock className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">প্যাকেজ সময়কাল</span>
              <strong className="text-sm sm:text-base font-black text-slate-900 leading-tight block">
                {pkg.duration.textBn || '৩ রাত ২ দিন'}
              </strong>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">আবাসন সুবিধা</span>
              <strong className="text-sm sm:text-base font-black text-slate-900 leading-tight block">
                ১ রাত হোটেল থাকা
              </strong>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Utensils className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">খাবার অন্তর্ভুক্ত</span>
              <strong className="text-sm sm:text-base font-black text-slate-900 leading-tight block">
                মোট ৫ বেলা খাবার
              </strong>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-rose-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-[#881337] flex items-center justify-center shrink-0 border border-rose-200">
              <Waves className="w-5 h-5 text-[#881337]" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">কুয়াকাটার আকর্ষণ</span>
              <strong className="text-sm sm:text-base font-black text-slate-900 leading-tight block">
                ১৬টি দর্শনীয় স্থান
              </strong>
            </div>
          </div>
        </div>

        {/* Content Tabs & Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Navigation Tabs (Akashi / Nil style) */}
            <div className="bg-white p-2 rounded-2xl shadow-xs border border-slate-200 overflow-x-auto flex items-center gap-1 scrollbar-none">
              <button
                onClick={() => setActiveTab('spots')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'spots'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Waves className="w-4 h-4" />
                <span>১৬টি দর্শনীয় স্থান</span>
              </button>

              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'itinerary'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>৩ দিনের ভ্রমণসূচি (৩ রাত ২ দিন)</span>
              </button>

              <button
                onClick={() => setActiveTab('meals')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'meals'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>৫ বেলা খাবার তালিকা</span>
              </button>

              <button
                onClick={() => setActiveTab('includes')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'includes'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>অন্তর্ভুক্ত ও বাদ</span>
              </button>

              <button
                onClick={() => setActiveTab('whyUs')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'whyUs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>কেন ঘুরবে স্পেশাল</span>
              </button>
            </div>

            {/* TAB 1: 16 Sightseeing Spots */}
            {activeTab === 'spots' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Waves className="w-6 h-6 text-sky-500" />
                      <span>কুয়াকাটায় যা যা ঘুরে দেখবেন (১৬টি প্রধান আকর্ষণ)</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      একই সৈকতে সূর্যোদয় ও সূর্যাস্ত এবং ফাতরার বন সহ কুয়াকাটার সেরা রূপ উপভোগ করুন
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                    ১৬টি স্পট অন্তর্ভুক্ত
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                  {spotsList.map((spot, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/80 hover:border-sky-400 hover:shadow-xs transition-all group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 leading-snug">
                          {spot}
                        </p>
                        <span className="text-[11px] text-slate-500">
                          অভিজ্ঞ গাইড পরিচালিত ভিজিট
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spotlight Callout for Fatra Forest & Crabs */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white border border-sky-400/30 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/40">
                    <SunMedium className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-sky-200">
                      সূর্যোদয়, সূর্যাস্ত ও ফাতরার বন (সুন্দরবনের পূর্বাংশ)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      গঙ্গামতীর চরে চোখজুড়ানো রক্তিম সূর্যোদয় এবং পশ্চিম সৈকতে সূর্যাস্ত দেখা যাবে। লাল কাঁকড়ার চরে লাখ লাখ লাল কাঁকড়ার খেলা ও ভাইরাল ঝিনুক বিচের নির্মল প্রকৃতি স্মরণীয় করে রাখবে এই সফর।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Detailed Day-by-Day Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <span>বিস্তারিত ৩ দিনের ভ্রমণসূচি (৩ রাত ২ দিন প্যাকেজ)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    রংপুর থেকে আরামদায়ক যাত্রা, ১ রাত হোটেল থাকা, ২ রাত বাস জার্নি ও নিরাপদ প্রত্যাবর্তন
                  </p>
                </div>

                <div className="space-y-6">
                  {pkg.itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="relative pl-6 sm:pl-8 border-l-2 border-blue-600/40 pb-6 last:pb-0"
                    >
                      {/* Day Dot Badge */}
                      <div className="absolute -left-3.5 sm:-left-4 top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border-2 border-white">
                        {item.day}
                      </div>

                      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 hover:border-blue-400 transition-all">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            দিন {item.day}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Meals of the day */}
                        {item.meals && item.meals.length > 0 && (
                          <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              <Utensils className="w-3.5 h-3.5 text-blue-600" />
                              খাবার:
                            </span>
                            {item.meals.map((meal, mIdx) => (
                              <span
                                key={mIdx}
                                className="text-xs bg-white text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs font-medium"
                              >
                                {meal}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Meals Plan (5 Meals Included) */}
            {activeTab === 'meals' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Utensils className="w-6 h-6 text-sky-600" />
                    <span>মোট ৫ বেলা মানসম্মত ও সুস্বাদু খাবার অন্তর্ভুক্ত</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    পরিচ্ছন্ন পরিবেশে স্থানীয় ফ্রেশ মাছ, মাংস ও সুস্বাদু খাবারের নিশ্চয়তা
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">১ম দিন সকালে</span>
                    <h3 className="font-bold text-slate-900 mt-2">সকালের নাস্তা</h3>
                    <p className="text-xs text-slate-600 mt-1">পরোটা/রুটি, ডাল/সবজি, ডিম ভাজি ও স্পেশাল চা।</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">১ম দিন দুপুরে</span>
                    <h3 className="font-bold text-slate-900 mt-2">কুয়াকাটার স্পেশাল লাঞ্চ</h3>
                    <p className="text-xs text-slate-600 mt-1">সাদা ভাত, কুয়াকাটার ফ্রেশ সামুদ্রিক রূপচাঁদা/ইলিশ মাছ অথবা দেশি মুরগি, স্পেশাল ভর্তা, সবজি ও ঘন ডাল।</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">১ম দিন রাতে</span>
                    <h3 className="font-bold text-slate-900 mt-2">সুস্বাদু ডিনার</h3>
                    <p className="text-xs text-slate-600 mt-1">সাদা ভাত, দেশি মুরগির ভুনা / মাছ, ডাল ও সালাদ।</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">২য় দিন সকালে</span>
                    <h3 className="font-bold text-slate-900 mt-2">সকালের পুষ্টিকর নাস্তা</h3>
                    <p className="text-xs text-slate-600 mt-1">ভূনা খিচুড়ি ও ডিম ভুনা অথবা পরোটা ও সবজি-চা।</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 sm:col-span-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">২য় দিন দুপুরে (ফিরতি যাত্রার পূর্বে)</span>
                    <h3 className="font-bold text-slate-900 mt-2">বিদায়ী লাঞ্চ</h3>
                    <p className="text-xs text-slate-600 mt-1">সাদা ভাত, মুরগি/মাছ, ভর্তা, সবজি ও ডাল। ভরপেট তৃপ্তিদায়ক খাবার শেষে রংপুরের উদ্দেশ্যে যাত্রা।</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900">
                  💡 <strong>বিশেষ সুবিধা:</strong> যাদের বিশেষ খাদ্যাভ্যাস বা অ্যালার্জি রয়েছে, তারা বুকিংয়ের সময় আমাদের জানালে বিকল্প খাবারের ব্যবস্থা রাখা হবে।
                </div>
              </div>
            )}

            {/* TAB 4: Inclusions & Exclusions */}
            {activeTab === 'includes' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <span>প্যাকেজে যা যা অন্তর্ভুক্ত এবং যা অন্তর্ভুক্ত নয়</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    ১০০% স্বচ্ছ পলিসি — কোনো লুকানো বা হিডেন চার্জ নেই
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Includes */}
                  <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200/80">
                    <h3 className="font-extrabold text-emerald-900 text-base flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>যা যা থাকছে (Included):</span>
                    </h3>
                    <ul className="space-y-3">
                      {pkg.includes.map((inc, i) => (
                        <li key={i} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excludes */}
                  <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-200/80">
                    <h3 className="font-extrabold text-rose-900 text-base flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>যা অন্তর্ভুক্ত নয় (Excluded):</span>
                    </h3>
                    <ul className="space-y-3">
                      {pkg.excludes.map((exc, i) => (
                        <li key={i} className="text-xs sm:text-sm text-rose-950 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Why Ghurbe */}
            {activeTab === 'whyUs' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                    <span>কেন ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের সাথে যাবেন?</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    বগুড়া, রংপুর ও গাইবান্ধার ভ্রমণপ্রেমীদের বিশ্বস্ত ভ্রমণ সঙ্গী
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(pkg.whyChooseUs || [
                    'সাশ্রয়ী বাজেটে আনন্দময় ভ্রমণ (সেরা সার্ভিস নিশ্চয়তা)',
                    'বন্ধু ও প্রিয়জনদের সঙ্গে সুন্দর ও নিরাপদ সময় কাটানোর সুযোগ',
                    'সমুদ্র, প্রকৃতি ও স্থানীয় রাখাইন সংস্কৃতি উপভোগ',
                    'অভিজ্ঞ ও দায়িত্বশীল টিম সাপোর্ট'
                  ]).map((why, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50/50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 flex items-start gap-3"
                    >
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0 font-bold" />
                      <span>{why}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white">
                  <h3 className="font-extrabold text-base mb-1">পরিবার ও নারীদের জন্য ১০০% নিরাপদ পরিবেশ</h3>
                  <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                    আমাদের প্রতিটি ট্যুরে ফ্যামিলি ও নারী ভ্রমণকারীদের সর্বোচ্চ নিরাপত্তা, শালীন পরিবেশ ও বিশেষ সহায়তা নিশ্চিত করা হয়। সার্বক্ষণিক দায়িত্বশীল হোস্ট আপনার পাশে থাকবেন।
                  </p>
                </div>
              </div>
            )}

            {/* Comprehensive Package Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span>প্যাকেজ ওভারভিউ ও বিবরণ</span>
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3 whitespace-pre-line">
                {pkg.fullDesc}
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar (4 Cols on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-5">
            {/* Reservation & Rate Calculator Box */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-200 space-y-5">
              {/* Header with touch of Maroon */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">বুকিং ক্যালকুলেটর</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#881337] text-white">
                  সীমিত আসন বাকি
                </span>
              </div>

              {/* Plan Switcher: Regular vs Couple */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('regular')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlan === 'regular'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  রেগুলার (শেয়ারিং)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlan('couple')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlan === 'couple'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  কাপল প্যাকেজ
                </button>
              </div>

              {/* Price Calculation Display */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-5 border border-sky-400/30">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-sky-200 font-semibold">
                    {selectedPlan === 'couple' ? 'কাপল টোটাল প্রাইস (২ জন প্রাইভেট রুম)' : 'জনপ্রতি রেগুলার মূল্য'}
                  </span>
                  <span className="text-[11px] text-rose-300 font-bold">
                    {calculateOriginalPrice() > calculatePrice() ? `৳${(calculateOriginalPrice() - calculatePrice()).toLocaleString('bn-BD')} সেভ!` : ''}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                    ৳{calculatePrice().toLocaleString('bn-BD')}
                  </span>
                  {calculateOriginalPrice() > calculatePrice() && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      ৳{calculateOriginalPrice().toLocaleString('bn-BD')}
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-sky-400" /> প্যাকেজ সময়কাল:
                    </span>
                    <strong className="text-white font-bold">{pkg.duration.textBn || '৩ রাত ২ দিন'}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">অগ্রিম বুকিং মানি:</span>
                    <span className="font-bold text-sky-400">মাত্র ৳১,০০০ (বিকাশ/নগদ)</span>
                  </div>
                </div>
              </div>

              {/* Seat Alert Notification (Touch of Maroon) */}
              <div className="bg-gradient-to-r from-slate-950 via-[#3b0717] to-slate-950 text-white rounded-2xl p-4 border border-rose-900/60 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-rose-300 font-extrabold text-xs">
                  <Sparkles className="w-3.5 h-3.5 fill-rose-300" />
                  <span>১২ নভেম্বর ২০২৬ যাত্রা নিশ্চিত!</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  আরামদায়ক চেয়ারকোচ বাসে আসন সংখ্যা সীমিত। আসন নিশ্চিত করতে আগে যোগাযোগ করুন।
                </p>
              </div>

              {/* Primary Call to Action Button */}
              <button
                onClick={() => onBookNow(pkg)}
                className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <span>এখনই বুকিং নিশ্চিত করুন</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Instant Call & WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:09658865593"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>09658-865593</span>
                </a>
                <a
                  href={`https://wa.me/8801911050270?text=${encodeURIComponent(`আসসালামু আলাইকুম! আমি ${pkg.title} বুকিং করতে চাই`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-300"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp চ্যাট</span>
                </a>
              </div>

              {/* Pickup Points & Support Checklist */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Bus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>পিকআপ: <strong>রংপুর, বগুড়া, গাইবান্ধা</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>১০০% নিরাপদ পরিবার ও কাপল ফ্রেন্ডলি ট্যুর</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>২৪/৭ কাস্টমার ও গাইড সাপোর্ট</span>
                </div>
              </div>
            </div>

            {/* Shareable Link Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 text-center space-y-2">
              <p className="text-xs text-slate-400">এই প্যাকেজটি বন্ধুদের সাথে শেয়ার করুন:</p>
              <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 font-mono text-xs">
                <span className="text-sky-300 truncate">ghurbe.com/{displaySlug}</span>
                <button
                  onClick={handleCopyLink}
                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded ml-2 shrink-0 cursor-pointer"
                >
                  {copiedLink ? 'কপি!' : 'কপি'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar for Mobile Only - High Conversion & Comfortable Thumb Reach */}
      <div 
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3.5 pt-2.5 pb-3 flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)' }}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              {selectedPlan === 'couple' ? 'কাপল' : 'জনপ্রতি'}
            </span>
            <span className="text-[9px] font-black bg-sky-100 text-sky-800 border border-sky-300 px-1.5 py-0.2 rounded">
              ৩ রাত ২ দিন
            </span>
            <span className="text-[9px] font-extrabold bg-[#881337] text-white px-1.5 py-0.2 rounded-full">
              অগ্রিম ১,০০০৳
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-blue-900 tabular-nums">
              ৳{calculatePrice().toLocaleString('bn-BD')}
            </span>
            {calculateOriginalPrice() > calculatePrice() && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ৳{calculateOriginalPrice().toLocaleString('bn-BD')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onBackToHome}
            className="w-9 h-10 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-300 flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
            title="পেজটি কেটে দিন (✕)"
            aria-label="পেজটি কেটে দিন"
          >
            <X className="w-4 h-4 text-rose-500 stroke-[2.5]" />
          </button>
          <a
            href={`https://wa.me/8801911050270?text=${encodeURIComponent(`আসসালামু আলাইকুম! ঘুরবে ট্রাভেলস, আমি ${pkg.title} সম্পর্কে জানতে চাই`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center active:bg-emerald-100 transition-colors"
            title="হোয়াটসঅ্যাপ 01911050270"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => onBookNow(pkg)}
            className="h-11 px-5 rounded-xl font-black text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 shadow-md shadow-blue-500/25 active:scale-97 flex items-center gap-1.5 cursor-pointer text-sm"
          >
            <span>বুকিং করুন</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
