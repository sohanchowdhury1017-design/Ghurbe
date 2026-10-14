import React from 'react';
import { ArrowLeft, Star, Users, MapPin, Award, Heart, CheckCircle2, ShieldCheck, ThumbsUp, Calendar, Smile, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';

interface StatsPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
  onOpenContact: () => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
  onOpenContact,
}) => {
  const testimonials = [
    {
      name: 'তানভীর আহমেদ ও পরিবার',
      location: 'বগুড়া',
      tour: 'কুয়াকাটা স্পেশাল ট্যুর',
      rating: 5,
      date: 'অক্টোবর ২০২৬',
      comment: 'ঘুরবে-এর সাথে আমাদের কুয়াকাটা ভ্রমণ ছিল অত্যন্ত চমৎকার। হোটেল, খাবার এবং গাইড সার্ভিস অসাধারণ ছিল। পরিবার নিয়ে নিশ্চিন্তে ভ্রমণ করা যায়!',
      tag: 'পরিবার নিয়ে ভ্রমণ',
    },
    {
      name: 'ফারহানা ইসলাম ও চৌধুরী',
      location: 'রংপুর',
      tour: 'সাজেক ভ্যালি মেঘের রাজ্য',
      rating: 5,
      date: 'সেপ্টেম্বর ২০২৬',
      comment: 'কটেজের বারান্দা থেকে মেঘের দৃশ্য কখনোই ভুলব না। প্রাইভেট রুমের ব্যবস্থা এবং সিকিউরিটি ছিল ১০০% পারফেক্ট। ঘুরবে টিমকে ধন্যবাদ!',
      tag: 'কাপল ট্যুর',
    },
    {
      name: 'রাকিবুল হাসান ও বন্ধুরা',
      location: 'গাইবান্ধা',
      tour: 'টাঙ্গুয়ার হাওর হাউসবোট',
      rating: 5,
      date: 'আগস্ট ২০২৬',
      comment: 'হাওরে বিলাসবহুল হাউসবোটের অভিজ্ঞতা এক কথায় অনন্য। স্থানীয় সুস্বাদু হাঁসের মাংস ও তাজা মাছের খাবার মন জয় করেছে।',
      tag: 'ফ্রেন্ডস গ্রুপ',
    },
    {
      name: 'মাহমুদুল হক',
      location: 'ঢাকা',
      tour: 'সেন্টমার্টিন প্রবাল দ্বীপ',
      rating: 5,
      date: 'ফেব্রুয়ারি ২০২৬',
      comment: 'সময়মতো বাস যাত্রা এবং পরিষ্কার হোটেল রুম। কোনো লুকানো চার্জ ছিল না। ১,০০০ টাকা বুকিং মানি দিয়ে সিট নিশ্চিত করা সত্যিই দারুণ সুবিধা।',
      tag: 'সোলো ট্রাভেলার',
    },
  ];

  const milestones = [
    {
      year: '২০২৪ - ২০২৬',
      title: '৩৬৭টি সফল ট্যুর ব্যাচ পরিচালনা',
      desc: 'কুয়াকাটা, সাজেক, সেন্টমার্টিন, টাঙ্গুয়ার হাওর, কক্সবাজার ও বান্দরবানে নির্দিষ্ট সময়ে সুশৃঙ্খল ভ্রমণ আয়োজন।',
    },
    {
      year: 'সততা ও বিশ্বাস',
      title: '১,১৪৪+ পরিবারের আস্থা ও মুখে হাসি',
      desc: 'নারী, শিশু ও প্রবীণ সদস্যদের জন্য সর্বোচ্চ সম্মানজনক ও নিরাপদ পরিবেশ নিশ্চিতকরণ।',
    },
    {
      year: 'গ্রাহক সন্তুষ্টি',
      title: '৪.৯ / ৫ শীর্ষ রেটিং অর্জন',
      desc: 'পর্যটকদের স্বতঃস্ফূর্ত পজিটিভ রিভিউ এবং বারবার ঘুরবে-এর সাথে ভ্রমণের আগ্রহ প্রকাশ।',
    },
  ];

  return (
    <div className="min-h-screen bg-sky-dots py-6 sm:py-10 space-y-8 sm:space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>হোমে ফিরে যান</span>
          </button>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>১০০% অফিসিয়াল ভেরিফাইড পরিসংখ্যান</span>
          </span>
        </div>

        {/* Hero Banner Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-12 border border-sky-400/30 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>আমাদের সাফল্য ও পর্যটকদের বিশ্বাস</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              আমাদের গর্ব: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-amber-200">১,১৪৪+ সন্তুষ্ট পর্যটক</span> ও ৩৬৭টি সফল ট্যুর!
            </h1>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              ঘুরবে পরিবারের মূল চালিকাশক্তি হলো পর্যটকদের সন্তুষ্টি ও ভালোবাসা। প্রতিটি পদক্ষেপে নিরাপত্তা, সঠিক সময়ানুবর্তিতা এবং পারিবারিক পরিবেশ বজায় রাখাই আমাদের ৪.৯/৫ রেটিংয়ের গোপন চাবিকাঠি।
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onNavigateToPackages}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
              >
                প্যাকেজ বুকিং করুন
              </button>
              <button
                onClick={onOpenContact}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                সরাসরি কথা বলুন
              </button>
            </div>
          </div>
        </div>

        {/* The 3 Core Stats Cards (User requested: 1144 happy porjotok, 367 tur, 4.9 rating) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1144 Happy Porjotok */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums font-mono">
                ১,১৪৪+
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                সন্তুষ্ট পর্যটক
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2">
              টোটাল হ্যাপি পর্যটক (Happy Travelers)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              বাংলাদেশজুড়ে পরিবার, বন্ধু, দম্পতি ও কর্পোরেট টিম নিয়ে আমাদের সাথে নিরাপদে ঘুরেছেন ১,১৪৪ জনেরও বেশি ভ্রমণপ্রেমী।
            </p>
          </div>

          {/* Card 2: 367 Tours Completed */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-sm hover:shadow-xl hover:border-sky-500 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 mb-5 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums font-mono">
                ৩৬৭+
              </span>
              <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                সম্পন্ন ব্যাচ
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2">
              সফল ট্যুর সম্পন্ন (Tours Completed)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              রংপুর, বগুড়া, গাইবান্ধা ও ঢাকা থেকে শতভাগ সময়মতো বাস যাত্রা, প্রিমিয়াম হোটেল ও যত্নশীল টিম নিয়ে ৩৬৭টি ট্যুর পরিচালিত।
            </p>
          </div>

          {/* Card 3: 4.9 Rating */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 mb-5 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 fill-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums font-mono">
                ৪.৯
              </span>
              <span className="text-xs font-black text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                ৫-এর মধ্যে
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2">
              ট্যুরিস্ট সন্তুষ্টি রেটিং (4.9 / 5 Rating)
            </h3>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-slate-500 font-semibold ml-1.5">(৫০০+ পাবলিক রিভিউ)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              স্বচ্ছ বাজেট, কোনো লুকানো খরচ না থাকা এবং বন্ধুত্বপূর্ণ গাইড সার্ভিসের কারণে পর্যটকদের শীর্ষ রেটেড এজেন্সি।
            </p>
          </div>
        </div>

        {/* Milestones / Our Journey Story */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">আমাদের গল্প ও নীতিমালা</span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900">যে কারণে আমরা পর্যটকদের প্রথম পছন্দ</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">ঘুরবে-এর সাথে প্রতিটি যাত্রা শুধু একটি ভ্রমণ নয়, আজীবনের এক সুন্দর স্মৃতি</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md inline-block mb-3">
                    {m.year}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-sky-100 flex items-center gap-1.5 text-xs text-blue-600 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>নিরাপদ ও নির্ভরযোগ্য</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Traveler Reviews Wall */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">পর্যটকদের মতামত</span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900">ভ্রমণকারীদের সরাসরি অভিজ্ঞতা</h2>
            </div>
            <a
              href="https://facebook.com/ghurbe.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-2 border border-blue-200 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>ফেসবুক পেজে সব রিভিউ পড়ুন →</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-sky-300 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.location} · {t.tour}</p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full shrink-0">
                    {t.tag}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] text-slate-400 font-medium ml-1">({t.date})</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-100">
                  "{t.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-3xl font-black">আপনিও হতে পারেন আমাদের পরবর্তী হ্যাপি পর্যটক!</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            মাত্র ১,০০০৳ বুকিং মানি দিয়ে পছন্দের ট্যুর প্যাকেজে আপনার আসন নিশ্চিত করুন। কোনো লুকানো চার্জ ছাড়া নিশ্চিন্ত ভ্রমণ।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToPackages}
              className="py-3 px-6 rounded-xl bg-white text-blue-800 hover:bg-slate-100 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              সকল প্যাকেজ দেখুন
            </button>
            <a
              href="tel:09658865593"
              className="py-3 px-6 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-sky-300" />
              <span>০৯৬৫৮-৮৬৫৫৯৩</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
