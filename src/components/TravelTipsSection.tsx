import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Sparkles,
  Luggage,
  ShieldCheck,
  Compass,
  Sun,
  Mountain,
  Waves,
  Briefcase,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Smartphone,
  CreditCard,
  FileText,
  HeartPulse,
  Leaf
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  category: 'docs' | 'clothes' | 'health' | 'gadgets' | 'safety';
  importance: 'essential' | 'recommended' | 'optional';
  hint?: string;
}

interface DestinationTips {
  id: string;
  title: string;
  tag: string;
  icon: typeof Luggage;
  weatherAdvice: string;
  items: ChecklistItem[];
}

const DESTINATION_TIPS: DestinationTips[] = [
  {
    id: 'beach',
    title: 'সমুদ্র ও সৈকত ট্যুর (কুয়াকাটা / কক্সবাজার)',
    tag: 'সৈকত ভ্রমণ',
    icon: Waves,
    weatherAdvice: 'রোদের উত্তাপ ও নোনা বাতাসের জন্য প্রস্তুত থাকুন। সকাল ও বিকালে সৈকত হাঁটা সবচেয়ে আরামদায়ক।',
    items: [
      { id: 'b1', name: 'জাতীয় পরিচয়পত্র (NID) বা জন্ম সনদের কপি', category: 'docs', importance: 'essential', hint: 'হোটেল চেক-ইনের জন্য বাধ্যতামূলক' },
      { id: 'b2', name: 'পর্যাপ্ত নগদ ক্যাশ টাকা (বিকাশ/নগদ ব্যালেন্সসহ)', category: 'docs', importance: 'essential', hint: 'সৈকতের লোকাল দোকানগুলোতে কার্ড চলে না' },
      { id: 'b3', name: 'ওয়াটারপ্রুফ মোবাইল পাউচ ব্যাগ', category: 'gadgets', importance: 'essential', hint: 'সমুদ্রের জলে ছবি তোলার সময় ফোন সুরক্ষিত রাখবে' },
      { id: 'b4', name: 'সানগ্লাস (UV প্রটেকশনযুক্ত) ও সান হ্যাট', category: 'clothes', importance: 'essential' },
      { id: 'b5', name: 'সানস্ক্রিন লোশন (SPF 50+)', category: 'health', importance: 'essential', hint: 'ত্বক পোড়া থেকে রক্ষা করতে' },
      { id: 'b6', name: 'গ্রিপযুক্ত ওয়াটারপ্রুফ স্যান্ডেল/বিচ স্লিপার', category: 'clothes', importance: 'essential' },
      { id: 'b7', name: 'হালকা সুতি বা কুইক-ড্রাই পোশাক (২-৩ জোড়া)', category: 'clothes', importance: 'essential' },
      { id: 'b8', name: 'এক্সট্রা পলিথিন/জিপলক ব্যাগ (ভেজা কাপড়ের জন্য)', category: 'safety', importance: 'recommended' },
      { id: 'b9', name: 'পাওয়ার ব্যাংক (১০,০০০ - ২০,০০০ mAh)', category: 'gadgets', importance: 'essential' },
      { id: 'b10', name: 'ফার্স্ট এইড ও স্যালাইন (ওআরএস, প্যারাসিটামল, এন্টাসিড)', category: 'health', importance: 'essential' },
      { id: 'b11', name: 'ছোট ফ্লাস্ক বা পানির বোতল', category: 'safety', importance: 'recommended' },
    ],
  },
  {
    id: 'hills',
    title: 'পাহাড় ও হাইকিং ট্যুর (সাজেক ভ্যালি / বান্দরবান)',
    tag: 'পাহাড়ি অভিযান',
    icon: Mountain,
    weatherAdvice: 'পাহাড়ি আঁকাবাঁকা রাস্তা ও উচ্চতার কারণে সকালে-রাতে মিষ্টি ঠান্ডা থাকে। মোশন সিকনেসের প্রস্তুতি রাখুন।',
    items: [
      { id: 'h1', name: 'জাতীয় পরিচয়পত্র (NID) ৩ কপি ফটোকপি', category: 'docs', importance: 'essential', hint: 'সেনাবাহিনীর চেকপোস্টে জমা ও এন্ট্রির জন্য দরকার' },
      { id: 'h2', name: 'গ্রিপযুক্ত ট্র্যাকিং শুজ বা ভালো কেডস', category: 'clothes', importance: 'essential', hint: 'কংলাক পাহাড় বা পাহাড়ি চড়াই-উতরাইয়ের জন্য অত্যন্ত জরুরি' },
      { id: 'h3', name: 'মোশন সিকনেস বা বমির ওষুধ (ট্যুর শুরুর ১ ঘণ্টা আগে সেব্য)', category: 'health', importance: 'essential', hint: 'চান্দের গাড়ি ও পাহাড়ি বাঁকে বমি প্রতিরোধে' },
      { id: 'h4', name: 'মসকুইটো রিপেলেন্ট / ওডোমস ক্রিম', category: 'health', importance: 'essential', hint: 'পাহাড়ি মশা ও পোকা থেকে সুরক্ষায়' },
      { id: 'h5', name: 'পাওয়ার ব্যাংক ও অতিরিক্ত চার্জার কেবল', category: 'gadgets', importance: 'essential', hint: 'সাজেকে সোলার ও জেনারেটরের নির্দিষ্ট সময়ে বিদ্যুৎ থাকে' },
      { id: 'h6', name: 'উইন্ডব্রেকার বা হালকা জ্যাকেট/শাল', category: 'clothes', importance: 'essential', hint: 'সকাল ও রাতে পাহাড়ে ঠান্ডা বাতাস বয়' },
      { id: 'h7', name: 'ছোট ব্যাকপ্যাক / ডে-প্যাক (মূল ব্যাগের বাইরে)', category: 'safety', importance: 'recommended', hint: 'চান্দের গাড়িতে হালকা প্রয়োজনীয় জিনিস বহনের জন্য' },
      { id: 'h8', name: 'টর্চলাইট বা হেডল্যাম্প', category: 'gadgets', importance: 'recommended' },
      { id: 'h9', name: 'হ্যান্ড স্যানিটাইজার ও ওয়েট ওয়াইপস', category: 'health', importance: 'recommended' },
      { id: 'h10', name: 'পর্যাপ্ত ক্যাশ টাকা (সাজেকে কোনো এটিএম বুথ নেই)', category: 'docs', importance: 'essential' },
    ],
  },
  {
    id: 'haor',
    title: 'হাওর ও জলযাত্রা (টাঙ্গুয়ার হাওর / নীলাদ্রি)',
    tag: 'জল ভ্রমণ',
    icon: Compass,
    weatherAdvice: 'হাওরের বিশাল জলরাশির বুকে টানা নৌভ্রমণ। ওয়াটারপ্রুফ ব্যাগের ব্যবহার সর্বোচ্চ গুরুত্ব দিন।',
    items: [
      { id: 'w1', name: 'সম্পূর্ণ ওয়াটারপ্রুফ ড্রাই ব্যাগ বা পলি-লাইনার', category: 'safety', importance: 'essential', hint: 'নৌকার জল ও বৃষ্টি থেকে মূল্যবান গ্যাজেট বাঁচাতে' },
      { id: 'w2', name: 'নিজের সাইজের লাইফ জ্যাকেট (যদি নিজস্ব থাকে)', category: 'safety', importance: 'recommended', hint: 'যদিও আমাদের বোটেই পর্যাপ্ত সরবরাহ থাকে' },
      { id: 'w3', name: 'অ্যান্টি-স্লিপ রাবার স্যান্ডেল', category: 'clothes', importance: 'essential', hint: 'নৌকার ভেজা পাটাতনে পা পিছলে যাওয়া ঠেকাতে' },
      { id: 'w4', name: 'সানস্ক্রিন ও বড় সান হ্যাট', category: 'health', importance: 'essential', hint: 'খোলা হাওরে একটানা রোদের তীব্রতা থেকে বাঁচতে' },
      { id: 'w5', name: 'ওআরএস স্যালাইন ও ইলেকট্রোলাইট ড্রিংক', category: 'health', importance: 'essential', hint: 'ডিহাইড্রেশন প্রতিরোধে' },
      { id: 'w6', name: 'বড় ক্ষমতার পাওয়ার ব্যাংক (বোট চার্জিং সীমাবদ্ধ হতে পারে)', category: 'gadgets', importance: 'essential' },
      { id: 'w7', name: 'কুইক ড্রাই টি-শার্ট ও হাফ প্যান্ট/ট্র্যাক প্যান্ট', category: 'clothes', importance: 'essential' },
      { id: 'w8', name: 'ব্যক্তিগত তোয়ালে ও সাবান/শ্যাম্পু মিনি প্যাক', category: 'health', importance: 'essential' },
      { id: 'w9', name: 'পানিরোধক ওয়াচ বা সাধারণ হাতঘড়ি', category: 'gadgets', importance: 'optional' },
    ],
  },
  {
    id: 'general',
    title: 'অল-রাউন্ড ট্রাভেলার এসেনশিয়ালস (যেকোনো ট্যুরের জন্য)',
    tag: 'মৌলিক কিট',
    icon: Luggage,
    weatherAdvice: 'বাংলাদেশের অভ্যন্তরীণ যেকোনো ট্যুরে এই চেকলিস্ট আপনার ভ্রমণকে শতভাগ চিন্তামুক্ত রাখবে।',
    items: [
      { id: 'g1', name: 'ঘুরবে বুকিং ডিজিটাল ভাউচার ও ট্রিপ ডিটেইলস সেভ করা', category: 'docs', importance: 'essential', hint: 'অফলাইন স্ক্রিনশট বা পিডিএফ ফোনে রাখুন' },
      { id: 'g2', name: 'জরুরি প্রেসক্রিপশন ও নিয়মিত সেবনীয় ওষুধ', category: 'health', importance: 'essential', hint: 'অন্তত ৩ দিনের অতিরিক্ত ওষুধ সাথে রাখুন' },
      { id: 'g3', name: 'মাল্টিপ্লাগ বা ৩-পিন অ্যাডাপ্টার', category: 'gadgets', importance: 'recommended', hint: 'হোটেলে এক পয়েন্টে একাধিক ফোন চার্জ করতে' },
      { id: 'g4', name: 'পরিবেশবান্ধব কাপড়ের শপিং ব্যাগ', category: 'safety', importance: 'recommended', hint: 'প্লাস্টিক বর্জ্য ফেলা রোধ করতে' },
      { id: 'g5', name: 'পেনকিলার ও পেটের পীড়ার অ্যান্টিবায়োটিক/ওষুধ', category: 'health', importance: 'essential' },
      { id: 'g6', name: 'টুথব্রাশ, পেস্ট ও পার্সোনাল টয়লেট্রিজ কিট', category: 'health', importance: 'essential' },
      { id: 'g7', name: 'জরুরি হেল্পলাইন নম্বর নোট রাখা (01980297939)', category: 'docs', importance: 'essential', hint: 'ঘুরবে ২৪/৭ কাস্টমার সাপোর্ট হটলাইন' },
    ],
  },
];

