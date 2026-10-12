import React from 'react';
import { Home, Compass, Image, CalendarCheck, Phone, User } from 'lucide-react';

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
  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] px-3 pt-2 pb-3 sm:hidden"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.65rem)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around gap-1 text-center">
        {/* হোম */}
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-2xl transition-all active:scale-92 cursor-pointer ${
            activeSection === 'hero'
              ? 'text-blue-700 font-extrabold bg-blue-50/90'
              : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${activeSection === 'hero' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 font-semibold leading-tight">হোম</span>
        </button>

        {/* ট্যুর প্যাকেজ */}
        <button
          type="button"
          onClick={() => onNavigate('packages')}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-2xl transition-all active:scale-92 cursor-pointer ${
            activeSection === 'packages'
              ? 'text-blue-700 font-extrabold bg-blue-50/90'
              : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform ${activeSection === 'packages' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 font-semibold leading-tight">প্যাকেজ</span>
        </button>

        {/* গ্যালারি */}
        <button
          type="button"
          onClick={() => onNavigate('gallery')}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-2xl transition-all active:scale-92 cursor-pointer ${
            activeSection === 'gallery'
              ? 'text-blue-700 font-extrabold bg-blue-50/90'
              : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
          }`}
        >
          <Image className={`w-5 h-5 transition-transform ${activeSection === 'gallery' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 font-semibold leading-tight">গ্যালারি</span>
        </button>

        {/* বুকিং */}
        <button
          type="button"
          onClick={onOpenBookings}
          className="flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-2xl text-slate-600 hover:text-blue-600 active:bg-slate-50 active:scale-92 transition-all cursor-pointer relative"
        >
          <div className="relative">
            <CalendarCheck className="w-5 h-5 text-blue-600 stroke-[2.25]" />
            {bookingsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs border border-white">
                {bookingsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-semibold leading-tight text-slate-700">বুকিং</span>
        </button>

        {/* লগইন / প্রোফাইল */}
        <button
          type="button"
          onClick={onOpenAuth}
          className="flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-2xl text-slate-600 hover:text-blue-600 active:bg-slate-50 active:scale-92 transition-all cursor-pointer"
        >
          {user ? (
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center text-[10px] font-black shadow-2xs">
              {user.name.charAt(0)}
            </div>
          ) : (
            <User className="w-5 h-5 stroke-[2.25] text-slate-600" />
          )}
          <span className="text-[11px] mt-1 font-semibold leading-tight truncate max-w-[54px] text-slate-700">
            {user ? user.name.split(' ')[0] : 'লগইন'}
          </span>
        </button>
      </div>
    </nav>
  );
};
