import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Check, 
  Copy, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Star, 
  Landmark, 
  Info, 
  Heart,
  ChevronRight,
  Sun,
  Camera,
  Utensils,
  Bus,
  Hotel
} from 'lucide-react';
import { TourPackage } from '../types/travel';
import { POPULAR_PACKAGES } from '../data/packagesData';
import { downloadGhurbeContactCard } from '../utils/contactCard';

interface KuakataPageProps {
  onBackToHome: () => void;
  onBookNow: (pkg: TourPackage) => void;
  onOpenContact: () => void;
}

export const KuakataPage: React.FC<KuakataPageProps> = ({
  onBackToHome,
  onBookNow,
  onOpenContact,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Retrieve Kuakata package
  const kuakataPkg: TourPackage = 
    POPULAR_PACKAGES.find((p) => p.id === 'kuakata-beach' || p.slug === 'kuakata') || 
    POPULAR_PACKAGES[0];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/8801911050270?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 space-y-8 sm:space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>হোমে ফিরে যান</span>
          </button>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>অফিসিয়াল কুয়াকাটা ট্যুর ও পেমেন্ট পেজ</span>
          </span>
        </div>

        {/* 1. Main Brand & Kuakata Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-sky-400/30 shadow-2xl">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>🌿 ঘুরবে ট্যুর অ্যান্ড ট্রাভেল (GHURBE TOUR & TRAVEL)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              সাগরকন্যা কুয়াকাটা ৩ রাত ২ দিন স্পেশাল ট্যুর
            </h1>

            <p className="text-base sm:text-xl text-sky-200 font-semibold flex items-center gap-2">
              <span>আপনার ভ্রমণ, আমাদের আন্তরিকতা।</span>
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 inline" />
            </p>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
              একই সৈকতে রক্তিম সূর্যোদয় ও সূর্যাস্ত দেখার এক অনন্য অনুভূতি! রংপুর, বগুড়া ও গাইবান্ধা পিকআপ সহ ৩ রাত ২ দিনের বিলাসবহুল চেয়ারকোচ বাস যাত্রা, ১ রাত মানসম্মত ৩-তারা সমমানের হোটেল ও ৫ বেলা সুস্বাদু খাবার।
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <span className="text-[10px] text-sky-300 block font-semibold">যাত্রা শুরুর তারিখ</span>
                <span className="text-sm sm:text-base font-black text-white">১২ নভেম্বর ২০২৬</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <span className="text-[10px] text-sky-300 block font-semibold">ট্যুরের সময়কাল</span>
                <span className="text-sm sm:text-base font-black text-white">৩ রাত ২ দিন</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <span className="text-[10px] text-emerald-300 block font-semibold">মেগা অফার মূল্য</span>
                <span className="text-sm sm:text-base font-black text-emerald-300">৩,৫৯৯ ৳ <span className="text-[10px] text-slate-300 font-normal">/জন</span></span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <span className="text-[10px] text-sky-300 block font-semibold">কাপল প্যাকেজ</span>
                <span className="text-sm sm:text-base font-black text-amber-300">৭,৯৯৯ ৳ <span className="text-[10px] text-slate-300 font-normal">/২জন</span></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onBookNow(kuakataPkg)}
                className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-black shadow-lg shadow-emerald-500/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>এখনই বুক করুন (১,০০০৳ অগ্রিম)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <a
                href={getWhatsAppLink('আসসালামু আলাইকুম! ঘুরবে ট্যুর অ্যান্ড ট্রাভেল, আমি কুয়াকাটা ট্যুর প্যাকেজ বুকিং ও পেমেন্ট সম্পর্কে জানতে চাই।')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-black shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: 01911-050270</span>
              </a>

              <a
                href="tel:09658865593"
                className="py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-300" />
                <span>হটলাইন: 09658865593</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Official Booking & Payment Process (User's Exact Specification) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-left">
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>সহজ ও নমনীয় পেমেন্ট পদ্ধতি</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              ✈️ বুকিং ও পেমেন্ট প্রক্রিয়া
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              ঘুরবে ট্যুর অ্যান্ড ট্রাভেল-এর সঙ্গে আপনার ভ্রমণ হোক সহজ, আনন্দময় ও ঝামেলামুক্ত। আপনার সুবিধার কথা বিবেচনা করে আমরা রেখেছি সহজ ও নমনীয় পেমেন্ট ব্যবস্থা। আপনি চাইলে নির্ধারিত নিয়ম অনুযায়ী ধাপে ধাপে পেমেন্ট করতে পারবেন, আবার চাইলে বুকিংয়ের সময়ই সম্পূর্ণ টাকা একবারে পরিশোধ করে আপনার আসন নিশ্চিত করতে পারবেন।
            </p>
          </div>

          {/* The 3 Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border-2 border-emerald-300 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    🟢 ধাপ ১
                  </span>
                  <span className="text-xs font-bold text-emerald-700">প্রাথমিক বুকিং</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">
                  বুকিং নিশ্চিত করতে পরিশোধ করুন:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm font-bold text-slate-800">
                  <li className="flex items-center gap-2 bg-white p-2 rounded-xl border border-emerald-200">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">👤</span>
                    <span>জনপ্রতি: <strong>১,০০০ টাকা</strong></span>
                  </li>
                  <li className="flex items-center gap-2 bg-white p-2 rounded-xl border border-emerald-200">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">👫</span>
                    <span>কাপল (২ জন): <strong>২,০০০ টাকা</strong></span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-200/60">
                আপনার পছন্দের ট্যুরে আসন নিশ্চিত করতে প্রাথমিক বুকিং সম্পন্ন করুন। পেমেন্ট যাচাইয়ের পর আমাদের টিম আপনার বুকিং নিশ্চিত করবে।
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border-2 border-amber-300 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                    🟡 ধাপ ২
                  </span>
                  <span className="text-xs font-bold text-amber-800">পরবর্তী পেমেন্ট</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">
                  ১ সপ্তাহের মধ্যে পরিশোধ করুন:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm font-bold text-slate-800">
                  <li className="flex items-center gap-2 bg-white p-2 rounded-xl border border-amber-200">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xs">👤</span>
                    <span>জনপ্রতি: <strong>১,৫০০ টাকা</strong></span>
                  </li>
                  <li className="flex items-center gap-2 bg-white p-2 rounded-xl border border-amber-200">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center text-xs">👫</span>
                    <span>কাপল (২ জন): <strong>৩,০০০ টাকা</strong></span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-amber-200/60">
                নির্ধারিত সময়ের মধ্যে পরবর্তী পেমেন্ট সম্পন্ন করে আপনার বুকিং প্রক্রিয়া এগিয়ে নিন।
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-blue-50/60 border-2 border-blue-300 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                    🔵 ধাপ ৩
                  </span>
                  <span className="text-xs font-bold text-blue-800">চূড়ান্ত পেমেন্ট</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">
                  ট্যুরের যাত্রা শুরুর দিন:
                </h3>
                <div className="bg-white p-3 rounded-xl border border-blue-200 text-xs sm:text-sm font-bold text-blue-900">
                  বাসে ওঠার সময় অবশিষ্ট টাকা পরিশোধ করুন।
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-blue-200/60">
                এরপর নিশ্চিন্তে উপভোগ করুন ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের সঙ্গে আপনার কাঙ্ক্ষিত ভ্রমণ।
              </p>
            </div>
          </div>

          {/* Full Single Payment Benefit Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                💳 একবারে সম্পূর্ণ পেমেন্টের সুবিধা
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                আপনি যদি চান, তাহলে বুকিংয়ের সময়ই প্যাকেজের সম্পূর্ণ মূল্য একবারে পরিশোধ করতে পারবেন। সে ক্ষেত্রে পরবর্তী সময়ে আর কোনো পেমেন্ট করার প্রয়োজন হবে না। আপনার সুবিধাই আমাদের অগ্রাধিকার। ❤️
              </p>
            </div>
          </div>

          {/* Payment Summary Table */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>💰 পেমেন্টের হিসাব এক নজরে</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-3 px-4 font-black">পেমেন্টের বিবরণ</th>
                    <th className="py-3 px-4 font-black text-right">জনপ্রতি</th>
                    <th className="py-3 px-4 font-black text-right">কাপল (২ জন)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-semibold text-slate-800">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">প্রাথমিক বুকিং</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-black">৳১,০০০</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-black">৳২,০০০</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">১ সপ্তাহের মধ্যে</td>
                    <td className="py-3 px-4 text-right font-mono text-amber-700 font-black">৳১,৫০০</td>
                    <td className="py-3 px-4 text-right font-mono text-amber-700 font-black">৳৩,০০০</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">যাত্রার দিন</td>
                    <td className="py-3 px-4 text-right text-slate-600 font-medium">অবশিষ্ট টাকা</td>
                    <td className="py-3 px-4 text-right text-slate-600 font-medium">অবশিষ্ট টাকা</td>
                  </tr>
                  <tr className="bg-sky-50/80 font-black text-slate-900">
                    <td className="py-3.5 px-4 font-black text-blue-900">প্রথম দুই ধাপে মোট</td>
                    <td className="py-3.5 px-4 text-right font-mono text-blue-900 text-sm font-black">৳২,৫০০</td>
                    <td className="py-3.5 px-4 text-right font-mono text-blue-900 text-sm font-black">৳৫,০০০</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              *উপরের হিসাবটি ধাপে ধাপে পেমেন্টের ক্ষেত্রে প্রযোজ্য। একবারে সম্পূর্ণ পেমেন্ট করলে বুকিংয়ের সময় সংশ্লিষ্ট প্যাকেজের পুরো মূল্য পরিশোধ করতে হবে।*
            </p>
          </div>

          {/* Official Payment Gateways: Bangla QR */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>💳 অফিসিয়াল পেমেন্ট ব্যবস্থা (bKash Bangla QR)</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">ভেরিফাইড</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* bKash Bangla QR & Official Payment Number Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-pink-50 via-white to-pink-50/50 border-2 border-pink-300 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-pink-200 pb-2">
                    <span className="font-black text-sm text-[#E2136E]">bKash (বিকাশ বাংলা কিউআর ও পেমেন্ট নম্বর)</span>
                    <span className="text-[10px] bg-[#E2136E] text-white px-2 py-0.5 rounded-full font-bold">অফিসিয়াল QR</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    বিকাশ অ্যাপে <strong>কিউআর স্ক্যান</strong> করুন অথবা নিচে দেওয়া অফিসিয়াল মার্চেন্ট / পেমেন্ট নম্বরে সরাসরি বুকিং মানি পরিশোধ করুন।
                  </p>
                </div>

                {/* Official bKash Number Box with Copy */}
                <div className="bg-white p-3 rounded-xl border-2 border-pink-200 flex items-center justify-between gap-2 shadow-xs">
                  <div>
                    <span className="text-[10px] font-bold text-pink-700 block">বিকাশ পেমেন্ট / মার্চেন্ট নম্বর:</span>
                    <span className="text-base font-black font-mono text-slate-900 tracking-wider">01711-085960</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('01711085960', 'bkash_kuakata')}
                    className="px-2.5 py-1 bg-[#E2136E] hover:bg-[#c20f5e] text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer active:scale-95 shrink-0"
                  >
                    {copiedKey === 'bkash_kuakata' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>নম্বর কপি</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-pink-200 text-center">
                  <img
                    src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1792223909/WhatsApp_Image_2026-10-17_at_1.54.57_PM.jpg"
                    alt="বিকাশ বাংলা কিউআর কোড"
                    className="w-28 h-auto mx-auto object-contain rounded-md"
                  />
                  <span className="text-[10px] font-bold text-pink-700 block mt-1.5">বিকাশ অ্যাপে বাংলা কিউআর স্ক্যান করুন</span>
                </div>
              </div>

              {/* Assistance & Hotline Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50 via-white to-sky-50/50 border-2 border-blue-200 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                    <span className="font-black text-sm text-blue-900">পেমেন্ট সহায়তা ও যোগাযোগ</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">সার্বক্ষণিক হেল্পলাইন</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    পেমেন্ট সংক্রান্ত যেকোনো প্রশ্ন, ব্যাংক পেমেন্ট বা বিকল্প মাধ্যমের জন্য সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপ বা হটলাইনে যোগাযোগ করুন।
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href={getWhatsAppLink('আসসালামু আলাইকুম! ঘুরবে ট্যুর অ্যান্ড ট্রাভেল, আমি কুয়াকাটা প্যাকেজের পেমেন্ট ও বুকিং বিষয়ে তথ্য জানতে চাই।')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp: 01911-050270</span>
                  </a>

                  <a
                    href="tel:09658865593"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>হটলাইন: 09658865593</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Important Guidelines (User's Exact Specification) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>📌 গুরুত্বপূর্ণ নির্দেশনা</span>
            </h3>
            <ol className="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal list-inside font-medium leading-relaxed">
              <li>বুকিংয়ের আগে ট্যুরের তারিখ, প্যাকেজ মূল্য ও অন্তর্ভুক্ত সুবিধাগুলো ভালোভাবে জেনে নিন।</li>
              <li>পেমেন্ট সম্পন্ন করার পর লেনদেনের প্রমাণ সংরক্ষণ করুন এবং বুকিং কনফার্মেশন সংগ্রহ করুন।</li>
              <li>বুকিং বাতিল, অর্থ ফেরত বা অন্যান্য পরিবর্তনের ক্ষেত্রে প্রযোজ্য নিয়মাবলি বুকিংয়ের আগে জেনে নিন।</li>
              <li>কোনো বিশেষ প্যাকেজে পেমেন্টের নিয়ম ভিন্ন হলে তা বুকিংয়ের সময় জানিয়ে দেওয়া হবে।</li>
            </ol>
          </div>

          {/* Why Travel With Us (User's Exact Specification) */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>❤️ আমাদের সঙ্গে ভ্রমণ কেন?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              আপনার আনন্দ, নিরাপত্তা ও সুন্দর অভিজ্ঞতাকে গুরুত্ব দিয়ে ঘুরবে ট্যুর অ্যান্ড ট্রাভেল প্রতিটি ভ্রমণকে স্মরণীয় করে তুলতে আন্তরিকভাবে কাজ করে। আপনার আস্থা আমাদের অনুপ্রেরণা, আর আপনার আনন্দই আমাদের সার্থকতা।
            </p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
              <span className="text-sm font-black text-amber-300">
                🇧🇩 চলুন, একসঙ্গে ঘুরে দেখি বাংলাদেশ!
              </span>
              <span className="text-xs text-sky-200 font-mono">
                🌐 Website: <a href="https://ghurbe.com" className="underline hover:text-white">https://ghurbe.com</a>
              </span>
            </div>
            <p className="text-[11px] text-slate-300 italic pt-1">
              *ঘুরবে ট্যুর অ্যান্ড ট্রাভেল — ভ্রমণ হোক আনন্দের, প্রতিটি মুহূর্ত হোক স্মরণীয়। ❤️*
            </p>
          </div>
        </div>

        {/* 3. Detailed Kuakata Package Tour Features (What's included, Sightseeing, Itinerary) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-left">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">ট্যুরের পুর্ণাঙ্গ বিবরণ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              🌊 কুয়াকাটা প্যাকেজে যা যা থাকছে
            </h2>
          </div>

          {/* Inclusions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
              <Bus className="w-5 h-5 text-blue-600 mb-1" />
              <h4 className="text-sm font-black text-slate-900">আরামদায়ক যাতায়াত</h4>
              <p className="text-xs text-slate-600">রংপুর, বগুড়া ও গাইবান্ধা থেকে নন-এসি চেয়ারকোচ বাসে যাওয়া-আসা (২ রাত বাস জার্নি)।</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <Hotel className="w-5 h-5 text-emerald-600 mb-1" />
              <h4 className="text-sm font-black text-slate-900">নিরাপদ হোটেল রাত্রিযাপন</h4>
              <p className="text-xs text-slate-600">মানসম্মত হোটেলে এক রাত (১ রাত) পরিষ্কার ও নিরাপদ থাকার সুব্যবস্থা।</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
              <Utensils className="w-5 h-5 text-amber-600 mb-1" />
              <h4 className="text-sm font-black text-slate-900">মোট ৫ বেলা সুস্বাদু খাবার</h4>
              <p className="text-xs text-slate-600">সকালের নাস্তা, দুপুরের খাবার ও রাতের ডিনার সহ স্বাস্থ্যসম্মত স্থানীয় খাবার।</p>
            </div>
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 space-y-1">
              <Sun className="w-5 h-5 text-teal-600 mb-1" />
              <h4 className="text-sm font-black text-slate-900">সূর্যোদয় ও সূর্যাস্ত</h4>
              <p className="text-xs text-slate-600">একই সৈকতে রক্তিম সূর্যোদয় ও গোধূলিলগ্নে সূর্যাস্ত দেখার অপরূপ অভিজ্ঞতা।</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 space-y-1">
              <Camera className="w-5 h-5 text-purple-600 mb-1" />
              <h4 className="text-sm font-black text-slate-900">১৬টি আকর্ষণীয় স্পট</h4>
              <p className="text-xs text-slate-600">লেবুর চর, ঝাউবন, লাল কাঁকড়ার চর, ফাতরার বন, ঝিনুক বিচ ও রাখাইন পল্লী।</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
              <ShieldCheck className="w-5 h-5 text-rose-600 mb-1" />
              <h4 className="text-sm font-black text-slate-900">সার্বক্ষণিক অভিজ্ঞ গাইড</h4>
              <p className="text-xs text-slate-600">ঘুরবে-এর আন্তরিক ও দায়িত্বশীল টিম ভ্রমণ জুড়ে সার্বক্ষণিক সঙ্গে থাকবে।</p>
            </div>
          </div>

          {/* Sightseeing Spot Tags */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-black text-slate-900">
              📍 কুয়াকাটার আকর্ষণীয় দর্শনীয় স্থানসমূহ
            </h3>
            <div className="flex flex-wrap gap-2">
              {kuakataPkg.sightseeingSpots?.map((spot, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                >
                  {spot}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Night 2 Day Itinerary */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              🗓️ ৩ রাত ২ দিনের পূর্ণাঙ্গ ভ্রমণসূচি
            </h3>

            <div className="space-y-3">
              {kuakataPkg.itinerary?.map((item) => (
                <div
                  key={item.day}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                      ০{item.day}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                    {item.description}
                  </p>
                  {item.meals && (
                    <div className="pl-9 pt-1 flex flex-wrap gap-1.5">
                      {item.meals.map((meal, idx) => (
                        <span key={idx} className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-md">
                          🍽️ {meal}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Final CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl">
            <div>
              <h4 className="text-lg sm:text-xl font-black">
                কুয়াকাটা ট্যুরের আসন নিশ্চিত করতে প্রস্তুত?
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                মাত্র ১,০০০ টাকা প্রাথমিক বুকিং মানি দিয়ে আজই আপনার সিট নিশ্চিত করুন।
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onBookNow(kuakataPkg)}
                className="py-3 px-6 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 cursor-pointer"
              >
                বুকিং সম্পন্ন করুন →
              </button>
              <button
                onClick={downloadGhurbeContactCard}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
                title="Ghurbe Tours & Travel নাম ফোনে সেভ করুন"
              >
                নাম সেভ করুন (.vcf)
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
