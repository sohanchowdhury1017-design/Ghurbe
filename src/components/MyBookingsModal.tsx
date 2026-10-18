import React, { useState } from 'react';
import { 
  X, 
  CalendarCheck, 
  MapPin, 
  Printer, 
  Trash2, 
  AlertCircle, 
  Sparkles, 
  Shield, 
  Lock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock,
  Download,
  FileCheck,
  FileText
} from 'lucide-react';
import { BookingRecord } from '../types/travel';
import { generateInvoiceImage, downloadInvoiceImageFile } from '../utils/invoiceImageGenerator';

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
}) => {
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<BookingRecord | null>(null);

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
                <span>এখানে শুধুমাত্র আপনার ব্যক্তিগত বুকিংগুলো সংরক্ষিত রয়েছে। অ্যাডমিন যাচাই সম্পন্ন হলে অফিসিয়াল ইনভয়েস ডাউনলোড করা যাবে।</span>
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

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      b.paymentStatus === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : b.paymentStatus === 'pending'
                        ? 'bg-amber-100 text-amber-950 border-amber-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      {b.paymentStatus === 'confirmed' ? '✅ যাচাই সম্পন্ন ও কনফার্মড' : b.paymentStatus === 'pending' ? '⏳ যাচাই প্রক্রিয়াধীন' : '❌ বাতিল'}
                    </span>
                  </div>

                  {/* Verification Banner */}
                  {b.paymentStatus === 'pending' && (
                    <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3 text-xs text-amber-950 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>পেমেন্ট যাচাই প্রক্রিয়াধীন রয়েছে</span>
                      </div>
                      <p className="text-[11px] text-amber-800/90 leading-relaxed">
                        ঘুরবে অ্যাডমিন টিম বিকাশ বাংলা কিউআর পেমেন্ট ও TrxID/লাস্ট ৪ ডিজিট যাচাই সম্পন্ন করলেই এখান থেকে আপনার অফিসিয়াল ইনভয়েস ও ভাউচার ডাউনলোড করতে পারবেন।
                      </p>
                      <div className="pt-1">
                        <a
                          href={`https://wa.me/8801911050270?text=${encodeURIComponent(`আসসালামু আলাইকুম! ঘুরবে টিম, আমার বুকিং কোড: ${b.bookingCode} (${b.packageTitle})। আমি বিকাশ পেমেন্টের স্ক্রিনশট বা লাস্ট ৪ ডিজিট পাঠিয়েছি, দয়া করে যাচাই করে ইনভয়েস দিন।`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold rounded-lg shadow-xs cursor-pointer active:scale-95 transition-all"
                        >
                          <MessageCircle className="w-3 h-3 fill-white" />
                          <span>WhatsApp এ স্ক্রিনশট / লাস্ট ৪ ডিজিট পাঠান</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {b.paymentStatus === 'confirmed' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold">আপনার পেমেন্ট সফলভাবে যাচাই হয়েছে। সিট নিশ্চিত করা হয়েছে!</span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        নিচের ‘ইনভয়েস ও ভাউচার দেখুন’ বাটনে ক্লিক করে আপনার অফিসিয়াল পেমেন্ট রিসিপ্ট ও ট্রাভেল ভাউচার ডাউনলোড করুন।
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500 block">যাত্রীর নাম</span>
                      <strong className="text-slate-800">{b.travelerName} ({b.phone})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">পরিশোধিত অগ্রিম ({b.paymentMethod.toUpperCase()})</span>
                      <strong className="text-blue-600 tabular-nums">৳ {b.advancePaid.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400">বুকিং সময়: {b.bookedAt}</span>
                    <div className="flex items-center gap-2">
                      {b.paymentStatus === 'confirmed' ? (
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceBooking(b)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>ইনভয়েস ও ভাউচার দেখুন</span>
                        </button>
                      ) : (
                        <span 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200 cursor-not-allowed"
                          title="অ্যাডমিন যাচাই সম্পন্ন হলে ইনভয়েস প্রিন্ট করা যাবে"
                        >
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>যাচাই শেষে ইনভয়েস উন্মুক্ত হবে</span>
                        </span>
                      )}

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
          <span className="text-[11px]">WhatsApp: <strong>01911-050270</strong></span>
        </div>
      </div>

      {/* Official Verified Invoice & Voucher Modal */}
      {selectedInvoiceBooking && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm p-2 sm:p-6 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedInvoiceBooking(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-300 relative text-left my-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                অফিসিয়াল অনুমোদিত ইনভয়েস
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const dataUrl = await generateInvoiceImage({
                      bookingCode: selectedInvoiceBooking.bookingCode,
                      packageTitle: selectedInvoiceBooking.packageTitle,
                      travelerName: selectedInvoiceBooking.travelerName,
                      phone: selectedInvoiceBooking.phone,
                      email: selectedInvoiceBooking.email,
                      date: selectedInvoiceBooking.date,
                      guestsCount: selectedInvoiceBooking.guestsCount,
                      planType: selectedInvoiceBooking.roomType === 'couple' ? 'couple' : 'single',
                      totalPrice: selectedInvoiceBooking.totalPrice,
                      advancePaid: selectedInvoiceBooking.advancePaid,
                      bookedAt: selectedInvoiceBooking.bookedAt,
                    });
                    downloadInvoiceImageFile(dataUrl, selectedInvoiceBooking.bookingCode);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ছবি ডাউনলোড (.png)</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceBooking(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center">
                    <img
                      src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
                      alt="ঘুরবে লোগো"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">ঘুরবে ট্যুর অ্যান্ড ট্রাভেল</h3>
                    <p className="text-[11px] text-slate-500">Government Approved Travel Agency · Bangladesh</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">ইনভয়েস / বুকিং কোড</span>
                  <span className="text-sm font-mono font-black text-blue-700">
                    {selectedInvoiceBooking.bookingCode}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    তারিখ: {selectedInvoiceBooking.bookedAt}
                  </span>
                </div>
              </div>

              {/* Status Stamp */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-black text-emerald-900 block">পেমেন্ট যাচাই সম্পন্ন ও সিট কনফার্মড</span>
                    <span className="text-[11px] text-emerald-700">অ্যাডমিন প্যানেল থেকে সফলভাবে অনুমোদিত হয়েছে</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider rounded-md shadow-xs">
                  PAID & VERIFIED
                </div>
              </div>

              {/* Customer & Tour Details */}
              <div className="grid grid-cols-2 gap-4 text-xs py-2 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">গ্রাহকের বিবরণ:</span>
                  <strong className="text-sm text-slate-900 block mt-0.5">{selectedInvoiceBooking.travelerName}</strong>
                  <span className="text-slate-600 block">{selectedInvoiceBooking.phone}</span>
                  <span className="text-slate-500 text-[11px]">{selectedInvoiceBooking.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">প্যাকেজ ও তারিখ:</span>
                  <strong className="text-sm text-slate-900 block mt-0.5">{selectedInvoiceBooking.packageTitle}</strong>
                  <span className="text-slate-600 block">যাত্রার তারিখ: <strong>{selectedInvoiceBooking.date}</strong></span>
                  <span className="text-slate-600 block">সদস্য: <strong>{selectedInvoiceBooking.guestsCount} জন ({selectedInvoiceBooking.roomType === 'couple' ? 'কাপল' : 'স্ট্যান্ডার্ড'})</strong></span>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
                    <tr>
                      <th className="p-2.5">বিবরণ</th>
                      <th className="p-2.5 text-center">সদস্য</th>
                      <th className="p-2.5 text-right">মোট পরিমাণ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800">
                        {selectedInvoiceBooking.packageTitle}
                      </td>
                      <td className="p-2.5 text-center text-slate-600">
                        {selectedInvoiceBooking.guestsCount} জন
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                        ৳ {selectedInvoiceBooking.totalPrice.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="bg-emerald-50/50">
                      <td colSpan={2} className="p-2.5 font-bold text-emerald-800">
                        পরিশোধিত অগ্রিম বুকিং মানি (বিকাশ বাংলা কিউআর):
                      </td>
                      <td className="p-2.5 text-right font-mono font-black text-emerald-700">
                        - ৳ {selectedInvoiceBooking.advancePaid.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td colSpan={2} className="p-2.5 text-slate-800">
                        অবশিষ্ট বকেয়া (বকেয়া ব্যালেন্স):
                      </td>
                      <td className="p-2.5 text-right font-mono font-black text-blue-900">
                        ৳ {Math.max(0, selectedInvoiceBooking.totalPrice - selectedInvoiceBooking.advancePaid).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pickup and Contact Instructions */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">পিকআপ ও সহায়তা নির্দেশিকা:</span>
                <p>• পিকআপ পয়েন্ট: রংপুর, বগুড়া ও গাইবান্ধা। যাত্রার ১২ ঘণ্টা পূর্বে ট্যুর গাইড আপনার সাথে যোগাযোগ করবেন।</p>
                <p>• যেকোনো প্রয়োজনে অফিসিয়াল হটলাইন: <strong>09658-865593</strong> অথবা WhatsApp: <strong>01911-050270</strong> এ যোগাযোগ করুন।</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
