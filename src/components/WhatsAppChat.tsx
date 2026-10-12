import React, { useState, useEffect } from 'react';
import { X, Send, CheckCheck, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';

export const WhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'আসসালামু আলাইকুম! ঘুরবে ট্যুরস অ্যান্ড ট্রাভেলসে স্বাগতম। ১২ নভেম্বর ২০২৬ তারিখের কুয়াকাটা স্পেশাল ট্যুর (৩ রাত ২ দিন) কিংবা সাজেক ও সেন্টমার্টিনের বুকিং করতে যেকোনো প্রশ্ন করুন। আর মাত্র ২৪টি সিট বাকি আছে!',
      time: 'এখনই',
    },
  ]);
  const [inputText, setInputText] = useState('');

  // Auto pop-up greeting tooltip after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const quickPrompts = [
    '🌊 ১২ নভেম্বরের কুয়াকাটা ট্যুরের সিট খালি আছে?',
    '৩ রাত ২ দিন কুয়াকাটার প্যাকেজ খরচ কত?',
    'সাজেক ভ্যালি ট্যুরের পরবর্তী ব্যাচ কবে?',
    'বিকাশে বুকিং মানি পাঠানোর নিয়ম',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated intelligent consultant reply
    setTimeout(() => {
      let reply = 'ধন্যবাদ আপনার বার্তার জন্য! আমাদের একজন সিনিয়র ট্যুর কনসালটেন্ট আপনার প্রশ্নের উত্তর প্রস্তুত করছেন। জরুরি বুকিংয়ের জন্য কল করুন: 09658-865593 এ।';

      if (text.includes('কুয়াকাটা') || text.includes('১২ নভেম্বর') || text.includes('সিট')) {
        reply = '১২ নভেম্বর ২০২৬ রাতে রংপুর থেকে কুয়াকাটার উদ্দেশ্যে বাস ছাড়বে (বগুড়া ও গাইবান্ধা পিকআপ)। প্যাকেজ মূল্য মাত্র ৩,৫৯৯৳ (৩ রাত ২ দিন, ১ রাত হোটেল ও ৫ বেলা খাবার)। বর্তমানে আর মাত্র ২৪টি সিট বাকি আছে! দ্রুত বুকিং কনফার্ম করতে পারেন।';
      } else if (text.includes('খরচ') || text.includes('দাম')) {
        reply = 'কুয়াকাটা ৩ রাত ২ দিন জনপ্রতি মাত্র ৩,৫৯৯৳ এবং কাপল প্যাকেজ মাত্র ৭,৯৯৯৳। অগ্রিম মাত্র ১,০২০৳ দিয়ে সিট কনফার্ম করা যায়।';
      } else if (text.includes('সাজেক')) {
        reply = 'সাজেক ভ্যালির পরবর্তী ব্যাচ আগামী বৃহস্পতিবার রাত ১০:৩০ টায় ঢাকা থেকে রওনা হবে। লাক্সারি কাঠের কটেজে কাপল ও শেয়ারিং সিট এখনো খালি রয়েছে।';
      } else if (text.includes('বিকাশ') || text.includes('পেমেন্ট')) {
        reply = 'আমাদের বিকাশ মার্চেন্ট বা পার্সোনাল একাউন্টে ১,০২০৳ অগ্রিম পাঠিয়ে বাকি টাকা বাসে ওঠার সময় দেওয়া যাবে। হটলাইন: 09658-865593';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 500);
  };

  const openOfficialWhatsApp = (customText?: string) => {
    const msg = encodeURIComponent(
      customText ||
        'আসসালামু আলাইকুম! ঘুরবে ট্রাভেলস, আমি ১২ নভেম্বর ২০২৬ তারিখের কুয়াকাটা ট্যুরের (৩ রাত ২ দিন) তথ্য ও বুকিং জানতে চাই।'
    );
    window.open(`https://wa.me/8801700000000?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end">
      {/* 1. Auto-pop greeting tooltip bubble */}
      {!isOpen && showTooltip && (
        <div className="mb-2 max-w-[260px] sm:max-w-xs bg-white rounded-2xl shadow-2xl p-3 border-2 border-emerald-500/80 text-left animate-bounce-subtle relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] shadow-sm hover:bg-slate-700 cursor-pointer"
          >
            ✕
          </button>
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-4 h-4 fill-white" />
            </div>
            <div>
              <p className="text-[11px] font-black text-emerald-800 leading-tight">
                ঘুরবে হোয়াটসঅ্যাপ সাপোর্ট
              </p>
              <p className="text-xs text-slate-700 mt-0.5 leading-snug">
                ১২ নভেম্বরের কুয়াকাটা ট্যুর ও সিট খালি সম্পর্কে জানতে চ্যাট করুন 👋
              </p>
              <button
                onClick={() => {
                  setShowTooltip(false);
                  setIsOpen(true);
                }}
                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-800 hover:underline cursor-pointer"
              >
                <span>মেসেজ দিন</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[490px] animate-fade-in text-left">
          {/* Header */}
          <div className="p-4 bg-[#075E54] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border-2 border-emerald-400 overflow-hidden shadow-xs">
                  <img
                    src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
                    alt="ঘুরবে লোগো"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full animate-ping" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-black leading-tight flex items-center gap-1.5">
                  <span>ঘুরবে ট্রাভেল হেল্পডেস্ক</span>
                  <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-normal">অফিসিয়াল</span>
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                  <span>অনলাইন</span> · <span>১ মিনিটে রিপ্লাই</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Announcement Ribbon */}
          <div className="px-3 py-1.5 bg-[#128C7E] text-white text-[11px] flex items-center justify-between">
            <span>🔥 ১২ নভেম্বর কুয়াকাটা ট্যুর (২৪ সিট বাকি)</span>
            <button
              onClick={() => openOfficialWhatsApp()}
              className="underline text-[10px] font-bold text-amber-200 hover:text-white flex items-center gap-0.5 cursor-pointer"
            >
              <span>WhatsApp এ খুলুন</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#E5DDD5]/35 min-h-[220px] max-h-[250px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-xs'
                      : 'bg-white text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <div
                    className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                      m.sender === 'user' ? 'text-emerald-800' : 'text-slate-400'
                    }`}
                  >
                    <span>{m.time}</span>
                    {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-50 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-100 hover:border-emerald-500 transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Official WhatsApp Redirect Button */}
          <div className="px-3 py-1.5 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
            <span className="text-[11px] text-emerald-950 font-medium">সরাসরি কথা বলতে চান?</span>
            <button
              onClick={() => openOfficialWhatsApp()}
              className="py-1 px-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp চ্যাট চালু করুন</span>
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="আপনার প্রশ্ন বা ফোন নম্বর লিখুন..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 bg-slate-50 text-slate-900"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="পাঠান"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 3. Authentic WhatsApp Floating Button with Photo/Icon */}
      <div className="flex items-center gap-2">
        {/* Floating pill tag beside button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>হোয়াটসঅ্যাপে চ্যাট</span>
        </button>

        {/* Iconic Green WhatsApp Circle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group cursor-pointer border-2 border-white ring-4 ring-emerald-500/20"
          title="WhatsApp এ কথা বলুন"
        >
          {/* Authentic WhatsApp SVG Logo */}
          <svg className="w-8 h-8 fill-current drop-shadow-xs" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.855 2.791.856 3.183 0 5.768-2.586 5.769-5.766.001-3.18-2.585-5.765-5.769-5.765zm3.385 8.136c-.141.396-.725.753-1.026.797-.282.042-.647.074-1.921-.456-1.579-.656-2.597-2.26-2.676-2.366-.079-.104-.643-.855-.643-1.632 0-.777.407-1.16.552-1.319.145-.158.316-.197.422-.197.106 0 .211.002.304.007.098.005.23-.037.359.273.132.316.45 1.096.489 1.176.039.079.066.172.013.277-.052.106-.079.172-.158.264-.079.092-.166.205-.237.276-.079.079-.161.164-.069.322.092.158.411.677.882 1.096.607.541 1.119.708 1.277.787.158.079.25.066.342-.039.092-.106.395-.461.501-.619.105-.158.211-.132.355-.079.145.053.918.433 1.076.512.158.079.263.118.303.185.039.066.039.382-.102.778zM12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.662 1.442 5.176L2 22l4.981-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>

          {/* Unread notification ping badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-white shadow-md animate-pulse">
            ১
          </span>
        </button>
      </div>
    </div>
  );
};
