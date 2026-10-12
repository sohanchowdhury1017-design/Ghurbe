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
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { WhatsAppChat } from './components/WhatsAppChat';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { KuakataTourPopupModal } from './components/KuakataTourPopupModal';
import { POPULAR_PACKAGES } from './data/packagesData';
import { TourPackage, BookingRecord, SearchFilterState } from './types/travel';

type RouteName = 'home' | 'packages' | 'package-detail' | 'gallery' | 'why-us' | 'contact';

export default function App() {
  const [packages] = useState<TourPackage[]>(POPULAR_PACKAGES);
  const [searchFilter, setSearchFilter] = useState<SearchFilterState | null>(null);

  // Helper to parse current path to a dedicated page route
  const resolveRouteFromPath = (path: string): { route: RouteName; pkg: TourPackage | null } => {
    const clean = path.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
    if (!clean || clean === 'home') return { route: 'home', pkg: null };
    if (clean === 'packages' || clean === 'tours') return { route: 'packages', pkg: null };
    if (clean === 'gallery') return { route: 'gallery', pkg: null };
    if (clean === 'why-us' || clean === 'about') return { route: 'why-us', pkg: null };
    if (clean === 'contact' || clean === 'faq') return { route: 'contact', pkg: null };

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
    return { route: 'home', pkg: null };
  };

  const initialRouteInfo = resolveRouteFromPath(window.location.pathname);
  const [currentRoute, setCurrentRoute] = useState<RouteName>(initialRouteInfo.route);
  const [currentRoutePackage, setCurrentRoutePackage] = useState<TourPackage | null>(initialRouteInfo.pkg);

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

  // Handle URL changes via Browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { route, pkg } = resolveRouteFromPath(window.location.pathname);
      setCurrentRoute(route);
      setCurrentRoutePackage(pkg);

      if (route === 'package-detail' && pkg) {
        const slugName = pkg.slug === 'kuakata' ? 'Kuakata' : pkg.slug;
        document.title = `${pkg.title} | ghurbe.site/${slugName}`;
      } else if (route === 'packages') {
        document.title = 'সকল ভ্রমণ প্যাকেজ | ঘুরবে (Ghurbe)';
      } else if (route === 'gallery') {
        document.title = 'ভ্রমণ ফটো গ্যালারি | ঘুরবে (Ghurbe)';
      } else if (route === 'why-us') {
        document.title = 'কেন ঘুরবে সেরা পছন্দ | ঘুরবে (Ghurbe)';
      } else if (route === 'contact') {
        document.title = 'যোগাযোগ ও সাপোর্ট | ঘুরবে (Ghurbe)';
      } else {
        document.title = 'ঘুরবে (Ghurbe) — সাশ্রয়ী ও নিরাপদ ট্যুর প্যাকেজ';
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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

  // Dedicated Route Navigation with Browser URL History Sync
  const navigateTo = (target: RouteName | string, pkg?: TourPackage | null) => {
    let newPath = '/';
    let newTitle = 'ঘুরবে (Ghurbe) — সাশ্রয়ী ও নিরাপদ ট্যুর প্যাকেজ';
    let newRoute: RouteName = 'home';
    let targetPkg: TourPackage | null = null;

    if (target === 'packages') {
      newPath = '/packages';
      newTitle = 'সকল ভ্রমণ প্যাকেজ | ঘুরবে (Ghurbe)';
      newRoute = 'packages';
    } else if (target === 'gallery') {
      newPath = '/gallery';
      newTitle = 'ভ্রমণ ফটো গ্যালারি | ঘুরবে (Ghurbe)';
      newRoute = 'gallery';
    } else if (target === 'why-us') {
      newPath = '/why-us';
      newTitle = 'কেন ঘুরবে সেরা পছন্দ | ঘুরবে (Ghurbe)';
      newRoute = 'why-us';
    } else if (target === 'contact') {
      newPath = '/contact';
      newTitle = 'যোগাযোগ ও সাপোর্ট | ঘুরবে (Ghurbe)';
      newRoute = 'contact';
    } else if ((target === 'package-detail' || target === 'detail') && pkg) {
      const slugName = pkg.slug === 'kuakata' ? 'Kuakata' : pkg.slug;
      newPath = `/${slugName}`;
      newTitle = `${pkg.title} | ghurbe.site/${slugName}`;
      newRoute = 'package-detail';
      targetPkg = pkg;
    } else {
      newPath = '/';
      newTitle = 'ঘুরবে (Ghurbe) — সাশ্রয়ী ও নিরাপদ ট্যুর প্যাকেজ';
      newRoute = 'home';
    }

    window.history.pushState({ route: newRoute, packageId: targetPkg?.id }, '', newPath);
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
    } else {
      navigateTo('home');
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
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

      {/* Floating Re-Open Badge for Kuakata 12 Nov Tour Countdown */}
      {!kuakataPopupOpen && (
        <button
          onClick={() => setKuakataPopupOpen(true)}
          className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-30 px-3.5 py-2 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-full shadow-2xl border-2 border-sky-400/50 text-[11px] sm:text-xs font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md hover:border-sky-300"
          title="১২ নভেম্বর কুয়াকাটা ট্যুরের কাউন্টডাউন ও সিট দেখুন"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
          <span>🌊 ১২ নভেম্বর কুয়াকাটা (২৪ সিট বাকি)</span>
        </button>
      )}
    </div>
  );
}
