import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { SearchFilterState } from '../types/travel';

interface HeroSectionProps {
  onSearch: (filters: SearchFilterState) => void;
  onSelectDestinationQuick: (dest: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectDestinationQuick,
}) => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination,
      date,
      travelers,
      category: 'all',
      maxPrice: 50000,
    });
  };

  const destinationsList = [
    { value: '', label: 'সব গন্তব্য (সকল বাংলাদেশ স্পট)' },
    { value: 'কুয়াকাটা', label: '🔥 কুয়াকাটা সাগরকন্যা (৩৫৯৯৳ ধামাকা অফার)' },
    { value: 'সাজেক ভ্যালি', label: 'সাজেক ভ্যালি (মেঘের রাজ্য)' },
    { value: 'সেন্টমার্টিন', label: 'সেন্টমার্টিন দ্বীপ (প্রবাল দ্বীপ)' },
    { value: 'টাঙ্গুয়ার হাওর', label: 'টাঙ্গুয়ার হাওর ও নীলাদ্রি (হাউসবোট)' },
    { value: 'কক্সবাজার', label: 'কক্সবাজার সমুদ্র সৈকত ও ইনানী' },
    { value: 'বান্দরবান', label: 'বান্দরবান নীলগিরি ও নাফাখুম' },
    { value: 'সিলেট', label: 'সিলেট রাতারগুল ও বিছানাকান্দি' },
    { value: 'শ্রীমঙ্গল', label: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া' },
    { value: 'সুন্দরবন', label: 'সুন্দরবন রয়্যাল সাফারি ক্রুজ' },
    { value: 'রাঙ্গামাটি', label: 'রাঙ্গামাটি কাপ্তাই লেক ও শুভলং' },
  ];

  const quickBadges = [
    'কুয়াকাটা (৩৫৯৯৳)',
    'সাজেক ভ্যালি',
    'সেন্টমার্টিন',
    'টাঙ্গুয়ার হাওর',
    'কক্সবাজার',
    'বান্দরবান',
    'সিলেট',
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 w-full">
        <div className="max-w-3xl space-y-3.5 sm:space-y-4 text-left">
          {/* Subtle trust kicker with Maroon accent */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/95 text-[11px] sm:text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>১০০% রূপসী বাংলাদেশ ট্যুরিজম পার্টনার</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[11px] sm:text-xs font-black shadow-md border border-rose-300/30">
              <span>🌊 কুয়াকাটা স্পেশাল ৩৫৯৯৳ (৩ রাত ২ দিন)</span>
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
                  key={badge}
                  type="button"
                  onClick={() => {
                    setDestination(badge);
                    onSelectDestinationQuick(badge);
                  }}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/30 active:bg-white/40 active:scale-95 backdrop-blur-xs rounded-xl text-white text-xs font-semibold transition-all border border-white/25 hover:border-white/40 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Search / Booking Filter Bar */}
        <div className="mt-6 sm:mt-10 max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl sm:rounded-2xl shadow-2xl p-3.5 sm:p-4 border border-slate-200/90 backdrop-blur-xl grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-center"
          >
            {/* Field 1: Destination */}
            <div className="md:col-span-4 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl sm:rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[50px]">
              <div className="w-9 h-9 rounded-xl bg-blue-100/70 flex items-center justify-center shrink-0 text-blue-600">
                <MapPin className="w-5 h-5 stroke-[2.25]" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  গন্তব্য (Destination)
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-sm font-bold text-slate-900 outline-hidden cursor-pointer"
                >
                  {destinationsList.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 2: Date */}
            <div className="md:col-span-3 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl sm:rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[50px]">
              <div className="w-9 h-9 rounded-xl bg-sky-100/70 flex items-center justify-center shrink-0 text-sky-600">
                <Calendar className="w-5 h-5 stroke-[2.25]" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  ভ্রমণের তারিখ (Date)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-sm font-semibold text-slate-900 outline-hidden cursor-pointer"
                />
              </div>
            </div>

            {/* Field 3: Travelers */}
            <div className="md:col-span-3 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl sm:rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-blue-500 focus-within:bg-white transition-all min-h-[50px]">
              <div className="w-9 h-9 rounded-xl bg-blue-100/70 flex items-center justify-center shrink-0 text-blue-600">
                <Users className="w-5 h-5 stroke-[2.25]" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  ভ্রমণকারী (Travelers)
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-transparent text-base sm:text-sm font-bold text-slate-900 outline-hidden cursor-pointer"
                >
                  <option value={1}>১ জন (একক ভ্রমণ)</option>
                  <option value={2}>২ জন (কাপল / বন্ধু)</option>
                  <option value={3}>৩ জন (ফ্যামিলি রুম)</option>
                  <option value={4}>৪ জন (গ্রুপ শেয়ারিং)</option>
                  <option value={6}>৬+ জন (বড় দল/কর্পোরেট)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Search CTA Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full min-h-[50px] flex items-center justify-center gap-2 px-5 text-base sm:text-sm font-extrabold text-white rounded-2xl sm:rounded-xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 shadow-md shadow-blue-500/25 transition-all active:scale-97 cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>সার্চ করুন</span>
              </button>
            </div>
          </form>

          {/* Quick value props strip below search */}
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
              <span>সহজ বুকিং ও রিফান্ড সুবিধা</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
