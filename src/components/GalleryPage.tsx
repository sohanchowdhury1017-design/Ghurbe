import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/packagesData';
import { Camera, ArrowLeft, X, Eye, MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-sky-dots py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 active:scale-95 transition-all bg-white py-2.5 px-4 rounded-xl border border-slate-200/90 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>← হোম পেজে ফিরে যান</span>
          </button>

          <span className="text-xs sm:text-sm font-semibold text-slate-500">
            মোট ছবি: <strong className="text-slate-900 font-bold">{filteredItems.length}টি</strong>
          </span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-12 text-white border border-sky-400/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-sky-300 text-xs font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>ঘুরবে ট্রাভেলার্স ফটো গ্যালারি</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              আমাদের অফিসিয়াল ভ্রমণ ফটো গ্যালারি
            </h1>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              কুয়াকাটা, সাজেক ভ্যালি, সেন্টমার্টিন ও টাঙ্গুয়ার হাওরের অপরূপ রূপ এবং আমাদের সাথে ভ্রমণ করা ভ্রমণপিপাসুদের ক্যামেরায় ফ্রেমবন্দী অমূল্য মুহূর্ত।
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={onNavigateToPackages}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap cursor-pointer hidden sm:block pr-2"
          >
            প্যাকেজ বুক করুন →
          </button>
        </div>

        {/* Photo Grid with Bigger Photos and Generous Breathing Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage({ title: item.title, spot: item.spot, url: item.imageUrl })}
              className="group relative aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl active:scale-98 transition-all duration-500 border border-slate-200/90 bg-slate-900"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{item.spot}</span>
                </span>
                <p className="text-sm sm:text-base font-black text-white truncate leading-snug mt-1">
                  {item.title}
                </p>
              </div>

              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white shadow-md">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to plan trip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-3xl font-black">আপনিও হতে পারেন আমাদের পরবর্তী ভ্রমণের সঙ্গী!</h3>
          <p className="text-xs sm:text-base text-sky-100 max-w-xl mx-auto leading-relaxed">
            রংপুর, বগুড়া ও গাইবান্ধা থেকে আরামদায়ক যাতায়াত এবং বাজেট ফ্রেন্ডলি প্যাকেজে এখনই আসন বুকিং করুন।
          </p>
          <button
            onClick={onNavigateToPackages}
            className="py-3 px-8 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
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
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] max-h-[75vh] w-full bg-black flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-slate-950 flex items-center justify-between gap-4">
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
                className="py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors shadow-md"
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
