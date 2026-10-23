import React, { useState } from 'react';
import { PackageCard } from './PackageCard';
import { TourPackage, SearchFilterState } from '../types/travel';
import { Sparkles, SlidersHorizontal, RotateCcw, Clock, MapPin, ChevronRight } from 'lucide-react';

interface PopularPackagesProps {
  packages: TourPackage[];
  searchFilter: SearchFilterState | null;
  onResetFilter: () => void;
  onViewDetails: (pkg: TourPackage) => void;
  onBookNow: (pkg: TourPackage) => void;
}

export const PopularPackages: React.FC<PopularPackagesProps> = ({
  packages,
  searchFilter,
  onResetFilter,
  onViewDetails,
  onBookNow,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'সব স্পট (সকল গন্তব্য)' },
    { id: 'featured', label: '🔥 বিশেষ অফার (কুয়াকাটা ৩৫৯৯৳)' },
    { id: 'sea', label: 'সমুদ্র ও দ্বীপ (কুয়াকাটা, সেন্টমার্টিন)' },
    { id: 'hills', label: 'পাহাড় ও মেঘ (পার্বত্য জেলা)' },
    { id: 'haor', label: 'হাওর ও জলপ্রপাত (সিলেট ও হাওর)' },
    { id: 'forest', label: 'অরণ্য ও ঐতিহ্য (সুন্দরবন ও চা বাগান)' },
  ];

  // Filter packages based on active category and search filter
  const filteredPackages = packages.filter((pkg) => {
    if (activeCategory === 'featured') {
      if (!pkg.isHighlighted) return false;
    } else if (activeCategory !== 'all' && pkg.category !== activeCategory) {
      return false;
    }

    if (searchFilter?.destination) {
      const q = searchFilter.destination.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.englishTitle.toLowerCase().includes(q) ||
        pkg.location.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Highlighted packages always sort to the front
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (a.isHighlighted && !b.isHighlighted) return -1;
    if (!a.isHighlighted && b.isHighlighted) return 1;
    return 0;
  });

  return (
    <section id="packages" className="py-20 sm:py-24 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>বাংলাদেশের সেরা ট্যুরিস্ট স্পট</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              জনপ্রিয় ট্যুর প্যাকেজসমূহ
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              কুয়াকাটা, সাজেক, সেন্টমার্টিন, টাঙ্গুয়ার হাওরসহ রূপসী বাংলাদেশের অনন্য সব গন্তব্যে বাজেট ও প্রিমিয়াম ভ্রমণ
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Spotlight Showcase Banner for Kuakata Package - Much Bigger Image! */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-2 border-sky-400/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-white relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1 text-left">
            {/* Big, Beautiful Picture of Kuakata Beach */}
            <div 
              onClick={() => {
                const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach');
                if (kuakataPkg) onViewDetails(kuakataPkg);
              }}
              className="w-full sm:w-56 md:w-64 h-48 sm:h-44 rounded-2xl shrink-0 overflow-hidden border-2 border-sky-400/60 shadow-xl relative cursor-pointer group bg-slate-900"
              title="কুয়াকাটা স্পেশাল ট্যুর প্যাকেজ"
            >
              <img 
                src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791875447/360_F_1237996093_CtWZOkLaDCAMq6jqB95Tb9cPXZc8HewY.jpg" 
                alt="কুয়াকাটা সাগরকন্যা সমুদ্রসৈকত" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white pointer-events-none">
                <span className="bg-sky-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md leading-none shadow-xs">
                  কুয়াকাটা বিচ
                </span>
                <span className="text-[11px] font-mono font-bold text-sky-200">
                  ৩,৫৯৯৳
                </span>
              </div>
            </div>

            {/* Description & Details */}
            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-sky-400 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-950" />
                  <span>৩ রাত ২ দিন</span>
                </span>
                <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  ১২ নভেম্বর ২০২৬ ব্যাচ
                </span>
                <span className="bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs border border-rose-300/30">
                  কাপল: ৭,৯৯৯৳
                </span>
              </div>

              <h3 className="font-black text-lg sm:text-2xl text-white leading-snug">
                মাত্র ৩,৫৯৯ টাকায় কুয়াকাটা সাগরকন্যা মেগা ট্যুর!
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                বগুড়া, রংপুর ও গাইবান্ধার ভ্রমণপ্রেমীদের জন্য বিশেষ আয়োজন। ১ রাত মানসম্মত হোটেল রাত্রিযাপন, ২ রাত চেয়ারকোচ বাস জার্নি, একই সৈকতে রক্তিম সূর্যোদয়-সূর্যাস্ত, ১৬টি দর্শনীয় স্থান ও মোট ৫ বেলা সুস্বাদু খাবার।
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3 shrink-0 w-full lg:w-48">
            <button
              onClick={() => {
                const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach');
                if (kuakataPkg) onViewDetails(kuakataPkg);
              }}
              className="min-h-[48px] py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/25 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center text-center active:scale-97"
            >
              বিস্তারিত দেখুন
            </button>
            <button
              onClick={() => {
                const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach');
                if (kuakataPkg) onBookNow(kuakataPkg);
              }}
              className="min-h-[48px] py-2.5 px-4 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-97 cursor-pointer flex items-center justify-center text-center"
            >
              বুকিং (৩৫৯৯৳)
            </button>
          </div>
        </div>

        {/* Search filter indicator banner if active */}
        {searchFilter?.destination && (
          <div className="p-4 bg-sky-50 border border-sky-200/90 rounded-2xl flex items-center justify-between gap-4 text-xs sm:text-sm text-sky-950 shadow-2xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-700 shrink-0" />
              <span>
                অনুসন্ধান ফলাফল: <strong>"{searchFilter.destination}"</strong>{' '}
                {searchFilter.date && `· তারিখ: ${searchFilter.date}`}{' '}
                {`· ${searchFilter.travelers} জন`} ({sortedPackages.length}টি প্যাকেজ পাওয়া গেছে)
              </span>
            </div>
            <button
              onClick={onResetFilter}
              className="flex items-center gap-1 text-blue-700 font-bold hover:underline cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফিল্টার মুছুন</span>
            </button>
          </div>
        )}

        {/* Packages Grid with generous gaps and breathing room ("faka faka koro") */}
        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {sortedPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onViewDetails={onViewDetails}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
            <p className="text-lg font-bold text-slate-800">
              আপনার অনুসন্ধানের সাথে মিল রেখে কোনো প্যাকেজ পাওয়া যায়নি
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              অন্য কোনো গন্তব্য সার্চ করুন অথবা সব প্যাকেজ ফিল্টার দেখুন
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                onResetFilter();
              }}
              className="mt-2 px-5 py-2.5 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              সব প্যাকেজ প্রদর্শন করুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
