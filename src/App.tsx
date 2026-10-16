/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PackagesPage } from './components/PackagesPage';
import { PackageDetailPage } from './components/PackageDetailPage';
import { GalleryPage } from './components/GalleryPage';
import { WhyUsPage } from './components/WhyUsPage';
import { ContactPage } from './components/ContactPage';
import { StatsPage } from './components/StatsPage';
import { BlogPage } from './components/BlogPage';
import { AboutPage } from './components/AboutPage';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { WhatsAppChat } from './components/WhatsAppChat';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { KuakataTourPopupModal } from './components/KuakataTourPopupModal';
import { MemberProfilePage } from './components/MemberProfilePage';
import { POPULAR_PACKAGES } from './data/packagesData';
import { TEAM_MEMBERS } from './data/blogAndTeamData';
import { TourPackage, BookingRecord, SearchFilterState } from './types/travel';

type RouteName = 'home' | 'packages' | 'package-detail' | 'gallery' | 'why-us' | 'contact' | 'stats' | 'blog' | 'about' | 'member-profile';

export default function App() {
  const [packages] = useState<TourPackage[]>(POPULAR_PACKAGES);
  const [searchFilter, setSearchFilter] = useState<SearchFilterState | null>(null);

  // Helper to match a slug or route token
  const matchRoute = (cleanToken: string): { route: RouteName; pkg: TourPackage | null; blogSlug?: string; memberSlug?: string } | null => {
    const clean = cleanToken.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
    if (!clean || clean === 'home' || clean === 'index.html') return { route: 'home', pkg: null };
    if (clean === 'packages' || clean === 'tours') return { route: 'packages', pkg: null };
    if (clean === 'gallery') return { route: 'gallery', pkg: null };
    if (clean === 'stats' || clean === 'reviews' || clean === 'achievements') return { route: 'stats', pkg: null };
    if (clean === 'kuakata-travel-guide' || clean === 'kuakata-guide') {
      return { route: 'blog', pkg: null, blogSlug: 'kuakata-travel-guide' };
    }
    if (clean === 'blog' || clean === 'blogs' || clean === 'articles' || clean === 'travel-tips' || clean === 'tips' || clean === 'packing' || clean === 'packing-list') return { route: 'blog', pkg: null };
    if (clean === 'about' || clean === 'team' || clean === 'employees') return { route: 'about', pkg: null };
    if (clean === 'why-us') return { route: 'why-us', pkg: null };
    if (clean === 'contact' || clean === 'faq') return { route: 'contact', pkg: null };

    // Check individual executive profile pages:
    // e.g. ghurbe.com/SAMSUL-ARAFIN, ghurbe.com/mahim-ibn-khudi, ghurbe.com/md-rifat-islam, ghurbe.com/sidra-islam
    const matchedMember = TEAM_MEMBERS.find(
      (m) =>
        m.slug.toLowerCase() === clean ||
        m.id.toLowerCase() === clean ||
        (clean === 'samsul-arafin' && m.id === 'ceo') ||
        (clean === 'mahim-ibn-khudi' && m.id === 'executive-director') ||
        (clean === 'md-rifat-islam' && m.id === 'director-of-operations') ||
        (clean === 'rifat-islam' && m.id === 'director-of-operations') ||
        (clean === 'sidra-islam' && m.id === 'brand-manager')
    );
    if (matchedMember) {
      return { route: 'member-profile', pkg: null, memberSlug: matchedMember.slug };
    }

    // Check if it matches any package slug or id e.g. /Kuakata or /sajek-valley
    const matched = packages.find(
      (p) =>
        p.slug.toLowerCase() === clean ||
        p.id.toLowerCase() === clean ||
        (clean === 'kuakata' && (p.slug === 'kuakata' || p.id === 'kuakata-beach'))
    );
    if (matched) {
      return { route: 'package-detail', pkg: matched };
    }
    return null;
  };

  // Helper to parse current path or hash to a dedicated page route
  const resolveRouteFromLocation = (): { route: RouteName; pkg: TourPackage | null; blogSlug?: string; memberSlug?: string } => {
    // 1. Check URL Hash (e.g., #/about or #about or #/about#about)
    if (window.location.hash) {
      const rawHash = window.location.hash;
      const tokens = rawHash.split('#').map((t) => t.replace(/^\/+|\/+$/g, '').trim()).filter(Boolean);
      for (const token of tokens) {
        const matchedByHash = matchRoute(token);
        if (matchedByHash) return matchedByHash;
      }
    }

    // 2. Check query parameter (e.g., ?p=/packages from 404 redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const queryRoute = urlParams.get('p') || urlParams.get('page');
    if (queryRoute) {
      const matchedByQuery = matchRoute(queryRoute);
      if (matchedByQuery) return matchedByQuery;
    }

    // 3. Check pathname (extracting segments)
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
    if (!pathname || pathname === 'index.html') return { route: 'home', pkg: null };

    const directMatch = matchRoute(pathname);
    if (directMatch) return directMatch;

    // Check the last path segment (in case of /repo-name/packages or /repo-name/kuakata)
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      const lastSeg = segments[segments.length - 1];
      const segMatch = matchRoute(lastSeg);
      if (segMatch) return segMatch;
    }

    return { route: 'home', pkg: null };
  };

  const initialRouteInfo = resolveRouteFromLocation();
  const [currentRoute, setCurrentRoute] = useState<RouteName>(initialRouteInfo.route);
  const [currentRoutePackage, setCurrentRoutePackage] = useState<TourPackage | null>(initialRouteInfo.pkg);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(initialRouteInfo.blogSlug || null);
  const [selectedMemberSlug, setSelectedMemberSlug] = useState<string | null>(initialRouteInfo.memberSlug || null);

  // Modals for Booking, My Bookings, Auth, and Kuakata 12 Nov Tour Countdown Popup
  const [bookingModalPackage, setBookingModalPackage] = useState<TourPackage | null>(null);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [kuakataPopupOpen, setKuakataPopupOpen] = useState(false);

  // Trigger Kuakata 12th tour announcement modal 2 seconds after entering website
  useEffect(() => {
    const timer = setTimeout(() => {
      setKuakataPopupOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // User state
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string } | null>(() => {
    try {
      const saved = localStorage.getItem('ghurbe_user') || localStorage.getItem('bhaboghure_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Bookings list
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ghurbe_bookings') || localStorage.getItem('bhaboghure_bookings');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'booking-init-1',
          bookingCode: 'GH-2026-7841',
          packageId: 'kuakata-beach',
          packageTitle: 'কুয়াকাটা সাগরকন্যা ভ্রমণ (৩ রাত ২ দিন)',
          travelerName: 'সোহান চৌধুরী',
          phone: '০১৭০০১২৩৪৫৬',
          email: 'sohan@ghurbe.com',
          date: '২০২৬-১১-১২',
          guestsCount: 2,
          roomType: 'couple',
          totalPrice: 7999,
          advancePaid: 2000,
          paymentMethod: 'bkash',
          paymentStatus: 'confirmed',
          bookedAt: '১০ অক্টোবর ২০২৬',
          notes: 'সি-ভিউ হোটেল রুম ও রংপুর থেকে যাত্রা',
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ghurbe_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('ghurbe_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('ghurbe_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const getRepoBasePath = () => {
    const pathname = window.location.pathname;
    if (!pathname || pathname === '/' || pathname === '/index.html') return '';
    const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    const known = [
      'packages', 'tours', 'gallery', 'why-us', 'about', 'contact', 'faq', 'home',
      'blog', 'blogs', 'stats', 'reviews', 'team', 'travel-tips', 'kuakata-travel-guide',
      'samsul-arafin', 'mahim-ibn-khudi', 'md-rifat-islam', 'sidra-islam'
    ];
    if (segments.length > 0) {
      const first = segments[0].toLowerCase();
      const isPkg = packages.some((p) => p.slug.toLowerCase() === first || p.id.toLowerCase() === first || first === 'kuakata');
      const isMem = TEAM_MEMBERS.some((m) => m.slug.toLowerCase() === first || m.id.toLowerCase() === first);
      if (!known.includes(first) && !isPkg && !isMem && !first.endsWith('.html')) {
        return `/${segments[0]}`;
      }
    }
    return '';
  };

  // Helper to build canonical clean path without '#' hash
  const getCleanFullPath = (route: RouteName, pkg?: TourPackage | null, memberSlug?: string | null): string => {
    const repoBase = getRepoBasePath();
    let subPath = '';
    if (route === 'packages') {
      subPath = '/packages';
    } else if (route === 'gallery') {
      subPath = '/gallery';
    } else if (route === 'why-us') {
      subPath = '/why-us';
    } else if (route === 'contact') {
      subPath = '/contact';
    } else if (route === 'blog') {
      subPath = selectedBlogSlug ? `/${selectedBlogSlug}` : '/blog';
    } else if (route === 'about') {
      subPath = '/about';
    } else if (route === 'stats') {
      subPath = '/stats';
    } else if (route === 'member-profile') {
      const memSlug = memberSlug || selectedMemberSlug || 'SAMSUL-ARAFIN';
      subPath = `/${memSlug}`;
    } else if (route === 'package-detail' && pkg) {
      const slugName = pkg.slug === 'kuakata' ? 'Kuakata' : pkg.slug;
      subPath = `/${slugName}`;
    } else {
      subPath = '';
    }
    return repoBase ? `${repoBase}${subPath || '/'}` : (subPath || '/');
  };

  // Clean any '#' hash from URL immediately on initial load (e.g. if user opened #/about or #about)
  useEffect(() => {
    if (window.location.hash) {
      const cleanPath = getCleanFullPath(currentRoute, currentRoutePackage, selectedMemberSlug);
      try {
        window.history.replaceState({ route: currentRoute, packageId: currentRoutePackage?.id, memberSlug: selectedMemberSlug }, '', cleanPath);
      } catch (e) {
        console.warn('URL hash cleaning failed:', e);
      }
    }
  }, []);

  // Handle URL changes via Browser Back / Forward buttons (popstate) & Hash change
  useEffect(() => {
    const handleLocationChange = () => {
      const resolved = resolveRouteFromLocation();
      setCurrentRoute(resolved.route);
      setCurrentRoutePackage(resolved.pkg);
      setSelectedBlogSlug(resolved.blogSlug || null);
      if (resolved.memberSlug) {
        setSelectedMemberSlug(resolved.memberSlug);
      }

      // Instantly scrub any '#' hash from browser address bar
      if (window.location.hash) {
        const cleanPath = getCleanFullPath(resolved.route, resolved.pkg, resolved.memberSlug);
        try {
          window.history.replaceState({ route: resolved.route, packageId: resolved.pkg?.id, memberSlug: resolved.memberSlug }, '', cleanPath);
        } catch {}
      }

      const { route, pkg, memberSlug } = resolved;
      if (route === 'package-detail' && pkg) {
        const slugName = pkg.slug === 'kuakata' ? 'Kuakata' : pkg.slug;
        document.title = `${pkg.title} | ghurbe.site/${slugName}`;
      } else if (route === 'member-profile' && memberSlug) {
        const mem = TEAM_MEMBERS.find((m) => m.slug.toLowerCase() === memberSlug.toLowerCase());
        if (mem) {
          document.title = `${mem.name} — ${mem.role.split('(')[0].trim()} | ঘুরবে (Ghurbe)`;
        } else {
          document.title = 'লিডারশিপ প্রোফাইল | ঘুরবে (Ghurbe)';
        }
      } else if (route === 'blog' && resolved.blogSlug === 'kuakata-travel-guide') {
        document.title = 'কুয়াকাটা ভ্রমণ গাইড ২০২৬ | Kuakata Travel Guide | Ghurbe Tours & Travel';
      } else if (route === 'packages') {
        document.title = 'সকল ভ্রমণ প্যাকেজ | ঘুরবে (Ghurbe)';
      } else if (route === 'gallery') {
        document.title = 'ভ্রমণ ফটো গ্যালারি | ঘুরবে (Ghurbe)';
      } else if (route === 'why-us') {
        document.title = 'কেন ঘুরবে সেরা পছন্দ | ঘুরবে (Ghurbe)';
      } else if (route === 'contact') {
        document.title = 'যোগাযোগ ও সাপোর্ট | ঘুরবে (Ghurbe)';
      } else if (route === 'blog') {
        document.title = 'ট্রাভেল ব্লগ ও গাইড | ঘুরবে (Ghurbe)';
      } else if (route === 'about') {
        document.title = 'আমাদের টিম ও কর্মকর্তা | ঘুরবে (Ghurbe)';
      } else if (route === 'stats') {
        document.title = 'আমাদের অর্জন ও ট্রাভেলার রিভিউ | ঘুরবে (Ghurbe)';
      } else {
        document.title = 'ঘুরবে (Ghurbe) — সাশ্রয়ী ও নিরাপদ ট্যুর প্যাকেজ';
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [packages]);

  // Handle modal scroll locking and escape key for dialogs
  useEffect(() => {
    const isModalOpen = Boolean(bookingModalPackage || myBookingsOpen || authModalOpen);

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBookingModalPackage(null);
        setMyBookingsOpen(false);
        setAuthModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bookingModalPackage, myBookingsOpen, authModalOpen]);

  // Dedicated Route Navigation with Browser URL History Sync (Clean URLs, NO '#' in link)
  const navigateTo = (target: RouteName | string, pkg?: TourPackage | null) => {
    const repoBase = getRepoBasePath();
    let subPath = '';
    let newTitle = 'ঘুরবে (Ghurbe) — সাশ্রয়ী ও নিরাপদ ট্যুর প্যাকেজ';
    let newRoute: RouteName = 'home';
    let targetPkg: TourPackage | null = null;
    let targetMemberSlug: string | null = null;

    // Check if target is a team member slug or id e.g. 'SAMSUL-ARAFIN', 'mahim-ibn-khudi'
    const matchedMember = TEAM_MEMBERS.find(
      (m) =>
        m.slug.toLowerCase() === target.toLowerCase() ||
        m.id.toLowerCase() === target.toLowerCase() ||
        (target.toLowerCase() === 'samsul-arafin' && m.id === 'ceo') ||
        (target.toLowerCase() === 'mahim-ibn-khudi' && m.id === 'executive-director') ||
        (target.toLowerCase() === 'md-rifat-islam' && m.id === 'director-of-operations') ||
        (target.toLowerCase() === 'sidra-islam' && m.id === 'brand-manager')
    );

    if (matchedMember) {
      subPath = `/${matchedMember.slug}`;
      newTitle = `${matchedMember.name} — ${matchedMember.role.split('(')[0].trim()} | ঘুরবে (Ghurbe)`;
      newRoute = 'member-profile';
      targetMemberSlug = matchedMember.slug;
      setSelectedMemberSlug(matchedMember.slug);
    } else if (target === 'packages') {
      subPath = '/packages';
      newTitle = 'সকল ভ্রমণ প্যাকেজ | ঘুরবে (Ghurbe)';
      newRoute = 'packages';
    } else if (target === 'gallery') {
      subPath = '/gallery';
      newTitle = 'ভ্রমণ ফটো গ্যালারি | ঘুরবে (Ghurbe)';
      newRoute = 'gallery';
    } else if (target === 'why-us') {
      subPath = '/why-us';
      newTitle = 'কেন ঘুরবে সেরা পছন্দ | ঘুরবে (Ghurbe)';
      newRoute = 'why-us';
    } else if (target === 'contact') {
      subPath = '/contact';
      newTitle = 'যোগাযোগ ও সাপোর্ট | ঘুরবে (Ghurbe)';
      newRoute = 'contact';
    } else if (target === 'kuakata-travel-guide' || target === 'kuakata-guide') {
      subPath = '/kuakata-travel-guide';
      newTitle = 'কুয়াকাটা ভ্রমণ গাইড ২০২৬ | Kuakata Travel Guide | Ghurbe Tours & Travel';
      newRoute = 'blog';
      setSelectedBlogSlug('kuakata-travel-guide');
    } else if (target === 'blog' || target === 'blogs' || target === 'travel-tips') {
      subPath = '/blog';
      newTitle = 'ট্রাভেল ব্লগ ও গাইড | ঘুরবে (Ghurbe)';
      newRoute = 'blog';
      setSelectedBlogSlug(null);
    } else if (target === 'about' || target === 'team') {
      subPath = '/about';
      newTitle = 'আমাদের টিম ও কর্মকর্তা | ঘুরবে (Ghurbe)';
      newRoute = 'about';
    } else if (target === 'stats' || target === 'reviews') {
      subPath = '/stats';
      newTitle = 'আমাদের অর্জন ও ট্রাভেলার রিভিউ | ঘুরবে (Ghurbe)';
      newRoute = 'stats';
    } else if ((target === 'package-detail' || target === 'detail') && pkg) {
      const slugName = pkg.slug === 'kuakata' ? 'Kuakata' : pkg.slug;
      subPath = `/${slugName}`;
      newTitle = `${pkg.title} | ghurbe.site/${slugName}`;
      newRoute = 'package-detail';
      targetPkg = pkg;
    } else {
      subPath = '';
      newTitle = 'ঘুরবে (Ghurbe) — সাশ্রয়ী ও নিরাপদ ট্যুর প্যাকেজ';
      newRoute = 'home';
    }

    const fullPath = repoBase ? `${repoBase}${subPath || '/'}` : (subPath || '/');

    try {
      window.history.pushState(
        { route: newRoute, packageId: targetPkg?.id, memberSlug: targetMemberSlug },
        '',
        fullPath
      );
    } catch (e) {
      console.warn('Navigation pushState failed:', e);
    }

    // Ensure '#' hash is completely removed from URL bar
    if (window.location.hash) {
      try {
        window.history.replaceState(
          { route: newRoute, packageId: targetPkg?.id, memberSlug: targetMemberSlug },
          '',
          fullPath
        );
      } catch {}
    }

    setCurrentRoute(newRoute);
    setCurrentRoutePackage(targetPkg);
    document.title = newTitle;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero' || sectionId === 'home') {
      navigateTo('home');
    } else if (sectionId === 'packages') {
      navigateTo('packages');
    } else if (sectionId === 'gallery') {
      navigateTo('gallery');
    } else if (sectionId === 'why-us') {
      navigateTo('why-us');
    } else if (sectionId === 'contact') {
      navigateTo('contact');
    } else if (sectionId === 'blog' || sectionId === 'blogs' || sectionId === 'travel-tips') {
      navigateTo('blog');
    } else if (sectionId === 'about' || sectionId === 'team') {
      navigateTo('about');
    } else if (sectionId === 'stats' || sectionId === 'reviews') {
      navigateTo('stats');
    } else {
      navigateTo(sectionId);
    }
  };

  // View Details triggers the separate package page e.g. /Kuakata
  const handleViewDetails = (pkg: TourPackage) => {
    navigateTo('package-detail', pkg);
  };

  const handleSearch = (filters: SearchFilterState) => {
    setSearchFilter(filters);
    navigateTo('packages');
  };

  const handleQuickDestinationSelect = (dest: string) => {
    setSearchFilter({
      destination: dest,
      date: '',
      travelers: 2,
      category: 'all',
      maxPrice: 50000,
    });
    navigateTo('packages');
  };

  const handleBookNow = (pkg: TourPackage) => {
    setBookingModalPackage(pkg);
  };

  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-sky-dots flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <Navbar
        onOpenBookings={() => setMyBookingsOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        bookingsCount={bookings.length}
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
        activeSection={currentRoute === 'home' ? 'hero' : currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area: Each page is completely dedicated and separate */}
      <main className="flex-1 pb-16 sm:pb-0">
        {currentRoute === 'package-detail' && currentRoutePackage && (
          <PackageDetailPage
            pkg={currentRoutePackage}
            onBackToHome={() => navigateTo('home')}
            onBookNow={handleBookNow}
            onOpenBookings={() => setMyBookingsOpen(true)}
          />
        )}

        {currentRoute === 'packages' && (
          <PackagesPage
            packages={packages}
            initialSearchFilter={searchFilter}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
            onBackToHome={() => navigateTo('home')}
          />
        )}

        {currentRoute === 'gallery' && (
          <GalleryPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToPackages={() => navigateTo('packages')}
          />
        )}

        {currentRoute === 'why-us' && (
          <WhyUsPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToPackages={() => navigateTo('packages')}
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {currentRoute === 'stats' && (
          <StatsPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToPackages={() => navigateTo('packages')}
            onOpenContact={() => navigateTo('contact')}
          />
        )}

        {currentRoute === 'blog' && (
          <BlogPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToPackages={() => navigateTo('packages')}
            initialPostSlug={selectedBlogSlug}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToPackages={() => navigateTo('packages')}
            onNavigateToContact={() => navigateTo('contact')}
            onNavigateToMember={(slug) => navigateTo(slug)}
          />
        )}

        {currentRoute === 'member-profile' && (
          (() => {
            const mem = TEAM_MEMBERS.find((m) => m.slug.toLowerCase() === (selectedMemberSlug || '').toLowerCase()) || TEAM_MEMBERS[0];
            return (
              <MemberProfilePage
                member={mem}
                onBackToAbout={() => navigateTo('about')}
                onBackToHome={() => navigateTo('home')}
                onNavigateToPackages={() => navigateTo('packages')}
                onNavigateToContact={() => navigateTo('contact')}
                onNavigateToMember={(slug) => navigateTo(slug)}
              />
            );
          })()
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            onBackToHome={() => navigateTo('home')}
            onNavigateToPackages={() => navigateTo('packages')}
          />
        )}

        {currentRoute === 'home' && (
          <HomePage
            packages={packages}
            onSearch={handleSearch}
            onSelectDestinationQuick={handleQuickDestinationSelect}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
            onNavigateToPackages={() => navigateTo('packages')}
            onNavigateToGallery={() => navigateTo('gallery')}
            onNavigateToWhyUs={() => navigateTo('why-us')}
            onNavigateToContact={() => navigateTo('contact')}
            onNavigateToStats={() => navigateTo('stats')}
            onNavigateToBlog={() => navigateTo('blog')}
            onNavigateToAbout={() => navigateTo('about')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookings={() => setMyBookingsOpen(true)}
      />

      {/* Floating WhatsApp Chat Consultant */}
      <WhatsAppChat />

      {/* Sticky Bottom Navigation Bar for Mobile (Shown on all main pages, hidden on package detail which has booking bar) */}
      {currentRoute !== 'package-detail' && (
        <BottomNav
          activeSection={currentRoute === 'home' ? 'hero' : currentRoute}
          onNavigate={handleNavigate}
          onOpenBookings={() => setMyBookingsOpen(true)}
          onOpenAuth={() => setAuthModalOpen(true)}
          bookingsCount={bookings.length}
          user={currentUser}
        />
      )}

      {/* Booking Dialog */}
      <BookingModal
        pkg={bookingModalPackage}
        onClose={() => setBookingModalPackage(null)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* My Bookings Dialog */}
      <MyBookingsModal
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onNewBookingClick={() => {
          setMyBookingsOpen(false);
          navigateTo('packages');
        }}
      />

      {/* Auth Dialog */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Kuakata 12th Tour Announcement Popup Modal (2-sec delay with Countdown & Scarcity) */}
      <KuakataTourPopupModal
        pkg={packages.find((p) => p.id === 'kuakata-beach') || packages[0]}
        isOpen={kuakataPopupOpen}
        onClose={() => setKuakataPopupOpen(false)}
        onBookNow={(pkg) => {
          setKuakataPopupOpen(false);
          handleBookNow(pkg);
        }}
        onViewDetails={(pkg) => {
          setKuakataPopupOpen(false);
          handleViewDetails(pkg);
        }}
      />

      {/* Floating Badge for Kuakata 12 Nov Tour Countdown (Attractive Emerald & Sky Blue Theme, No Red, No Ping) */}
      {!kuakataPopupOpen && currentRoute !== 'about' && (
        <button
          onClick={() => {
            const kuakataPkg = packages.find((p) => p.id === 'kuakata-beach');
            if (kuakataPkg) {
              handleViewDetails(kuakataPkg);
            } else {
              setKuakataPopupOpen(true);
            }
          }}
          className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-30 px-3.5 py-2.5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-full shadow-2xl border-2 border-emerald-400 text-[11px] sm:text-xs font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md hover:border-emerald-300 ring-2 ring-emerald-500/20"
          title="১২ নভেম্বর কুয়াকাটা ট্যুরের বিস্তারিত পেজ দেখুন"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34d399]" />
          <span className="text-emerald-300">🌊 ১২ নভেম্বর কুয়াকাটা</span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 text-[10px] font-bold">
            ২৪ সিট বাকি
          </span>
        </button>
      )}
    </div>
  );
}
