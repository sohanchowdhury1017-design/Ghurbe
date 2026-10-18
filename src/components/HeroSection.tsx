import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  User,
  Heart
} from 'lucide-react';
import { TourPackage, SearchFilterState } from '../types/travel';
import { POPULAR_PACKAGES } from '../data/packagesData';

interface HeroSectionProps {
  onSearch: (filters: SearchFilterState) => void;
  onSelectDestinationQuick: (dest: string) => void;
  onBookNow?: (pkg: TourPackage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectDestinationQuick,
  onBookNow,
}) => {
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
      case 'sundarban':
        return '2026-12-10';
      default:
        return '2026-11-12';
    }
  };

  // 1. Package Selection (Kuakata, Cox's Bazar, Sajek, etc.)
  const [selectedPkgId, setSelectedPkgId] = useState<string>('kuakata-beach');
  
  // 2. Date: Auto-fills with departure date when package is selected
  const [date, setDate] = useState<string>(() => getScheduledDate('kuakata-beach'));

  // 3. Plan Type: Single (সিঙ্গেল) or Couple (কাপল)
  const [planType, setPlanType] = useState<'single' | 'couple'>('single');

  // 4. Single Travelers count: 1 to 40
  const [singleGuestsCount, setSingleGuestsCount] = useState<number>(1);

  // Active package details
  const activePkg: TourPackage = 
    POPULAR_PACKAGES.find((p) => p.id === selectedPkgId) || POPULAR_PACKAGES[0];

  // Handle package change -> auto-fills departure date
  const handlePackageChange = (pkgId: string) => {
    setSelectedPkgId(pkgId);
    setDate(getScheduledDate(pkgId));
  };

  // Bill Calculations
  const totalPrice = planType === 'couple' && activePkg.couplePrice
    ? activePkg.couplePrice
    : activePkg.price * singleGuestsCount;

  // Advance booking money: ৳1,000 per person for single, ৳2,000 for couple
  const advanceAmount = planType === 'couple' ? 2000 : 1000 * singleGuestsCount;

  const handleProceedBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (onBookNow) {
      onBookNow(activePkg);
    } else {
      onSearch({
        destination: activePkg.location,
        date,
        travelers: planType === 'couple' ? 2 : singleGuestsCount,
        category: 'all',
        maxPrice: 50000,
      });
    }
  };

  const quickBadges = [
    { id: 'kuakata-beach', name: 'কুয়াকাটা' },
    { id: 'coxs-bazar', name: 'কক্সবাজার' },
    { id: 'sajek-valley', name: 'সাজেক ভ্যালি' },
    { id: 'tanguar-haor', name: 'টাঙ্গুয়ার হাওর' },
    { id: 'saint-martin', name: 'সেন্টমার্টিন' },
    { id: 'bandarban', name: 'বান্দরবান' },
    { id: 'sreemangal', name: 'শ্রীমঙ্গল' },
  ];

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background with real panoramic landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Beautiful Bangladesh Tourism Landscape"
          className="w-full h-full object-cover object-center scale-105 transform"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric gradient scrim ensuring WCAG contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full">
        <div className="max-w-3xl space-y-3.5 sm:space-y-4 text-left">
          {/* Trust kicker with Social Media and Promotion Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/95 text-[11px] sm:text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>১০০% রূপসী বাংলাদেশ ট্যুরিজম পার্টনার</span>
            </div>
            
            <a
              href="https://facebook.com/ghurbe.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-[11px] sm:text-xs font-extrabold shadow-md transition-all active:scale-95 border border-white/30"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>facebook.com/ghurbe.bd</span>
            </a>

            <a
              href="https://youtube.com/@Ghurbe-ঘুরবে"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white text-[11px] sm:text-xs font-extrabold shadow-md transition-all active:scale-95 border border-white/30"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube: @Ghurbe-ঘুরবে</span>
            </a>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[11px] sm:text-xs font-black shadow-md border border-rose-300/30">
              <span>🌊 কুয়াকাটা স্পেশাল ট্যুর অফার (১২ নভেম্বর)</span>
            </div>
          </div>

          {/* Hero Main Heading focused on Bangladesh */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.22] text-balance drop-shadow-md">
            অপূর্ব সুন্দর বাংলাদেশ <br className="hidden sm:inline" />
            ভ্রমণের সেরা অফার!
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-slate-100 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
            সবুজ পাহাড়, মেঘের সমুদ্র, নীল জলরাশি আর হাওরের অপার রূপ। আপনার নিরাপদ ও আনন্দময় দেশ ভ্রমণের সেরা সঙ্গী ঘুরবে।
          </p>

          {/* Quick trend search links - Swipeable carousel on mobile */}
          <div className="pt-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-sky-300">জনপ্রিয় রুট:</span>
              <span className="text-[10px] text-white/60 sm:hidden">(ডানে স্ক্রোল করুন)</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {quickBadges.map((badge) => (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => {
                    handlePackageChange(badge.id);
                  }}
                  className={`px-3 py-1.5 backdrop-blur-xs rounded-xl text-white text-xs font-semibold transition-all border whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedPkgId === badge.id 
                      ? 'bg-sky-500/80 border-sky-300 ring-2 ring-sky-400/40 font-bold' 
                      : 'bg-white/15 hover:bg-white/30 border-white/25 hover:border-white/40'
                  }`}
                >
                  {badge.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Package & Plan Selection Booking Box */}
        <div className="mt-6 sm:mt-10 max-w-5xl">
          <form
            onSubmit={handleProceedBooking}
            className="bg-white rounded-3xl sm:rounded-2xl shadow-2xl p-4 sm:p-5 border border-slate-200/90 backdrop-blur-xl text-left space-y-3.5"
          >
            {/* Header / Instructions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  ট্যুর প্যাকেজ ও সিট নির্বাচন
                </span>
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                প্যাকেজ নির্বাচন করলে তারিখ স্বয়ংক্রিয়ভাবে পূরণ হবে
              </span>
            </div>

            {/* Inputs Grid: Package, Plan (Single/Couple), Travelers, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              
              {/* Field 1: Package Selector (Kuakata, Cox's Bazar, Sajek, Saint Martin, etc.) */}
              <div className="lg:col-span-4 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl sm:rounded-xl bg-slate-50 border border-slate-200/90 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[52px]">
                <div className="w-9 h-9 rounded-xl bg-blue-100/80 flex items-center justify-center shrink-0 text-blue-600">
                  <Compass className="w-5 h-5 stroke-[2.25]" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    ট্যুর প্যাকেজ (Package)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPkgId}
                      onChange={(e) => handlePackageChange(e.target.value)}
                      className="w-full bg-transparent text-sm sm:text-xs font-bold text-slate-900 outline-hidden cursor-pointer appearance-none pr-5 truncate"
                    >
                      {POPULAR_PACKAGES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Field 2: Plan Type Selector (Single or Couple) */}
              <div className="lg:col-span-3 flex items-center gap-2 p-1.5 rounded-2xl sm:rounded-xl bg-slate-100 border border-slate-200 min-h-[52px]">
                {/* Single Plan Button */}
                <button
                  type="button"
                  onClick={() => setPlanType('single')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    planType === 'single'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>সিঙ্গেল</span>
                </button>

                {/* Couple Plan Button */}
                <button
                  type="button"
                  onClick={() => setPlanType('couple')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    planType === 'couple'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>কাপল</span>
                </button>
              </div>

              {/* Field 3: Travelers Count (1 to 40 for Single, Fixed 2 for Couple) */}
              <div className="lg:col-span-2 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl sm:rounded-xl bg-slate-50 border border-slate-200/90 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[52px]">
                <div className="w-9 h-9 rounded-xl bg-indigo-100/80 flex items-center justify-center shrink-0 text-indigo-600">
                  <Users className="w-5 h-5 stroke-[2.25]" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    ভ্রমণকারী {planType === 'single' ? '(১-৪০)' : ''}
                  </label>
                  {planType === 'single' ? (
                    <div className="relative">
                      <select
                        value={singleGuestsCount}
                        onChange={(e) => setSingleGuestsCount(Number(e.target.value))}
                        className="w-full bg-transparent text-sm sm:text-xs font-bold text-slate-900 outline-hidden cursor-pointer appearance-none pr-5"
                      >
                        {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} জন
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1 pointer-events-none" />
                    </div>
                  ) : (
                    <span className="text-sm sm:text-xs font-bold text-rose-800 block">
                      ২ জন (কাপল)
                    </span>
                  )}
                </div>
              </div>

              {/* Field 4: Departure Date (Auto-filled on package change) */}
              <div className="lg:col-span-3 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl sm:rounded-xl bg-slate-50 border border-slate-200/90 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[52px]">
                <div className="w-9 h-9 rounded-xl bg-sky-100/80 flex items-center justify-center shrink-0 text-sky-600">
                  <Calendar className="w-5 h-5 stroke-[2.25]" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    যাত্রার তারিখ (Date)
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm sm:text-xs font-bold text-slate-900 outline-hidden cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Selected Tour Summary Strip & Book Button (No Tk shown) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 p-3 sm:p-3.5 rounded-2xl border border-blue-200/80">
              {/* Tour Summary Display (No Tk/money shown) */}
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {activePkg.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                    <span className="font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                      {planType === 'couple' ? 'কাপল প্যাকেজ (২ জন)' : `সিঙ্গেল প্ল্যান (${singleGuestsCount} জন ভ্রমণকারী)`}
                    </span>
                    <span>·</span>
                    <span>{activePkg.duration.textBn || '৩ রাত ২ দিন'}</span>
                  </div>
                </div>

                <div className="hidden md:block h-8 w-px bg-blue-200" />

                <div className="hidden md:block text-xs text-slate-600">
                  <span className="font-semibold block text-[11px] text-slate-700">পিকআপ পয়েন্ট:</span>
                  <span className="text-[11px] text-slate-500">রংপুর, বগুড়া ও গাইবান্ধা পিকআপ</span>
                </div>
              </div>

              {/* Book Button (No Tk amount in button) */}
              <button
                type="submit"
                className="min-h-[48px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-black text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-97 cursor-pointer shrink-0"
              >
                <span>সিট বুকিং শুরু করুন</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Quick value props strip below booking */}
          <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs text-white/90">
            <div className="flex items-center gap-1.5 drop-shadow-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>১০০% নিরাপদ প্যাকেজ</span>
            </div>
            <div className="flex items-center gap-1.5 drop-shadow-sm font-medium">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
              <span>৪.৯/৫ কাস্টমার রেটিং</span>
            </div>
            <div className="flex items-center gap-1.5 drop-shadow-sm font-medium col-span-2 sm:col-span-1">
              <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
              <span>সহজ বুকিং ও কনফার্মেশন সুবিধা</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
