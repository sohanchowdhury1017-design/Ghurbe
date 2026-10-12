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
      city: 'ঢাকা লিয়াজোঁ অফিস',
      address: 'মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০',
      phone: '০১৬০০-১২৩৪৫৬',
      hours: 'সকাল ৯:০০ - সন্ধ্যা ৬:০০',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 space-y-8 sm:space-y-12">
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

        {/* Quick Hotline & WhatsApp Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="tel:01700123456"
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold block">সরাসরি কল করুন (২৪/৭)</span>
                <strong className="text-lg sm:text-xl font-black text-slate-900 block group-hover:text-blue-600 transition-colors">
                  ০১৭০০-১২৩৪৫৬
                </strong>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl">
              কল দিন
            </span>
          </a>

          <a
            href="https://wa.me/8801700123456?text=আমি%20ঘুরবে%20ট্যুর%20প্যাকেজ%20সম্পর্কে%20জানতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-semibold block">হোয়াটসঅ্যাপ চ্যাট ও পরামর্শ</span>
                <strong className="text-lg sm:text-xl font-black text-slate-900 block group-hover:text-emerald-600 transition-colors">
                  WhatsApp Helpline
                </strong>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
              মেসেজ দিন
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
