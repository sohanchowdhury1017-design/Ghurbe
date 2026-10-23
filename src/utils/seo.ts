/**
 * Universal SEO & Social Sharing Metadata Manager for Ghurbe Tours & Travel
 * Dynamically updates <title>, <meta name="description">, OpenGraph (og:*),
 * Twitter Cards (twitter:*), canonical URL, and Schema.org JSON-LD structured data.
 */

export interface PageSEOMetadata {
  title: string;
  description: string;
  image: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

export const BASE_URL = 'https://ghurbe.com';
export const DEFAULT_SHARE_IMAGE = 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791875447/360_F_1237996093_CtWZOkLaDCAMq6jqB95Tb9cPXZc8HewY.jpg';
export const BRAND_LOGO = 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png';
export const OFFICIAL_HOTLINE = '01980297939';

export const MEMBER_PROFILES: Record<string, { name: string; role: string; image: string; bio: string }> = {
  'samsul-arafin': {
    name: 'মো. সামসুল আরেফিন',
    role: 'প্রধান নির্বাহী কর্মকর্তা (CEO & Founder)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791998110/WhatsApp_Image_2026-10-14_at_11.13.05_PM.jpg',
    bio: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের স্বপ্নদ্রষ্টা ও প্রতিষ্ঠাতা। উত্তরবঙ্গের ভ্রমণপ্রেমীদের জন্য সাশ্রয়ী ও প্রিমিয়াম ট্যুর প্যাকেজ নিশ্চিতকরণে নিবেদিত।',
  },
  'mahim-ibn-khudi': {
    name: 'মাহিম ইবনে খুদি',
    role: 'এক্সিকিউটিভ ডিরেক্টর (Executive Director)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791996767/WhatsApp_Image_2026-10-14_at_10.52.07_PM.jpg',
    bio: 'ট্যুর প্যাকেজ পরিকল্পনা, কৌশলগত পরিচালনা এবং গ্রাহক সন্তুষ্টি নিশ্চিতকরণে দায়িত্বপ্রাপ্ত নির্বাহী পরিচালক।',
  },
  'adhira-nokshi': {
    name: 'অধরা নকশী',
    role: 'ব্র্যান্ড অ্যান্ড মার্কেটিং ডিরেক্টর (Brand & Marketing Director)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792140786/4af20288-d4a6-44b4-ae55-86a340714f8f.png',
    bio: 'ব্র্যান্ডিং, ডিজিটাল প্রচারণা এবং ট্রাভেলারদের সঙ্গে সংযোগ স্থাপনের সার্বিক তত্ত্বাবধায়ক।',
  },
  'adhira': {
    name: 'অধরা নকশী',
    role: 'ব্র্যান্ড অ্যান্ড মার্কেটিং ডিরেক্টর (Brand & Marketing Director)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792140786/4af20288-d4a6-44b4-ae55-86a340714f8f.png',
    bio: 'ব্র্যান্ডিং, ডিজিটাল প্রচারণা এবং ট্রাভেলারদের সঙ্গে সংযোগ স্থাপনের সার্বিক তত্ত্বাবধায়ক।',
  },
  'md-rifat-islam': {
    name: 'মো. রিফাত ইসলাম',
    role: 'ডিরেক্টর অফ অপারেশনস (Director of Operations)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792048061/WhatsApp_Image_2026-10-15_at_12.56.16_PM.jpg',
    bio: 'পরিবহন, হোটেল বুকিং এবং অন-গ্রাউন্ড ট্যুর ব্যবস্থাপনার সার্বিক নিরাপত্তা ও শৃঙ্খলা নিশ্চিতকরণ।',
  },
  'rifat-islam': {
    name: 'মো. রিফাত ইসলাম',
    role: 'ডিরেক্টর অফ অপারেশনস (Director of Operations)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792048061/WhatsApp_Image_2026-10-15_at_12.56.16_PM.jpg',
    bio: 'পরিবহন, হোটেল বুকিং এবং অন-গ্রাউন্ড ট্যুর ব্যবস্থাপনার সার্বিক নিরাপত্তা ও শৃঙ্খলা নিশ্চিতকরণ।',
  },
  'sidra-islam': {
    name: 'সিদরা ইসলাম',
    role: 'ব্র্যান্ড ম্যানেজার (Brand Manager)',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792049005/pexels-photo-29333677.avif',
    bio: 'গ্রাহক সেবা উন্নয়ন, সোশাল মিডিয়া ম্যানেজমেন্ট এবং প্যাকেজ ক্যাম্পেইন পরিচালনায় নিয়োজিত।',
  },
};

/**
 * Returns comprehensive SEO and Social Share Card Metadata for any route
 */
export const getSEOForRoute = (
  route: string,
  pkg?: { title: string; slug: string; shortDesc?: string; coverImage: string; price?: number } | null,
  memberSlug?: string | null,
  blogSlug?: string | null
): PageSEOMetadata => {
  const cleanRoute = (route || 'home').toLowerCase().replace(/^\/+|\/+$/g, '');

  // 1. Team member leadership profiles
  const targetMemberKey = (memberSlug || cleanRoute).toLowerCase();
  if (MEMBER_PROFILES[targetMemberKey]) {
    const mem = MEMBER_PROFILES[targetMemberKey];
    return {
      title: `${mem.name} — ${mem.role.split('(')[0].trim()} | ঘুরবে (Ghurbe)`,
      description: `${mem.name}, ${mem.role} — ${mem.bio} যোগাযোগ হটলাইন: 01980297939 | ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।`,
      image: mem.image,
      path: `/${targetMemberKey}`,
      type: 'profile',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: mem.name,
        jobTitle: mem.role,
        worksFor: {
          '@type': 'Organization',
          name: 'Ghurbe Tours & Travel',
          url: BASE_URL,
        },
        image: mem.image,
        description: mem.bio,
      },
    };
  }

