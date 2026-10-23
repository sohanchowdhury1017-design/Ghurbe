import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://ghurbe.com';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791875447/360_F_1237996093_CtWZOkLaDCAMq6jqB95Tb9cPXZc8HewY.jpg';
const BRAND_LOGO = 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png';

const routeMetadata = {
  'kuakata': {
    title: 'কুয়াকাটা স্পেশাল ট্যুর ও পেমেন্ট প্রক্রিয়া | ঘুরবে ট্যুর অ্যান্ড ট্রাভেল (ghurbe.com/kuakata)',
    description: 'সাগরকন্যা কুয়াকাটা ৩ রাত ২ দিন মেগা অফার মাত্র ৩,৫৯৯ টাকায়! ১ রাত সি-ভিউ হোটেল, ৫ বেলা খাবার, ১৬টি স্পট ও রংপুর-বগুড়া পিকআপ। বুকিং: 01980297939',
    image: DEFAULT_IMAGE,
  },
  'Kuakata': {
    title: 'কুয়াকাটা স্পেশাল ট্যুর ও পেমেন্ট প্রক্রিয়া | ঘুরবে ট্যুর অ্যান্ড ট্রাভেল (ghurbe.com/kuakata)',
    description: 'সাগরকন্যা কুয়াকাটা ৩ রাত ২ দিন মেগা অফার মাত্র ৩,৫৯৯ টাকায়! ১ রাত সি-ভিউ হোটেল, ৫ বেলা খাবার, ১৬টি স্পট ও রংপুর-বগুড়া পিকআপ। বুকিং: 01980297939',
    image: DEFAULT_IMAGE,
  },
  'kuakata-travel-guide': {
    title: 'কুয়াকাটা ভ্রমণ গাইড ২০২৬ | Kuakata Travel Guide | Ghurbe Tours & Travel',
    description: 'কুয়াকাটা ভ্রমণের পূর্ণাঙ্গ গাইডলাইন — কীভাবে যাবেন, কোথায় থাকবেন, কী কী খাবেন এবং ১৬টি দর্শনীয় স্থান ঘুরে দেখার সেরা রুট প্ল্যান।',
    image: DEFAULT_IMAGE,
  },
  'packages': {
    title: 'সকল ভ্রমণ প্যাকেজ ২০২৬ | ঘুরবে ট্যুর অ্যান্ড ট্রাভেল (Ghurbe)',
    description: 'বাংলাদেশের সেরা ভ্রমণ প্যাকেজসমূহ — কক্সবাজার, কুয়াকাটা, সাজেক ভ্যালি, সেন্টমার্টিন ও টাঙ্গুয়ার হাওর। সাশ্রয়ী মূল্যে নিরাপদ ভ্রমণ ও বুকিং।',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
  },
  'coxs-bazar': {
    title: 'রংপুর ও বগুড়া থেকে কক্সবাজার ট্যুর মাত্র ৪,৭৮৫ টাকায় | Ghurbe Tour & Travel',
    description: 'কক্সবাজার সমুদ্রসৈকত ও মেরিন ড্রাইভ ভ্রমণ মাত্র ৪,৭৮৫ টাকায়! কাপল ৯,৯৯৯৳। মানসম্মত হোটেল, ৫ বেলা সুস্বাদু খাবার ও নিরাপদ চেয়ারকোচ বাস। কল: 01980297939',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  'sajek-valley': {
    title: 'সাজেক ভ্যালি মেঘের রাজ্য ভ্রমণ প্যাকেজ ২০২৬ | ঘুরবে (Ghurbe)',
    description: 'সাজেক ভ্যালির মেঘ ও পাহাড় দর্শন প্যাকেজ! রংপুর ও বগুড়া থেকে সরাসরি যাতায়াত, কটেজে রাত্রিযাপন ও আকর্ষণীয় সাইটসিয়িং। বুকিং: 01980297939',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791876748/Meghraj-Resort.jpg',
  },
  'saint-martin': {
    title: 'সেন্টমার্টিন প্রবাল দ্বীপ ট্যুর প্যাকেজ ২০২৬ | ঘুরবে (Ghurbe)',
    description: 'সেন্টমার্টিন দ্বীপ ও ছেঁড়াদ্বীপ ভ্রমণ প্যাকেজ! জাহাজ টিকিট, রিসোর্ট বুকিং ও সুস্বাদু সামুদ্রিক মাছের বার-বি-কিউ সহ সম্পূর্ণ আয়োজন।',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  },
  'tanguar-haor': {
    title: 'টাঙ্গুয়ার হাওর ও হাউসবোট প্রিমিয়াম ক্রুজ | ঘুরবে (Ghurbe)',
    description: 'টাঙ্গুয়ার হাওর, নীলাদ্রি লেক ও বারিক্কা টিলা ভ্রমণ! বিলাসবহুল প্রিমিয়াম হাউসবোটে রাত্রিযাপন ও খাঁটি হাওরের মাছের স্পেশাল মেনু।',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  },
  'bandarban': {
    title: 'বান্দরবান মেঘের ভেলা ও পাহাড়িয়া ঝর্ণা ভ্রমণ | ঘুরবে (Ghurbe)',
    description: 'নীলগিরি, নীলাচল, নাফাকুম ও শৈলপ্রপাত ভ্রমণ! বান্দরবানের রোমাঞ্চকর পাহাড়ি চাঁদের গাড়ি জার্নি ও হোটেল রাত্রিযাপন।',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  },
  'sreemangal': {
    title: 'শ্রীমঙ্গল চা বাগান ও লাউয়াছড়া বন ভ্রমণ | ঘুরবে (Ghurbe)',
    description: 'সবুজ চা কন্যা শ্রীমঙ্গল, মাধবপুর লেক ও হামহাম জলপ্রপাত দর্শন! আরামদায়ক রিসোর্ট ও শান্ত প্রকৃতির মাঝে অনন্য ছুটি।',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  },
  'sundarban': {
    title: 'সুন্দরবন ম্যানগ্রোভ বন ও ওয়াইল্ডলাইফ ক্রুজ | ঘুরবে (Ghurbe)',
    description: 'বিশ্ব ঐতিহ্য সুন্দরবনের গভীরে রয়্যাল বেঙ্গল টাইগার ও হরিণ দর্শন! থ্রি-স্টার সমমানের ক্রুজার ভেসেল ও বনবিভাগের নিরাপত্তা।',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  'about': {
    title: 'আমাদের টিম ও কর্মকর্তা | ঘুরবে (Ghurbe Tours & Travel)',
    description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের পরিচালনা পর্ষদ ও অভিজ্ঞতা সম্পন্ন টিম। সিইও সামসুল আরেফিন ও নির্বাহী কর্মকর্তাদের পরিচিতি।',
    image: DEFAULT_IMAGE,
  },
  'contact': {
    title: 'যোগাযোগ ও সার্বক্ষণিক সাপোর্ট | ঘুরবে (Ghurbe Tours & Travel)',
    description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের অফিসিয়াল হটলাইন: 01980297939 এবং WhatsApp: 01911050270। রংপুর ও বগুড়া শাখা অফিস ও ২৪/৭ হেল্পলাইন।',
    image: BRAND_LOGO,
  },
  'gallery': {
    title: 'ভ্রমণ ফটো ও ভিডিও গ্যালারি | ঘুরবে (Ghurbe Tours & Travel)',
    description: 'ঘুরবে ট্রাভেলারদের আনন্দের মুহূর্ত ও বাস্তব ভ্রমণ ছবির অ্যালবাম। কুয়াকাটা, কক্সবাজার, সাজেক ও সেন্টমার্টিনের আসল দৃশ্য দেখুন।',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  'why-us': {
    title: 'কেন ঘুরবে সেরা পছন্দ | ঘুরবে (Ghurbe) — বিশ্বস্ত ট্যুর অপারেটর',
    description: 'ঘুরবে কেন উত্তরবঙ্গের শ্রেষ্ঠ ভ্রমণ সঙ্গী? সুনির্দিষ্ট পিকআপ পয়েন্ট, ৩-তারা মানসম্মত হোটেল, ২৪/৭ ট্যুর গাইড ও স্বচ্ছ পেমেন্ট সুবিধা।',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  },
  'stats': {
    title: 'আমাদের অর্জন ও ট্রাভেলার রিভিউ | ঘুরবে (Ghurbe Tours & Travel)',
    description: '২০০০+ সন্তুষ্ট ভ্রমণপ্রেমী, ৯৮% পজিティブ ফিডব্যাক এবং ৪.৯ স্টার রেটিং। ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের রিয়েল রিভিউ ও অর্জন সমূহ।',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80',
  },
  'blog': {
    title: 'ট্রাভেল ব্লগ ও ভ্রমণ গাইড ২০২৬ | ঘুরবে (Ghurbe Tours & Travel)',
    description: 'কুয়াকাটা ও কক্সবাজার ভ্রমণের পূর্ণাঙ্গ গাইডলাইন, খরচ বাঁচানোর টিপস, হোটেল বুকিং ও সেরা দর্শনীয় স্থানসমূহ সম্পর্কে জানুন।',
    image: DEFAULT_IMAGE,
  },
  'coxs-bazar-tour-package': {
    title: 'কক্সবাজার ট্যুর প্যাকেজ ও ভ্রমণ গাইড ২০২৬ | Ghurbe Tour & Travel',
    description: 'রংপুর ও বগুড়া থেকে কক্সবাজার ট্যুর মাত্র ৪,৭৮৫ টাকায়! মেরিন ড্রাইভ ভ্রমণ, হোটেল রাত্রিযাপন ও ৫ বেলা খাবার। বুকিং হটলাইন: 01980297939',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  'SAMSUL-ARAFIN': {
    title: 'মো. সামসুল আরেফিন — প্রধান নির্বাহী কর্মকর্তা (CEO & Founder) | ঘুরবে (Ghurbe)',
    description: 'মো. সামসুল আরেফিন, প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা — ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের অফিসিয়াল লিডারশিপ প্রোফাইল। হটলাইন: 01980297939',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791998110/WhatsApp_Image_2026-10-14_at_11.13.05_PM.jpg',
  },
  'samsul-arafin': {
    title: 'মো. সামসুল আরেফিন — প্রধান নির্বাহী কর্মকর্তা (CEO & Founder) | ঘুরবে (Ghurbe)',
    description: 'মো. সামসুল আরেফিন, প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা — ঘুরবে ট্যুর অ্যান্ড ট্রাভেলের অফিসিয়াল লিডারশিপ প্রোফাইল। হটলাইন: 01980297939',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791998110/WhatsApp_Image_2026-10-14_at_11.13.05_PM.jpg',
  },
  'mahim-ibn-khudi': {
    title: 'মাহিম ইবনে খুদি — এক্সিকিউটিভ ডিরেক্টর | ঘুরবে (Ghurbe)',
    description: 'মাহিম ইবনে খুদি, এক্সিকিউটিভ ডিরেক্টর — ট্যুর পরিকল্পনা ও গ্রাহক সন্তুষ্টি পরিচালনায় নিবেদিত। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1791996767/WhatsApp_Image_2026-10-14_at_10.52.07_PM.jpg',
  },
  'adhira-nokshi': {
    title: 'অধরা নকশী — ব্র্যান্ড অ্যান্ড মার্কেটিং ডিরেক্টর | ঘুরবে (Ghurbe)',
    description: 'অধরা নকশী, ব্র্যান্ড অ্যান্ড মার্কেটিং ডিরেক্টর — প্রচারণা ও ট্রাভেলার এনগেজমেন্টে নিবেদিত। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792140786/4af20288-d4a6-44b4-ae55-86a340714f8f.png',
  },
  'adhira': {
    title: 'অধরা নকশী — ব্র্যান্ড অ্যান্ড মার্কেটিং ডিরেক্টর | ঘুরবে (Ghurbe)',
    description: 'অধরা নকশী, ব্র্যান্ড অ্যান্ড মার্কেটিং ডিরেক্টর — প্রচারণা ও ট্রাভেলার এনগেজমেন্টে নিবেদিত। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792140786/4af20288-d4a6-44b4-ae55-86a340714f8f.png',
  },
  'md-rifat-islam': {
    title: 'মো. রিফাত ইসলাম — ডিরেক্টর অফ অপারেশনস | ঘুরবে (Ghurbe)',
    description: 'মো. রিফাত ইসলাম, ডিরেক্টর অফ অপারেশনস — অন-গ্রাউন্ড পরিচালনা ও যাত্রী নিরাপত্তা তত্ত্বাবধায়ক। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792048061/WhatsApp_Image_2026-10-15_at_12.56.16_PM.jpg',
  },
  'rifat-islam': {
    title: 'মো. রিফাত ইসলাম — ডিরেক্টর অফ অপারেশনস | ঘুরবে (Ghurbe)',
    description: 'মো. রিফাত ইসলাম, ডিরেক্টর অফ অপারেশনস — অন-গ্রাউন্ড পরিচালনা ও যাত্রী নিরাপত্তা তত্ত্বাবধায়ক। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792048061/WhatsApp_Image_2026-10-15_at_12.56.16_PM.jpg',
  },
  'sidra-islam': {
    title: 'সিদরা ইসলাম — ব্র্যান্ড ম্যানেজার | ঘুরবে (Ghurbe)',
    description: 'সিদরা ইসলাম, ব্র্যান্ড ম্যানেজার — গ্রাহক অভিজ্ঞতা ও ক্যাম্পেইন ম্যানেজমেন্ট। ঘুরবে ট্যুর অ্যান্ড ট্রাভেল।',
    image: 'https://res.cloudinary.com/b5z0n3sl/image/upload/v1792049005/pexels-photo-29333677.avif',
  },
  'adminn': {
    title: 'অ্যাডমিন কন্ট্রোল পোর্টাল | ঘুরবে (Ghurbe)',
    description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেল সুরক্ষিত অ্যাডমিন ড্যাশবোর্ড ও বুকিং যাচাইকরণ।',
    image: BRAND_LOGO,
  },
  'admin': {
    title: 'অ্যাডমিন কন্ট্রোল পোর্টাল | ঘুরবে (Ghurbe)',
    description: 'ঘুরবে ট্যুর অ্যান্ড ট্রাভেল সুরক্ষিত অ্যাডমিন ড্যাশবোর্ড ও বুকিং যাচাইকরণ।',
    image: BRAND_LOGO,
  },
};

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  for (const [route, meta] of Object.entries(routeMetadata)) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const fullUrl = `${BASE_URL}/${route}`;
    const imageUrl = meta.image || DEFAULT_IMAGE;

    // Tailor specific static meta tags for this route so scrapers (Facebook, WhatsApp, Twitter, Google) get instant rich cards
    let customizedHtml = indexHtml
      .replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`)
      .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${meta.description}" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${meta.title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${meta.description}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${imageUrl}" />`)
      .replace(/<meta property="og:image:alt" content=".*?" \/>/i, `<meta property="og:image:alt" content="${meta.title}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${fullUrl}" />`)
      .replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${meta.title}" />`)
      .replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${meta.description}" />`)
      .replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${imageUrl}" />`)
      .replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${fullUrl}" />`)
      .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${fullUrl}" />`);

    // Ensure twitter:card and twitter:image:alt are present
    if (!customizedHtml.includes('name="twitter:card"')) {
      customizedHtml = customizedHtml.replace(
        '</head>',
        '    <meta name="twitter:card" content="summary_large_image" />\n  </head>'
      );
    }
    if (!customizedHtml.includes('name="twitter:image:alt"')) {
      customizedHtml = customizedHtml.replace(
        '</head>',
        `    <meta name="twitter:image:alt" content="${meta.title}" />\n  </head>`
      );
    }

    fs.writeFileSync(path.join(routeDir, 'index.html'), customizedHtml);
  }

  console.log(`Generated customized static SEO & social card entry points for ${Object.keys(routeMetadata).length} routes in dist/`);
}