const ADVICE_ARTICLES = [
  {
    icon: AlertCircle,
    title: 'পাহাড়ি আঁকাবাঁকা পথে মোশন সিকনেস কাটানোর ৩টি কৌশল',
    text: 'চান্দের গাড়ি বা পাহাড়ি বাসে ওঠার অন্তত ৩০-৪৫ মিনিট আগে চিকিৎসকের পরামর্শ অনুযায়ী বমির ট্যাবলেট সেবন করুন। জার্নির সময় খালি পেটে থাকবেন না, তবে ভারী তৈলাক্ত খাবারও পরিহার করুন। গাড়ির জানালার বাইরের দূরের দিগন্তে তাকিয়ে থাকলে মাথা ঘোরা অনেক কমে যায়।',
  },
  {
    icon: CreditCard,
    title: 'রিমোট পর্যটন এলাকায় ক্যাশ বনাম অনলাইন পেমেন্ট সুরক্ষা',
    text: 'সাজেক ভ্যালি, নিঝুম দ্বীপ কিংবা বান্দরবানের দুর্গম পয়েন্টে কোনো এটিএম বুথ থাকে না এবং মাঝেমধ্যে মোবাইল নেটওয়ার্ক বিভ্রাটে অনলাইন পেমেন্ট ব্যাহত হতে পারে। তাই ট্রিপে ন্যূনতম ৩,০০০-৫,০০০ টাকা নগদ ক্যাশ আলাদা সিক্রেট পকেটে রাখা বুদ্ধিমানের কাজ।',
  },
  {
    icon: Leaf,
    title: 'দায়িত্বশীল পর্যটক হোন: নো-প্লাস্টিক ও নো-ওয়েস্ট ক্যাম্পেইন',
    text: 'আমাদের সুন্দর বাংলা ও তার প্রকৃতিকে বাঁচিয়ে রাখা আমাদেরই দায়িত্ব। যেখানে-সেখানে চিপসের প্যাকেট বা ওয়ান-টাইম প্লাস্টিক পানির বোতল না ফেলে ব্যাগের এক কোণায় রেখে দিন এবং নির্দিষ্ট ডাস্টবিনে ফেলুন। স্থানীয় আদিবাসী সংস্কৃতি ও জীবনাচরণকে সম্মান প্রদর্শন করুন।',
  },
  {
    icon: HeartPulse,
    title: 'ভ্রমণকালীন ট্রাভেলার্স ফার্স্ট এইড কিট গাইড',
    text: 'প্রতিটি ট্রাভেলার ব্যাগে আবশ্যকীয় ৫টি আইটেম: প্যারাসিটামল (জ্বর-ব্যথা), ওমেপ্রাজল/এন্টাসিড (গ্যাস ও হজম সমস্যা), ডমপেরিডন (বমি ভাব), ওআরএস স্যালাইন ও অ্যান্টিসেপ্টিক মলম/ব্যান্ড-এইড। যেকোনো স্বাস্থ্যগত জরুরি প্রয়োজনে ঘুরবে টিম ফিল্ড সহায়তা দেয়।',
  },
];

