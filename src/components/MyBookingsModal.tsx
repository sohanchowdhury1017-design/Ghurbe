import React from 'react';
import { X, CalendarCheck, MapPin, Printer, Trash2, AlertCircle, Sparkles, Shield, Lock, Phone } from 'lucide-react';
import { BookingRecord } from '../types/travel';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onNewBookingClick: () => void;
  onOpenAdmin?: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onNewBookingClick,
  onOpenAdmin,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/80 backdrop-blur-sm p-2.5 sm:p-5 flex justify-center items-start min-h-screen py-4 sm:py-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200/90 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700 flex items-center justify-center shrink-0">
              <img
                src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
                alt="ঘুরবে লোগো"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">আমার ট্যুর বুকিং সমূহ</h2>
              <p className="text-xs text-slate-400">
                আপনার ডিভাইস থেকে করা সক্রিয় বুকিং: <span className="text-sky-400 font-bold tabular-nums">{bookings.length}</span> টি
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                title="ঘুরবে এডমিন প্যানেল"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">এডমিন পোর্টাল</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {bookings.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-3 flex items-center gap-2 text-xs text-blue-900">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>এখানে শুধুমাত্র আপনার ব্যক্তিগত বুকিংগুলো সংরক্ষিত রয়েছে। অন্য কোনো ব্যক্তির বুকিং দৃশ্যমান নয়।</span>
              </div>

              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-blue-500/50 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                        {b.bookingCode}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                        {b.packageTitle}
                      </h3>
                      <p className="text-xs text-slate-500">
                        ভ্রমণের তারিখ: <strong>{b.date}</strong> · ভ্রমণকারী: <strong>{b.guestsCount} জন</strong>
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      b.paymentStatus === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.paymentStatus === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {b.paymentStatus === 'confirmed' ? 'কনফার্মড' : b.paymentStatus === 'pending' ? 'অপেক্ষমান' : 'বাতিল'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500 block">যাত্রীর নাম</span>
                      <strong className="text-slate-800">{b.travelerName} ({b.phone})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">পরিশোধিত অর্থ ({b.paymentMethod.toUpperCase()})</span>
                      <strong className="text-blue-600 tabular-nums">৳ {b.advancePaid.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400">বুকিং সময়: {b.bookedAt}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>ভাউচার প্রিন্ট</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onCancelBooking(b.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="বুকিং বাতিল"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>বাতিল</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">আপনার কোনো বুকিং পাওয়া যায়নি</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
                  এখানে শুধুমাত্র আপনার নিজের করা বুকিং প্রদর্শিত হয়। আপনি যখন কোনো ট্যুর বুক করবেন, তখন তার ভাউচার ও বিস্তারিত এখানে পেয়ে যাবেন।
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
              >
                প্যাকেজ দেখুন ও বুক করুন
              </button>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 px-5">
          <span className="text-[11px]">হেল্পলাইন: <strong>09658-865593</strong></span>
          {onOpenAdmin && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>এডমিন লগইন (কর্মকর্তাদের জন্য)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
