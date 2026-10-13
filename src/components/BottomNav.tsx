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
      <div className="max-w-md mx-auto grid grid-cols-4 items-center justify-around gap-1 text-center">
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

        {/* যোগাযোগ */}
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-2xl transition-all active:scale-92 cursor-pointer ${
            activeSection === 'contact'
              ? 'text-blue-700 font-extrabold bg-blue-50/90'
              : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
          }`}
        >
          <Phone className={`w-5 h-5 transition-transform ${activeSection === 'contact' ? 'stroke-[2.5] scale-110 text-blue-600' : 'stroke-2'}`} />
          <span className="text-[11px] mt-1 font-semibold leading-tight">যোগাযোগ</span>
        </button>
      </div>
    </nav>
  );
};
