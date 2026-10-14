import React from 'react';
import { ArrowLeft, Users, ShieldCheck, Award, Heart, MapPin, Sparkles, CheckCircle2, ChevronRight, Briefcase, Quote, Star, Check } from 'lucide-react';
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
  const otherMembers = TEAM_MEMBERS.filter((m) => m.id !== 'ceo' && m.id !== 'executive-director');

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
            <span>আমাদের টিম ও নেতৃত্ব</span>
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-12 border border-sky-400/30 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>ঘুরবে-এর নেপথ্যে যারা আছেন</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              আমাদের টিম ও কর্মকর্তা পরিচিতি
            </h1>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              প্রতিষ্ঠাতা ও সিইও থেকে শুরু করে ট্যুর গাইড ও কাস্টমার সাপোর্ট—আমাদের প্রতিটি টিম সদস্যের একমাত্র লক্ষ্য আপনার প্রতিটি ভ্রমণকে নিরাপদ, আনন্দময় ও স্মরণীয় করে তোলা।
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
                      "আপনাদের আস্থা ও নিরাপত্তাই আমাদের প্রতিটি ট্রিপের মানদণ্ড। প্রতিটি পর্যটককে পরিবারের মতো যত্ন ও শতভাগ সততা দেওয়াই আমাদের লক্ষ্য।"
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
                      ঘুরবে-এর সার্বিক প্রশাসনিক নেতৃত্ব, প্রতিটি ট্যুরের নিখুঁত অপারেশনস ও সার্ভিস কোয়ালিটি নিয়ন্ত্রণে প্রত্যক্ষ ভূমিকা পালন করছেন <strong>মাহিম ইবনে খুদি</strong>। প্রতিটি ভ্রমণ যেন সুশৃঙ্খল, ঝামেলামুক্ত ও স্মরণীয় হয়ে ওঠে—তা নিশ্চিতে তিনি সদা তৎপর।
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

        {/* All Other Company Employees & Management Team */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">আমাদের কর্মকর্তা ও মাঠ পর্যায়ের গাইড</span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900">দক্ষ ও নিবেদিতপ্রাণ কর্মী দল</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">প্রতিটি ডিপার্টমেন্টের দক্ষ সদস্যরা সর্বদা আপনার সেবায় প্রস্তুত</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-sky-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1">
                        {member.department}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">{member.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">অভিজ্ঞতা:</span>
                    <strong className="text-slate-800">{member.experience}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">দক্ষতা:</span>
                    <strong className="text-blue-700 truncate max-w-[180px]">{member.specialty}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
