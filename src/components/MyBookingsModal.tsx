import React from 'react';
import { X, CalendarCheck, MapPin, Printer, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import { BookingRecord } from '../types/travel';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onNewBookingClick: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onNewBookingClick,
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
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
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
              <h2 className="text-xl font-bold">আমার ট্যুর বুকিং সমূহ</h2>
              <p className="text-xs text-slate-400">
                মোট সংরক্ষিত বুকিং: <span className="text-sky-400 font-bold tabular-nums">{bookings.length}</span> টি
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {bookings.length > 0 ? (
            <div className="space-y-4">
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

                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      কনফার্মড
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
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-medium"
                        title="ভাউচার প্রিন্ট করুন"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>প্রিন্ট ভাউচার</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('আপনি কি এই বুকিংটি বাতিল করতে চান?')) {
                            onCancelBooking(b.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-medium"
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
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">কোনো বুকিং পাওয়া যায়নি</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
                  আপনি এখনো কোনো ট্যুর বুক করেননি। এখনই আমাদের আকর্ষণীয় ট্যুর প্যাকেজগুলো ঘুরে দেখুন!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs shadow-blue-500/20"
              >
                প্যাকেজ দেখুন ও বুক করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
