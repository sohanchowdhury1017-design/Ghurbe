import React, { useState } from 'react';
import { PackageCard } from './PackageCard';
import { TourPackage, SearchFilterState } from '../types/travel';
import { 
  Compass, 
  Search, 
  RotateCcw, 
  ArrowLeft, 
  Sparkles, 
  SlidersHorizontal,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface PackagesPageProps {
  packages: TourPackage[];
  initialSearchFilter?: SearchFilterState | null;
  onViewDetails: (pkg: TourPackage) => void;
  onBookNow: (pkg: TourPackage) => void;
  onBackToHome: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  initialSearchFilter = null,
  onViewDetails,
  onBookNow,
  onBackToHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchFilter?.destination || '');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'সকল প্যাকেজ', image: null },
    { id: 'sea', label: 'সমুদ্র ও সৈকত', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&q=80' },
    { id: 'hills', label: 'পাহাড় ও মেঘ', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=120&q=80' },
    { id: 'haor', label: 'হাওর ও জলপ্রপাত', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=120&q=80' },
    { id: 'forest', label: 'বন ও প্রকৃতি', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=120&q=80' },
  ];

  const divisions = [
    { id: 'all', label: 'সকল অঞ্চল' },
    { id: 'বরিশাল বিভাগ', label: 'বরিশাল (কুয়াকাটা)' },
    { id: 'চট্টগ্রাম বিভাগ', label: 'চট্টগ্রাম (কক্সবাজার, সাজেক)' },
    { id: 'সিলেট বিভাগ', label: 'সিলেট (টাঙ্গুয়ার হাওর, শ্রীমঙ্গল)' },
    { id: 'খুলনা বিভাগ', label: 'খুলনা (সুন্দরবন)' },
  ];

  // Filtering Logic
  const filteredPackages = packages.filter((pkg) => {
    // Category match
    if (activeCategory !== 'all' && pkg.category !== activeCategory) {
      return false;
    }

    // Division match
    if (selectedDivision !== 'all' && pkg.division !== selectedDivision) {
      return false;
    }

    // Search query match
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = pkg.title.toLowerCase().includes(q);
      const matchLoc = pkg.location.toLowerCase().includes(q);
      const matchDesc = pkg.shortDesc.toLowerCase().includes(q);
      const matchSpots = pkg.sightseeingSpots?.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchLoc && !matchDesc && !matchSpots) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Featured default
    if (a.isHighlighted && !b.isHighlighted) return -1;
    if (!a.isHighlighted && b.isHighlighted) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-sky-dots py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 active:scale-95 transition-all bg-white py-2 px-3.5 rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>← হোম পেজে ফিরে যান</span>
          </button>

          <span className="text-xs font-semibold text-slate-500">
            মোট পাওয়া গেছে: <strong className="text-slate-900 font-bold">{sortedPackages.length}টি প্যাকেজ</strong>
          </span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white border border-sky-400/30 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-sky-300 text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>ঘুরবে ট্যুর অ্যান্ড ট্রাভেল প্যাকেজ পোর্টাল</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              সকল ভ্রমণ প্যাকেজ ও স্পেশাল অফার
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              কুয়াকাটা (৩ রাত ২ দিন), সাজেক ভ্যালি, সেন্টমার্টিন, টাঙ্গুয়ার হাওরসহ রূপসী বাংলাদেশের অনন্য সব গন্তব্যে সেরা ও সাশ্রয়ী ভ্রমণ প্যাকেজ।
            </p>
          </div>
        </div>

        {/* Search, Filter & Category Tabs Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="গন্তব্য খুঁজুন (যেমন: কুয়াকাটা, সাজেক, সেন্টমার্টিন)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  মুছুন
                </button>
              )}
            </div>

            {/* Division Filter */}
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50 focus:outline-hidden focus:border-blue-500 font-medium text-slate-700"
            >
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>

            {/* Sorting Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50 focus:outline-hidden focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="featured">ফিচার্ড ও জনপ্রিয়</option>
              <option value="price-asc">মূল্য: কম থেকে বেশি</option>
              <option value="price-desc">মূল্য: বেশি থেকে কম</option>
              <option value="rating">সেরা রেটিং</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                  activeCategory === c.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80'
                }`}
              >
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.label}
                    className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-white/50"
                  />
                )}
                <span>{c.label}</span>
              </button>
            ))}

            {(activeCategory !== 'all' || selectedDivision !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedDivision('all');
                  setSearchTerm('');
                }}
                className="ml-auto px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>রিসেট ফিল্টার</span>
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid with generous breathing room ("faka faka koro") */}
        {sortedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
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
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800">কোনো প্যাকেজ পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              আপনার ফিল্টার অনুযায়ী কোনো প্যাকেজ মেলেনি। ফিল্টার রিসেট করে পুনরায় চেষ্টা করুন।
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDivision('all');
                setSearchTerm('');
              }}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              সকল প্যাকেজ দেখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
