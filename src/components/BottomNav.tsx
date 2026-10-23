import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  BookOpen, 
  Users, 
  PhoneCall, 
  Image, 
  Award, 
  CalendarCheck, 
  Menu, 
  X, 
  User, 
  ChevronRight,
  MessageCircle,
  Phone,
  Download,
  Waves,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { downloadGhurbeContactCard, getWhatsAppLink } from '../utils/contactCard';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 5 Primary ergonomic thumb-zone tabs
  const primaryTabs = [
    { id: 'hero', label: 'হোম', en: 'Home', icon: Home },
    { id: 'packages', label: 'প্যাকেজ', en: 'Tours', icon: Compass },
    { id: 'kuakata', label: 'কুয়াকাটা', en: 'Kuakata', icon: Waves, isSpecial: true },
    { id: 'bookings', label: 'বুকিং', en: 'Bookings', icon: CalendarCheck, badge: bookingsCount },
    { id: 'menu', label: 'মেনু', en: 'Menu', icon: Menu },
  ];

  // All menu destinations inside the bottom sheet drawer
  const drawerSections = [
    {
      title: 'প্রধান পেজসমূহ',
      items: [
        { id: 'hero', label: 'হোম পেজ', desc: 'অফার ও ভ্রমণ সার্চ', icon: Home, color: 'text-blue-600 bg-blue-50' },
        { id: 'packages', label: 'ট্যুর প্যাকেজসমূহ', desc: 'কক্সবাজার, কুয়াকাটা, সাজেক', icon: Compass, color: 'text-sky-600 bg-sky-50' },
        { id: 'kuakata', label: 'কুয়াকাটা স্পেশাল পেজ', desc: '১২ নভেম্বর ৩ রাত ২ দিন ট্যুর', icon: Waves, color: 'text-teal-600 bg-teal-50', badge: 'হট ডিল' },
        { id: 'blog', label: 'ট্রাভেল ব্লগ ও ভ্লগ', desc: 'ভ্রমণ গাইড ও প্যাকিং টিপস', icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
        { id: 'gallery', label: 'ছবি ও ভিডিও গ্যালারি', desc: 'প্রাকৃতিক সৌন্দর্যের দৃশ্য', icon: Image, color: 'text-purple-600 bg-purple-50' },
        { id: 'stats', label: 'রিভিউ ও অর্জন', desc: '১১,০৪৪+ ভ্রমণকারীর আস্থা', icon: Award, color: 'text-rose-600 bg-rose-50' },
        { id: 'about', label: 'আমাদের টিম ও পরিচয়', desc: 'ঘুরবে টিম ও পরিচালনা পরিষদ', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
        { id: 'why-us', label: 'আমাদের কেন বেছে নেবেন?', desc: 'নিরাপত্তা ও আন্তরিক সেবা', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
        { id: 'contact', label: 'যোগাযোগ ও সহায়তা', desc: 'সার্বক্ষণিক কাস্টমার কেয়ার', icon: PhoneCall, color: 'text-blue-700 bg-blue-50' },
      ],
    },
  ];

  const handleTabClick = (id: string) => {
    if (id === 'menu') {
      setDrawerOpen(true);
      return;
    }
    setDrawerOpen(false);
    if (id === 'bookings') {
      onOpenBookings();
    } else {
      onNavigate(id);
    }
  };

  const isCurrentActive = (id: string) => {
    if (id === 'hero') return activeSection === 'hero' || activeSection === 'home';
    if (id === 'about') return activeSection === 'about' || activeSection === 'member-profile';
    return activeSection === id;
  };

  return (
    <>
      {/* 1. Mobile Bottom Sheet Drawer (Full Menu with Smooth Touch UX) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Soft Blur Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[88vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 z-50 flex flex-col overflow-hidden animate-slide-up">
            {/* Grab Handle & Header */}
            <div className="pt-2.5 pb-2 px-5 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-9 h-1.5 bg-slate-300 rounded-full inline-block mr-1"></span>
                <span className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>ঘুরবে — সকল পেজ ও সেবা</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Contact & WhatsApp Action Strip */}
            <div className="p-4 pb-2 space-y-2 border-b border-slate-100">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:01980297939"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>01980-297939</span>
                </a>
                <a
                  href={getWhatsAppLink('Hello Ghurbe Tours Team')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#25D366] text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>01911-050270</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  downloadGhurbeContactCard();
                  setDrawerOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>ফোনে 'Ghurbe Tours & Travel' নাম সেভ করুন (.vcf)</span>
              </button>
            </div>

            {/* Scrollable List of Destinations & Services */}
            <div className="p-4 pt-3 overflow-y-auto space-y-3 pb-8">
              {drawerSections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block px-1">
                    {sec.title}
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {sec.items.map((item) => {
                      const active = isCurrentActive(item.id);
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setDrawerOpen(false);
                            onNavigate(item.id);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all active:scale-98 cursor-pointer text-left border ${
                            active
                              ? 'bg-blue-50/90 border-blue-200 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200/70'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${active ? 'text-blue-900 font-black' : 'text-slate-900'}`}>
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-black bg-rose-500 text-white px-1.5 py-0.2 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 block truncate">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 shrink-0 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* User Account Bar in Drawer */}
              <div className="pt-2 border-t border-slate-100">
                {user ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 tabular-nums">{user.phone}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      লগইনকৃত
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-transform"
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

      {/* 2. Main Mobile Bottom Navigation Bar (Streamlined, Minimalist, Thumb-Ergonomic) */}
      <nav 
        aria-label="মোবাইল নেভিগেশন বার"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] sm:hidden"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.35rem)' }}
      >
        <div className="grid grid-cols-5 items-center h-14 px-1.5">
          {primaryTabs.map((tab) => {
            const active = isCurrentActive(tab.id);
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex flex-col items-center justify-center h-full py-1 rounded-xl transition-all duration-200 active:scale-92 cursor-pointer select-none ${
                  active
                    ? 'text-blue-600 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {/* Special Kuakata glow badge */}
                {tab.isSpecial && (
                  <span className="absolute -top-1 px-1.5 py-0.2 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[8px] font-black rounded-full shadow-2xs">
                    ট্যুর
                  </span>
                )}

                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />

                  {/* Badge */}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center px-1 border-2 border-white">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'font-black text-blue-700' : 'font-medium text-slate-500'}`}>
                  {tab.label}
                </span>

                {/* Active indicator dot */}
                {active && (
                  <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
