import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, User, Calendar, MapPin, Tag, ChevronRight, Share2, Sparkles, Compass, Lightbulb, CheckCircle2, Luggage, AlertCircle, List } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogAndTeamData';
import { BlogPost } from '../types/travel';
import { TravelTipsSection } from './TravelTipsSection';

interface BlogPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
  initialPostSlug?: string | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
  initialPostSlug,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (initialPostSlug) {
      const found = BLOG_POSTS.find(
        (p) => p.slug === initialPostSlug || p.id === initialPostSlug
      );
      if (found) return found;
    }
    return null;
  });
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
        try {
          window.history.replaceState(null, '', window.location.pathname);
        } catch {}
      }, 150);
    }
  }, []);

  useEffect(() => {
    if (initialPostSlug) {
      const found = BLOG_POSTS.find(
        (p) => p.slug === initialPostSlug || p.id === initialPostSlug
      );
      if (found) setSelectedPost(found);
    }
  }, [initialPostSlug]);

  useEffect(() => {
    if (selectedPost) {
      document.title = selectedPost.seo?.metaTitle || `${selectedPost.title} | ঘুরবে (Ghurbe)`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) {
        desc.setAttribute('content', selectedPost.seo?.metaDescription || selectedPost.summary);
      }
      try {
        window.history.replaceState(null, '', `/${selectedPost.slug}`);
      } catch {}
    } else {
      document.title = "ট্রাভেল ব্লগ ও ভ্রমণ নির্দেশিকা | ঘুরবে (Ghurbe) Tours & Travel";
      const desc = document.querySelector('meta[name="description"]');
      if (desc) {
        desc.setAttribute('content', "ঘুরবে ট্রাভেল ব্লগে পড়ুন কুয়াকাটা, কক্সবাজার, সাজেক, সুন্দরবন সহ বাংলাদেশের জনপ্রিয় পর্যটন গন্তব্যের ভ্রমণ গাইড, বাজেট ও সেরা ট্রাভেল টিপস।");
      }
    }
  }, [selectedPost]);

  const categories = [
    { id: 'all', label: 'সকল ভ্রমণ গাইড' },
    { id: 'সমুদ্র ও সৈকত', label: 'সমুদ্র ও সৈকত ভ্রমণ' },
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
                alt={selectedPost.imageAlt || selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    {selectedPost.category}
                  </span>
                  {selectedPost.slug === 'kuakata-travel-guide' && (
                    <span className="text-xs font-black bg-emerald-500 text-slate-950 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>আলটিমেট গাইড ২০২৬</span>
                    </span>
                  )}
                  {selectedPost.slug && (
                    <span className="text-[11px] font-mono bg-white/20 backdrop-blur-xs text-sky-200 px-2.5 py-0.5 rounded-full border border-white/20">
                      /{selectedPost.slug}
                    </span>
                  )}
                </div>

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
            <div className="p-6 sm:p-10 space-y-8 text-slate-800">
              {/* Publication Disclaimer Notice */}
              {selectedPost.disclaimer && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/80 text-amber-950 text-xs sm:text-sm font-medium flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block text-amber-900 mb-0.5">প্রকাশনার আগে সতর্কতা ও তথ্য যাচাই:</span>
                    <span className="text-slate-700 leading-relaxed">{selectedPost.disclaimer}</span>
                  </div>
                </div>
              )}

              {/* Summary Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50/60 border border-sky-200 text-sm font-medium text-slate-800 leading-relaxed space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 block">সংক্ষিপ্ত সারসংক্ষেপ</span>
                <p className="text-slate-700 leading-relaxed">{selectedPost.summary}</p>
              </div>

              {/* Table of Contents / Quick Jump if 5+ sections */}
              {selectedPost.sections && selectedPost.sections.length > 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
                    <List className="w-4 h-4 text-blue-600" />
                    <span>সম্পূর্ণ সূচিপত্র ও দ্রুত অধ্যায় নির্বাচন ({selectedPost.sections.length}টি অধ্যায়)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {selectedPost.sections.map((sec, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const el = document.getElementById(`blog-sec-${sec.number || idx}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-left text-xs font-medium text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50/80 px-3 py-2 rounded-xl border border-slate-200/90 transition-colors truncate cursor-pointer flex items-center gap-2 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-black text-[10px] flex items-center justify-center shrink-0">
                          {sec.number || idx + 1}
                        </span>
                        <span className="truncate">{sec.heading.replace(/^[০-৯\d]+\.\s*/, '')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Introduction Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                {selectedPost.content.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Structured Sections (22 Chapters) */}
              {selectedPost.sections && selectedPost.sections.length > 0 && (
                <div className="space-y-10 pt-4 border-t border-slate-200">
                  {selectedPost.sections.map((sec, idx) => (
                    <section
                      key={idx}
                      id={`blog-sec-${sec.number || idx}`}
                      className="space-y-4 scroll-mt-24"
                    >
                      <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3">
                        <span className="w-9 h-9 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                          {sec.number || idx + 1}
                        </span>
                        <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                          {sec.heading}
                        </h2>
                      </div>

                      <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed pl-1 sm:pl-3">
                        {sec.body.map((bText, bIdx) => (
                          <p key={bIdx} className="leading-relaxed whitespace-pre-line">
                            {bText}
                          </p>
                        ))}
                      </div>

                      {/* Subsections Cards */}
                      {sec.subsections && sec.subsections.length > 0 && (
                        <div className="grid grid-cols-1 gap-3.5 pt-2 pl-1 sm:pl-3">
                          {sec.subsections.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200 hover:border-blue-300 transition-all space-y-1.5"
                            >
                              <h3 className="font-bold text-sm sm:text-base text-blue-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                <span>{sub.title}</span>
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                                {sub.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              )}

              {/* SEO Information & Keywords Cloud */}
              {selectedPost.seo && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <h3 className="font-black text-sm text-sky-300 uppercase tracking-wider">
                      ওয়েবসাইটের জন্য SEO তথ্য ও মেটা ডাটা
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <span className="font-bold text-white block">SEO Title:</span>
                      <span className="text-sky-200">{selectedPost.seo.metaTitle}</span>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Meta Description:</span>
                      <span className="text-slate-300">{selectedPost.seo.metaDescription}</span>
                    </div>
                    {selectedPost.slug && (
                      <div>
                        <span className="font-bold text-white block">Suggested URL Slug:</span>
                        <code className="text-emerald-300 font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded">
                          /{selectedPost.slug}
                        </code>
                      </div>
                    )}
                  </div>

                  {selectedPost.seo.primaryKeywords && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                        Primary Keywords:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPost.seo.primaryKeywords.map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedPost.seo.secondaryKeywords && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                        Secondary Keywords:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPost.seo.secondaryKeywords.map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-[11px] font-semibold bg-white/10 text-slate-300 border border-white/15 px-2.5 py-0.5 rounded-full"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                  ১২ নভেম্বরের নিশ্চিত কুয়াকাটা ট্যুরে নিরাপদ ও আনন্দময় প্যাকেজে মাত্র ১,০০০৳ অগ্রিম দিয়ে আপনার আসন নিশ্চিত করুন।
                </p>
                <button
                  onClick={onNavigateToPackages}
                  className="py-2.5 px-6 rounded-xl bg-white text-blue-800 font-black text-xs sm:text-sm hover:bg-slate-100 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  কুয়াকাটা প্যাকেজ বুক করুন
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
                  কুয়াকাটা ভ্রমণ গাইড ও বিস্তারিত অভিজ্ঞতা
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  সাগরকন্যা কুয়াকাটা কীভাবে যাবেন, কোথায় থাকবেন, সূর্যোদয় ও সূর্যাস্ত এবং সেরা বাজেটে কীভাবে ভ্রমণ করবেন তার সম্পূর্ণ দিকনির্দেশনা।
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
            <div className="grid grid-cols-1 max-w-4xl mx-auto gap-6 w-full">
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
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                          {post.category}
                        </span>
                        {post.slug === 'kuakata-travel-guide' && (
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3 fill-current" />
                            <span>২০২৬ আলটিমেট গাইড</span>
                          </span>
                        )}
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
