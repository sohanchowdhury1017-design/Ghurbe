import React from 'react';
import { Star, MapPin, Calendar, Clock, Eye, Sparkles, Flame } from 'lucide-react';
import { TourPackage } from '../types/travel';

interface PackageCardProps {
  pkg: TourPackage;
  onViewDetails: (pkg: TourPackage) => void;
  onBookNow: (pkg: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onViewDetails,
  onBookNow,
}) => {
  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1 relative ${
        pkg.isHighlighted
          ? 'ring-2 ring-blue-600/90 border-2 border-blue-400 shadow-xl shadow-blue-500/10'
          : 'border border-slate-200/90'
      }`}
    >
      {/* Top Highlight Banner for Featured packages */}
      {pkg.isHighlighted && (
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white px-4 py-2 flex items-center justify-between text-xs font-bold shadow-xs">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-white text-white animate-pulse shrink-0" />
            <span className="truncate">{pkg.highlightBadge || '★ হাইলাইটেড স্পেশাল অফার'}</span>
          </div>
          <span className="bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[10px] px-2.5 py-0.5 rounded-full font-extrabold shrink-0 shadow-2xs border border-rose-300/30">
            সেরা ডিল
          </span>
        </div>
      )}

      {/* Big, Gorgeous Picture Container (Generous Aspect Ratio for breathtaking photography) */}
      <div 
        onClick={() => onViewDetails(pkg)}
        className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={pkg.coverImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />

        {/* Soft atmospheric gradient scrim ensuring crisp readability of tags */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges: Category & Special Promotion */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-white/40">
            {pkg.categoryLabel}
          </span>
          {pkg.badge && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                pkg.isHighlighted
                  ? 'bg-blue-600 text-white'
                  : 'bg-sky-600 text-white'
              }`}
            >
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Special Discount badge */}
        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
          <div className="absolute top-3.5 right-3.5 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#881337] to-[#9f1239] text-white shadow-md flex items-center gap-1 border border-rose-300/30">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>৳{(pkg.originalPrice - pkg.price).toLocaleString('bn-BD')} ছাড়</span>
            </span>
          </div>
        )}

        {/* Destination & Duration Bottom Overlay on Photo */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{pkg.location}</span>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md text-sky-300 text-[11px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1 border border-white/10">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>{pkg.duration.textBn}</span>
          </div>
        </div>
      </div>

      {/* Spacious, Well-Organized Content Area ("Ektu faka faka & sob guchano") */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Card Title - Clickable */}
          <h3
            onClick={() => onViewDetails(pkg)}
            className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug"
          >
            {pkg.title}
          </h3>

          {/* Subtitle / English title */}
          {pkg.englishTitle && (
            <p className="text-xs text-slate-500 font-medium">
              {pkg.englishTitle}
            </p>
          )}

          {/* Departure Date and Couple Price Row */}
          {(pkg.departureDateText || pkg.couplePrice) && (
            <div className="pt-1 flex items-center gap-2 flex-wrap">
              {pkg.departureDateText && (
                <span className="text-[11px] bg-sky-50 text-sky-900 border border-sky-200/90 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>{pkg.departureDateText}</span>
                </span>
              )}
              {pkg.couplePrice && (
                <span className="text-[11px] bg-rose-50 text-[#881337] border border-rose-200/80 px-2.5 py-1 rounded-lg font-bold">
                  💑 কাপল: ৳{pkg.couplePrice.toLocaleString('bn-BD')}
                </span>
              )}
            </div>
          )}

          {/* Ratings & Price Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            {/* Stars & Reviews */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-bold ml-0.5">
                ({pkg.reviewCount})
              </span>
            </div>

            {/* Price section */}
            <div className="text-right">
              <span
                className={`text-[10px] uppercase font-bold block ${
                  pkg.isHighlighted ? 'text-[#881337]' : 'text-blue-600'
                }`}
              >
                {pkg.isHighlighted ? '🔥 স্পেশাল অফার' : 'জনপ্রতি মূল্য'}
              </span>
              <div className="flex items-baseline gap-1 justify-end">
                <span
                  className={`text-2xl font-black tabular-nums tracking-tight ${
                    pkg.isHighlighted ? 'text-blue-700' : 'text-slate-900'
                  }`}
                >
                  ৳{pkg.price.toLocaleString('bn-BD')}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ জন</span>
              </div>
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <div className="text-xs text-slate-400 line-through tabular-nums -mt-0.5">
                  ৳{pkg.originalPrice.toLocaleString('bn-BD')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Twin Action Buttons: "বিস্তারিত দেখুন" and "বুকিং করুন" */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(pkg)}
            className="w-full min-h-[46px] py-2.5 px-3 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 active:scale-97 border border-slate-200/90 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>বিস্তারিত দেখুন</span>
          </button>

          <button
            type="button"
            onClick={() => onBookNow(pkg)}
            className={`w-full min-h-[46px] py-2.5 px-3 text-xs sm:text-sm font-black text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97 ${
              pkg.isHighlighted
                ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 shadow-blue-500/25'
                : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 shadow-blue-500/20'
            }`}
          >
            <span>বুকিং করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
