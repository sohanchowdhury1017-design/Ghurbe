import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  BookOpen, 
  Users, 
  Menu, 
  X, 
  PhoneCall, 
  Image, 
  Award, 
  CalendarCheck, 
  User, 
  ChevronRight,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBookings: () => void;
  onOpenAuth: () => void;
  bookingsCount: number;
  user: { name: string; phone: string } | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  onNavigate,
  onOpenBookings,
  onOpenAuth,
  bookingsCount,
  user,
}) => {
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const handleItemClick = (sectionId: string) => {
    setMoreDrawerOpen(false);
    onNavigate(sectionId);
  };

  const isMoreActive = ['gallery', 'stats', 'why-us', 'contact'].includes(activeSection);

  return (
    <>
      {/* Expanded Quick Drawer for Mobile ("আরও মেনু") */}
      {moreDrawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setMoreDrawerOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[82vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 z-50 flex flex-col overflow-hidden animate-slide-up">
            {/* Drawer Header Handle */}
            <div className="pt-3 pb-2 px-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-slate-300 rounded-full inline-block mr-1"></span>
                <span className="text-xs font-black text-slate-800 tracking-tight uppercase">
                  ঘুরবে মেনু ও সেবা
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMoreDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Navigation List */}
            <div className="p-4 overflow-y-auto space-y-2.5 pb-8">
              {/* Emergency Call & Booking Direct Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <a
                  href="tel:09658865593"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>09658-865593</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMoreDrawerOpen(false);
                    onOpenBookings();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs active:scale-95 transition-transform"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>আমার বুকিং {bookingsCount > 0 ? `(${bookingsCount})` : ''}</span>
                </button>
              </div>

              {/* All Secondary Navigation Links */}
              <div className="bg-slate-50 rounded-2xl p-1.5 space-y-1 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleItemClick('contact')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    activeSection === 'contact' ? 'bg-blue-600 text-white font-bold' : 'text-slate-800 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection === 'contact' ? 'bg-white/20' : 'bg-blue-100 text-blue-700'}`}>
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">যোগাযোগ ও হেল্পলাইন</p>
                      <p className={`text-[10px] ${activeSection === 'contact' ? 'text-blue-100' : 'text-slate-500'}`}>অফিস ঠিকানা, ফোন ও ইনকোয়ারি</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  type="button"
                  onClick={() => handleItemClick('gallery')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    activeSection === 'gallery' ? 'bg-blue-600 text-white font-bold' : 'text-slate-800 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection === 'gallery' ? 'bg-white/20' : 'bg-purple-100 text-purple-700'}`}>
                      <Image className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">ট্যুর ছবির গ্যালারি</p>
                      <p className={`text-[10px] ${activeSection === 'gallery' ? 'text-blue-100' : 'text-slate-500'}`}>আমাদের পূর্বের ট্যুরের স্মৃতি ও ছবি</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>

                <button
                  type="button"
                  onClick={() => handleItemClick('stats')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    activeSection === 'stats' ? 'bg-blue-600 text-white font-bold' : 'text-slate-800 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection === 'stats' ? 'bg-white/20' : 'bg-amber-100 text-amber-700'}`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">১,১৪৪+ ট্রাভেলার রিভিউ ও অর্জন</p>
                      <p className={`text-[10px] ${activeSection === 'stats' ? 'text-blue-100' : 'text-slate-500'}`}>৪.৯ স্টার সন্তুষ্টি ও ট্রাস্ট রেটিং</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              </div>

              {/* Account Sign In or Profile */}
              <div className="pt-2">
                {user ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 tabular-nums">{user.phone}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      লগইনকৃত
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMoreDrawerOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                  >
                    <User className="w-4 h-4" />
                    <span>সাইন ইন / একাউন্ট খুলুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main 5-Button Bottom Navigation Bar for Mobile */}
      <nav 
        aria-label="মোবাইল নেভিগেশন বার"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] px-1.5 pt-1.5 pb-2.5 sm:hidden"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.65rem)' }}
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around gap-0.5 text-center">
          {/* 1. Home (হোম) */}
          <button
            type="button"
            onClick={() => handleItemClick('hero')}
            className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all active:scale-92 cursor-pointer ${
              activeSection === 'hero' || activeSection === 'home'
                ? 'text-blue-700 font-extrabold bg-blue-50/90'
                : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <Home className={`w-5 h-5 transition-transform ${activeSection === 'hero' || activeSection === 'home' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] mt-1 font-semibold leading-tight truncate w-full">Home</span>
          </button>

          {/* 2. Tour Packages (প্যাকেজ) */}
          <button
            type="button"
            onClick={() => handleItemClick('packages')}
            className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all active:scale-92 cursor-pointer ${
              activeSection === 'packages'
                ? 'text-blue-700 font-extrabold bg-blue-50/90'
                : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <Compass className={`w-5 h-5 transition-transform ${activeSection === 'packages' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] mt-1 font-semibold leading-tight truncate w-full">Packages</span>
          </button>

          {/* 3. Travel Vlog / Blog (ব্লগ / ভ্লগ) */}
          <button
            type="button"
            onClick={() => handleItemClick('blog')}
            className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all active:scale-92 cursor-pointer ${
              activeSection === 'blog'
                ? 'text-blue-700 font-extrabold bg-blue-50/90'
                : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <BookOpen className={`w-5 h-5 transition-transform ${activeSection === 'blog' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] mt-1 font-semibold leading-tight truncate w-full">Vlog</span>
          </button>

          {/* 4. About Us (আমাদের সম্পর্কে / টিম) */}
          <button
            type="button"
            onClick={() => handleItemClick('about')}
            className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all active:scale-92 cursor-pointer ${
              activeSection === 'about' || activeSection === 'member-profile'
                ? 'text-blue-700 font-extrabold bg-blue-50/90'
                : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <Users className={`w-5 h-5 transition-transform ${activeSection === 'about' || activeSection === 'member-profile' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] mt-1 font-semibold leading-tight truncate w-full">About</span>
          </button>

          {/* 5. More Menu / আরও মেনু (যোগাযোগ, গ্যালারি, রিভিউ ইত্যাদি) */}
          <button
            type="button"
            onClick={() => setMoreDrawerOpen(true)}
            className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-0.5 rounded-xl transition-all active:scale-92 cursor-pointer relative ${
              isMoreActive || moreDrawerOpen
                ? 'text-blue-700 font-extrabold bg-blue-50/90'
                : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <Menu className={`w-5 h-5 transition-transform ${isMoreActive || moreDrawerOpen ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
            <span className="text-[10px] sm:text-[11px] mt-1 font-semibold leading-tight truncate w-full">More</span>
            {bookingsCount > 0 && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
