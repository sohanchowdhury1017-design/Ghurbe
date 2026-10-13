import React, { useState } from 'react';
import { Compass, Menu, X, CalendarCheck, User, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBookings: () => void;
  onOpenAuth: () => void;
  bookingsCount: number;
  user: { name: string; phone: string } | null;
  onLogout: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBookings,
  onOpenAuth,
  bookingsCount,
  user,
  onLogout,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'হোম' },
    { id: 'packages', label: 'ট্যুর প্যাকেজ' },
    { id: 'gallery', label: 'আমাদের গ্যালারি' },
    { id: 'why-us', label: 'কেন ঘুরবে' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-8">
          {/* Brand Zone */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group shrink-0 active:scale-95 transition-transform"
          >
            {/* Official Brand Logo */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center bg-white p-1 border border-slate-200/80 shrink-0">
              <img
                src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
                alt="ঘুরবে বিডি লোগো"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans group-hover:text-blue-600 transition-colors flex items-center gap-1.5 leading-tight">
                ঘুরবে
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wider">
                ট্যুর অ্যান্ড ট্রাভেলস
              </span>
            </div>
          </div>

          {/* Nav Links styled as interactive buttons */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/70 rounded-2xl border border-slate-200/80">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-1.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left text-xs leading-tight">
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="text-slate-500 tabular-nums">{user.phone}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-rose-600 hover:text-rose-700 ml-2 font-medium hover:underline cursor-pointer"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-xl shadow-xs shadow-blue-500/20 transition-all hover:shadow active:scale-98 whitespace-nowrap cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>লগইন করুন</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-800 hover:text-blue-600 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.25]" /> : <Menu className="w-6 h-6 stroke-[2.25]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Backdrop Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-16 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-40 lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fade-in">
            {/* Nav links */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3.5 py-2.5 text-base font-bold rounded-xl transition-all cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-blue-50 text-blue-700 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Direct hotline & user account bar */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <a
                href="tel:01700123456"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200/90 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>জরুরি হেল্পলাইন: ০১৭০০-১২৩৪৫৬ (২৪/৭)</span>
              </a>

              {user ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 tabular-nums">{user.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline px-2 py-1"
                  >
                    লগআউট
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 rounded-xl shadow-md shadow-blue-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>লগইন বা সাইন আপ করুন</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
