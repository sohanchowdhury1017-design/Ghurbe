import React, { useState } from 'react';
import { FAQS } from '../data/packagesData';
import { Phone, Mail, MapPin, Send, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="tel:09658865593"
                className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-500 transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">অফিসিয়াল হটলাইন</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums tracking-wide">09658-865593</p>
                <p className="text-[11px] text-slate-500">২৪/৭ কল করুন</p>
              </a>

              <a
                href="mailto:ghurbebd@gmail.com"
                className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-500 transition-colors block group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-2 group-hover:bg-sky-700 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">ইমেইল সহায়তা</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">ghurbebd@gmail.com</p>
                <p className="text-[11px] text-slate-500">যেকোনো প্রশ্ন পাঠান</p>
              </a>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-500 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.455 5.503 3.735 7.159V22l3.435-1.884c.89.246 1.838.38 2.83.38 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.004 12.427l-2.56-2.73-5 2.73 5.496-5.834 2.624 2.73 4.936-2.73-5.496 5.834z"/>
                  </svg>
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">ফেসবুক ও মেসেঞ্জার</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Ghurbe - ঘুরবে</p>
                <p className="text-[11px] text-slate-500">মেসেজে সক্রিয়</p>
              </div>
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
