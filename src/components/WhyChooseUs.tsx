import React from 'react';
import { ShieldCheck, HeartHandshake, BedDouble, Headphones, Clock, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: HeartHandshake,
      title: 'অভিজ্ঞ ও বন্ধুসুলভ ট্যুর হোস্ট',
      desc: 'প্রতিটি ট্যুরেই থাকেন দক্ষ ও স্থানীয় সংস্কৃতি পরিচিত ট্যুর হোস্ট, যিনি আপনার নিরাপত্তা ও স্বাচ্ছন্দ্য নিশ্চিত করেন।',
    },
    {
      icon: BedDouble,
      title: 'প্রিমিয়াম রিসোর্ট ও হোটেল সুবিধা',
      desc: 'পরিবার ও কাপলদের জন্য সেরা মানের পরিচ্ছন্ন ও মানসম্মত আবাসন ব্যবস্থা, কোনো আপস নেই আরামের ক্ষেত্রে।',
    },
    {
      icon: ShieldCheck,
      title: 'শতভাগ স্বচ্ছতা ও কোনো গোপন খরচ নেই',
      desc: 'যা দেখবেন তাই পাবেন। প্যাকেজে উল্লেখিত খাবারের মেনু, গাড়ি ও টিকিটের কোনো হিডেন চার্জ নেওয়া হয় না।',
    },
    {
      icon: Headphones,
      title: '২৪/৭ সার্বক্ষণিক কাস্টমার সহায়তা',
      desc: 'ট্রিপের বুকিং শুরু থেকে বাড়ি ফেরা পর্যন্ত যেকোনো প্রয়োজনে আমাদের নিবেদিত টিম তাৎক্ষণিক সেবা দেয়।',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>আমাদের অঙ্গীকার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            কেন ঘুরবে বেছে নেবেন?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            আমরা শুধু পর্যটক নিয়ে যাই না, বরং উপহার দিই আজীবন মনে রাখার মতো এক রূপকথার ভ্রমণ স্মৃতি
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col group hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quantified trust metrics strip */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">১৫,০০০+</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">সন্তুষ্ট পর্যটক</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">৪৫০+</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">সফল ট্যুর পরিচালিত</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 tabular-nums">৪.৯ ★</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">গড় গ্রাহক রেটিং</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">১০০%</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">নিরাপত্তা নিশ্চয়তা</p>
          </div>
        </div>
      </div>
    </section>
  );
};
