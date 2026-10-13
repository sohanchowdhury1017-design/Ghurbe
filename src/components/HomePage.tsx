import React from 'react';
import { HeroSection } from './HeroSection';
import { PackageCard } from './PackageCard';
import { TourPackage, SearchFilterState } from '../types/travel';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Compass, 
  Star, 
  MapPin, 
  Users, 
  PhoneCall, 
  MessageCircle,
  Waves,
  Mountain,
  Trees,
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
}

export const HomePage: React.FC<HomePageProps> = ({
  packages,
  onSearch,
  onSelectDestinationQuick,
  onViewDetails,
  onBookNow,
  onNavigateToPackages,
  onNavigateToGallery,
  onNavigateToWhyUs,
  onNavigateToContact,
}) => {
  const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach') || packages[0];
  
  // Top 3 handpicked packages for the home page (clean, not cluttered on phone)
  const topPackages = packages.slice(0, 3);

  const categories = [
    {
      id: 'sea',
      label: 'সমুদ্র ও সৈকত',
      desc: 'কুয়াকাটা, সেন্টমার্টিন ও কক্সবাজার',
      image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791875447/images.jpg',
      tag: 'সৈকত ও ঢেউ',
      badge: 'কুয়াকাটা ৩৫৯৯৳',
    },
    {
      id: 'hills',
      label: 'পাহাড় ও মেঘ',
      desc: 'সাজেক ভ্যালি, বান্দরবান ও খাগড়াছড়ি',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      tag: 'মেঘের রাজ্য',
      badge: 'সাজেক ট্যুর',
    },
    {
      id: 'haor',
      label: 'হাওর ও জলপ্রপাত',
      desc: 'টাঙ্গুয়ার হাওর, নীলাদ্রি ও যাদুকাটা',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      tag: 'জল ও হাউসবোট',
      badge: 'হাউসবোট ক্রুজ',
    },
    {
      id: 'forest',
      label: 'বন ও প্রকৃতি',
      desc: 'সুন্দরবন ও শ্রীমঙ্গল চা বাগান',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      tag: 'ম্যানগ্রোভ ও অরণ্য',
      badge: 'সাফারি ভ্রমণ',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-16 pb-12">
      {/* 1. Hero Section with Search and Fast Popular Chips */}
      <HeroSection
        onSearch={onSearch}
        onSelectDestinationQuick={onSelectDestinationQuick}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-16">
        {/* 2. Spotlight Banner for Kuakata Package (Akashi, Nil, Kalo, Sada with Maroon) */}
        {kuakataPkg && (
          <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-2 border-sky-400/50 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 text-white">
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
                  <span className="bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs border border-rose-300/30">
                    কাপল: ৭,৯৯৯৳
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  বগুড়া, রংপুর ও গাইবান্ধার ভ্রমণপ্রেমীদের জন্য বিশেষ আয়োজন! <strong>৩ রাত ২ দিন</strong> (১ রাত হোটেল + ২ রাত বাস জার্নি), একই সৈকতে সূর্যোদয় ও সূর্যাস্ত, ১৬টি দর্শনীয় স্থান এবং ৫ বেলা খাবার।
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:flex items-center gap-2.5 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => onViewDetails(kuakataPkg)}
                className="min-h-[46px] py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center text-center active:scale-97"
              >
                বিস্তারিত দেখুন
              </button>
              <button
                onClick={() => onBookNow(kuakataPkg)}
                className="min-h-[46px] py-2.5 px-4 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-md shadow-blue-500/25 transition-all active:scale-97 cursor-pointer flex items-center justify-center text-center"
              >
                বুকিং করুন (৩৫৯৯৳)
              </button>
            </div>
          </div>
        )}

        {/* 3. Clean Quick Destination Categories (Comfortable & Compact on Phone) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">গন্তব্যসমূহ</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">আপনার পছন্দের বিভাগ বা প্রকৃতি</h2>
            </div>
            <button
              onClick={onNavigateToPackages}
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>সকল প্যাকেজ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  if (c.id === 'sea') onSelectDestinationQuick('কুয়াকাটা');
                  else if (c.id === 'hills') onSelectDestinationQuick('সাজেক ভ্যালি');
                  else if (c.id === 'haor') onSelectDestinationQuick('টাঙ্গুয়ার হাওর');
                  else if (c.id === 'forest') onSelectDestinationQuick('সুন্দরবন');
                  else onNavigateToPackages();
                }}
                className="bg-white p-2.5 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group active:scale-97 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-2.5 shadow-xs bg-slate-100">
                    <img
                      src={c.image}
                      alt={c.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {c.label}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-1">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-blue-600">{c.badge}</span>
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors">প্যাকেজ দেখুন →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Top 3 Handpicked Tour Packages (Not overwhelming on Phone!) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">জনপ্রিয় অফার</span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">সেরা জনপ্রিয় ট্যুর প্যাকেজ</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                নিরাপদ যাত্রা, মানসম্মত হোটেল ও সুস্বাদু খাবারসহ সেরা রেটেড ৩টি ভ্রমণ
              </p>
            </div>
            <button
              onClick={onNavigateToPackages}
              className="self-start sm:self-auto py-2 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>সকল {packages.length}টি প্যাকেজ দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <h4 className="font-bold text-sm text-slate-900">অন্যান্য গন্তব্যে যেতে চান?</h4>
              <p className="text-xs text-slate-600">টাঙ্গুয়ার হাওর, সুন্দরবন, শ্রীমঙ্গল ও বান্দরবানের ট্যুর দেখতে আলাদা প্যাকেজ পেজে যান।</p>
            </div>
            <button
              onClick={onNavigateToPackages}
              className="w-full sm:w-auto py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>প্যাকেজ পেজ খুলুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Trust & Why Ghurbe Highlights (Lightweight 3-item card) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">আমাদের প্রতিশ্রুতি</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">কেন ঘুরবে-এর সাথে ভ্রমণ করবেন?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">১০০% নিরাপদ ও নির্ভরযোগ্য</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">অভিজ্ঞ ট্যুর গাইড এবং পরিবার ও কাপলদের জন্য সম্পূর্ণ মার্জিত ও নিরাপদ পরিবেশ।</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">সাশ্রয়ী ও স্বচ্ছ বাজেট</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">কোনো লুকানো চার্জ নেই। মাত্র ১,০০০৳ অগ্রিম বুকিং দিয়ে সিট নিশ্চিত করুন।</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">রংপুর, বগুড়া ও গাইবান্ধা পিকআপ</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">উত্তরবঙ্গের ভ্রমণপ্রেমীদের জন্য নিজ শহর থেকেই সুনির্দিষ্ট পিকআপ ও ড্রপ পয়েন্ট।</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3 text-xs">
            <span className="text-slate-500 font-medium">বিস্তারিত সুবিধা এবং আমাদের নীতি জানতে:</span>
            <button
              onClick={onNavigateToWhyUs}
              className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>কেন ঘুরবে বিস্তারিত পেজ দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6. Quick High-Value Social Proof & Hotline Assistance */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-400/30">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>৪.৯ / ৫ রেটিং (১০,০০০+ সন্তুষ্ট পর্যটক)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">যেকোনো প্রশ্ন বা বুকিং সহায়তায় আমরা প্রস্তুত</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              আমাদের ২৪/৭ ট্রাভেল কনসালট্যান্টদের সাথে কথা বলে সহজেই আপনার আসন নিশ্চিত করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:01700123456"
              className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>কল: ০১৭০০-১২৩৪৫৬</span>
            </a>
            <button
              onClick={onNavigateToContact}
              className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
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