interface TravelTipsSectionProps {
  onNavigateToPackages?: () => void;
}

export const TravelTipsSection: React.FC<TravelTipsSectionProps> = ({ onNavigateToPackages }) => {
  const [activeTab, setActiveTab] = useState<string>('beach');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const currentTabGroup = DESTINATION_TIPS.find((t) => t.id === activeTab) || DESTINATION_TIPS[0];
  const items = currentTabGroup.items;

  // Calculate Progress
  const totalCount = items.length;
  const completedCount = items.filter((item) => checkedItems[item.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    const next: Record<string, boolean> = { ...checkedItems };
    items.forEach((item) => {
      next[item.id] = true;
    });
    setCheckedItems(next);
  };

  const handleReset = () => {
    const next: Record<string, boolean> = { ...checkedItems };
    items.forEach((item) => {
      delete next[item.id];
    });
    setCheckedItems(next);
  };

  const handleCopyList = () => {
    const listText = `📋 ঘুরবে ট্রাভেল প্যাকিং চেকলিস্ট: ${currentTabGroup.title}\n\n` +
      items.map((it, idx) => `${checkedItems[it.id] ? '✅' : '⬜'} ${idx + 1}. ${it.name}${it.hint ? ` (${it.hint})` : ''}`).join('\n') +
      `\n\nব্যাগ গোছানো সম্পন্ন: ${progressPercent}%\nঘুরবে - ভ্রমণ হোক সহজ ও নিরাপদ | হটলাইন: 01980297939 | https://ghurbe.com`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(listText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <section
      id="travel-tips-section"
      className="space-y-8 pt-8 border-t border-slate-200/90"
      aria-label="ভ্রমণ টিপস ও প্যাকিং চেকলিস্ট"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <Luggage className="w-3.5 h-3.5 text-blue-600" />
            <span>স্মার্ট ট্রাভেলার প্রস্তুতি হাব</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ট্যুর প্যাকিং লিস্ট ও ভ্রমণ প্রস্তুতি নির্দেশিকা
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            কুয়াকাটা, সাজেক কিংবা টাঙ্গুয়ার হাওরে বের হওয়ার আগে প্রয়োজনীয় জিনিসপত্র গুছিয়ে নিন। আমাদের ইন্টারঅ্যাক্টিভ চেকলিস্টে টিক দিয়ে নিশ্চিত করুন কোনো জরুরি আইটেম যেন বাদ না পড়ে।
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyList}
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 shadow-xs transition-all active:scale-95 cursor-pointer"
            title="চেকলিস্ট কপি করুন"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-600" />
                <span>লিস্ট কপি করুন</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-300 shadow-xs transition-all active:scale-95 cursor-pointer"
            title="সব আনচেক করুন"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>রিসেট</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Destination Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {DESTINATION_TIPS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`block text-[10px] uppercase font-bold tracking-wider truncate ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {tab.tag}
                  </span>
                  <span className="block text-xs sm:text-sm font-bold truncate">
                    {tab.title.split(' (')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Context Strip & Live Progress */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50/60 border border-sky-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-900">{currentTabGroup.title}</span>
              <span className="text-[10px] font-bold bg-white text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                {items.length} টি আবশ্যকীয় আইটেম
              </span>
            </div>
            <p className="text-xs text-slate-600">
              💡 {currentTabGroup.weatherAdvice}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 shrink-0 bg-white px-3.5 py-2 rounded-xl border border-sky-200">
            <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-slate-800">
                {completedCount}/{totalCount}
              </span>
              <span className="text-[10px] text-slate-500 ml-1 font-semibold">({progressPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Interactive Checklist Items */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              আইটেম নির্বাচন করুন (ক্লিক করে টিক দিন)
            </span>
            <button
              onClick={handleSelectAll}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              সবগুলো সম্পন্ন করুন
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {items.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300/80 text-emerald-950'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 focus:outline-none"
                    aria-label={isChecked ? 'Uncheck' : 'Check'}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-semibold leading-snug ${
                        isChecked ? 'line-through text-slate-500' : 'text-slate-800'
                      }`}
                    >
                      {item.name}
                    </p>
                    {item.hint && (
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                        {item.hint}
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider ${
                      item.importance === 'essential'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : item.importance === 'recommended'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.importance === 'essential' ? 'জরুরি' : 'প্রয়োজনীয়'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Milestone Card */}
        {progressPercent === 100 && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white flex items-center justify-between gap-3 animate-fade-in shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base">সাবাশ! আপনার ট্যুর ব্যাগ প্রস্তুত!</h4>
                <p className="text-xs text-emerald-100">
                  জরুরি সমস্ত জিনিসপত্র গুছিয়ে ফেলেছেন। এবার আনন্দময় ও নিরাপদ ভ্রমণের পালা।
                </p>
              </div>
            </div>

            {onNavigateToPackages && (
              <button
                onClick={onNavigateToPackages}
                className="py-2 px-4 rounded-xl bg-white text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shrink-0 cursor-pointer shadow-xs"
              >
                ট্যুর বুক করুন
              </button>
            )}
          </div>
        )}
      </div>

      {/* SEO & Knowledge Cards: Essential Travel Advice Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-base sm:text-xl font-bold text-slate-900">
            বিশেষজ্ঞ ভ্রমণ উপদেশ ও নিরাপত্তা পরামর্শ (Travel Advice & Best Practices)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADVICE_ARTICLES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                    {adv.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                  {adv.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured SEO Schema (JSON-LD) for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'বাংলাদেশের প্রধান পর্যটন কেন্দ্র ভ্রমণের প্যাকিং গাইড ও চেকলিস্ট',
            description: 'কুয়াকাটা, সাজেক ভ্যালি ও টাঙ্গুয়ার হাওর ভ্রমণের জন্য প্রয়োজনীয় প্যাকিং লিস্ট, ওষুধ, ডকুমেন্টস ও নিরাপত্তা নির্দেশিকা।',
            step: items.slice(0, 6).map((item, idx) => ({
              '@type': 'HowToStep',
              position: idx + 1,
              name: item.name,
              text: item.hint || item.name,
            })),
          }),
        }}
      />
    </section>
  );
};
