import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  FileSpreadsheet, 
  Search, 
  Download, 
  Trash2, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Layers, 
  Users, 
  TrendingUp,
  Inbox,
  LogOut,
  Sparkles,
  SlidersHorizontal,
  Home,
  Plus,
  Edit,
  Eye,
  Archive,
  Image as ImageIcon,
  Upload,
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  Percent,
  CheckSquare,
  Globe,
  Compass,
  Plane,
  Building,
  Hotel,
  Bus,
  CalendarCheck,
  CreditCard,
  BarChart3,
  FileText,
  UserCheck,
  ChevronRight,
  X,
  Share2,
  Filter
} from 'lucide-react';
import { BookingRecord, ContactMessage, TourPackage, TourItinerary } from '../types/travel';
import { 
  getGoogleSheetUrl, 
  setGoogleSheetUrl, 
  GOOGLE_APPS_SCRIPT_CODE,
  syncBookingToGoogleSheet,
  syncMessageToGoogleSheet
} from '../utils/googleSheetsSync';

interface AdminPageProps {
  onBackToHome: () => void;
  bookings: BookingRecord[];
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'completed') => void;
  onDeleteBooking: (id: string) => void;
  messages: ContactMessage[];
  onDeleteMessage: (id: string) => void;
  packages: TourPackage[];
  onUpdatePackage: (pkg: TourPackage) => void;
  onAddPackage: (pkg: TourPackage) => void;
  onDeletePackage: (id: string) => void;
  onViewPackage?: (pkg: TourPackage) => void;
  onArchivePackage?: (id: string, isArchived: boolean) => void;
}

interface VisitorLog {
  id: string;
  ip: string;
  location: string;
  pageViews: number;
  lastPage: string;
  lastTime: string;
  device: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onBackToHome,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  messages,
  onDeleteMessage,
  packages,
  onUpdatePackage,
  onAddPackage,
  onDeletePackage,
  onViewPackage,
  onArchivePackage,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ghurbe_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active navigation section
  // Categories from screenshot:
  // SERVICES: 'leads', 'tours', 'air', 'hotels', 'resorts', 'bus', 'events'
  // MANAGE: 'payments-relay', 'analytics', 'site-content'
  const [currentNav, setCurrentNav] = useState<string>('tours');

  // Tours sub-tab
  const [tourSubTab, setTourSubTab] = useState<'packages' | 'custom-requests'>('packages');
  // Package list filter: 'active' or 'archived'
  const [packageFilter, setPackageFilter] = useState<'active' | 'archived'>('active');
  const [packageSearch, setPackageSearch] = useState('');

  // Analytics sub-tabs matching Screenshot 2: 'analysis' | 'visitors' | 'passenger-list'
  const [analyticsSubTab, setAnalyticsSubTab] = useState<'analysis' | 'visitors' | 'passenger-list'>('visitors');

  // Top bar search state
  const [globalSearch, setGlobalSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Package Modal (Add / Edit)
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  // Form states for Package Edit/Create
  const [formTitle, setFormTitle] = useState('');
  const [formEnglishTitle, setFormEnglishTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState<'sea' | 'hills' | 'haor' | 'forest' | 'heritage' | 'domestic'>('sea');
  const [formCategoryLabel, setFormCategoryLabel] = useState('সৈকত ও সাগর');
  const [formLocation, setFormLocation] = useState('');
  const [formDays, setFormDays] = useState(3);
  const [formNights, setFormNights] = useState(2);
  const [formDurationText, setFormDurationText] = useState('৩ দিন / ২ রাত');
  const [formPrice, setFormPrice] = useState(5499);
  const [formOriginalPrice, setFormOriginalPrice] = useState(6999);
  const [formCouplePrice, setFormCouplePrice] = useState(12500);
  const [formBadge, setFormBadge] = useState('🔥 ধামাকা অফার');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formDepartureDate, setFormDepartureDate] = useState('১২ নভেম্বর ২০২৬');
  const [formPickupPoint, setFormPickupPoint] = useState('ঢাকা (সায়দাবাদ / আরামবাগ / গাবতলী)');
  const [formSeatsLeft, setFormSeatsLeft] = useState(8);
  const [formTotalSeats, setFormTotalSeats] = useState(40);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formHighlights, setFormHighlights] = useState<string>('সূর্যোদয় ও সূর্যাস্ত দর্শন, লাল কাঁকড়া চর ও লেম্বুর চর ভ্রমণ, প্রিমিয়াম এসি বাস ও সমুদ্রভিউ রিসোর্ট, স্বাস্থ্যকর খাবার');
  const [formIncludes, setFormIncludes] = useState<string>('ঢাকা-কুয়াকাটা-ঢাকা এসি বাস টিকিট, ৩ তারা বা অনুরূপ রিসোর্টে রাত্রিযাপন, প্রতিদিন সকালের নাস্তা, দুপুর ও রাতের খাবার, পেশাদার গাইড সার্ভিস');
  const [formExcludes, setFormExcludes] = useState<string>('ব্যক্তিগত খরচ ও কেনাকাটা, ট্রাভেল ইন্স্যুরেন্স, প্যাকেজের বাইরে কোনো খাবার বা পানীয়');

  // Google Sheets state
  const [sheetUrl, setSheetUrl] = useState(getGoogleSheetUrl());
  const [sheetSaved, setSheetSaved] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [batchSyncStatus, setBatchSyncStatus] = useState<string | null>(null);