  // 2. Kuakata Special Tour Page
  if (cleanRoute === 'kuakata' || cleanRoute === 'kuakata-beach' || cleanRoute === 'kuakata-tour') {
    return {
      title: 'কুয়াকাটা স্পেশাল ট্যুর ও পেমেন্ট প্রক্রিয়া | ঘুরবে ট্যুর অ্যান্ড ট্রাভেল (ghurbe.com/kuakata)',
      description: 'সাগরকন্যা কুয়াকাটা ৩ রাত ২ দিন মেগা অফার মাত্র ৩,৫৯৯ টাকায়! ১ রাত সি-ভিউ হোটেল, ৫ বেলা খাবার, ১৬টি স্পট ও রংপুর-বগুড়া পিকআপ। বুকিং: 01980297939',
      image: DEFAULT_SHARE_IMAGE,
      path: '/kuakata',
      type: 'website',
      keywords: 'কুয়াকাটা ট্যুর, kuakata tour package, kuakata 3599 taka, kuakata special tour, ghurbe kuakata',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: 'সাগরকন্যা কুয়াকাটা স্পেশাল ট্যুর (৩ রাত ২ দিন)',
        description: 'রংপুর ও বগুড়া থেকে কুয়াকাটা ৩ রাত ২ দিন ভ্রমণ প্যাকেজ মাত্র ৩,৫৯৯ টাকায়।',
        offers: {
          '@type': 'Offer',
          price: '3599',
          priceCurrency: 'BDT',
          availability: 'https://schema.org/InStock',
        },
        provider: {
          '@type': 'TravelAgency',
          name: 'Ghurbe Tours & Travel',
          telephone: '+8801980297939',
        },
      },
    };
  }

  // 3. Cox's Bazar Tour Package
  if (cleanRoute === 'coxs-bazar' || cleanRoute === 'cox' || (pkg && (pkg.slug === 'coxs-bazar' || pkg.slug === 'cox'))) {
    return {
      title: 'রংপুর ও বগুড়া থেকে কক্সবাজার ট্যুর মাত্র ৪,৭৮৫ টাকায় | Ghurbe Tour & Travel',
      description: 'কক্সবাজার সমুদ্রসৈকত ও মেরিন ড্রাইভ ভ্রমণ মাত্র ৪,৭৮৫ টাকায়! কাপল ৯,৯৯৯৳। মানসম্মত হোটেল, ৫ বেলা সুস্বাদু খাবার ও নিরাপদ চেয়ারকোচ বাস। কল: 01980297939',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      path: '/coxs-bazar',
      type: 'website',
      keywords: 'রংপুর থেকে কক্সবাজার ট্যুর, বগুড়া থেকে কক্সবাজার ট্যুর, coxs bazar 4785 taka, ghurbe coxs bazar',
    };
  }

  // 4. Blog Guides
  if (cleanRoute === 'kuakata-travel-guide' || blogSlug === 'kuakata-travel-guide') {
    return {
      title: 'কুয়াকাটা ভ্রমণ গাইড ২০২৬ | Kuakata Travel Guide | Ghurbe Tours & Travel',
      description: 'কুয়াকাটা ভ্রমণের পূর্ণাঙ্গ গাইডলাইন — কীভাবে যাবেন, কোথায় থাকবেন, কী কী খাবেন এবং ১৬টি দর্শনীয় স্থান ঘুরে দেখার সেরা রুট প্ল্যান।',
      image: DEFAULT_SHARE_IMAGE,
      path: '/kuakata-travel-guide',
      type: 'article',
      keywords: 'কুয়াকাটা ভ্রমণ গাইড, kuakata travel guide, kuakata spots',
    };
  }

  if (cleanRoute === 'coxs-bazar-tour-package' || blogSlug === 'coxs-bazar-tour-package') {
    return {
      title: 'কক্সবাজার ট্যুর প্যাকেজ ও ভ্রমণ গাইড ২০২৬ | Ghurbe Tour & Travel',
      description: 'রংপুর ও বগুড়া থেকে কক্সবাজার ট্যুর মাত্র ৪,৭৮৫ টাকায়! মেরিন ড্রাইভ ভ্রমণ, হোটেল রাত্রিযাপন ও ৫ বেলা খাবার। বুকিং হটলাইন: 01980297939',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      path: '/coxs-bazar-tour-package',
      type: 'article',
      keywords: 'কক্সবাজার ট্যুর প্যাকেজ, coxs bazar tour package, rangpur to coxs bazar',
    };
  }

  // 5. Individual Tour Packages
  if (cleanRoute === 'sajek-valley' || (pkg && pkg.slug === 'sajek-valley')) {
    return {
      title: 'সাজেক ভ্যালি মেঘের রাজ্য ভ্রমণ প্যাকেজ ২০২৬ | ঘুরবে (Ghurbe)',
      description: 'সাজেক ভ্যালির মেঘ ও পাহাড় দর্শন প্যাকেজ! রংপুর ও বগুড়া থেকে সরাসরি যাতায়াত, কটেজে রাত্রিযাপন ও আকর্ষণীয় সাইটসিয়িং। বুকিং: 01980297939',
      image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791876748/Meghraj-Resort.jpg',
      path: '/sajek-valley',
      type: 'website',
    };
  }

  if (cleanRoute === 'saint-martin' || (pkg && pkg.slug === 'saint-martin')) {
    return {
      title: 'সেন্টমার্টিন প্রবাল দ্বীপ ট্যুর প্যাকেজ ২০২৬ | ঘুরবে (Ghurbe)',
      description: 'সেন্টমার্টিন দ্বীপ ও ছেঁড়াদ্বীপ ভ্রমণ প্যাকেজ! জাহাজ টিকিট, রিসোর্ট বুকিং ও সুস্বাদু সামুদ্রিক মাছের বার-বি-কিউ সহ সম্পূর্ণ আয়োজন। বুকিং: 01980297939',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      path: '/saint-martin',
      type: 'website',
    };
  }

  if (cleanRoute === 'tanguar-haor' || (pkg && pkg.slug === 'tanguar-haor')) {
    return {
      title: 'টাঙ্গুয়ার হাওর ও হাউসবোট প্রিমিয়াম ক্রুজ | ঘুরবে (Ghurbe)',
      description: 'টাঙ্গুয়ার হাওর, নীলাদ্রি লেক ও বারিক্কা টিলা ভ্রমণ! বিলাসবহুল প্রিমিয়াম হাউসবোটে রাত্রিযাপন ও খাঁটি হাওরের মাছের স্পেশাল মেনু। বুকিং: 01980297939',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      path: '/tanguar-haor',
      type: 'website',
    };
  }

  if (cleanRoute === 'bandarban' || (pkg && pkg.slug === 'bandarban')) {
    return {
      title: 'বান্দরবান মেঘের ভেলা ও পাহাড়িয়া ঝর্ণা ভ্রমণ | ঘুরবে (Ghurbe)',
      description: 'নীলগিরি, নীলাচল, নাফাকুম ও শৈলপ্রপাত ভ্রমণ! বান্দরবানের রোমাঞ্চকর পাহাড়ি চাঁদের গাড়ি জার্নি ও হোটেল রাত্রিযাপন। বুকিং: 01980297939',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      path: '/bandarban',
      type: 'website',
    };
  }

  if (cleanRoute === 'sreemangal' || (pkg && pkg.slug === 'sreemangal')) {
    return {
      title: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া বন ভ্রমণ | ঘুরবে (Ghurbe)',
      description: 'সবুজ চা কন্যা শ্রীমঙ্গল, মাধবপুর লেক ও হামহাম জলপ্রপাত দর্শন! আরামদায়ক রিসোর্ট ও শান্ত প্রকৃতির মাঝে অনন্য ছুটি। বুকিং: 01980297939',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      path: '/sreemangal',
      type: 'website',
    };
  }

  if (cleanRoute === 'sundarban' || (pkg && pkg.slug === 'sundarban')) {
    return {
      title: 'সুন্দরবন ম্যানগ্রোভ বন ও ওয়াইল্ডলাইফ ক্রুজ | ঘুরবে (Ghurbe)',
      description: 'বিশ্ব ঐতিহ্য সুন্দরবনের গভীরে রয়্যাল বেঙ্গল টাইগার ও হরিণ দর্শন! থ্রি-স্টার সমমানের ক্রুজার ভেসেল ও বনবিভাগের নিরাপত্তা। বুকিং: 01980297939',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      path: '/sundarban',
      type: 'website',
    };
  }

  // 6. Generic or dynamic package detail
  if ((cleanRoute === 'package-detail' || pkg) && pkg) {
    return {
      title: `${pkg.title} | ghurbe.com/${pkg.slug}`,
      description: `${pkg.shortDesc || pkg.title} — রংপুর ও বগুড়া থেকে আরামদায়ক যাত্রা, হোটেল ও খাবার অন্তর্ভুক্ত। বুকিং হটলাইন: 01980297939`,
      image: pkg.coverImage || DEFAULT_SHARE_IMAGE,
      path: `/${pkg.slug}`,
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: pkg.title,
        description: pkg.shortDesc,
        offers: pkg.price ? {
          '@type': 'Offer',
          price: String(pkg.price),
          priceCurrency: 'BDT',
        } : undefined,
      },
    };
  }

  // 7. All Packages
  if (cleanRoute === 'packages' || cleanRoute === 'tours') {
    return {
      title: 'সকল ভ্রমণ প্যাকেজ ২০২৬ | ঘুরবে ট্যুর অ্যান্ড ট্রাভেল (Ghurbe)',
      description: 'বাংলাদেশের সেরা ভ্রমণ প্যাকেজসমূহ — কক্সবাজার, কুয়াকাটা, সাজেক ভ্যালি, সেন্টমার্টিন ও টাঙ্গুয়ার হাওর। সাশ্রয়ী মূল্যে নিরাপদ ভ্রমণ ও বুকিং।',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
      path: '/packages',
      type: 'website',
      keywords: 'ট্যুর প্যাকেজ, tour packages bangladesh, sajek tour, saint martin tour, ghurbe packages',
    };
  }

  // 8. Gallery
  if (cleanRoute === 'gallery') {
    return {
      title: 'ভ্রমণ ফটো ও ভিডিও গ্যালারি | ঘুরবে (Ghurbe Tours & Travel)',
      description: 'ঘুরবে ট্রাভেলারদের আনন্দের মুহূর্ত ও বাস্তব ভ্রমণ ছবির অ্যালবাম। কুয়াকাটা, কক্সবাজার, সাজেক ও সেন্টমার্টিনের আসল দৃশ্য দেখুন।',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      path: '/gallery',
      type: 'website',
    };
  }

  // 9. Why Us
  if (cleanRoute === 'why-us') {
    return {
      title: 'কেন ঘুরবে সেরা পছন্দ | ঘুরবে (Ghurbe) — বিশ্বস্ত ট্যুর অপারেটর',
      description: 'ঘুরবে কেন উত্তরবঙ্গের শ্রেষ্ঠ ভ্রমণ সঙ্গী? সুনির্দিষ্ট পিকআপ পয়েন্ট, ৩-তারা মানসম্মত হোটেল, ২৪/৭ ট্যুর গাইড ও স্বচ্ছ পেমেন্ট সুবিধা।',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      path: '/why-us',
      type: 'website',
    };
  }

  // 10. Contact & FAQ
  if (cleanRoute === 'contact' || cleanRoute === 'faq') {
    return {
      title: 'যোগাযোগ ও সার্বক্ষণিক সাপোর্ট | ঘুরবে (Ghurbe Tours & Travel)',
      description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের অফিসিয়াল হটলাইন: 01980297939 এবং WhatsApp: 01911050270। রংপুর ও বগুড়া শাখা অফিস ও ২৪/৭ হেল্পলাইন।',
      image: BRAND_LOGO,
      path: '/contact',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Ghurbe Tours & Travel',
        telephone: '+8801980297939',
        url: `${BASE_URL}/contact`,
      },
    };
  }

  // 11. Blog
  if (cleanRoute === 'blog' || cleanRoute === 'blogs' || cleanRoute === 'travel-tips') {
    return {
      title: 'ট্রাভেল ব্লগ ও ভ্রমণ গাইড ২০২৬ | ঘুরবে (Ghurbe Tours & Travel)',
      description: 'কুয়াকাটা ও কক্সবাজার ভ্রমণের পূর্ণাঙ্গ গাইডলাইন, খরচ বাঁচানোর টিপস, হোটেল বুকিং ও সেরা দর্শনীয় স্থানসমূহ সম্পর্কে জানুন।',
      image: DEFAULT_SHARE_IMAGE,
      path: '/blog',
      type: 'article',
    };
  }

  // 12. About & Team
  if (cleanRoute === 'about' || cleanRoute === 'team') {
    return {
      title: 'আমাদের টিম ও কর্মকর্তা | ঘুরবে (Ghurbe Tours & Travel)',
      description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের পরিচালনা পর্ষদ ও অভিজ্ঞতা সম্পন্ন টিম। সিইও সামসুল আরেফিন ও নির্বাহী কর্মকর্তাদের পরিচিতি।',
      image: DEFAULT_SHARE_IMAGE,
      path: '/about',
      type: 'profile',
    };
  }

  // 13. Stats & Reviews
  if (cleanRoute === 'stats' || cleanRoute === 'reviews') {
    return {
      title: 'আমাদের অর্জন ও ট্রাভেলার রিভিউ | ঘুরবে (Ghurbe Tours & Travel)',
      description: '২০০০+ সন্তুষ্ট ভ্রমণপ্রেমী, ৯৮% পজিティブ ফিডব্যাক এবং ৪.৯ স্টার রেটিং। ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের রিয়েল রিভিউ ও অর্জন সমূহ।',
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80',
      path: '/stats',
      type: 'website',
    };
  }

  // 14. Admin Portal
  if (cleanRoute === 'adminn' || cleanRoute === 'admin') {
    return {
      title: 'অ্যাডমিন কন্ট্রোল পোর্টাল | ঘুরবে (Ghurbe)',
      description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেল সুরক্ষিত অ্যাডমিন ড্যাশবোর্ড ও বুকিং যাচাইকরণ।',
      image: BRAND_LOGO,
      path: '/adminn',
      type: 'website',
    };
  }

  // 13. Default / Home Page
  return {
    title: 'ঘুরবে (Ghurbe) — রংপুর ও বগুড়া থেকে কক্সবাজার ও কুয়াকাটা ট্যুর প্যাকেজ ২০২৬ | Best Tour Agency',
    description: 'ঘুরবে (Ghurbe) Tours & Travel — রংপুর ও বগুড়া থেকে কক্সবাজার ট্যুর মাত্র ৪,৭৮৫ টাকায় এবং কুয়াকাটা ৩,৫৯৯ টাকায়! নিরাপদ যাতায়াত, হোটেল ও ৫ বেলা খাবার। হটলাইন: 01980297939',
    image: DEFAULT_SHARE_IMAGE,
    path: '/',
    type: 'website',
    keywords: 'ghurbe, ঘুরবে, রংপুর থেকে কক্সবাজার ট্যুর, বগুড়া থেকে কক্সবাজার ট্যুর, কক্সবাজার ট্যুর প্যাকেজ ২০২৬, কুয়াকাটা ট্যুর প্যাকেজ, kuakata tour',
  };
};

