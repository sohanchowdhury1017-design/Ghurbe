import React, { useState } from 'react';
import { PackageCard } from './PackageCard';
import { TourPackage, SearchFilterState } from '../types/travel';
import { Sparkles, SlidersHorizontal, RotateCcw, Clock } from 'lucide-react';

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
    <section id="packages" className="py-16 sm:py-20 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching the screenshot title "জনপ্রিয় ট্যুর প্যাকেজ" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>বাংলাদেশের সেরা ট্যুরিস্ট স্পট</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              জনপ্রিয় ট্যুর প্যাকেজ
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
              কুয়াকাটা, সাজেক, সেন্টমার্টিন, টাঙ্গুয়ার হাওরসহ রূপসী বাংলাদেশের অনন্য সব গন্তব্যে সেরা ভ্রমণ অফার
            </p>
          </div>

          {/* Interactive Category Tabs - Smooth horizontal scroll on mobile */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
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

        {/* Featured Spotlight Banner for Kuakata Package - Akashi, Nil, Kalo, Sada, with Maroon touch */}
        <div className="mb-8 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-2 border-sky-400/50 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 text-white">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-black text-sm sm:text-lg text-white">
                  🌊 মাত্র ৩,৫৯৯ টাকায় কুয়াকাটা ৩ রাত ২ দিন ভ্রমণ! 🌅
                </span>
                <span className="bg-sky-400 text-slate-950 text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-sky-300">
                  <Clock className="w-3 h-3 text-slate-950" />
                  <span>৩ রাত ২ দিন</span>
                </span>
                <span className="bg-blue-600 text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide shadow-xs">
                  KUAKATA 2026
                </span>
                <span className="bg-sky-600 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  ১২ নভে · রংপুর/বগুড়া
                </span>
                <span className="bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs border border-rose-300/30">
                  কাপল: ৭,৯৯৯৳
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                বগুড়া, রংপুর ও গাইবান্ধার ভ্রমণপ্রেমীদের জন্য বিশেষ আয়োজন! <strong>৩ রাত ২ দিন</strong> (১ রাত হোটেল + ২ রাত আরামদায়ক বাস জার্নি), একই সৈকতে সূর্যোদয় ও সূর্যাস্ত, ১৬টি দর্শনীয় স্থান এবং ৫ বেলা খাবার।
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:flex items-center gap-2.5 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => {
                const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach');
                if (kuakataPkg) onViewDetails(kuakataPkg);
              }}
              className="min-h-[46px] py-2.5 px-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center text-center active:scale-97"
            >
              বিস্তারিত দেখুন
            </button>
            <button
              onClick={() => {
                const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach');
                if (kuakataPkg) onBookNow(kuakataPkg);
              }}
              className="min-h-[46px] py-2.5 px-3 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-md shadow-blue-500/25 transition-all active:scale-97 cursor-pointer flex items-center justify-center text-center"
            >
              বুকিং করুন (৩৫৯৯৳)
            </button>
          </div>
        </div>

        {/* Search filter indicator banner if active */}
        {searchFilter?.destination && (
          <div className="mb-6 p-3.5 bg-sky-50 border border-sky-200/90 rounded-xl flex items-center justify-between gap-4 text-xs sm:text-sm text-sky-950">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-700" />
              <span>
                ফিল্টার ফলাফল: <strong>"{searchFilter.destination}"</strong>{' '}
                {searchFilter.date && `· তারিখ: ${searchFilter.date}`}{' '}
                {`· ${searchFilter.travelers} জন`} ({sortedPackages.length}টি প্যাকেজ পাওয়া গেছে)
              </span>
            </div>
            <button
              onClick={onResetFilter}
              className="flex items-center gap-1 text-blue-700 font-bold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফিল্টার মুছুন</span>
            </button>
          </div>
        )}

        {/* Packages Grid */}
        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8">
            <p className="text-base font-semibold text-slate-700">
              আপনার অনুসন্ধানের সাথে মিল রেখে কোনো প্যাকেজ পাওয়া যায়নি
            </p>
            <p className="text-xs text-slate-500 mt-1">
              অন্য কোনো গন্তব্য সার্চ করুন অথবা সব প্যাকেজ ফিল্টার দেখুন
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                onResetFilter();
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              সব প্যাকেজ প্রদর্শন করুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
