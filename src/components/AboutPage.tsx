import { ArrowLeft, Users, ShieldCheck, Award, Heart, MapPin, Sparkles, CheckCircle2, ChevronRight, Briefcase, Quote, Star, Check, Compass, Megaphone } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/blogAndTeamData';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
  onNavigateToContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
  onNavigateToContact,
}) => {
  const ceo = TEAM_MEMBERS.find((m) => m.id === 'ceo') || TEAM_MEMBERS[0];
  const ed = TEAM_MEMBERS.find((m) => m.id === 'executive-director');
  const doo = TEAM_MEMBERS.find((m) => m.id === 'director-of-operations');
  const bm = TEAM_MEMBERS.find((m) => m.id === 'brand-manager');

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

          <span className="text-xs font-bold text-blue-800 bg-blue-100/90 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>আমাদের লিডারশিপ ও পরিচালনা পর্ষদ</span>
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-12 border border-sky-400/30 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>ঘুরবে-এর নেপথ্যে যারা আছেন</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              আমাদের পরিচালনা পর্ষদ ও এক্সিকিউটিভ লিডারশিপ
            </h1>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              প্রতিষ্ঠাতা ও সিইও থেকে শুরু করে এক্সিকিউটিভ ডিরেক্টর, ডিরেক্টর অব অপারেশনস ও ব্র্যান্ড ম্যানেজার—আমাদের সুযোগ্য পরিচালনা পর্ষদের সার্বক্ষণিক তদারকিতে আপনার প্রতিটি ভ্রমণ হয় নিরাপদ, আনন্দময় ও স্মরণীয়।
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onNavigateToPackages}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
              >
                আমাদের প্যাকেজসমূহ
              </button>
              <button
                onClick={onNavigateToContact}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                যোগাযোগ করুন
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Experience & Excellence Showcase (আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border-2 border-sky-400/40 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-black border border-amber-300/30">
                <Award className="w-4 h-4 text-amber-300" />
                <span>গৌরবময় পথচলা ও অটুট আস্থা</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                "আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                ২০২২ সাল থেকে প্রতিটি পর্যটকের সর্বোচ্চ সুরক্ষা, আরামদায়ক ট্রান্সপোর্টেশন, প্রিমিয়াম রিসোর্ট এবং শতভাগ সৎ ও লুকানো চার্জহীন সেবা প্রদান করাই ঘুরবে-এর মূল বৈশিষ্ট্য।
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-amber-300">২০২২</span>
                <span className="text-[11px] font-bold text-slate-200">সাল থেকে সেবা</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-emerald-300">১০,০০০+</span>
                <span className="text-[11px] font-bold text-slate-200">সন্তুষ্ট পর্যটক</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center col-span-2 sm:col-span-1">
                <span className="block text-2xl sm:text-3xl font-black text-sky-300">৩৬৭+</span>
                <span className="text-[11px] font-bold text-slate-200">সফল ট্যুর ব্যাচ</span>
              </div>
            </div>
          </div>
        </div>

        {/* CEO Spotlight & Official Executive Message (Message from the CEO) */}
        <section className="bg-white rounded-3xl border-2 border-sky-300/80 shadow-xl overflow-hidden relative">
          {/* Top Decorative Header Accent */}
          <div className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 text-white px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0">
                <Quote className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-sky-300 block">
                  EXECUTIVE LEADERSHIP & VISION
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  Message from the CEO | প্রতিষ্ঠাতা ও প্রধান নির্বাহীর বার্তা
                </h2>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Leadership Statement</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: CEO Portrait & Credentials */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                <div className="relative group">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-blue-500/30 bg-slate-100">
                    <img
                      src={ceo.avatar}
                      alt={ceo.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute bottom-3 left-3 bg-blue-600/95 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50 backdrop-blur-xs whitespace-nowrap">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-200" />
                    <span>FOUNDER & CEO</span>
                  </div>
                </div>

                <div className="pt-3 space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    MD SAMSUL ARAFIN
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-blue-700">
                    Founder & CEO (প্রতিষ্ঠাতা ও প্রধান নির্বাহী)
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Ghurbe Tours & Travels Bangladesh
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      <Award className="w-3 h-3 text-blue-600" />
                      <span>২০২২ থেকে দক্ষতার সাথে পরিচালিত</span>
                    </span>
                  </div>
                </div>

                {/* Core Commitments Pill Box */}
                <div className="w-full p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-blue-900 block text-xs">মূল অঙ্গীকারসমূহ:</span>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                      <span>ব্যক্তিগত দায়বদ্ধতা ও নিরাপত্তা</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                      <span>স্বচ্ছ ও লুকানো চার্জহীন বাজেট</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                      <span>ভ্রমণকারী পরিবারের সর্বোচ্চ সম্মান</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Full Official CEO Message */}
              <div className="lg:col-span-8 space-y-5 text-slate-800">
                {/* Headline Banner */}
                <div className="border-l-4 border-blue-600 pl-4 sm:pl-5 space-y-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                    "Your trust sets the standard for every journey."
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-blue-700 uppercase tracking-widest">
                    Welcome to Ghurbe.
                  </p>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-4 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-700">
                  <p>
                    Travel gives us something precious: time with the people we love, fresh perspectives, and memories that stay with us. When you choose Ghurbe, you entrust us with your time, your budget, and an experience that matters to you. <strong>I take that responsibility personally.</strong>
                  </p>

                  <p>
                    My vision for Ghurbe is simple: thoughtful journeys, honest communication, and consistent service. To me, maintaining high standards means paying attention to the details, clearly explaining what your trip includes, and treating every traveller with care and respect.
                  </p>

                  <p>
                    That is the standard I want our team to uphold, from your first enquiry to your return home. When plans change, our approach should remain the same: communicate openly, respond responsibly, and help you understand the next step.
                  </p>

                  <p>
                    Whether you are taking a family holiday, travelling with friends, or discovering somewhere new, we want you to feel informed, welcomed, and excited about the journey ahead.
                  </p>

                  <p>
                    Thank you for considering Ghurbe. We look forward to earning your trust and being part of the memories you bring home.
                  </p>
                </div>

                {/* Sign-Off / Closing Stamp */}
                <div className="pt-4 border-t border-slate-200/90 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-extrabold text-blue-700 italic">
                      “Let’s explore together. Let’s Ghurbe.”
                    </p>
                    <div className="pt-1">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">
                        MD SAMSUL ARAFIN
                      </h4>
                      <p className="text-xs font-bold text-slate-600">
                        Founder & CEO, Ghurbe
                      </p>
                    </div>
                  </div>

                  {/* Bengali Essence Quote Box */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 max-w-sm text-xs text-amber-950 space-y-1">
                    <span className="font-bold block text-[11px] text-amber-800">
                      💡 বাংলায় মূল বার্তা:
                    </span>
                    <p className="leading-snug text-[11px] text-slate-700">
                      "আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি। আপনাদের আস্থা ও নিরাপত্তাই আমাদের প্রতিটি ট্রিপের মানদণ্ড। প্রতিটি পর্যটককে পরিবারের মতো যত্ন ও শতভাগ সততা দেওয়াই আমাদের লক্ষ্য।"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Director Spotlight (মাহিম ইবনে খুদি - Executive Director) */}
        {ed && (
          <section className="bg-white rounded-3xl border-2 border-emerald-300/80 shadow-xl overflow-hidden relative">
            {/* Header Accent */}
            <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-black tracking-widest text-emerald-300 block">
                    EXECUTIVE LEADERSHIP & OPERATIONS
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Executive Director | নির্বাহী পরিচালক
                  </h2>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Executive Board Member</span>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Photo & Identity */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                  <div className="relative group">
                    <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-emerald-500/30 bg-slate-100">
                      <img
                        src={ed.avatar}
                        alt={ed.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute bottom-3 left-3 bg-emerald-700/95 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50 backdrop-blur-xs whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                      <span>EXECUTIVE DIRECTOR</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {ed.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700">
                      Executive Director (নির্বাহী পরিচালক)
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Ghurbe Tours & Travels Bangladesh
                    </p>
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>২০২২ থেকে অপারেশনাল এক্সিলেন্স</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Operational Vision */}
                <div className="lg:col-span-8 space-y-5 text-slate-800">
                  <div className="border-l-4 border-emerald-600 pl-4 sm:pl-5 space-y-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                      "প্রতিটি ট্যুরিস্টের স্বাচ্ছন্দ্য, নিরাপত্তা ও আনন্দময় অভিজ্ঞতাই আমাদের ব্রত।"
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-widest">
                      Executive Leadership & Operational Excellence
                    </p>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-700">
                    <p>
                      আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি। ঘুরবে-এর সার্বিক প্রশাসনিক নেতৃত্ব, প্রতিটি ট্যুরের নিখুঁত অপারেশনস ও সার্ভিস কোয়ালিটি নিয়ন্ত্রণে প্রত্যক্ষ ভূমিকা পালন করছেন <strong>মাহিম ইবনে খুদি</strong>। দক্ষতা ও পেশাদারিত্বের সাথে প্রতিটি ভ্রমণ যেন সুশৃঙ্খল, ঝামেলামুক্ত ও স্মরণীয় হয়ে ওঠে—তা নিশ্চিতে তিনি সদা তৎপর।
                    </p>
                    <p>
                      ফিল্ড অপারেশনস থেকে শুরু করে বিলাসবহুল এসি বাস পরিবহন, অভিজাত রিসোর্ট বুকিং এবং পর্যটকদের ব্যক্তিগত চাহিদার পূর্ণ সমাধান প্রদানে তাঁর রয়েছে অবিচল দায়বদ্ধতা। সততা, সময়ানুবর্তিতা ও আন্তরিক সেবাই ঘুরবে পরিবারের এগিয়ে চলার প্রেরণা।
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs">
                      <span className="font-black text-emerald-900 block mb-1">অপারেশনস কন্ট্রোল</span>
                      <p className="text-slate-600 text-[11px] leading-snug">প্রতিটি ব্যাচের হোটেল, ট্রান্সপোর্ট ও নিরাপত্তা নিশ্চিতকরণ</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs">
                      <span className="font-black text-blue-900 block mb-1">কোয়ালিটি অ্যাসুরেন্স</span>
                      <p className="text-slate-600 text-[11px] leading-snug">কোনো লুকানো চার্জহীন শতভাগ প্রিমিয়াম সার্ভিস বজায় রাখা</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs">
                      <span className="font-black text-amber-900 block mb-1">২৪/৭ যাত্রী সহায়তা</span>
                      <p className="text-slate-600 text-[11px] leading-snug">ভ্রমণকালে যেকোনো জরুরি প্রয়োজনে সার্বক্ষণিক সমন্বয়</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Director of Operations Spotlight (Md Rifat Islam - Director of Operations) */}
        {doo && (
          <section className="bg-white rounded-3xl border-2 border-indigo-300/80 shadow-xl overflow-hidden relative">
            {/* Header Accent */}
            <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-black tracking-widest text-indigo-300 block">
                    EXECUTIVE LEADERSHIP & FIELD OPERATIONS
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Director of Operations | ডিরেক্টর অব অপারেশনস
                  </h2>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/20">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Executive Operations Lead</span>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Photo & Identity */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                  <div className="relative group">
                    <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-indigo-500/30 bg-slate-100">
                      <img
                        src={doo.avatar}
                        alt={doo.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute bottom-3 left-3 bg-indigo-700/95 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50 backdrop-blur-xs whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-200" />
                      <span>DIRECTOR OF OPERATIONS</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {doo.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-indigo-700">
                      Director of Operations (ডিরেক্টর অব অপারেশনস)
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Ghurbe Tours & Travels Bangladesh
                    </p>
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        <ShieldCheck className="w-3 h-3 text-indigo-600" />
                        <span>২০২২ থেকে অপারেশনাল এক্সিলেন্স ও নিরাপত্তা</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Operational Execution */}
                <div className="lg:col-span-8 space-y-5 text-slate-800">
                  <div className="border-l-4 border-indigo-600 pl-4 sm:pl-5 space-y-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                      "সঠিক পরিকল্পনা, সুশৃঙ্খল লজিস্টিকস ও সার্বক্ষণিক যাত্রী সেবাই আমাদের সফল ভ্রমণের মূল চালিকাশক্তি।"
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-indigo-700 uppercase tracking-widest">
                      Field Logistics, Safety Protocols & On-Ground Coordination
                    </p>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-700">
                    <p>
                      আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি। ঘুরবে পরিবারের প্রতিটি ট্যুর যেন সময়মতো, সুশৃঙ্খল ও সম্পূর্ণ নিরাপদভাবে পরিচালিত হয়—তার মাঠপর্যায়ের সমস্ত অপারেশনস ও ট্রান্সপোর্টেশন লজিস্টিকসের সরাসরি দায়িত্বে রয়েছেন <strong>{doo.name}</strong> (Director of Operations)।
                    </p>
                    <p>
                      পাহাড়ের সর্পিল পথ সাজেক-বান্দরবান কিংবা সাগরের উত্তাল ঢেউ পাড়ি দিয়ে সেন্টমার্টিন—প্রতিটি গন্তব্যে সেরা মানের এসি বাস ব্যবস্থা, পরিচ্ছন্ন ও নিরাপদ হোটেল/রিসোর্ট অ্যালটমেন্ট এবং সার্বক্ষণিক ফিল্ড গাইডদের নিবিড় মনিটরিংয়ে তাঁর পেশাদার নেতৃত্ব অতুলনীয়।
                    </p>
                    <p>
                      ভ্রমণকালে যেকোনো জরুরি আবহাওয়া পরিবর্তন, ট্রাফিক ডাইভারশন কিংবা পর্যটকদের ব্যক্তিগত চাহিদায় তাৎক্ষণিক বিকল্প ব্যাকআপ ও ২৪/৭ গ্রাহক সহায়তা প্রদান করে পর্যটকদের আস্থা অর্জনই তাঁর মূল লক্ষ্য।
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs">
                      <span className="font-black text-indigo-900 block mb-1">গ্রাউন্ড লজিস্টিকস</span>
                      <p className="text-slate-600 text-[11px] leading-snug">ট্যুর বাসের সময়ানুবর্তিতা ও আধুনিক বাহন সরাসরি তদারকি</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs">
                      <span className="font-black text-blue-900 block mb-1">রিসোর্ট ও হোটেল চয়েস</span>
                      <p className="text-slate-600 text-[11px] leading-snug">প্রিমিয়াম কাপল ও ফ্যামিলি ফ্রেন্ডলি সেরা ভিউ রুম অ্যালটমেন্ট</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs">
                      <span className="font-black text-amber-900 block mb-1">২৪/৭ সেফটি প্রটোকল</span>
                      <p className="text-slate-600 text-[11px] leading-snug">পাহাড় ও সমুদ্র রুটে প্রতিটি ভ্রমণকারীর সর্বোচ্চ নিরাপত্তা</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Brand Manager Spotlight (Sidra Islam - Brand Manager) */}
        {bm && (
          <section className="bg-white rounded-3xl border-2 border-purple-300/80 shadow-xl overflow-hidden relative">
            {/* Header Accent */}
            <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center shrink-0">
                  <Megaphone className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-black tracking-widest text-purple-300 block">
                    BRANDING, MEDIA & CUSTOMER RELATIONS
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Brand Manager | ব্র্যান্ড ম্যানেজার
                  </h2>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/20">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Brand Leadership & Communication</span>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Photo & Identity */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                  <div className="relative group">
                    <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-purple-500/30 bg-slate-100">
                      <img
                        src={bm.avatar}
                        alt={bm.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute bottom-3 left-3 bg-purple-700/95 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50 backdrop-blur-xs whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-200" />
                      <span>BRAND MANAGER</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {bm.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-purple-700">
                      Brand Manager (ব্র্যান্ড ম্যানেজার)
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Ghurbe Tours & Travels Bangladesh
                    </p>
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>২০২২ থেকে ব্র্যান্ডিং এক্সিলেন্স ও ট্রাস্ট</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Branding Vision */}
                <div className="lg:col-span-8 space-y-5 text-slate-800">
                  <div className="border-l-4 border-purple-600 pl-4 sm:pl-5 space-y-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                      "সৃজনশীল ব্র্যান্ডিং, ইতিবাচক গ্রাহক অভিজ্ঞতা ও আন্তরিক যোগাযোগই আমাদের মূল চালিকাশক্তি।"
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-purple-700 uppercase tracking-widest">
                      Creative Direction, Brand Trust & Customer Engagement
                    </p>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-700">
                    <p>
                      আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি। ঘুরবে-এর ব্র্যান্ড আইডেন্টিটি, ক্রিয়েটিভ মিডিয়া ক্যাম্পেইন, ট্রাভেলারদের সাথে আন্তরিক যোগাযোগ ও প্রতিটি ভ্রমণের আকর্ষণীয় মুহূর্তগুলোকে দেশজুড়ে ছড়িয়ে দিতে প্রত্যক্ষ নেতৃত্ব দিচ্ছেন <strong>{bm.name}</strong> (Brand Manager)।
                    </p>
                    <p>
                      ভ্রমণপ্রেমীদের বিশ্বাসযোগ্য তথ্য প্রদান, প্রতিটি ট্যুর প্যাকেজের স্বচ্ছ প্রেজেন্টেশন এবং কাস্টমারদের ভ্রমণ স্মৃতিকে নান্দনিকভাবে ডিজিটাল প্ল্যাটফর্মে উপস্থাপনের মাধ্যমে তিনি ঘুরবে-কে পর্যটকদের বিশ্বস্ত এক ভালোবাসার ব্র্যান্ডে পরিণত করেছেন।
                    </p>
                    <p>
                      সোশ্যাল মিডিয়া থেকে শুরু করে ফিল্ড ইভেন্টস—ঘুরবে-এর সাথে প্রতিটি ভ্রমণার্থীর পথচলা যেন আন্তরিক, মর্যাদাপূর্ণ ও সবসময় স্মরণীয় থাকে, তা নিশ্চিত করাই তাঁর নিরন্তর প্রয়াস।
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs">
                      <span className="font-black text-purple-900 block mb-1">ব্র্যান্ড স্ট্র্যাটেজি</span>
                      <p className="text-slate-600 text-[11px] leading-snug">সোশ্যাল মিডিয়া ও আধুনিক মাধ্যমে ঘুরবে-এর শীর্ষ ব্র্যান্ড ইমেজ বজায় রাখা</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs">
                      <span className="font-black text-blue-900 block mb-1">কাস্টমার এনগেজমেন্ট</span>
                      <p className="text-slate-600 text-[11px] leading-snug">ভ্রমণকারীদের সাথে বন্ধুত্বপূর্ণ যোগাযোগ ও প্রকৃত ভ্রমণ স্মৃতি তুলে ধরা</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs">
                      <span className="font-black text-amber-900 block mb-1">ক্রিয়েটিভ ক্যাম্পেইন</span>
                      <p className="text-slate-600 text-[11px] leading-snug">সিজনাল আকর্ষণীয় প্যাকেজ ও নিখুঁত ট্রাভেল গাইড কমিউনিকেশন</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Company Core Values Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-sky-400/20 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h3 className="text-xl sm:text-2xl font-black">আমাদের নীতি ও অঙ্গীকার</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              একটি দায়িত্বশীল ট্রাভেল কোম্পানি হিসেবে সততা, নিরাপত্তা ও পরিবারের সদস্যদের মতো সেবা দেওয়াই আমাদের অস্তিত্ব।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-white">১০০% নিরাপত্তা</h4>
              <p className="text-xs text-slate-300 mt-1">নারী, শিশু ও কাপলদের জন্য সম্পূর্ণ মার্জিত ও নিরাপদ পরিবেশ।</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-white">স্বচ্ছতা ও সততা</h4>
              <p className="text-xs text-slate-300 mt-1">কোনো লুকানো খরচ নেই, যা প্যাকেজে লেখা তা-ই শতভাগ নিশ্চিত।</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Heart className="w-6 h-6 text-rose-400 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-white">আন্তরিক আতিথেয়তা</h4>
              <p className="text-xs text-slate-300 mt-1">প্রতিটি ট্যুরিস্ট আমাদের কাছে অতিথি নয়, পরিবারের আপন সদস্য।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