  // PIN settings
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Visitor Tracking Log (Dynamic + fallback realistic data matching screenshot 2)
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    try {
      const saved = localStorage.getItem('ghurbe_analytics_visitors');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: 'vis-1',
        ip: '103.145.74.22',
        location: 'Dhaka, Bangladesh',
        pageViews: 14,
        lastPage: '/kuakata',
        lastTime: '২ মিনিট আগে',
        device: 'Mobile (Android / Chrome)'
      },
      {
        id: 'vis-2',
        ip: '182.160.118.4',
        location: 'Chittagong, Bangladesh',
        pageViews: 8,
        lastPage: '/packages',
        lastTime: '১০ মিনিট আগে',
        device: 'Desktop (Windows / Chrome)'
      },
      {
        id: 'vis-3',
        ip: '103.174.152.18',
        location: 'Barisal, Bangladesh',
        pageViews: 5,
        lastPage: '/kuakata',
        lastTime: '২৫ মিনিট আগে',
        device: 'Mobile (iOS / Safari)'
      },
      {
        id: 'vis-4',
        ip: '202.134.12.89',
        location: 'Sylhet, Bangladesh',
        pageViews: 11,
        lastPage: '/about',
        lastTime: '১ ঘণ্টা আগে',
        device: 'Desktop (macOS / Safari)'
      },
      {
        id: 'vis-5',
        ip: '119.30.38.162',
        location: 'Khulna, Bangladesh',
        pageViews: 6,
        lastPage: '/why-us',
        lastTime: '২ ঘণ্টা আগে',
        device: 'Mobile (Samsung / Chrome)'
      }
    ];
  });

  // Track current visit to update visitor count
  useEffect(() => {
    try {
      const count = parseInt(localStorage.getItem('ghurbe_total_pageviews') || '142', 10) + 1;
      localStorage.setItem('ghurbe_total_pageviews', count.toString());
    } catch {}
  }, []);

  const getAdminPin = () => {
    try {
      return localStorage.getItem('ghurbe_admin_pin') || '815029';
    } catch {
      return '815029';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = pinInput.trim();
    if (entered === getAdminPin() || entered === '815029') {
      setIsAuthenticated(true);
      setPinError(false);
      try {
        sessionStorage.setItem('ghurbe_admin_auth', 'true');
      } catch {}
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    try {
      sessionStorage.removeItem('ghurbe_admin_auth');
    } catch {}
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Open modal for editing package
  const handleOpenEditModal = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setIsCreatingNew(false);
    setFormTitle(pkg.title);
    setFormEnglishTitle(pkg.englishTitle || '');
    setFormSlug(pkg.slug);
    setFormCategory(pkg.category || 'sea');
    setFormCategoryLabel(pkg.categoryLabel || 'সৈকত ও সাগর');
    setFormLocation(pkg.location);
    setFormDays(pkg.duration?.days || 3);
    setFormNights(pkg.duration?.nights || 2);
    setFormDurationText(pkg.duration?.textBn || `${pkg.duration?.days || 3} দিন / ${pkg.duration?.nights || 2} রাত`);
    setFormPrice(pkg.price);
    setFormOriginalPrice(pkg.originalPrice || pkg.price + 1500);
    setFormCouplePrice(pkg.couplePrice || pkg.price * 2 - 500);
    setFormBadge(pkg.badge || '🔥 ধামাকা অফার');
    setFormCoverImage(pkg.coverImage);
    setImagePreviewUrl(pkg.coverImage);
    setFormDepartureDate(pkg.departureDateText || pkg.departureDates?.[0] || '১২ নভেম্বর ২০২৬');
    setFormPickupPoint(pkg.pickupPoint || 'ঢাকা (সায়দাবাদ / আরামবাগ / গাবতলী)');
    setFormSeatsLeft(pkg.seatsLeft || 8);
    setFormTotalSeats(pkg.totalSeats || 40);
    setFormShortDesc(pkg.shortDesc || '');
    setFormHighlights(pkg.highlights ? pkg.highlights.join(', ') : '');
    setFormIncludes(pkg.includes ? pkg.includes.join(', ') : '');
    setFormExcludes(pkg.excludes ? pkg.excludes.join(', ') : '');
    setModalOpen(true);
  };

  // Open modal for creating new package
  const handleOpenCreateModal = () => {
    setEditingPackage(null);
    setIsCreatingNew(true);
    const id = 'pkg-' + Date.now();
    setFormTitle('');
    setFormEnglishTitle('');
    setFormSlug('tour-' + Date.now().toString().slice(-4));
    setFormCategory('sea');
    setFormCategoryLabel('সৈকত ও সাগর');
    setFormLocation('কুয়াকাটা / কক্সবাজার');
    setFormDays(3);
    setFormNights(2);
    setFormDurationText('৩ দিন / ২ রাত');
    setFormPrice(5499);
    setFormOriginalPrice(6999);
    setFormCouplePrice(12500);
    setFormBadge('🔥 ধামাকা অফার');
    setFormCoverImage('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');
    setImagePreviewUrl('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');
    setFormDepartureDate('১২ নভেম্বর ২০২৬');
    setFormPickupPoint('ঢাকা (সায়দাবাদ / আরামবাগ / গাবতলী)');
    setFormSeatsLeft(10);
    setFormTotalSeats(40);
    setFormShortDesc('ঘুরবে ডট কম এর সাথে উপভোগ করুন চমৎকার ট্যুর প্যাকেজ।');
    setFormHighlights('সূর্যোদয় ও সূর্যাস্ত দর্শন, লাল কাঁকড়া চর ও লেম্বুর চর ভ্রমণ, প্রিমিয়াম এসি বাস ও রিসোর্ট');
    setFormIncludes('ঢাকা-গন্তব্য-ঢাকা এসি বাস টিকিট, ৩ তারা বা অনুরূপ রিসোর্টে রাত্রিযাপন, প্রতিদিন সকালের নাস্তা, দুপুর ও রাতের খাবার');
    setFormExcludes('ব্যক্তিগত খরচ ও কেনাকাটা, ট্রাভেল ইন্স্যুরেন্স');
    setModalOpen(true);
  };

  // Image Upload handler via FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('ছবির সাইজ ৫MB এর কম হতে হবে!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setFormCoverImage(base64);
        setImagePreviewUrl(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save package handler
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('প্যাকেজের শিরোনাম দিন');
      return;
    }

    const highlightsArr = formHighlights.split(',').map((s) => s.trim()).filter(Boolean);
    const includesArr = formIncludes.split(',').map((s) => s.trim()).filter(Boolean);
    const excludesArr = formExcludes.split(',').map((s) => s.trim()).filter(Boolean);

    if (isCreatingNew) {
      const newPkg: TourPackage = {
        id: 'pkg-' + Date.now(),
        title: formTitle.trim(),
        englishTitle: formEnglishTitle.trim() || formTitle.trim(),
        slug: formSlug.trim() || 'pkg-' + Date.now().toString().slice(-4),
        category: formCategory,
        categoryLabel: formCategoryLabel,
        location: formLocation.trim() || 'বাংলাদেশ',
        duration: {
          days: formDays,
          nights: formNights,
          textBn: formDurationText.trim() || `${formDays} দিন / ${formNights} রাত`,
        },
        price: formPrice,
        originalPrice: formOriginalPrice,
        couplePrice: formCouplePrice,
        rating: 4.9,
        reviewCount: 32,
        badge: formBadge.trim(),
        coverImage: formCoverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          formCoverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
        ],
        shortDesc: formShortDesc.trim() || 'ঘুরবে ডট কম এর সাথে চমৎকার ট্যুর প্যাকেজ।',
        fullDesc: formShortDesc.trim() || 'ঘুরবে ডট কম এর সাথে চমৎকার ট্যুর প্যাকেজ।',
        highlights: highlightsArr.length > 0 ? highlightsArr : ['চমৎকার ভ্রমণ অভিজ্ঞতা', 'পেশাদার গাইড'],
        itinerary: [
          { day: 1, title: 'যাত্রা ও পৌঁছানো', description: 'ঢাকা থেকে নির্ধারিত সময়ে যাত্রা এবং রিসোর্টে চেক-ইন।', meals: ['ডিনার'] },
          { day: 2, title: 'দর্শনীয় স্থান পরিদর্শন', description: 'মূল দর্শনীয় স্থানগুলো ভ্রমণ ও আনন্দময় সময়।', meals: ['নাস্তা', 'লাঞ্চ', 'ডিনার'] },
          { day: 3, title: 'প্রস্থান ও ঢাকায় ফেরা', description: 'সকালের নাস্তা শেষে ঢাকার উদ্দেশ্যে যাত্রা।', meals: ['নাস্তা'] },
        ],
        includes: includesArr.length > 0 ? includesArr : ['এসি বাস', 'হোটেল', 'খাবার'],
        excludes: excludesArr.length > 0 ? excludesArr : ['ব্যক্তিগত খরচ'],
        departureDates: [formDepartureDate.trim()],
        departureDateText: formDepartureDate.trim(),
        pickupPoint: formPickupPoint.trim(),
        groupSize: '১৫-৪০ জন',
        seatsLeft: formSeatsLeft,
        totalSeats: formTotalSeats,
        archived: false,
      };

      onAddPackage(newPkg);
    } else if (editingPackage) {
      const updatedPkg: TourPackage = {
        ...editingPackage,
        title: formTitle.trim(),
        englishTitle: formEnglishTitle.trim() || editingPackage.englishTitle,
        slug: formSlug.trim() || editingPackage.slug,
        category: formCategory,
        categoryLabel: formCategoryLabel,
        location: formLocation.trim(),
        duration: {
          days: formDays,
          nights: formNights,
          textBn: formDurationText.trim(),
        },
        price: formPrice,
        originalPrice: formOriginalPrice,
        couplePrice: formCouplePrice,
        badge: formBadge.trim(),
        coverImage: formCoverImage || editingPackage.coverImage,
        departureDates: [formDepartureDate.trim(), ...(editingPackage.departureDates?.slice(1) || [])],
        departureDateText: formDepartureDate.trim(),
        pickupPoint: formPickupPoint.trim(),
        seatsLeft: formSeatsLeft,
        totalSeats: formTotalSeats,
        shortDesc: formShortDesc.trim() || editingPackage.shortDesc,
        highlights: highlightsArr.length > 0 ? highlightsArr : editingPackage.highlights,
        includes: includesArr.length > 0 ? includesArr : editingPackage.includes,
        excludes: excludesArr.length > 0 ? excludesArr : editingPackage.excludes,
      };

      onUpdatePackage(updatedPkg);
    }

    setModalOpen(false);
  };

  // Handle archive toggle
  const handleToggleArchive = (pkg: TourPackage) => {
    const newArchived = !pkg.archived;
    if (onArchivePackage) {
      onArchivePackage(pkg.id, newArchived);
    } else {
      onUpdatePackage({
        ...pkg,
        archived: newArchived,
      });
    }
  };

  // Filter packages based on active/archived tabs and search
  const activePackages = packages.filter((p) => !p.archived);
  const archivedPackages = packages.filter((p) => Boolean(p.archived));
  const currentPackageList = packageFilter === 'active' ? activePackages : archivedPackages;

  const filteredPackages = currentPackageList.filter((p) => {
    const q = packageSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      (p.englishTitle && p.englishTitle.toLowerCase().includes(q)) ||
      p.location.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  });

  // Calculate stats for Analytics view
  const totalBookingsCount = bookings.length;
  const confirmedBookingsCount = bookings.filter((b) => b.paymentStatus === 'confirmed' || b.paymentStatus === 'completed').length;
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'confirmed' || b.paymentStatus === 'completed')
    .reduce((acc, curr) => acc + (curr.advancePaid || 0), 0);
  const totalExpectedRevenue = bookings.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

  // If not authenticated, render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700/80 rounded-2xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">ঘুরবে ডট কম অ্যাডমিন</h2>
          <p className="text-slate-400 text-sm text-center mb-6">
            ম্যানেজমেন্ট পোর্টাল অ্যাক্সেস করতে ৬ সংখ্যার পিন প্রদান করুন
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                অ্যাডমিন সিকিউরিটি পিন (ডিফল্ট: 815029)
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="******"
                  className={`w-full bg-slate-950 border ${
                    pinError ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-700 focus:border-emerald-500'
                  } rounded-xl py-3.5 px-4 text-white text-center text-2xl tracking-[0.3em] font-mono outline-none transition`}
                  autoFocus
                />
                <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
              {pinError && (
                <p className="text-rose-400 text-xs mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  ভুল পিন কোড! সঠিক পিন টাইপ করুন (815029)।
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-950/50 transition cursor-pointer"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              ওয়েবসাইটে ফিরে যান
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-800 antialiased font-sans">
      {/* 
        ========================================================================
        LEFT SIDEBAR: Exact deep dark emerald green matching Screenshots 1 & 2
        ========================================================================
      */}
      <aside className="w-64 bg-[#053d2e] text-white flex flex-col shrink-0 border-r border-[#03291e] min-h-screen select-none">
        {/* Brand Header */}
        <div className="p-4 border-b border-emerald-900/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              <span>Ghurbe.com</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">v2.4</span>
            </div>
            <p className="text-xs text-emerald-300/80">অ্যাডমিন প্যানেল</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
          {/* Section: SERVICES */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-emerald-300/60 mb-2">
              SERVICES
            </p>
            <nav className="space-y-1">
              {/* Leads & Contact */}
              <button
                onClick={() => setCurrentNav('leads')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'leads'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 shrink-0" />
                  <span>লিড ও যোগাযোগ</span>
                </div>
                {(bookings.length > 0 || messages.length > 0) && (
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                    currentNav === 'leads' ? 'bg-[#064e3b] text-white' : 'bg-emerald-700/60 text-emerald-100'
                  }`}>
                    {bookings.length + messages.length}
                  </span>
                )}
              </button>

              {/* Tour Management (Screenshot 1 Active) */}
              <button
                onClick={() => setCurrentNav('tours')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'tours'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>ট্যুর ম্যানেজমেন্ট</span>
                </div>
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                  currentNav === 'tours' ? 'bg-[#064e3b] text-white' : 'bg-emerald-700/60 text-emerald-100'
                }`}>
                  {packages.length}
                </span>
              </button>

              {/* Air Ticketing */}
              <button
                onClick={() => setCurrentNav('air')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'air'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <Plane className="w-4 h-4 shrink-0" />
                <span>এয়ার টিকিটিং</span>
              </button>

              {/* Hotel Booking */}
              <button
                onClick={() => setCurrentNav('hotels')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'hotels'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4 shrink-0" />
                <span>হোটেল বুকিং</span>
              </button>

              {/* Resort Booking */}
              <button
                onClick={() => setCurrentNav('resorts')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'resorts'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <Hotel className="w-4 h-4 shrink-0" />
                <span>রিসোর্ট বুকিং</span>
              </button>

              {/* Bus Booking */}
              <button
                onClick={() => setCurrentNav('bus')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'bus'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <Bus className="w-4 h-4 shrink-0" />
                <span>বাস বুকিং</span>
              </button>

              {/* Event Management */}
              <button
                onClick={() => setCurrentNav('events')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'events'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>ইভেন্ট ম্যানেজমেন্ট</span>
              </button>
            </nav>
          </div>

          {/* Section: MANAGE */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-emerald-300/60 mb-2">
              MANAGE
            </p>
            <nav className="space-y-1">
              {/* Payments & Relay */}
              <button
                onClick={() => setCurrentNav('payments-relay')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'payments-relay'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>পেমেন্ট ও Relay</span>
              </button>

              {/* Report & Visitors (Screenshot 2 Active) */}
              <button
                onClick={() => setCurrentNav('analytics')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'analytics'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>রিপোর্ট ও ভিজিটর</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* Site & Content */}
              <button
                onClick={() => setCurrentNav('site-content')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentNav === 'site-content'
                    ? 'bg-[#e6f4ea] text-[#064e3b] font-bold shadow-sm'
                    : 'text-emerald-100/90 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>সাইট ও কনটেন্ট</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-emerald-900/60 space-y-2">
          <button
            onClick={onBackToHome}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-emerald-200/90 hover:bg-emerald-900/40 hover:text-white transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>ওয়েবসাইট দেখুন</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>

          {/* User Session Profile Card */}
          <div className="pt-2 border-t border-emerald-900/40 flex items-center gap-2.5 px-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-emerald-700 border border-emerald-500/40 flex items-center justify-center font-bold text-white text-xs">
                G
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#053d2e]" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">ঘুরবে টিম</p>
              <p className="text-[10px] text-emerald-300/70 truncate">অ্যাডমিন সেশন</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 
        ========================================================================
        MAIN CONTENT WORKSPACE AREA
        ========================================================================
      */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Navigation Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hover:text-slate-800 transition">Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800 capitalize">
              {currentNav === 'tours' && 'Tours'}
              {currentNav === 'analytics' && 'Analytics'}
              {currentNav === 'leads' && 'Leads & Inquiries'}
              {currentNav === 'payments-relay' && 'Payments & Relay'}
              {currentNav === 'air' && 'Air Ticketing'}
              {currentNav === 'hotels' && 'Hotel Booking'}
              {currentNav === 'resorts' && 'Resort Booking'}
              {currentNav === 'bus' && 'Bus Booking'}
              {currentNav === 'events' && 'Event Management'}
              {currentNav === 'site-content' && 'Site & Content'}
            </span>
          </div>

          {/* Center Search Input */}
          <div className="relative w-80 max-w-sm hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="🔍 ট্যুর বুকিং: নাম, ফোন বা নম্বর..."
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 rounded-xl py-1.5 pl-9 pr-4 text-xs text-slate-800 outline-none transition"
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              title="রিফ্রেশ করুন"
              className={`p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition cursor-pointer ${
                isRefreshing ? 'animate-spin text-emerald-600' : ''
              }`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentNav('leads')}
              title="নতুন নোটিফিকেশন"
              className="relative p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <Inbox className="w-4 h-4" />
              {bookings.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2 pl-1">
              <div className="w-7 h-7 rounded-full bg-[#053d2e] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                G
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Main Workspace View */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* 
            --------------------------------------------------------------------
            VIEW 1: ট্যুর ম্যানেজমেন্ট (Screenshot 1 Match)
            --------------------------------------------------------------------
          */}
          {currentNav === 'tours' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* View Header with Title and Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    ট্যুর প্যাকেজ ম্যানেজমেন্ট
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    প্যাকেজের ছবি, অফার, সিট সংখ্যা ও মূল্য লাইভ আপডেট করুন
                  </p>
                </div>

                <button
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center justify-center gap-2 bg-[#053d2e] hover:bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ নতুন প্যাকেজ</span>
                </button>
              </div>

              {/* Sub-Tabs: প্যাকেজ ও প্রকাশ | কাস্টম ট্যুরের অনুরোধ */}
              <div className="flex items-center gap-6 border-b border-slate-200">
                <button
                  onClick={() => setTourSubTab('packages')}
                  className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    tourSubTab === 'packages'
                      ? 'border-[#053d2e] text-[#053d2e]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  প্যাকেজ ও প্রকাশ
                </button>
                <button
                  onClick={() => setTourSubTab('custom-requests')}
                  className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    tourSubTab === 'custom-requests'
                      ? 'border-[#053d2e] text-[#053d2e]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  কাস্টম ট্যুরের অনুরোধ ({bookings.filter(b => b.roomType === 'couple' || b.guestsCount > 4).length})
                </button>
              </div>

              {tourSubTab === 'packages' ? (
                <>
                  {/* Secondary Filter Bar: প্যাকেজ (N) | সরানো / আর্কাইভ (N) + Search */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPackageFilter('active')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          packageFilter === 'active'
                            ? 'bg-[#e6f4ea] text-[#064e3b]'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        প্যাকেজ ({activePackages.length})
                      </button>
                      <button
                        onClick={() => setPackageFilter('archived')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          packageFilter === 'archived'
                            ? 'bg-[#e6f4ea] text-[#064e3b]'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        সরানো / আর্কাইভ ({archivedPackages.length})
                      </button>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={packageSearch}
                        onChange={(e) => setPackageSearch(e.target.value)}
                        placeholder="প্যাকেজ খুঁজুন..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-xs outline-none focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>

                  {/* 2-Column Package Card Grid matching Screenshot 1 */}
                  {filteredPackages.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                      <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-600 font-semibold text-sm">কোনো প্যাকেজ খুঁজে পাওয়া যায়নি</p>
                      <p className="text-slate-400 text-xs mt-1">
                        {packageFilter === 'archived' ? 'আর্কাইভে কোনো প্যাকেজ নেই' : 'নতুন প্যাকেজ তৈরি করতে ওপরের বাটন চাপুন'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {filteredPackages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                        >
                          <div>
                            {/* Card Image Banner with Badges */}
                            <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
                              <img
                                src={pkg.coverImage}
                                alt={pkg.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  // Fallback placeholder image
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                              {/* Badges on Top */}
                              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                <span className="bg-emerald-600/95 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                                  {pkg.badge || '🔥 স্পেশাল অফার'}
                                </span>
                                <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  {pkg.categoryLabel || 'প্যাকেজ'}
                                </span>
                              </div>

                              {/* Title and duration over image bottom */}
                              <div className="absolute bottom-3 left-3 right-3 text-white">
                                <h3 className="font-bold text-base leading-snug line-clamp-1 drop-shadow-sm">
                                  {pkg.title}
                                </h3>
                                <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5">
                                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{pkg.location}</span>
                                  <span>•</span>
                                  <span>{pkg.duration.textBn}</span>
                                </p>
                              </div>
                            </div>

                            {/* Card Body Details */}
                            <div className="p-4 space-y-3">
                              {/* Price Row */}
                              <div className="flex items-baseline justify-between">
                                <div>
                                  <span className="text-xl font-bold text-[#053d2e]">
                                    ৳ {pkg.price.toLocaleString('bn-BD')}
                                  </span>
                                  {pkg.originalPrice && (
                                    <span className="text-xs text-slate-400 line-through ml-2">
                                      ৳ {pkg.originalPrice.toLocaleString('bn-BD')}
                                    </span>
                                  )}
                                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded ml-2">
                                      ছাড় ৳ {(pkg.originalPrice - pkg.price).toLocaleString('bn-BD')}
                                    </span>
                                  )}
                                </div>

                                {pkg.couplePrice && (
                                  <div className="text-right text-[11px] text-slate-500 font-medium">
                                    👫 কাপল: <span className="font-bold text-slate-800">৳ {pkg.couplePrice.toLocaleString('bn-BD')}</span>
                                  </div>
                                )}
                              </div>

                              {/* Dates & Seats info */}
                              <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>যাত্রা: {pkg.departureDateText || pkg.departureDates?.[0] || '১২ নভেম্বর'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5 text-amber-600" />
                                  <span>সিট বাকি: <strong className="text-slate-800">{pkg.seatsLeft || 8}</strong> / {pkg.totalSeats || 40}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Row matching Screenshot 1 */}
                          <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                            {/* Amber Edit Button */}
                            <button
                              onClick={() => handleOpenEditModal(pkg)}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>✏️ এডিট</span>
                            </button>

                            {/* Demo/Preview Button */}
                            <button
                              onClick={() => {
                                if (onViewPackage) {
                                  onViewPackage(pkg);
                                } else {
                                  window.open(`/#/packages`, '_blank');
                                }
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>👁️ ডেমো করুন</span>
                            </button>

                            {/* Archive or Restore Button */}
                            <button
                              onClick={() => handleToggleArchive(pkg)}
                              title={pkg.archived ? 'পুনরুদ্ধার করুন' : 'আর্কাইভ করুন'}
                              className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                pkg.archived
                                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                                  : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600'
                              }`}
                            >
                              {pkg.archived ? <RefreshCw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Custom Tour Requests Subtab */
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <h3 className="font-bold text-slate-800 text-base">কাস্টম ও গ্রুপ ট্যুরের অনুরোধ</h3>
                  <div className="divide-y divide-slate-100">
                    {bookings.filter(b => b.roomType === 'couple' || b.guestsCount > 4).length === 0 ? (
                      <p className="text-slate-500 text-xs py-4 text-center">এখনও কোনো কাস্টম ট্যুর অনুরোধ নেই।</p>
                    ) : (
                      bookings
                        .filter(b => b.roomType === 'couple' || b.guestsCount > 4)
                        .map(b => (
                          <div key={b.id} className="py-3 flex items-center justify-between text-xs">
                            <div>
                              <p className="font-bold text-slate-800">{b.travelerName} • {b.phone}</p>
                              <p className="text-slate-500">{b.packageTitle} ({b.guestsCount} জন, {b.roomType})</p>
                            </div>
                            <a
                              href={`https://wa.me/880${b.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`সালামু আলাইকুম ${b.travelerName}, ঘুরবে ডট কম থেকে আপনার কাস্টম ট্যুর অনুসন্ধানের বিষয়ে যোগাযোগ করছি।`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 
            --------------------------------------------------------------------
            VIEW 2: রিপোর্ট ও ভিজিটর (Screenshot 2 Match)
            --------------------------------------------------------------------
          */}
          {currentNav === 'analytics' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  রিপোর্ট ও ভিজিটর
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  লাইভ ওয়েব ট্রাফিক, ভিজিটর ও বুকিং অ্যানালিটিক্স
                </p>
              </div>

              {/* Sub-Tabs: বুকিং ও টাকার বিশ্লেষণ | ভিজিটর ও অবস্থান | করণীয়, যাত্রী তালিকা */}
              <div className="flex items-center gap-6 border-b border-slate-200">
                <button
                  onClick={() => setAnalyticsSubTab('analysis')}
                  className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    analyticsSubTab === 'analysis'
                      ? 'border-[#053d2e] text-[#053d2e]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  বুকিং ও টাকার বিশ্লেষণ
                </button>
                <button
                  onClick={() => setAnalyticsSubTab('visitors')}
                  className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    analyticsSubTab === 'visitors'
                      ? 'border-[#053d2e] text-[#053d2e]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ভিজিটর ও অবস্থান
                </button>
                <button
                  onClick={() => setAnalyticsSubTab('passenger-list')}
                  className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer ${
                    analyticsSubTab === 'passenger-list'
                      ? 'border-[#053d2e] text-[#053d2e]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  করণীয়, যাত্রী তালিকা ({bookings.length})
                </button>
              </div>

              {/* Top KPI Cards (Screenshot 2 style: আলাদা IP, পেজ ভিউ, etc.) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Metric 1: আলাদা IP */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500">আলাদা IP</p>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    {visitorLogs.length}
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <span>+১০০% আজ</span>
                  </p>
                </div>

                {/* Metric 2: পেজ ভিউ */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500">পেজ ভিউ</p>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    {visitorLogs.reduce((acc, curr) => acc + curr.pageViews, 0) + (parseInt(localStorage.getItem('ghurbe_total_pageviews') || '14', 10))}
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    লাইভ ট্রাফিক কাউন্টার
                  </p>
                </div>

                {/* Metric 3: মোট বুকিং লিড */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500">মোট বুকিং লিড</p>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    {totalBookingsCount}
                  </h3>
                  <p className="text-[11px] text-indigo-600 font-medium mt-1">
                    ৳ {totalExpectedRevenue.toLocaleString('bn-BD')} মোট সাইজ
                  </p>
                </div>

                {/* Metric 4: সংগৃহীত অগ্রিম */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500">সংগৃহীত অগ্রিম</p>
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-700 mt-2">
                    ৳ {totalRevenue.toLocaleString('bn-BD')}
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    {confirmedBookingsCount} টি নিশ্চিত বুকিং
                  </p>
                </div>
              </div>

              {/* Subtab Content */}
              {analyticsSubTab === 'visitors' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">ভিজিটর ও অবস্থান বিশ্লেষণ</h3>
                      <p className="text-slate-400 text-xs">ওয়েবসাইট ভিজিটকারীদের আইপি, শহর ও পেজ ভিউ লগ</p>
                    </div>
                    <button
                      onClick={handleRefresh}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>রিফ্রেশ লগ</span>
                    </button>
                  </div>

                  {/* Table matching Screenshot 2 */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-3 px-4">IP address</th>
                          <th className="py-3 px-4">আনুমানিক লোকেশন</th>
                          <th className="py-3 px-4">পেজ ভিউ</th>
                          <th className="py-3 px-4">সর্বশেষ পেজ</th>
                          <th className="py-3 px-4">সর্বশেষ সময়</th>
                          <th className="py-3 px-4">ডিভাইস / ব্রাউজার</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {visitorLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-4 font-mono font-medium text-slate-900">
                              {log.ip}
                            </td>
                            <td className="py-3 px-4 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{log.location}</span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-mono">
                                {log.pageViews}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono text-emerald-800">
                              {log.lastPage}
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {log.lastTime}
                            </td>
                            <td className="py-3 px-4 text-slate-500 truncate max-w-xs">
                              {log.device}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {analyticsSubTab === 'analysis' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">জনপ্রিয় গন্তব্যের চাহিদা</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700">কুয়াকাটা স্পেশাল (১২ নভেম্বর)</span>
                          <span className="font-bold text-emerald-700">৭২%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: '72%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700">সাজেক ভ্যালি মেঘের বাড়ি</span>
                          <span className="font-bold text-emerald-700">৪৮%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: '48%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700">কক্সবাজার সমুদ্র সৈকত</span>
                          <span className="font-bold text-emerald-700">৩৫%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: '35%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm">পেমেন্ট মেথড বিভাজন</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 bg-pink-50 rounded-xl">
                        <span className="font-semibold text-pink-700">bKash (বিকাশ)</span>
                        <span className="font-bold text-slate-800">
                          {bookings.filter(b => b.paymentMethod === 'bkash').length} টি
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-orange-50 rounded-xl">
                        <span className="font-semibold text-orange-700">Nagad (নগদ)</span>
                        <span className="font-bold text-slate-800">
                          {bookings.filter(b => b.paymentMethod === 'nagad').length} টি
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl">
                        <span className="font-semibold text-slate-700">Bank / Others (ব্যাংক / অন্যান্য)</span>
                        <span className="font-bold text-slate-800">
                          {bookings.filter(b => b.paymentMethod !== 'bkash' && b.paymentMethod !== 'nagad').length} টি
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analyticsSubTab === 'passenger-list' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">যাত্রী তালিকা ও ট্রিপ শিট</h3>
                      <p className="text-slate-400 text-xs">বুকিংকারী যাত্রীদের আসন ও অর্থ পরিশোধের তালিকা</p>
                    </div>
                    <button
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," 
                          + "Booking Code,Name,Phone,Package,Travelers,Advance,Status\n"
                          + bookings.map(b => `${b.bookingCode},${b.travelerName},${b.phone},${b.packageTitle},${b.guestsCount},${b.advancePaid},${b.paymentStatus}`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", `ghurbe_passenger_list_${Date.now()}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV ডাউনলোড</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-3 px-4">কোড</th>
                          <th className="py-3 px-4">যাত্রীর নাম</th>
                          <th className="py-3 px-4">ফোন</th>
                          <th className="py-3 px-4">প্যাকেজ</th>
                          <th className="py-3 px-4">আসন</th>
                          <th className="py-3 px-4">অগ্রিম</th>
                          <th className="py-3 px-4">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.bookingCode}</td>
                            <td className="py-3 px-4 font-semibold text-slate-800">{b.travelerName}</td>
                            <td className="py-3 px-4 font-mono">{b.phone}</td>
                            <td className="py-3 px-4">{b.packageTitle}</td>
                            <td className="py-3 px-4 font-bold">{b.guestsCount} জন</td>
                            <td className="py-3 px-4 font-bold text-emerald-700">৳ {b.advancePaid.toLocaleString('bn-BD')}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                b.paymentStatus === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                b.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {b.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 
            --------------------------------------------------------------------
            VIEW 3: লিড ও যোগাযোগ (Leads & Inquiries)
            --------------------------------------------------------------------
          */}
          {currentNav === 'leads' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    লিড, বুকিং ও কাস্টমার যোগাযোগ
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    যাত্রীদের সরাসরি ফোন দিন, হোয়াটসঅ্যাপ করুন অথবা কনফার্ম করুন
                  </p>
                </div>
              </div>

              {/* Bookings List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">ট্যুর বুকিং রিকোয়েস্ট ({bookings.length})</h3>
                  <span className="text-xs text-slate-400">লাইভ আপডেট</span>
                </div>

                {bookings.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-xs">
                    কোনো বুকিং রিকোয়েস্ট নেই।
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {booking.bookingCode}
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm">{booking.travelerName}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              booking.paymentStatus === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              booking.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {booking.paymentStatus === 'confirmed' ? 'কনফার্মড' : booking.paymentStatus === 'pending' ? 'পেন্ডিং' : booking.paymentStatus}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600">
                            <strong>{booking.packageTitle}</strong> • {booking.guestsCount} জন যাত্রী ({booking.roomType}) • যাত্রা: {booking.date}
                          </p>
                          <p className="text-xs text-slate-500">
                            মোট: <strong>৳ {booking.totalPrice.toLocaleString('bn-BD')}</strong> | অগ্রিম: <strong className="text-emerald-700">৳ {booking.advancePaid.toLocaleString('bn-BD')}</strong> ({booking.paymentMethod.toUpperCase()})
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Call Button */}
                          <a
                            href={`tel:${booking.phone}`}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                            title="কল করুন"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* WhatsApp Chat Button */}
                          <a
                            href={`https://wa.me/880${booking.phone.replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`সালামু আলাইকুম ${booking.travelerName}, ঘুরবে ডট কম থেকে আপনার ${booking.packageTitle} বুকিং নিশ্চিতকরণের বিষয়ে যোগাযোগ করছি।`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition"
                            title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Toggle Status */}
                          <button
                            onClick={() => {
                              const nextStatus = booking.paymentStatus === 'confirmed' ? 'pending' : 'confirmed';
                              onUpdateBookingStatus(booking.id, nextStatus);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              booking.paymentStatus === 'confirmed'
                                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {booking.paymentStatus === 'confirmed' ? 'পেন্ডিং করুন' : 'কনফার্ম করুন'}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm('এই বুকিংটি ডিলিট করতে চান?')) {
                                onDeleteBooking(booking.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Messages from Contact Form */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">ইনকোয়ারি ও মেসেজ ({messages.length})</h3>
                </div>

                {messages.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    কোনো মেসেজ নেই।
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-4 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 text-xs">{msg.name} • <span className="font-mono text-emerald-700">{msg.phone}</span></p>
                          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">{msg.message}</p>
                          <p className="text-[10px] text-slate-400">{msg.createdAt || (msg as any).date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/880${msg.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-emerald-50 text-emerald-700 rounded-lg"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => onDeleteMessage(msg.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 
            --------------------------------------------------------------------
            VIEW 4: পেমেন্ট ও Relay (Google Sheets & PIN Setup)
            --------------------------------------------------------------------
          */}
          {currentNav === 'payments-relay' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  পেমেন্ট, অটোমেশন ও Google Sheets Relay
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  বুকিং ডাটা রিয়েল-টাইমে গুগল শিটে সিঙ্ক এবং অ্যাডমিন সিকিউরিটি কনফিগার করুন
                </p>
              </div>

              {/* Google Sheets Webhook Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Google Sheets Webhook URL</h3>
                    <p className="text-xs text-slate-500">বুকিং হলে স্বয়ংক্রিয়ভাবে আপনার গুগল শিটে নতুন সারি যুক্ত হবে</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-3 text-xs font-mono outline-none"
                  />
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setGoogleSheetUrl(sheetUrl);
                        setSheetSaved(true);
                        setTimeout(() => setSheetSaved(false), 2500);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      {sheetSaved ? '✓ সেভ হয়েছে' : 'Webhook URL সেভ করুন'}
                    </button>

                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
                          setCodeCopied(true);
                          setTimeout(() => setCodeCopied(false), 2000);
                        }
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{codeCopied ? 'কপি সম্পন্ন!' : 'Apps Script কোড কপি করুন'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Security PIN Change Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">অ্যাডমিন সিকিউরিটি পিন পরিবর্তন</h3>
                    <p className="text-xs text-slate-500">বর্তমান পিন: {getAdminPin()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="নতুন পিন দিন (যেমন: 815029)"
                    className="w-48 bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 text-xs font-mono outline-none"
                  />
                  <button
                    onClick={() => {
                      if (newPin.trim().length >= 4) {
                        localStorage.setItem('ghurbe_admin_pin', newPin.trim());
                        setPinChangeSuccess(true);
                        setTimeout(() => setPinChangeSuccess(false), 2500);
                        setNewPin('');
                      } else {
                        alert('পিন অন্তত ৪ অক্ষরের হতে হবে');
                      }
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    {pinChangeSuccess ? '✓ পিন আপডেট হয়েছে' : 'পিন পরিবর্তন করুন'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 
            --------------------------------------------------------------------
            OTHER SERVICE TABS: Air, Hotel, Resort, Bus, Events, Site
            --------------------------------------------------------------------
          */}
          {(['air', 'hotels', 'resorts', 'bus', 'events', 'site-content'].includes(currentNav)) && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight capitalize">
                    {currentNav === 'air' && 'এয়ার টিকিটিং ডিরেক্টরি'}
                    {currentNav === 'hotels' && 'হোটেল পার্টনারশিপ ও বুকিং'}
                    {currentNav === 'resorts' && 'রিসোর্ট বুকিং ও এক্সক্লুসিভ টাই-আপ'}
                    {currentNav === 'bus' && 'বাস টিকিটিং ও সিট ম্যানেজমেন্ট'}
                    {currentNav === 'events' && 'ইভেন্ট ও কর্পোরেট ট্যুর'}
                    {currentNav === 'site-content' && 'সাইট কনটেন্ট ও ব্যানার'}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    সার্ভিস সংক্রান্ত বিস্তারিত ও বুকিং প্রসেসিং
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">সার্ভিসটি সক্রিয় রয়েছে</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  এই সার্ভিসের সকল বুকিং এবং কাস্টমার ইনকোয়ারি সরাসরি <button onClick={() => setCurrentNav('leads')} className="text-emerald-700 font-bold underline">লিড ও যোগাযোগ</button> ট্যাবে তালিকাভুক্ত হচ্ছে।
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 
        ========================================================================
        PACKAGE EDIT & ADD MODAL
        Matches user request: "jekhane theke sob edit kora jabe pic add kora jabe 
        and offer add kora jabe onek sundor kore"
        ========================================================================
      */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl my-6 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {isCreatingNew ? <Plus className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {isCreatingNew ? 'নতুন ট্যুর প্যাকেজ তৈরি করুন' : 'প্যাকেজ এডিট করুন'}
                  </h3>
                  <p className="text-xs text-slate-400">ছবি, অফার, সিট সংখ্যা ও রেগুলার মূল্য নির্ধারণ</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSavePackage} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Section 1: Basic Information */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>১. সাধারণ তথ্য ও শিরোনাম</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">প্যাকেজের বাংলা নাম *</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="যেমন: কুয়াকাটা প্রিমিয়াম সমুদ্র বিলাস"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">ইংরেজি নাম / স্ল্যাগ</label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="যেমন: kuakata-beach"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">গন্তব্য বা স্থান</label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="যেমন: কুয়াকাটা, পটুয়াখালী"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">ক্যাটাগরি</label>
                    <select
                      value={formCategory}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setFormCategory(val);
                        if (val === 'sea') setFormCategoryLabel('সৈকত ও সাগর');
                        if (val === 'hills') setFormCategoryLabel('পাহাড় ও ঝর্ণা');
                        if (val === 'forest') setFormCategoryLabel('বন ও প্রকৃতি');
                        if (val === 'haor') setFormCategoryLabel('হাওর ও জলরাশি');
                      }}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none cursor-pointer"
                    >
                      <option value="sea">সৈকত ও সাগর (কুয়াকাটা, কক্সবাজার)</option>
                      <option value="hills">পাহাড় ও ঝর্ণা (সাজেক, বান্দরবান)</option>
                      <option value="forest">বন ও প্রকৃতি (সুন্দরবন)</option>
                      <option value="haor">হাওর ও জলরাশি (টাঙ্গুয়ার হাওর)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">সময়কাল (বাংলা টেক্সট)</label>
                    <input
                      type="text"
                      value={formDurationText}
                      onChange={(e) => setFormDurationText(e.target.value)}
                      placeholder="যেমন: ৩ দিন / ২ রাত"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Special Offers */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>২. অফার ও মূল্য নির্ধারণ (Pricing & Offers)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Offer Price */}
                  <div className="space-y-1 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                    <label className="font-bold text-emerald-900 flex items-center gap-1">
                      <span>বর্তমান অফার মূল্য (৳) *</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      placeholder="5499"
                      className="w-full bg-white border border-emerald-300 focus:border-emerald-600 rounded-lg p-2 font-bold text-emerald-800 text-base outline-none"
                    />
                    <p className="text-[10px] text-emerald-700">যাত্রী এই মূল্যে বুক করবে</p>
                  </div>

                  {/* Regular Price */}
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="font-semibold text-slate-700">রেগুলার বা পূর্বের মূল্য (৳)</label>
                    <input
                      type="number"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                      placeholder="6999"
                      className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-lg p-2 text-slate-600 line-through text-base outline-none"
                    />
                    <p className="text-[10px] text-slate-500">ছাড় দেখানোর জন্য কাটা থাকবে</p>
                  </div>

                  {/* Couple Price */}
                  <div className="space-y-1 bg-indigo-50/60 p-3 rounded-xl border border-indigo-200">
                    <label className="font-semibold text-indigo-900">কাপল রুম প্যাকেজ মূল্য (৳)</label>
                    <input
                      type="number"
                      value={formCouplePrice}
                      onChange={(e) => setFormCouplePrice(Number(e.target.value))}
                      placeholder="12500"
                      className="w-full bg-white border border-indigo-300 focus:border-indigo-600 rounded-lg p-2 font-bold text-indigo-800 text-base outline-none"
                    />
                    <p className="text-[10px] text-indigo-600">কাপলদের জন্য বিশেষ রুম রেট</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">অফার ব্যাজ বা ট্যাগ</label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="যেমন: 🔥 ধামাকা অফার বা ১২ নভেম্বর স্পেশাল"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">পরবর্তী যাত্রার তারিখ</label>
                    <input
                      type="text"
                      value={formDepartureDate}
                      onChange={(e) => setFormDepartureDate(e.target.value)}
                      placeholder="যেমন: ১২ নভেম্বর ২০২৬"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">সিট বাকি সংখ্যা</label>
                    <input
                      type="number"
                      value={formSeatsLeft}
                      onChange={(e) => setFormSeatsLeft(Number(e.target.value))}
                      placeholder="8"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">মোট সিট সংখ্যা</label>
                    <input
                      type="number"
                      value={formTotalSeats}
                      onChange={(e) => setFormTotalSeats(Number(e.target.value))}
                      placeholder="40"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Photo Upload and Picture Management */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>৩. ছবি যুক্ত বা পরিবর্তন করুন (Photo Upload & URL)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Left Column: Upload buttons & URL input */}
                  <div className="space-y-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        কম্পিউটার বা মোবাইল থেকে ছবি বেছে নিন:
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3 px-4 border-2 border-dashed border-emerald-400 bg-emerald-50/50 hover:bg-emerald-100/50 rounded-xl text-emerald-800 font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-emerald-600" />
                        <span>📁 গ্যালারি থেকে ছবি আপলোড করুন</span>
                      </button>
                      <p className="text-[10px] text-slate-400 mt-1">
                        সরাসরি ফোন/পিসির ছবি বেছে নিলে তা সাথে সাথে যুক্ত হবে।
                      </p>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="font-semibold text-slate-700">অথবা ছবির সরাসরি ওয়েব লিঙ্ক (URL) দিন:</label>
                      <input
                        type="url"
                        value={formCoverImage}
                        onChange={(e) => {
                          setFormCoverImage(e.target.value);
                          setImagePreviewUrl(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 font-mono text-[11px] outline-none"
                      />
                    </div>
                  </div>

                  {/* Right Column: Live Visual Preview */}
                  <div className="space-y-1.5">
                    <p className="font-semibold text-slate-700">লাইভ ছবি প্রিভিউ:</p>
                    <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                      {imagePreviewUrl ? (
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                          <ImageIcon className="w-8 h-8 mb-1" />
                          <span>কোনো ছবি সিলেক্ট করা হয়নি</span>
                        </div>
                      )}
                      {formBadge && (
                        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {formBadge}
                        </span>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white p-2 rounded-lg">
                        <p className="font-bold truncate">{formTitle || 'প্যাকেজ নাম'}</p>
                        <p className="text-[10px] text-emerald-300 font-bold">৳ {formPrice.toLocaleString('bn-BD')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Highlights and Inclusions */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>৪. ট্যুর হাইলাইটস ও কী কী অন্তর্ভুক্ত</span>
                </h4>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">ট্যুর হাইলাইটস (কমা দিয়ে লিখুন)</label>
                  <textarea
                    rows={2}
                    value={formHighlights}
                    onChange={(e) => setFormHighlights(e.target.value)}
                    placeholder="সূর্যোদয় দর্শন, লাল কাঁকড়া চর, প্রিমিয়াম রিসোর্ট..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">প্যাকেজে কী কী অন্তর্ভুক্ত (কমা দিয়ে লিখুন)</label>
                    <textarea
                      rows={2}
                      value={formIncludes}
                      onChange={(e) => setFormIncludes(e.target.value)}
                      placeholder="এসি বাস টিকিট, ৩ তারা রিসোর্টে রাত্রিযাপন, সকালের নাস্তা..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">কী কী অন্তর্ভুক্ত নয় (কমা দিয়ে লিখুন)</label>
                    <textarea
                      rows={2}
                      value={formExcludes}
                      onChange={(e) => setFormExcludes(e.target.value)}
                      placeholder="ব্যক্তিগত খরচ, প্যাকেজের বাইরে কোনো খাবার..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl p-2.5 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition cursor-pointer"
                >
                  বাতিল করুন
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#053d2e] hover:bg-[#064e3b] text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{isCreatingNew ? 'প্যাকেজটি তৈরি করুন' : 'আপডেট সেভ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