/**
 * Sets or updates a <meta> tag in the <head>
 */
const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Sets or updates the canonical <link rel="canonical"> tag
 */
const setCanonicalUrl = (url: string) => {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
};

/**
 * Injects or updates Schema.org JSON-LD script in document head
 */
const setStructuredData = (jsonLd: Record<string, unknown> | null) => {
  if (typeof document === 'undefined') return;
  const scriptId = 'ghurbe-page-jsonld';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  
  if (!jsonLd) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(jsonLd);
};

/**
 * Updates full SEO and Social Card metadata on route transition
 */
export const updatePageSEO = (meta: PageSEOMetadata) => {
  if (typeof document === 'undefined') return;

  const fullUrl = `${BASE_URL}${meta.path.startsWith('/') ? meta.path : `/${meta.path}`}`;
  const imageUrl = meta.image || DEFAULT_SHARE_IMAGE;

  // 1. Browser Title
  document.title = meta.title;

  // 2. Standard Search Meta Tags
  setMetaTag('name', 'description', meta.description);
  if (meta.keywords) {
    setMetaTag('name', 'keywords', meta.keywords);
  }

  // 3. OpenGraph / Facebook Meta Tags
  setMetaTag('property', 'og:site_name', 'ঘুরবে (Ghurbe Tours & Travel)');
  setMetaTag('property', 'og:type', meta.type || 'website');
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', fullUrl);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', meta.title);

  // 4. Twitter / X Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  setMetaTag('name', 'twitter:image', imageUrl);
  setMetaTag('name', 'twitter:image:alt', meta.title);
  setMetaTag('name', 'twitter:url', fullUrl);

  // 5. Canonical Link
  setCanonicalUrl(fullUrl);

  // 6. Schema.org JSON-LD Structured Data
  const defaultStructuredData: Record<string, unknown> = meta.jsonLd || {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    name: 'Ghurbe Tours & Travel Bangladesh',
    alternateName: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেল',
    url: fullUrl,
    logo: BRAND_LOGO,
    image: imageUrl,
    description: meta.description,
    telephone: '+8801980297939',
    priceRange: '৳৳',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rangpur & Bogura',
      addressCountry: 'BD',
    },
  };

  setStructuredData(defaultStructuredData);
};
