import React from 'react';
import { WhyChooseUs } from './WhyChooseUs';
import { TestimonialsSection } from './TestimonialsSection';
import { ArrowLeft, ShieldCheck, Bus, Utensils, HeartHandshake, PhoneCall, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface WhyUsPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
  onNavigateToContact: () => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
  onNavigateToContact,
}) => {
  const pickupPoints = [
    { city: 'রংপুর', point: 'রংপুর কেন্দ্রীয় বাস টার্মিনাল / মেডিকেল মোড়', time: 'রাত ৮:০০ - ৯:০০' },
    { city: 'গাইবান্ধা', point: 'গাইবান্ধা বাস স্ট্যান্ড / পলাশবাড়ী পয়েন্ট', time: 'রাত ৯:৩০ - ১০:১৫' },
    { city: 'বগুড়া', point: 'বগুড়া চারমাথা বাস টার্মিনাল / বনানী মোড়', time: 'রাত ১১:০০ - ১১:৪৫' },
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>নিরাপত্তা, স্বাচ্ছন্দ্য ও অভিজ্ঞতা</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              কেন ঘুরবে আপনার সেরা ভ্রমণ সঙ্গী?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              আমরা শুধু ট্যুর করাই না, তৈরি করি আজীবনের সুখস্মৃতি। উত্তরবঙ্গ থেকে আরামদায়ক যাতায়াত, মানসম্মত হোটেল ও সার্বক্ষণিক গাইড সেবায় আমরা অগ্রগামী।
            </p>
          </div>
        </div>

        {/* Pickup Points Highlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <Bus className="w-5 h-5 text-sky-500" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              সুনির্দিষ্ট পিকআপ ও ড্রপ পয়েন্ট
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            রংপুর, গাইবান্ধা ও বগুড়ার যাত্রীদের জন্য আমাদের বাস সরাসরি নির্দিষ্ট স্থানে পৌঁছায়। যাত্রাপথে কোনো বাড়তি ঝামেলা নেই।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {pickupPoints.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-blue-950">{item.city}</span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{item.point}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Advantages Component */}
      <WhyChooseUs />

      {/* Traveler Reviews & Testimonials */}
      <TestimonialsSection />

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">আপনার কোনো প্রশ্ন বা পরামর্শ আছে?</h3>
            <p className="text-xs sm:text-sm text-slate-400">আমাদের কাস্টমার কেয়ার টিম সবসময় আপনার সহায়তায় প্রস্তুত।</p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            যোগাযোগ পেজে যান →
          </button>
        </div>
      </div>
    </div>
  );
};
