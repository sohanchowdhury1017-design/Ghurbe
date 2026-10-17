import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  Share2,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Briefcase,
  ChevronRight,
  Compass,
  Megaphone,
  HeartHandshake,
  Check,
  Building2,
  MapPin,
} from 'lucide-react';
import { TeamMember } from '../types/travel';
import { TEAM_MEMBERS } from '../data/blogAndTeamData';

interface MemberProfilePageProps {
  member: TeamMember;
  onBackToAbout: () => void;
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
  onNavigateToContact: () => void;
  onNavigateToMember: (slug: string) => void;
}

export const MemberProfilePage: React.FC<MemberProfilePageProps> = ({
  member,
  onBackToAbout,
  onBackToHome,
  onNavigateToPackages,
  onNavigateToContact,
  onNavigateToMember,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const otherMembers = TEAM_MEMBERS.filter((m) => m.id !== member.id);

  // Custom accent themes based on member
  const getTheme = () => {
    if (member.id === 'ceo') {
      return {
        badgeBg: 'bg-blue-600',
        badgeText: 'FOUNDER & CEO',
        ring: 'ring-blue-500/30',
        border: 'border-blue-500/30',
        accentBg: 'bg-blue-50',
        accentText: 'text-blue-700',
        gradient: 'from-slate-950 via-blue-950 to-slate-900',
        btnBg: 'bg-blue-600 hover:bg-blue-700',
      };
    }
    if (member.id === 'executive-director') {
      return {
        badgeBg: 'bg-emerald-600',
        badgeText: 'EXECUTIVE DIRECTOR',
        ring: 'ring-emerald-500/30',
        border: 'border-emerald-500/30',
        accentBg: 'bg-emerald-50',
        accentText: 'text-emerald-700',
        gradient: 'from-slate-950 via-emerald-950 to-slate-900',
        btnBg: 'bg-emerald-600 hover:bg-emerald-700',
      };
    }
    if (member.id === 'director-of-operations') {
      return {
        badgeBg: 'bg-indigo-600',
        badgeText: 'DIRECTOR OF OPERATIONS',
        ring: 'ring-indigo-500/30',
        border: 'border-indigo-500/30',
        accentBg: 'bg-indigo-50',
        accentText: 'text-indigo-700',
        gradient: 'from-slate-950 via-indigo-950 to-slate-900',
        btnBg: 'bg-indigo-600 hover:bg-indigo-700',
      };
    }
    if (member.id === 'brand-marketing-director') {
      return {
        badgeBg: 'bg-rose-600',
        badgeText: 'BRAND & MARKETING DIRECTOR',
        ring: 'ring-rose-500/30',
        border: 'border-rose-500/30',
        accentBg: 'bg-rose-50',
        accentText: 'text-rose-700',
        gradient: 'from-slate-950 via-rose-950 to-slate-900',
        btnBg: 'bg-rose-600 hover:bg-rose-700',
      };
    }
    return {
      badgeBg: 'bg-purple-600',
      badgeText: 'BRAND MANAGER',
      ring: 'ring-purple-500/30',
      border: 'border-purple-500/30',
      accentBg: 'bg-purple-50',
      accentText: 'text-purple-700',
      gradient: 'from-slate-950 via-purple-950 to-slate-900',
      btnBg: 'bg-purple-600 hover:bg-purple-700',
    };
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
            <button
              onClick={onBackToHome}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              হোম
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <button
              onClick={onBackToAbout}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              আমাদের টিম (About)
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-bold">{member.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="প্রোফাইল লিংক কপি করুন"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'লিংক কপি হয়েছে!' : 'শেয়ার প্রোফাইল'}</span>
            </button>

            <button
              onClick={onBackToAbout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>টিম তালিকায় ফিরুন</span>
            </button>
          </div>
        </div>

        {/* Executive Profile Main Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
          {/* Top Decorative Header Accent */}
          <div className={`bg-gradient-to-r ${theme.gradient} text-white px-6 sm:px-10 py-6 flex flex-wrap items-center justify-between gap-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-sky-300 block">
                  OFFICIAL EXECUTIVE PROFILE
                </span>
                <h1 className="text-lg sm:text-2xl font-black text-white">
                  {member.name}
                </h1>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ঘুরবে ভেরিফায়েড এক্সিকিউটিভ</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Portrait & Direct Contact */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
                <div className="relative group">
                  <div className={`w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ${theme.ring} bg-slate-100`}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Verified Badge */}
                  <div className={`absolute bottom-3 left-3 ${theme.badgeBg} text-white text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50 backdrop-blur-xs whitespace-nowrap`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>{theme.badgeText}</span>
                  </div>
                </div>

                {/* Identity & Role Header */}
                <div className="w-full pt-1 space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {member.name}
                  </h2>
                  
                  {/* Official Role */}
                  <p className={`text-sm sm:text-base font-bold ${theme.accentText}`}>
                    {member.role}
                  </p>

                  {/* Mahim Ibn Khudi Exclusive Website Link: mahims.com/ghurbe */}
                  {member.personalWebsite && (
                    <div className="pt-1.5 pb-1">
                      <a
                        href={member.personalWebsite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold text-sm shadow-xs transition-all hover:scale-102 active:scale-98 group cursor-pointer"
                        title="ভিজিট করুন অফিসিয়াল পোর্টাল"
                      >
                        <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                        <span className="underline underline-offset-4 decoration-emerald-500 font-mono tracking-tight">
                          {member.personalWebsite.label}
                        </span>
                      </a>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 font-semibold flex items-center justify-center lg:justify-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ghurbe Tours & Travels Bangladesh</span>
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি</span>
                    </span>
                  </div>
                </div>

                {/* Direct Action Hub */}
                <div className="w-full space-y-2 pt-3">
                  <a
                    href="https://wa.me/8801911050270?text=Hello%20Ghurbe%20Team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>অফিসিয়াল হোয়াটসঅ্যাপে যোগাযোগ</span>
                  </a>

                  <button
                    onClick={onNavigateToPackages}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>ঘুরবে-এর ট্যুর প্যাকেজ দেখুন</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed Executive Information & Bio */}
              <div className="lg:col-span-8 space-y-6 text-slate-800">
                {/* Official Statement Banner */}
                <div className={`border-l-4 ${theme.accentText} pl-4 sm:pl-5 space-y-1`}>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                    "আমরা ২০২২ থেকে খুব দক্ষতার সাথে কাজ করে আসছি।"
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {member.department} • Ghurbe Leadership
                  </p>
                </div>

                {/* Biography & Vision */}
                <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                  <h4 className="text-xs uppercase font-black text-slate-500 tracking-wider">
                    ব্যক্তিগত পরিচিতি ও কর্মপরিকল্পনা
                  </h4>
                  <p className="font-medium text-slate-800">
                    {member.bio}
                  </p>
                  <p>
                    ঘুরবে (Ghurbe) পরিবারে শুরু থেকেই সততা, সর্বোচ্চ গ্রাহক সন্তুষ্টি এবং কোনো গোপন চার্জ ছাড়া নিরাপদ ভ্রমণের মানদণ্ড নিশ্চিত করতে <strong>{member.name}</strong> নিরলসভাবে তাঁর দায়িত্ব পালন করছেন।
                  </p>
                </div>

                {/* Credentials & Specialties */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>অভিজ্ঞতা ও পদচারণা</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {member.experience}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>বিশেষ দক্ষতা ও বিশেষজ্ঞতা</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {member.specialty}
                    </p>
                  </div>
                </div>

                {/* Core Responsibilities Checklist */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>প্রধান নির্বাহী দায়িত্ব ও অঙ্গীকারসমূহ</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-slate-700">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>২০২২ থেকে ধারাবাহিক বিশ্বস্ত সেবা নিশ্চিতকরণ</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>শতভাগ স্বচ্ছতা ও কোনো লুকানো চার্জহীন প্যাকেজ</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>নারী, শিশু ও কাপলদের সর্বোচ্চ নিরাপত্তা ও সম্মান</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>২৪/৭ সার্বক্ষণিক কাস্টমার কেয়ার ও অন-গ্রাউন্ড মনিটরিং</span>
                    </div>
                  </div>
                </div>

                {/* Mahim Ibn Khudi Special Website Banner */}
                {member.personalWebsite && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border border-emerald-400/30 shadow-lg space-y-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                          EXECUTIVE DIRECTOR OFFICIAL PORTAL
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-white">
                          মাহিম ইবনে খুদি-এর ব্যক্তিগত ও প্রাতিষ্ঠানিক লিঙ্ক
                        </h4>
                      </div>
                      <a
                        href={member.personalWebsite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
                      >
                        <span>{member.personalWebsite.label}</span>
                        <ExternalLink className="w-4 h-4 text-slate-950" />
                      </a>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      মাহিম ইবনে খুদি-এর এক্সিকিউটিভ ডিরেকশন ও ঘুরবে-এর অপারেশনাল আপডেট বিস্তারিত জানতে উপরোক্ত লিঙ্কে সরাসরি ভিজিট করুন।
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Other Executive Members Navigation Island */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 block">
                MEET THE LEADERSHIP
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                অন্যান্য নির্বাহী কর্মকর্তাদের প্রোফাইল
              </h3>
            </div>
            <button
              onClick={onBackToAbout}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              সকল টিম সদস্য দেখুন →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherMembers.map((other) => (
              <a
                key={other.id}
                href={`/${other.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToMember(other.slug);
                }}
                className="group p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex items-center gap-3.5 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-xs group-hover:scale-105 transition-transform bg-slate-200">
                  <img
                    src={other.avatar}
                    alt={other.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 truncate">
                    {other.role.split('(')[0].trim()}
                  </p>
                  <span className="text-[10px] font-bold text-blue-600 mt-1 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>প্রোফাইল দেখুন</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
