import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/packagesData';
import { Camera, X, Eye, MapPin } from 'lucide-react';

export const GallerySection: React.FC = () => {
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
    <section id="gallery" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-4 h-4 text-sky-500" />
              <span>স্মরণীয় মুহূর্তসমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              আমাদের অফিসিয়াল ভ্রমণ গ্যালারি
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              আমাদের সাথে ভ্রমণ করা পর্যটকদের ক্যামেরায় ধরা পড়া অপরূপ দৃশ্য ও জীবন্ত মুহূর্তসমূহ
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200/90 rounded-2xl overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Big Picture Gallery Grid with Generous Spacing ("faka faka koro") */}
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
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-300 flex items-center gap-1 mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{item.spot}</span>
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white drop-shadow-xs leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shrink-0 ml-2 shadow-md">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
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
            <div className="p-5 bg-slate-950 text-white flex justify-between items-center">
              <div>
                <span className="text-xs text-sky-400 font-bold block">{lightboxImage.spot}</span>
                <h4 className="text-base sm:text-lg font-bold">{lightboxImage.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
