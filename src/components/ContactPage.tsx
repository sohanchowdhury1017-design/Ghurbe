import React from 'react';
import { ContactAndFaq } from './ContactAndFaq';
import { ArrowLeft, PhoneCall, MessageCircle, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
}) => {
  const branches = [
    {
      city: 'রংপুর প্রধান কার্যালয়',
      address: 'রংপুর কেন্দ্রীয় বাস টার্মিনাল মোড়, রংপুর সদর',
      phone: '০১৭০০-১২৩৪৫৬',
      hours: 'সকাল ৯:০০ - রাত ১০:০০',
    },
    {
      city: 'বগুড়া ব্রাঞ্চ অফিস',
      address: 'চারমাথা বাস টার্মিনাল রোড, বগুড়া',
      phone: '০১৮০০-১২৩৪৫৬',
      hours: 'সকাল ৯:০০ - রাত ৯:০০',
    },
    {
      city: 'গাইবান্ধা তথ্য কেন্দ্র',
      address: 'পলাশবাড়ী বাস পয়েন্ট, গাইবান্ধা',
      phone: '০১৯০০-১২৩৪৫৬',
      hours: 'সকাল ১০:০০ - রাত ৮:০০',
    },
    {
      city: 'ঢাকা কর্পোরেট অফিস',
      address: 'ধানমন্ডি ৯/এ, ঢাকা, বাংলাদেশ',
      phone: '০৯৬৫৮-৮৬৫৫৯৩',
      hours: 'সকাল ৯:০০ - রাত ৮:০০',
    },
  ];

  return (
    <div className="min-h-screen bg-sky-dots py-6 sm:py-10 space-y-8 sm:space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 active:scale-95 transition-all bg-white py-2 px-3.5 rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>← হোম পেজে ফিরে যান</span>
          </button>

          <button
            onClick={onNavigateToPackages}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            ট্যুর প্যাকেজ দেখুন →
          </button>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white border border-sky-400/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-sky-300 text-xs font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>২৪/৭ হেল্পলাইন ও কাস্টমার কেয়ার</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              যোগাযোগ ও সরাসরি সাপোর্ট
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              প্যাকেজ সংক্রান্ত যেকোনো তথ্য, সিট বুকিং কিংবা কাস্টমাইজড ট্যুর আয়োজনে সরাসরি আমাদের টিমের সাথে কথা বলুন।
            </p>
          </div>
        </div>

        {/* Quick Hotline, WhatsApp, Facebook & YouTube Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="tel:09658865593"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block truncate">হটলাইন (২৪/৭)</span>
                <strong className="text-sm sm:text-base font-black text-slate-900 block group-hover:text-blue-600 transition-colors truncate">
                  09658-865593
                </strong>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl shrink-0">
              কল দিন
            </span>
          </a>

          <a
            href="https://wa.me/8801700123456?text=আমি%20ঘুরবে%20ট্যুর%20প্যাকেজ%20সম্পর্কে%20জানতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block truncate">হোয়াটসঅ্যাপ চ্যাট</span>
                <strong className="text-sm sm:text-base font-black text-slate-900 block group-hover:text-emerald-600 transition-colors truncate">
                  WhatsApp Support
                </strong>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl shrink-0">
              চ্যাট
            </span>
          </a>

          <a
            href="https://facebook.com/ghurbe.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#1877F2] shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1877F2] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block truncate">অফিসিয়াল ফেসবুক পেজ</span>
                <strong className="text-sm sm:text-base font-black text-slate-900 block group-hover:text-[#1877F2] transition-colors truncate">
                  ghurbe.bd
                </strong>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-xl shrink-0">
              পেজ দেখুন
            </span>
          </a>

          <a
            href="https://youtube.com/@Ghurbe-ঘুরবে"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#FF0000] shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#FF0000] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-semibold block truncate">ইউটিউব চ্যানেল</span>
                <strong className="text-sm sm:text-base font-black text-slate-900 block group-hover:text-[#FF0000] transition-colors truncate">
                  @Ghurbe-ঘুরবে
                </strong>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#FF0000] bg-red-50 px-2.5 py-1 rounded-xl shrink-0">
              সাবস্ক্রাইব
            </span>
          </a>
        </div>

        {/* Branch Offices Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              আমাদের আঞ্চলিক কার্যালয়সমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              সরাসরি অফিসে এসে কথা বলতে বা রশিদ সংগ্রহ করতে নিকটস্থ শাখায় আসুন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((b, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <h3 className="font-bold text-sm text-blue-950 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{b.city}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  {b.address}
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                  <p>ফোন: <strong className="text-slate-800">{b.phone}</strong></p>
                  <p>সময়: {b.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Contact Form & Comprehensive FAQ Section */}
      <ContactAndFaq />
    </div>
  );
};
