import React from 'react';
import { Phone, Mail, MapPin, Heart, Shield, Luggage } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBookings: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookings, onOpenAdmin }) => {
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

            <div className="pt-2 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  গভর্নমেন্ট রেজিস্টার্ড ট্রাভেল এজেন্সি • ২০২২ থেকে দক্ষতার সাথে পরিচালিত
                </span>
              </div>

              {/* Official Social Media Channels */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://facebook.com/ghurbe.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2] text-blue-300 hover:text-white border border-[#1877F2]/40 transition-all text-xs font-bold shadow-xs cursor-pointer active:scale-95"
                  title="Ghurbe অফিসিয়াল ফেসবুক পেজ"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>facebook.com/ghurbe.bd</span>
                </a>

                <a
                  href="https://youtube.com/@Ghurbe-ঘুরবে"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FF0000]/20 hover:bg-[#FF0000] text-red-300 hover:text-white border border-[#FF0000]/40 transition-all text-xs font-bold shadow-xs cursor-pointer active:scale-95"
                  title="Ghurbe অফিসিয়াল ইউটিউব চ্যানেল"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>@Ghurbe-ঘুরবে</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">দ্রুত নেভিগেশন</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('hero');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  হোম পেজ
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('packages');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  জনপ্রিয় ট্যুর প্যাকেজ
                </a>
              </li>
              <li>
                <a
                  href="/kuakata-travel-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('kuakata-travel-guide');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  কুয়াকাটা ভ্রমণ গাইড ২০২৬
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('gallery');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  ভ্রমণ ছবির গ্যালারি
                </a>
              </li>
              <li>
                <a
                  href="/why-us"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('why-us');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  আমাদের সম্পর্কে ও সুবিধা
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('blog');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  ট্রাভেল ব্লগ ও গাইড
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  আমাদের টিম ও কর্মকর্তা (About)
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="hover:text-sky-400 transition-colors"
                >
                  যোগাযোগ ও সহায়তা
                </a>
              </li>
            </ul>
          </div>

          {/* Leadership & Top Spots */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">পরিচালনা পর্ষদ ও প্রোফাইল</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="/SAMSUL-ARAFIN"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('SAMSUL-ARAFIN');
                  }}
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <span>MD SAMSUL ARAFIN</span>
                  <span className="text-[10px] text-slate-400">(CEO)</span>
                </a>
              </li>
              <li>
                <a
                  href="/mahim-ibn-khudi"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('mahim-ibn-khudi');
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>মাহিম ইবনে খুদি</span>
                  <span className="text-[10px] text-emerald-300">(Executive Director)</span>
                </a>
              </li>
              <li>
                <a
                  href="/adhira-nokshi"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('adhira-nokshi');
                  }}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Adhira Nokshi</span>
                  <span className="text-[10px] text-rose-300">(Brand &amp; Marketing Director)</span>
                </a>
              </li>
              <li>
                <a
                  href="/md-rifat-islam"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('md-rifat-islam');
                  }}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Md Rifat Islam</span>
                  <span className="text-[10px] text-indigo-300">(Operations)</span>
                </a>
              </li>
              <li>
                <a
                  href="/sidra-islam"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('sidra-islam');
                  }}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Sidra Islam</span>
                  <span className="text-[10px] text-purple-300">(Brand Manager)</span>
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-bold text-white uppercase tracking-wider pt-3">জনপ্রিয় বাংলাদেশ স্পট</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="/Kuakata" onClick={(e) => { e.preventDefault(); onNavigate('Kuakata'); }} className="hover:text-white transition-colors">কুয়াকাটা সাগরকন্যা ট্যুর (৩৫৯৯৳)</a></li>
              <li><a href="/sajek-valley" onClick={(e) => { e.preventDefault(); onNavigate('sajek-valley'); }} className="hover:text-white transition-colors">সাজেক ভ্যালি মেঘের রাজ্য</a></li>
              <li><a href="/saint-martin" onClick={(e) => { e.preventDefault(); onNavigate('saint-martin'); }} className="hover:text-white transition-colors">সেন্টমার্টিন প্রবাল দ্বীপ</a></li>
              <li><a href="/coxs-bazar" onClick={(e) => { e.preventDefault(); onNavigate('coxs-bazar'); }} className="hover:text-white transition-colors">কক্সবাজার সমুদ্র সৈকত</a></li>
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
                <span>ধানমন্ডি ৯/এ, ঢাকা, বাংলাদেশ</span>
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

          <div className="flex items-center gap-3">
            <span>© 2026 ঘুরবে - ট্যুরস অ্যান্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
