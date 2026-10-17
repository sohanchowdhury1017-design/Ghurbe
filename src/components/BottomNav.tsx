import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Compass, 
  BookOpen, 
  Users, 
  PhoneCall, 
  Image, 
  Award, 
  ShieldCheck, 
  CalendarCheck, 
  LayoutGrid, 
  X, 
  User, 
  ChevronRight,
  MessageCircle,
  Sparkles,
  Phone,
  Lock
} from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBookings: () => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  bookingsCount: number;
  user: { name: string; phone: string } | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  onNavigate,
  onOpenBookings,
  onOpenAuth,
  onOpenAdmin,
  bookingsCount,
  user,
}) => {
  const [gridDrawerOpen, setGridDrawerOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // All buttons requested for mobile view
  const navButtons = [
    { id: 'hero', label: 'Home', bangla: 'হোম', icon: Home, color: 'text-blue-600', activeBg: 'bg-blue-50 text-blue-700' },
    { id: 'packages', label: 'Packages', bangla: 'প্যাকেজ', icon: Compass, color: 'text-sky-600', activeBg: 'bg-sky-50 text-sky-700' },
    { id: 'blog', label: 'Vlog', bangla: 'ভ্লগ', icon: BookOpen, color: 'text-amber-600', activeBg: 'bg-amber-50 text-amber-700' },
    { id: 'about', label: 'About', bangla: 'এবাউট', icon: Users, color: 'text-emerald-600', activeBg: 'bg-emerald-50 text-emerald-700' },
    { id: 'bookings', label: 'Bookings', bangla: 'বুকিং', icon: CalendarCheck, color: 'text-rose-600', activeBg: 'bg-rose-50 text-rose-700', badge: bookingsCount },
    { id: 'contact', label: 'Contact', bangla: 'যোগাযোগ', icon: PhoneCall, color: 'text-teal-600', activeBg: 'bg-teal-50 text-teal-700' },
    { id: 'gallery', label: 'Gallery', bangla: 'গ্যালারি', icon: Image, color: 'text-purple-600', activeBg: 'bg-purple-50 text-purple-700' },
    { id: 'stats', label: 'Reviews', bangla: 'রিভিউ', icon: Award, color: 'text-orange-600', activeBg: 'bg-orange-50 text-orange-700' },
  ];

  const handleItemClick = (id: string) => {
    setGridDrawerOpen(false);
    if (id === 'bookings') {
      onOpenBookings();
    } else {
      onNavigate(id);
    }
  };

  // Auto-scroll active item into view within the horizontal rail
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = activeTabRef.current;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: elementLeft - containerWidth / 2 + elementWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  const isCurrentActive = (id: string) => {
    if (id === 'hero') return activeSection === 'hero' || activeSection === 'home';
    if (id === 'about') return activeSection === 'about' || activeSection === 'member-profile';
    return activeSection === id;
  };

  return (
    <>
      {/* Full Grid Drawer Modal (Shows ALL buttons in an organized app grid on mobile) */}
      {gridDrawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setGridDrawerOpen(false)}
          />

          {/* Grid Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 z-50 flex flex-col overflow-hidden animate-slide-up">
            {/* Sheet Header */}
            <div className="pt-3 pb-2.5 px-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/90">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-slate-300 rounded-full inline-block mr-1"></span>
                <span className="text-xs font-black text-slate-900 tracking-tight uppercase flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                  <span>ঘুরবে — সকল পেজ ও মেনু বাটন</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setGridDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Helpline Header */}
            <div className="p-4 pb-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:09658865593"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>09658-865593</span>
                </a>
                <a
                  href="https://wa.me/8801700000000?text=Hello%20Ghurbe%20Team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#25D366] text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপ চ্যাট</span>
                </a>
              </div>
            </div>

            {/* 3x3 All Buttons Grid */}
            <div className="p-4 pt-2 overflow-y-auto pb-10">
              <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                সকল মেনু বাটন নির্বাচন করুন ({navButtons.length}টি বাটন)
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {navButtons.map((btn) => {
                  const active = isCurrentActive(btn.id);
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => handleItemClick(btn.id)}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 cursor-pointer text-center ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                          : 'bg-slate-50 hover:bg-blue-50/50 border-slate-200/90 text-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
                        active ? 'bg-white/20 text-white' : 'bg-white text-blue-600 shadow-xs'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold leading-tight block">
                        {btn.label}
                      </span>
                      <span className={`text-[10px] ${active ? 'text-blue-100' : 'text-slate-400'} leading-tight block`}>
                        {btn.bangla}
                      </span>

                      {btn.badge !== undefined && btn.badge > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                          {btn.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* User Account Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
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
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      লগইনকৃত
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setGridDrawerOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>সাইন ইন / অ্যাকাউন্ট খুলুন</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Navigation Bar for Mobile with ALL Buttons */}
      <nav 
        aria-label="মোবাইল নেভিগেশন বার"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:hidden"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.5rem)' }}
      >
        {/* Top Hint Pill / Quick Expand Handle */}
        <div className="flex items-center justify-between px-3 pt-1 pb-0.5 border-b border-slate-100/80 bg-slate-50/60">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-blue-500" />
            <span>সব বাটন দেখুন ({navButtons.length}টি বাটন)</span>
          </span>
          <button
            type="button"
            onClick={() => setGridDrawerOpen(true)}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 active:scale-95 transition-all cursor-pointer"
          >
            <LayoutGrid className="w-3 h-3" />
            <span>সকল মেনু গ্রিড</span>
          </button>
        </div>

        {/* Smooth Horizontally Scrollable Rail Containing ALL Buttons */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto scrollbar-none scroll-smooth touch-pan-x"
        >
          {navButtons.map((btn) => {
            const active = isCurrentActive(btn.id);
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                ref={active ? activeTabRef : null}
                type="button"
                onClick={() => handleItemClick(btn.id)}
                className={`shrink-0 flex flex-col items-center justify-center min-w-[58px] sm:min-w-[64px] min-h-[46px] py-1 px-2 rounded-2xl transition-all active:scale-92 cursor-pointer relative ${
                  active
                    ? 'text-blue-700 font-black bg-blue-50/90 shadow-xs border border-blue-200/60'
                    : 'text-slate-600 hover:text-slate-900 active:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${active ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2 text-slate-500'}`} />
                <span className="text-[10px] mt-0.5 font-bold leading-tight tracking-tight whitespace-nowrap">
                  {btn.label}
                </span>

                {btn.badge !== undefined && btn.badge > 0 && (
                  <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </button>
            );
          })}

          {/* Grid Launcher Pill at the end of the rail */}
          <button
            type="button"
            onClick={() => setGridDrawerOpen(true)}
            className="shrink-0 flex flex-col items-center justify-center min-w-[54px] min-h-[46px] py-1 px-2 rounded-2xl text-slate-500 hover:text-blue-600 active:bg-slate-100 transition-all cursor-pointer border border-dashed border-slate-300"
            title="সব মেনু একসাথে দেখুন"
          >
            <LayoutGrid className="w-5 h-5 text-slate-400 stroke-2" />
            <span className="text-[10px] mt-0.5 font-semibold text-slate-500 leading-tight whitespace-nowrap">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
