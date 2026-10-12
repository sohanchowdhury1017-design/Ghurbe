import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/packagesData';
import { Camera, X, Eye } from 'lucide-react';

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
    <section id="gallery" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Camera className="w-4 h-4 text-sky-500" />
              <span>স্মরণীয় মুহূর্তসমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              আমাদের ভ্রমণ গ্যালারি
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              আমাদের সাথে ভ্রমণ করা পর্যটকদের ক্যামেরায় ধরা পড়া অপরূপ দৃশ্যসমূহ
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - 2 columns on mobile for modern travel gallery feel */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage({ title: item.title, spot: item.spot, url: item.imageUrl })}
              className="group relative aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl active:scale-97 transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-sky-300 block leading-tight">
                    {item.spot}
                  </span>
                  <h3 className="text-xs sm:text-base font-bold text-white drop-shadow-xs leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shrink-0 ml-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h4 className="text-base font-bold">{lightboxImage.title}</h4>
                <p className="text-xs text-sky-300">{lightboxImage.spot}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
