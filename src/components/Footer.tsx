import React from 'react';
import { Phone, Mail, MapPin, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBookings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookings }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0">
                <img
                  src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
                  alt="ঘুরবে বিডি লোগো"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">ঘুরবে</span>
                <span className="block text-[11px] text-sky-400 font-medium">ট্যুরস অ্যান্ড ট্রাভেলস</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              অপূর্ব সুন্দর বাংলাদেশ ভ্রমণের বিশ্বস্ত ভ্রমণ সঙ্গী। পরিবার ও বন্ধুদের নিয়ে নিরাপদ, প্রিমিয়াম ও সাশ্রয়ী ভ্রমণ সেবা উপভোগ করুন।
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                গভর্নমেন্ট রেজিস্টার্ড ট্রাভেল এজেন্সি
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">দ্রুত নেভিগেশন</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-sky-400 transition-colors">
                  হোম পেজ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-sky-400 transition-colors">
                  জনপ্রিয় ট্যুর প্যাকেজ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-sky-400 transition-colors">
                  ভ্রমণ ছবির গ্যালারি
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('why-us')} className="hover:text-sky-400 transition-colors">
                  আমাদের সম্পর্কে ও সুবিধা
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-sky-400 transition-colors">
                  যোগাযোগ ও সহায়তা
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">জনপ্রিয় বাংলাদেশ স্পট</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('packages')}>সাজেক ভ্যালি মেঘের রাজ্য</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('packages')}>সেন্টমার্টিন প্রবাল দ্বীপ</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('packages')}>টাঙ্গুয়ার হাওর ও নীলাদ্রি লেক</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('packages')}>কক্সবাজার ও ইনানী মেরিন ড্রাইভ</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('packages')}>বান্দরবান নীলগিরি ও নাফাখুম</li>
              <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('packages')}>সিলেট রাতারগুল ও বিছানাকান্দি</li>
            </ul>
          </div>

          {/* Helpline & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">যোগাযোগের তথ্য</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:09658865593" className="hover:text-white tabular-nums tracking-wide font-medium">
                  09658-865593
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:ghurbebd@gmail.com" className="hover:text-white">
                  ghurbebd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-400 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.455 5.503 3.735 7.159V22l3.435-1.884c.89.246 1.838.38 2.83.38 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.004 12.427l-2.56-2.73-5 2.73 5.496-5.834 2.624 2.73 4.936-2.73-5.496 5.834z"/>
                </svg>
                <span className="text-slate-300 font-medium">Ghurbe - ঘুরবে</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-slate-800">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>বনানী, ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Partners & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>পেমেন্ট পার্টনার:</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <span className="bg-pink-900/60 text-pink-300 px-2 py-0.5 rounded text-[11px]">bKash</span>
              <span className="bg-orange-900/60 text-orange-300 px-2 py-0.5 rounded text-[11px]">Nagad</span>
              <span className="bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded text-[11px]">Rocket</span>
              <span className="bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded text-[11px]">Visa / MasterCard</span>
            </div>
          </div>

          <p className="flex items-center gap-1">
            <span>© 2026 ঘুরবে - ট্যুরস অ্যান্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
