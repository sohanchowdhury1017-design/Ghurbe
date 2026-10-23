import React, { useState, useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { PackageCard } from './PackageCard';
import { TourPackage, SearchFilterState } from '../types/travel';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck, 
  Star, 
  Users, 
  PhoneCall, 
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  packages: TourPackage[];
  onSearch: (filters: SearchFilterState) => void;
  onSelectDestinationQuick: (dest: string) => void;
  onViewDetails: (pkg: TourPackage) => void;
  onBookNow: (pkg: TourPackage) => void;
  onNavigateToPackages: () => void;
  onNavigateToGallery: () => void;
  onNavigateToWhyUs: () => void;
  onNavigateToContact: () => void;
  onNavigateToStats?: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToAbout?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  packages,
  onSearch,
  onSelectDestinationQuick,
  onViewDetails,
  onBookNow,
  onNavigateToPackages,
  onNavigateToWhyUs,
  onNavigateToContact,
  onNavigateToStats,
  onNavigateToBlog,
  onNavigateToAbout,
}) => {
  const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach') || packages[0];
  const coxPkg = packages.find((p) => p.id === 'coxs-bazar') || packages.find((p) => p.slug === 'coxs-bazar');
  
  // Top 3 handpicked packages for the home page
  const topPackages = packages.slice(0, 3);

  const categories = [
    {
      id: 'sea',
      label: 'সমুদ্র ও সৈকত',
      desc: 'কক্সবাজার, কুয়াকাটা ও ইনানী বিচ',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tag: 'সৈকত ও মেরিন ড্রাইভ',
      badge: 'কক্সবাজার ৪৭৮৫৳ | কুয়াকাটা ৩৫৯৯৳',
    },
    {
      id: 'hills',
      label: 'পাহাড় ও মেঘ',
      desc: 'সাজেক ভ্যালি, বান্দরবান ও খাগড়াছড়ি',
      image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791876748/Meghraj-Resort.jpg',
      tag: 'মেঘের রাজ্য',
      badge: 'সাজেক ট্যুর',
    },
    {
      id: 'haor',
      label: 'হাওর ও জলপ্রপাত',
      desc: 'টাঙ্গুয়ার হাওর, নীলাদ্রি ও যাদুকাটা',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      tag: 'জল ও হাউসবোট',
      badge: 'হাউসবোট ক্রুজ',
    },
    {
      id: 'forest',
      label: 'বন ও প্রকৃতি',
      desc: 'সুন্দরবন ও শ্রীমঙ্গল চা বাগান',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      tag: 'ম্যানগ্রোভ ও অরণ্য',
      badge: 'সাফারি ভ্রমণ',
    },
    {
      id: 'island',
      label: 'প্রবাল দ্বীপ ও নীল জল',
      desc: 'সেন্টমার্টিন ও ছেঁড়াদ্বীপ ক্রুজ',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      tag: 'নীল সমুদ্র ও প্রবাল',
      badge: 'সেন্টমার্টিন ট্যুর',
    },
    {
      id: 'waterfall',
      label: 'ঝরনা ও ট্র্যাকিং',
      desc: 'নাফাকুম, অমিয়কুম ও থানচি ট্রেইল',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      tag: 'পাহাড়ি অ্যাডভেঞ্চার',
      badge: 'বান্দরবান ট্র্যাকিং',
    },
  ];

  // ==========================================
  // Category Carousel Slider State ("একটার পর একটা স্লাইড করবে")
  // ==========================================
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive itemsPerView
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxSlide = Math.max(0, categories.length - itemsPerView);

  // Ensure currentSlide is within bounds on resize
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [itemsPerView, maxSlide, currentSlide]);

  // Smooth Auto-Slide Effect (slides every 3.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, maxSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNextSlide();
    } else if (distance < -minSwipeDistance) {
      handlePrevSlide();
    }
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* 1. Hero Section with Search and Fast Popular Chips */}
      <HeroSection
        onSearch={onSearch}
        onSelectDestinationQuick={onSelectDestinationQuick}
        onBookNow={onBookNow}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">
        {/* 2. Featured Campaigns: Kuakata & Cox's Bazar 2026 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Kuakata Card */}
          {kuakataPkg && (
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-sky-400/40 shadow-xl overflow-hidden flex flex-col justify-between text-white relative group">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

              {/* Big, Beautiful Picture at Top of Card */}
              <div 
                onClick={() => onViewDetails(kuakataPkg)}
                className="relative w-full h-48 sm:h-56 overflow-hidden cursor-pointer bg-slate-900"
              >
                <img 
                  src={kuakataPkg.coverImage || 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791875447/360_F_1237996093_CtWZOkLaDCAMq6jqB95Tb9cPXZc8HewY.jpg'} 
                  alt="কুয়াকাটা সাগরকন্যা সমুদ্রসৈকত" 
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Overlay Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    🌊 আগামী ট্যুর • ১২ নভেম্বর
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="text-xs font-bold text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    কাপল: ৭,৯৯৯৳
                  </span>
                </div>

                {/* Bottom Overlay on Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-sky-300 font-semibold block">৩ রাত ২ দিন প্যাকেজ</span>
                    <h3 className="font-black text-xl sm:text-2xl text-white leading-tight drop-shadow-md">
                      কুয়াকাটা সাগরকন্যা স্পেশাল ট্যুর
                    </h3>
                  </div>
                  <span className="bg-sky-500 text-slate-950 text-xs sm:text-sm font-black px-3 py-1 rounded-xl shadow-lg">
                    ৩৫৯৯৳ /জন
                  </span>
                </div>
              </div>

              {/* Spacious Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                  রংপুর ও বগুড়া থেকে সরাসরি যাত্রা! ১ রাত মানসম্মত হোটেল, একই সৈকতে রক্তিম সূর্যোদয়-সূর্যাস্ত, ১৬টি আকর্ষণীয় স্পট ও মোট ৫ বেলা সুস্বাদু খাবার অন্তর্ভুক্ত।
                </p>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onViewDetails(kuakataPkg)}
                    className="min-h-[46px] py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 active:scale-97 border border-white/20 rounded-xl transition-all cursor-pointer flex items-center justify-center text-center"
                  >
                    বিস্তারিত দেখুন
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookNow(kuakataPkg)}
                    className="min-h-[46px] py-2.5 px-4 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-97 cursor-pointer flex items-center justify-center text-center"
                  >
                    বুকিং করুন (৩৫৯৯৳)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cox's Bazar Card */}
          {coxPkg && (
            <div className="rounded-3xl bg-gradient-to-br from-sky-950 via-blue-950 to-slate-950 border border-sky-400/40 shadow-xl overflow-hidden flex flex-col justify-between text-white relative group">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

              {/* Big, Beautiful Picture at Top of Card */}
              <div 
                onClick={() => onViewDetails(coxPkg)}
                className="relative w-full h-48 sm:h-56 overflow-hidden cursor-pointer bg-slate-900"
              >
                <img 
                  src={coxPkg.coverImage} 
                  alt={coxPkg.title} 
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Overlay Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    🏖️ ধামাকা অফার ২০২৬
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="text-xs font-bold text-sky-200 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    কাপল: ৯,৯৯৯৳
                  </span>
                </div>

                {/* Bottom Overlay on Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-sky-300 font-semibold block">৩ রাত ২ দিন ভ্রমণ</span>
                    <h3 className="font-black text-xl sm:text-2xl text-white leading-tight drop-shadow-md">
                      কক্সবাজার মেগা ট্যুর অফার
                    </h3>
                  </div>
                  <span className="bg-sky-500 text-slate-950 text-xs sm:text-sm font-black px-3 py-1 rounded-xl shadow-lg">
                    ৪৭৮৫৳ /জন
                  </span>
                </div>
              </div>

              {/* Spacious Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                  রংপুর ও বগুড়া থেকে সরাসরি যাতায়াত, মনোমুগ্ধকর মেরিন ড্রাইভ ভ্রমণ, ইনানী বিচ, হিমছড়ি, বিচ হোটেল ও ৫ বেলা সুস্বাদু খাবার সহ নির্ভরযোগ্য প্যাকেজ।
                </p>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onViewDetails(coxPkg)}
                    className="min-h-[46px] py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 active:scale-97 border border-white/20 rounded-xl transition-all cursor-pointer flex items-center justify-center text-center"
                  >
                    বিস্তারিত দেখুন
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookNow(coxPkg)}
                    className="min-h-[46px] py-2.5 px-4 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 hover:from-sky-600 hover:to-blue-700 rounded-xl shadow-lg shadow-sky-500/25 transition-all active:scale-97 cursor-pointer flex items-center justify-center text-center"
                  >
                    বুকিং করুন (৪৭৮৫৳)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2.5 High-Impact Live Stats Strip */}
        <div 
          onClick={onNavigateToStats}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                আমাদের লাইভ অর্জন ও বিশ্বস্ততা
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>বিস্তারিত রিভিউ ও পরিসংখ্যান দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {/* Stat 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-100 hover:bg-sky-100/80 transition-colors">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1.5">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                ১১,০৪৪+
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-bold mt-1">
                টোটাল হ্যাপি পর্যটক
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-100 hover:bg-teal-100/80 transition-colors">
              <div className="flex items-center justify-center gap-1 text-teal-600 mb-1.5">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                ৩৬৭+
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-bold mt-1">
                সফল ট্যুর সম্পন্ন
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-100 hover:bg-amber-100/80 transition-colors">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-1.5">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                ৪.৯
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-bold mt-1">
                রেটিং (৫-এর মধ্যে)
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Destination Categories Slider ("একটার পর একটা স্লাইড করবে") */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">গন্তব্যসমূহ</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                  <span>অটো স্লাইডার</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                আপনার পছন্দের বিভাগ বা প্রকৃতি
              </h2>
            </div>

            {/* Navigation Slider Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer hover:border-blue-300"
                title="পূর্ববর্তী স্লাইড"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer hover:border-blue-300"
                title="পরবর্তী স্লাইড"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>

              <button
                type="button"
                onClick={onNavigateToPackages}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 ml-2 cursor-pointer flex items-center gap-1"
              >
                <span>সকল প্যাকেজ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Slider Carousel Viewport */}
          <div 
            className="relative overflow-hidden py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-out -mx-2.5 sm:-mx-3"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              }}
            >
              {categories.map((c) => (
                <div
                  key={c.id}
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  className="px-2.5 sm:px-3 shrink-0"
                >
                  <div
                    onClick={() => {
                      if (c.id === 'sea') onSelectDestinationQuick('কুয়াকাটা');
                      else if (c.id === 'hills') onSelectDestinationQuick('সাজেক ভ্যালি');
                      else if (c.id === 'haor') onSelectDestinationQuick('টাঙ্গুয়ার হাওর');
                      else if (c.id === 'forest') onSelectDestinationQuick('সুন্দরবন');
                      else if (c.id === 'island') onSelectDestinationQuick('সেন্টমার্টিন');
                      else if (c.id === 'waterfall') onSelectDestinationQuick('বান্দরবান');
                      else onNavigateToPackages();
                    }}
                    className="h-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-sky-400 transition-all cursor-pointer group active:scale-98 flex flex-col justify-between"
                  >
                    <div>
                      {/* Big Image for Category matching user's screenshot */}
                      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-3.5 shadow-xs bg-slate-900">
                        <img
                          src={c.image}
                          alt={c.label}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 shadow-md">
                          {c.tag}
                        </span>
                      </div>

                      <h3 className="font-black text-base sm:text-lg text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {c.label}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">
                        {c.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600 truncate mr-2">{c.badge}</span>
                      <span className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">প্যাকেজ দেখুন →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator for Active Slide */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-7 h-2.5 bg-blue-600 shadow-xs' 
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4. Top 3 Handpicked Tour Packages (Big Pictures, Spacious Grid) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">জনপ্রিয় অফার</span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">সেরা জনপ্রিয় ট্যুর প্যাকেজ</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                নিরাপদ যাত্রা, মানসম্মত হোটেল ও সুস্বাদু খাবারসহ সেরা রেটেড ৩টি ভ্রমণ
              </p>
            </div>
            <button
              onClick={onNavigateToPackages}
              className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>সকল {packages.length}টি প্যাকেজ দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {topPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onViewDetails={onViewDetails}
                onBookNow={onBookNow}
              />
            ))}
          </div>

          {/* CTA Banner to View All Packages */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="text-left space-y-1">
              <h4 className="font-bold text-base text-slate-900">অন্যান্য আকর্ষণীয় গন্তব্যে যেতে চান?</h4>
              <p className="text-xs sm:text-sm text-slate-600">টাঙ্গুয়ার হাওর, সুন্দরবন, শ্রীমঙ্গল ও বান্দরবানের ট্যুর দেখতে আমাদের সকল প্যাকেজ পেজ ব্রাউজ করুন।</p>
            </div>
            <button
              onClick={onNavigateToPackages}
              className="w-full sm:w-auto py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer shrink-0 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>প্যাকেজ পেজ খুলুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Official Social Media Channels (Facebook & YouTube Showcase) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">আমাদের অফিসিয়াল সোশ্যাল মিডিয়া</span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900">যুক্ত থাকুন আমাদের ফেসবুক ও ইউটিউব কমিউনিটিতে</h2>
              <p className="text-xs sm:text-sm text-slate-600">ট্যুরের সাম্প্রতিক ভিডিও, পর্যটকদের অভিজ্ঞতা ও লাইভ আপডেট দেখতে ফলো করুন</p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 py-1.5 px-3.5 rounded-full self-start md:self-auto border border-slate-200">
              ✓ অফিসিয়াল ভেরিফাইড চ্যানেল
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook Card */}
            <a
              href="https://facebook.com/ghurbe.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-gradient-to-br from-[#1877F2]/10 via-white to-blue-50/50 border border-[#1877F2]/30 hover:border-[#1877F2] hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md shadow-[#1877F2]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-black text-[#1877F2] bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                    অফিসিয়াল পেজ
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1877F2] transition-colors">
                  Ghurbe - ঘুরবে (Facebook)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  facebook.com/ghurbe.bd — নিয়মিত ট্যুর ফটো, লাইভ আপডেট, কাস্টমার রিভিউ এবং নতুন অফারের জন্য ফলো করুন।
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#1877F2]">
                <span>পেজ ভিজিট ও লাইক দিন</span>
                <span className="group-hover:translate-x-1 transition-transform">লাইক করুন →</span>
              </div>
            </a>

            {/* YouTube Card */}
            <a
              href="https://youtube.com/@Ghurbe-ঘুরবে"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-gradient-to-br from-[#FF0000]/10 via-white to-red-50/50 border border-[#FF0000]/30 hover:border-[#FF0000] hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center shadow-md shadow-[#FF0000]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-black text-[#FF0000] bg-red-100 px-3 py-1 rounded-full border border-red-200">
                    ইউটিউব চ্যানেল
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#FF0000] transition-colors">
                  ঘুরবে অফিসিয়াল চ্যানেল (YouTube)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  youtube.com/@Ghurbe-ঘুরবে — প্রতিটি ট্যুর স্পটের বিস্তারিত ভ্রমণ ভিডিও, ট্রাভেল ভ্লগ ও অভিজ্ঞতা দেখতে সাবস্ক্রাইব করুন।
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#FF0000]">
                <span>চ্যানেল সাবস্ক্রাইব করুন</span>
                <span className="group-hover:translate-x-1 transition-transform">ভিডিও দেখুন →</span>
              </div>
            </a>
          </div>
        </div>

        {/* 6. Quick High-Value Social Proof & Hotline Assistance */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-400/30 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>৪.৯ / ৫ রেটিং (১০,০০০+ সন্তুষ্ট পর্যটক)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">যেকোনো প্রশ্ন বা বুকিং সহায়তায় আমরা প্রস্তুত</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              আমাদের ট্রাভেল কনসালট্যান্টদের সাথে সরাসরি কথা বলে সহজেই আপনার আসন নিশ্চিত করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="tel:01980297939"
              className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>কল: ০১৯৮০-২৯৭৯৩৯</span>
            </a>
            <a
              href="https://wa.me/8801911050270?text=আসসালামু%20আলাইকুম!%20আমি%20ঘুরবে%20ট্যুর%20প্যাকেজ%20সম্পর্কে%20জানতে%20চাই"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: 01911-050270</span>
            </a>
            <button
              onClick={onNavigateToContact}
              className="w-full md:w-auto py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>যোগাযোগ পেজ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
