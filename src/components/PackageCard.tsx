import React from 'react';
import { Star, MapPin, Calendar, Clock, Eye, CheckCircle2, Sparkles, Flame } from 'lucide-react';
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
      className={`bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1 relative ${
        pkg.isHighlighted
          ? 'ring-2 ring-blue-600 border-2 border-blue-400 shadow-xl shadow-blue-500/15'
          : 'border border-slate-200/80'
      }`}
    >
      {/* Top Highlight Banner for Featured/Highlighted packages - Ghurbe Royal Blue with Maroon pill */}
      {pkg.isHighlighted && (
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white px-3.5 py-1.5 flex items-center justify-between text-xs font-bold shadow-xs">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-white text-white animate-pulse shrink-0" />
            <span className="truncate">{pkg.highlightBadge || '★ হাইলাইটেড স্পেশাল অফার'}</span>
          </div>
          <span className="bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-[10px] px-2.5 py-0.5 rounded-full font-extrabold shrink-0 shadow-2xs border border-rose-300/30">
            সেরা বাজেট ডিল
          </span>
        </div>
      )}

      {/* Cover Image Container - Clickable for details */}
      <div 
        onClick={() => onViewDetails(pkg)}
        className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={pkg.coverImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-slate-800 shadow-xs border border-white/40">
            {pkg.categoryLabel}
          </span>
          {pkg.badge && (
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-xs ${
                pkg.isHighlighted
                  ? 'bg-blue-600 text-white'
                  : 'bg-sky-600 text-white'
              }`}
            >
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Special discount badge with Maroon accent */}
        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#881337] to-[#9f1239] text-white shadow-md flex items-center gap-1 border border-rose-300/30">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>৳ {pkg.originalPrice - pkg.price} ছাড়</span>
            </span>
          </div>
        )}

        {/* Duration bottom-right overlay on image */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1 pointer-events-none">
          <Clock className="w-3 h-3 text-sky-300" />
          <span>{pkg.duration.textBn}</span>
        </div>
      </div>

      {/* Card Content Area matching screenshot */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Title - Clickable for details */}
          <h3
            onClick={() => onViewDetails(pkg)}
            className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug"
          >
            {pkg.title}
          </h3>

          {/* Subtitle / Duration text line matching screenshot: দিন - রাতের হিসাব */}
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium flex-wrap">
            <span>{pkg.duration.textBn}</span>
            <span>·</span>
            <span className="text-slate-500 truncate">{pkg.location}</span>
          </p>

          {/* Extra Highlights if package has specific departure date or couple price */}
          {(pkg.departureDateText || pkg.couplePrice) && (
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              {pkg.departureDateText && (
                <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span>{pkg.departureDateText}</span>
                </span>
              )}
              {pkg.couplePrice && (
                <span className="text-[10px] bg-rose-50 text-[#881337] border border-rose-200/80 px-2 py-0.5 rounded-md font-bold">
                  💑 কাপল: ৳{pkg.couplePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          )}

          {/* Rating and Price row matching screenshot */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            {/* Stars & Reviews */}
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium ml-1">
                ({pkg.reviewCount})
              </span>
            </div>

            {/* Price section */}
            <div className="text-right">
              <span
                className={`text-[10px] uppercase font-bold block -mb-0.5 ${
                  pkg.isHighlighted ? 'text-[#881337]' : 'text-blue-600'
                }`}
              >
                {pkg.isHighlighted ? '🔥 স্পেশাল অফার' : 'আকর্ষণীয় মূল্য'}
              </span>
              <div className="flex items-baseline gap-1 justify-end">
                <span
                  className={`text-xl font-extrabold tabular-nums ${
                    pkg.isHighlighted ? 'text-blue-700' : 'text-slate-900'
                  }`}
                >
                  ৳ {pkg.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-500">/ জন</span>
              </div>
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <div className="text-[11px] text-slate-400 line-through tabular-nums -mt-0.5">
                  ৳ {pkg.originalPrice.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Twin Action Buttons: "বিস্তারিত দেখুন" and "বুক নাও" */}
        <div className="mt-4 pt-2 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails(pkg)}
            className="w-full min-h-[44px] py-2.5 px-3 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 active:scale-97 border border-slate-200/90 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>বিস্তারিত দেখুন</span>
          </button>

          <button
            type="button"
            onClick={() => onBookNow(pkg)}
            className={`w-full min-h-[44px] py-2.5 px-3 text-xs sm:text-sm font-extrabold text-white rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-97 ${
              pkg.isHighlighted
                ? 'bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 shadow-blue-500/25'
                : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700'
            }`}
          >
            <span>বুকিং করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
