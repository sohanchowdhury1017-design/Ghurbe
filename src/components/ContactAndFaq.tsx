import React, { useState } from 'react';
import { FAQS } from '../data/packagesData';
import { Phone, Mail, MapPin, Send, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';
import { syncMessageToGoogleSheet } from '../utils/googleSheetsSync';
import { ContactMessage } from '../types/travel';

export const ContactAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: '',
    phone: '',
    destination: '',
    guests: '২-৪ জন',
    message: '',
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name || !customForm.phone) return;

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: customForm.name,
      phone: customForm.phone,
      destination: customForm.destination || 'সাধারণ ইনকোয়ারি',
      guests: customForm.guests,
      message: customForm.message || 'কাস্টম প্যাকেজ অনুসন্ধান',
      createdAt: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'new',
    };

    try {
      const saved = localStorage.getItem('ghurbe_messages');
      const list: ContactMessage[] = saved ? JSON.parse(saved) : [];
      localStorage.setItem('ghurbe_messages', JSON.stringify([newMsg, ...list]));
    } catch {}

    syncMessageToGoogleSheet(newMsg);

    setFormSubmitted(true);
    setTimeout(() => {
      setCustomForm({
        name: '',
        phone: '',
        destination: '',
        guests: '২-৪ জন',
        message: '',
      });
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Column 1: Contact Details & Custom Request Form */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                সার্বক্ষণিক পাশে আছি
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                যোগাযোগ ও কাস্টম ট্যুর রিকুয়েস্ট
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                আপনার পরিবার বা অফিসের জন্য নিজস্ব রুটে বিশেষ প্যাকেজের দরকার? আমাদের জানান।
              </p>
            </div>

            {/* Quick Contact Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              <a
                href="tel:01980297939"
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-500 transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">হটলাইন</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 tabular-nums">01980-297939</p>
                <p className="text-[10px] text-slate-500">২৪/৭ কল করুন</p>
              </a>

              <a
                href="https://wa.me/8801911050270?text=Hello%20Ghurbe%20Team"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-500 transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">WhatsApp</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 tabular-nums">01911-050270</p>
                <p className="text-[10px] text-emerald-600 font-semibold">চ্যাট করুন →</p>
              </a>

              <a
                href="mailto:ghurbebd@gmail.com"
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-500 transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-1.5 group-hover:bg-sky-700 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">ইমেইল</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">ghurbebd@gmail.com</p>
                <p className="text-[10px] text-slate-500">মেসেজ পাঠান</p>
              </a>

              <a
                href="https://facebook.com/ghurbe.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#1877F2] transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center mb-1.5 group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">ফেসবুক</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">ghurbe.bd</p>
                <p className="text-[10px] text-[#1877F2] font-semibold">ভিজিট করুন →</p>
              </a>

              <a
                href="https://youtube.com/@Ghurbe-ঘুরবে"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#FF0000] transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center mb-1.5 group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">ইউটিউব</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">@Ghurbe-ঘুরবে</p>
                <p className="text-[10px] text-[#FF0000] font-semibold">ভিডিও দেখুন →</p>
              </a>
            </div>

            {/* Custom Inquiry Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                কাস্টম ট্যুর প্ল্যানিং ফর্ম
              </h3>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2 border border-emerald-200 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-emerald-900">
                    ধন্যবাদ! আপনার রিকুয়েস্টটি গ্রহণ করা হয়েছে।
                  </p>
                  <p className="text-xs text-emerald-800">
                    আমাদের একজন সিনিয়র ট্যুর এক্সিকিউটিভ খুব দ্রুত আপনার সাথে ফোনে যোগাযোগ করবেন।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        আপনার নাম <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="নাম লিখুন"
                        value={customForm.name}
                        onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        মোবাইল নম্বর <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="০১৭xxxxxxxx"
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        কাঙ্ক্ষিত গন্তব্য
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: কুয়াকাটা, সাজেক..."
                        value={customForm.destination}
                        onChange={(e) => setCustomForm({ ...customForm, destination: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        সদস্য সংখ্যা
                      </label>
                      <select
                        value={customForm.guests}
                        onChange={(e) => setCustomForm({ ...customForm, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50 cursor-pointer min-h-[44px]"
                      >
                        <option value="১-২ জন">১-২ জন (একক/কাপল)</option>
                        <option value="৩-৫ জন">৩-৫ জন (পরিবার)</option>
                        <option value="৬-১০ জন">৬-১০ জন (গ্রুপ)</option>
                        <option value="১০+ জন">১০+ জন (কর্পোরেট)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      বিশেষ বিবরণ বা বাজেট সংক্রান্ত তথ্য
                    </label>
                    <textarea
                      rows={2}
                      placeholder="আপনার পরিকল্পনা বা আনুমানিক বাজেট লিখুন..."
                      value={customForm.message}
                      onChange={(e) => setCustomForm({ ...customForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[46px] py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4 stroke-[2.25]" />
                    <span>কাস্টম ট্যুর রিকুয়েস্ট পাঠান</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Frequently Asked Questions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                সাধারণ জিজ্ঞাসা
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                বুকিং বা ভ্রমণ সংক্রান্ত যেকোনো দ্বিধা দূর করতে উত্তরগুলো জেনে নিন
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
