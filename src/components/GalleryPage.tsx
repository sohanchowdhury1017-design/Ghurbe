import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/packagesData';
import { Camera, ArrowLeft, X, Eye, MapPin, Sparkles, Download, Share2 } from 'lucide-react';

interface GalleryPageProps {
  onBackToHome: () => void;
  onNavigateToPackages: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
  onNavigateToPackages,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<{ title: string; spot: string; url: string } | null>(null);

  const categories = [
    { id: 'all', label: 'সব ছবি' },
    { id: 'পাহাড় ও মেঘ', label: 'পাহাড় ও মেঘ' },
    { id: 'সমুদ্র ও সৈকত', label: 'সমুদ্র ও সৈকত' },
    { id: 'লেক ও পর্বত', label: 'লেক ও পর্বত' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-sky-dots py-6 sm:py-10">
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

          <span className="text-xs font-semibold text-slate-500">
            মোট ছবি: <strong className="text-slate-900 font-bold">{filteredItems.length}টি</strong>
          </span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white border border-sky-400/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-sky-300 text-xs font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>ঘুরবে ট্রাভেলার্স মোমেন্টস</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              আমাদের অফিসিয়াল ভ্রমণ ফটো গ্যালারি
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              কুয়াকাটা, সাজেক ভ্যালি, সেন্টমার্টিন ও টাঙ্গুয়ার হাওরের অপরূপ রূপ এবং আমাদের সাথে ভ্রমণ করা ভ্রমণপিপাসুদের ক্যামেরায় ফ্রেমবন্দী অমূল্য মুহূর্ত।
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={onNavigateToPackages}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap cursor-pointer hidden sm:block"
          >
            প্যাকেজ বুক করুন →
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage({ title: item.title, spot: item.spot, url: item.imageUrl })}
              className="group relative aspect-4/3 sm:aspect-1/1 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl active:scale-97 transition-all duration-300 border border-slate-200/80 bg-slate-900"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <span className="text-[10px] sm:text-xs text-sky-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{item.spot}</span>
                </span>
                <p className="text-xs sm:text-sm font-bold text-white truncate leading-tight mt-0.5">
                  {item.title}
                </p>
              </div>

              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-950/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to plan trip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white text-center space-y-3 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-black">আপনিও হতে পারেন আমাদের পরবর্তী ভ্রমণের সঙ্গী!</h3>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto">
            রংপুর, বগুড়া ও গাইবান্ধা থেকে আরামদায়ক যাতায়াত এবং বাজেট ফ্রেন্ডলি প্যাকেজে এখনই আসন বুকিং করুন।
          </p>
          <button
            onClick={onNavigateToPackages}
            className="py-3 px-6 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span>ট্যুর প্যাকেজগুলো দেখুন</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 max-h-[75vh] w-full bg-black flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-sky-400 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lightboxImage.spot}</span>
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {lightboxImage.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setLightboxImage(null);
                  onNavigateToPackages();
                }}
                className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors"
              >
                এই গন্তব্যের প্যাকেজ দেখুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
