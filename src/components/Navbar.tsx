import React, { useState } from 'react';
import { Compass, Menu, X, CalendarCheck, User, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBookings: () => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  bookingsCount: number;
  user: { name: string; phone: string } | null;
  onLogout: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBookings,
  onOpenAuth,
  onOpenAdmin,
  bookingsCount,
  user,
  onLogout,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'blog', label: 'Travel Blog' },
    { id: 'about', label: 'About Us' },
    { id: 'stats', label: '1,144+ Travelers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Professional Agency Announcement Strip */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white text-[11px] py-1.5 px-3.5 border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shrink-0">
              আগামী ট্যুর
            </span>
            <span className="truncate text-slate-200 font-medium">
              🌊 কুয়াকাটা ৩ রাত ২ দিন (১২ নভেম্বর) — রংপুর ও বগুড়া থেকে নিশ্চিত যাত্রা
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://facebook.com/ghurbe.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-bold text-[10px] shadow-xs transition-all active:scale-95"
              title="ঘুরবে ফেসবুক পেজ"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            <a
              href="https://youtube.com/@Ghurbe-ঘুরবে"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white font-bold text-[10px] shadow-xs transition-all active:scale-95"
              title="ঘুরবে ইউটিউব চ্যানেল"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>

            <a href="tel:09658865593" className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white font-bold text-[10px] ml-2">
              <PhoneCall className="w-3 h-3 text-sky-400" />
              <span>09658-865593</span>
            </a>
          </div>
        </div>
      </div>

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

          {/* Nav Links styled as ultra-posh executive pill island */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 bg-slate-100/85 backdrop-blur-md rounded-full border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const hrefPath = link.id === 'hero' || link.id === 'home' ? '/' : `/${link.id}`;
              return (
                <a
                  key={link.id}
                  href={hrefPath}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs xl:text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-sky-600 text-white shadow-sm shadow-blue-500/30 font-bold scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/90'
                  }`}
                >
                  {link.id === 'stats' && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? 'bg-sky-200' : 'bg-emerald-500 animate-pulse'
                      }`}
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Zone */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* My Bookings Button */}
            <button
              type="button"
              onClick={onOpenBookings}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-full border border-slate-200 transition-all cursor-pointer relative"
              title="আমার বুকিং দেখুন"
            >
              <CalendarCheck className="w-4 h-4 text-blue-600" />
              <span>আমার বুকিং</span>
              {bookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Admin Portal Quick Access */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-full border border-amber-300 transition-all cursor-pointer"
                title="ঘুরবে এডমিন ড্যাশবোর্ড"
              >
                <span>এডমিন</span>
              </button>
            )}

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
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-full shadow-xs shadow-blue-500/20 transition-all hover:shadow active:scale-98 whitespace-nowrap cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
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
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const hrefPath = link.id === 'hero' || link.id === 'home' ? '/' : `/${link.id}`;
                return (
                  <a
                    key={link.id}
                    href={hrefPath}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }}
                    className={`flex items-center justify-between text-left px-4 py-2.5 text-sm font-bold rounded-2xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-sm font-extrabold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {link.id === 'stats' && (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? 'bg-white' : 'bg-emerald-500 animate-pulse'
                          }`}
                        />
                      )}
                      <span>{link.label}</span>
                    </div>
                    {link.id === 'stats' && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        Verified
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Direct hotline & user account bar */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <a
                href="tel:09658865593"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200/90 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>24/7 Helpline: 09658-865593</span>
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
                    Sign Out
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
                  <span>Sign In / Register</span>
                </button>
              )}

              {/* My Bookings and Admin Portal Quick Access */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookings();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>আমার বুকিং ({bookingsCount})</span>
                </button>

                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-200 cursor-pointer"
                  >
                    <span>এডমিন পোর্টাল 🔐</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
