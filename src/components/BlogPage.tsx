import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, User, Calendar, MapPin, Tag, ChevronRight, Share2, Sparkles, Compass, Lightbulb, CheckCircle2, Luggage } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogAndTeamData';
import { BlogPost } from '../types/travel';
import { TravelTipsSection } from './TravelTipsSection';

interface BlogPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (
      window.location.hash === '#travel-tips' ||
      window.location.hash === '#tips' ||
      window.location.hash === '#packing'
    ) {
      setTimeout(() => {
        const el = document.getElementById('travel-tips-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, []);

  const categories = [
    { id: 'all', label: 'সকল ভ্রমণ গাইড' },
    { id: 'সমুদ্র ও সৈকত', label: 'সমুদ্র ও সৈকত (কুয়াকাটা, সেন্টমার্টিন)' },
    { id: 'পাহাড় ও মেঘ', label: 'পাহাড় ও মেঘ (সাজেক)' },
    { id: 'হাওর ও জলপ্রপাত', label: 'হাওর ও জলপ্রপাত (টাঙ্গুয়ার)' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const scrollToTips = () => {
    const el = document.getElementById('travel-tips-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sky-dots py-6 sm:py-10 space-y-8 sm:space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => {
              if (selectedPost) setSelectedPost(null);
              else onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>{selectedPost ? 'সকল ব্লগে ফিরে যান' : 'হোমে ফিরে যান'}</span>
          </button>

          <span className="text-xs font-bold text-blue-800 bg-blue-100/90 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>ঘুরবে অফিসিয়াল ট্রাভেল ব্লগ</span>
          </span>
        </div>

        {/* DETAILED BLOG VIEW */}
        {selectedPost ? (
          <article className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl max-w-4xl mx-auto animate-fade-in">
            {/* Cover Banner */}
            <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-slate-900">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white space-y-2">
                <span className="text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  {selectedPost.category}
                </span>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-slate-300 pt-1 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedPost.author} ({selectedPost.authorRole})</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedPost.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedPost.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6 sm:p-10 space-y-6 text-slate-800">
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-sm font-medium text-slate-800 leading-relaxed">
                💡 <strong>সংক্ষিপ্ত সারসংক্ষেপ:</strong> {selectedPost.summary}
              </div>

              {/* Main Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                {selectedPost.content.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Travel Tips Box */}
              <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span>ভ্রমণকালীন গুরুত্বপূর্ণ টিপস ও সতর্কতা</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedPost.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block mb-1">ভ্রমণের উপযুক্ত সময়:</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{selectedPost.bestTimeToVisit}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block mb-1">বাজেট গাইডলাইন:</span>
                  <p className="text-xs sm:text-sm font-bold text-blue-700">{selectedPost.budgetGuide}</p>
                </div>
              </div>

              {/* Author Bio Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <img
                  src={selectedPost.authorAvatar}
                  alt={selectedPost.author}
                  className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedPost.author}</h4>
                  <p className="text-xs text-blue-700 font-semibold">{selectedPost.authorRole}</p>
                  <p className="text-xs text-slate-500 mt-0.5">ঘুরবে-এর অভিজ্ঞ ট্রাভেলার ও কন্টেন্ট টিম</p>
                </div>
              </div>

              {/* Packing Tips Shortcut for this Destination */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Luggage className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{selectedPost.destination} ভ্রমণের জন্য কী কী প্যাক করবেন?</h4>
                    <p className="text-xs text-slate-600">আমাদের ইন্টারঅ্যাক্টিভ প্যাকিং লিস্ট ও চেকলিস্ট দেখে ব্যাগ গুছিয়ে নিন।</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    setTimeout(() => {
                      const el = document.getElementById('travel-tips-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="py-2 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  প্যাকিং চেকলিস্ট দেখুন
                </button>
              </div>

              {/* CTA to Book Tour */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-600 text-white text-center space-y-3">
                <h3 className="text-lg font-black">{selectedPost.destination} ভ্রমণে যেতে চান?</h3>
                <p className="text-xs sm:text-sm text-blue-100">
                  নিরাপদ ও আনন্দময় প্যাকেজে মাত্র ১,০০০৳ অগ্রিম দিয়ে আপনার আসন নিশ্চিত করুন।
                </p>
                <button
                  onClick={onNavigateToPackages}
                  className="py-2.5 px-6 rounded-xl bg-white text-blue-800 font-black text-xs sm:text-sm hover:bg-slate-100 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  প্যাকেজসমূহ দেখুন
                </button>
              </div>
            </div>
          </article>
        ) : (
          /* BLOG LISTING VIEW */
          <div className="space-y-10">
            {/* Header Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-sky-400/30 shadow-xl">
              <div className="max-w-2xl space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/15">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>ট্রাভেল গাইড ও ভ্রমণ অভিজ্ঞতা</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white">
                  বাংলাদেশের দর্শনীয় স্থানের গল্প ও বিস্তারিত গাইড
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  কুয়াকাটা, সাজেক ভ্যালি, টাঙ্গুয়ার হাওর এবং সেন্টমার্টিন কীভাবে যাবেন, কী দেখবেন এবং সেরা বাজেটে কীভাবে ভ্রমণ করবেন তা বিস্তারিত জানুন।
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={scrollToTips}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
                  >
                    <Luggage className="w-4 h-4 text-sky-300" />
                    <span>প্যাকিং চেকলিস্ট ও টিপস নির্দেশিকা</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills & Travel Tips Shortcut */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <button
                onClick={scrollToTips}
                className="py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer bg-sky-50 hover:bg-sky-100 text-blue-800 border border-sky-300 flex items-center gap-1.5 shrink-0"
              >
                <Luggage className="w-3.5 h-3.5 text-blue-600" />
                <span>প্যাকিং চেকলিস্ট ও টিপস</span>
              </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {post.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{post.destination}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h2 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-semibold text-slate-700">{post.author}</span>
                    </div>

                    <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>সম্পূর্ণ পড়ুন</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* 🎒 INTERACTIVE TRAVEL TIPS & PACKING CHECKLIST SECTION */}
            <TravelTipsSection onNavigateToPackages={onNavigateToPackages} />
          </div>
        )}
      </div>
    </div>
  );
};
