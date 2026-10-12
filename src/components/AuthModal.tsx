import React, { useState } from 'react';
import { X, Lock, Phone, User, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; phone: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'creds' | 'otp'>('creds');
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name || (isRegister ? 'সোহান চৌধুরী' : 'সম্মানিত পর্যটক');
    onLoginSuccess({ name: finalName, phone });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 flex justify-center items-start min-h-screen py-6 sm:py-10 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-xs border border-slate-200 flex items-center justify-center mx-auto mb-3">
            <img
              src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
              alt="ঘুরবে লোগো"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {isRegister ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'ঘুরবে অ্যাকাউন্টে লগইন'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            আপনার ভ্রমণ বুকিং ট্র্যাক করতে ও বিশেষ ডিসকাউন্ট পেতে প্রবেশ করুন
          </p>
        </div>

        {step === 'creds' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার নাম <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="যেমন: সোহান চৌধুরী"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-3.5 py-3 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50 min-h-[46px]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="০১৭xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-3.5 py-3 text-base sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50 min-h-[46px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-500/20 transition-colors cursor-pointer"
            >
              ওটিপি (OTP) পাঠান
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                {isRegister
                  ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'
                  : 'নতুন ব্যবহারকারী? রেজিস্ট্রেশন করুন'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="p-3 bg-blue-50 rounded-xl text-center text-xs text-blue-900 border border-blue-200">
              <p>
                <strong>{phone}</strong> নম্বরে ৪-সংখ্যার ওটিপি কোড পাঠানো হয়েছে।
              </p>
              <p className="text-[11px] text-blue-700 mt-0.5">(ডেমো ওটিপি: যেকোনো ৪ সংখ্যা দিন)</p>
            </div>

            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  defaultValue={idx + 1}
                  className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-slate-300 focus:border-blue-600 outline-hidden bg-slate-50"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-500/20 transition-colors cursor-pointer"
            >
              যাচাই করুন ও প্রবেশ করুন
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('creds')}
                className="text-xs text-slate-500 hover:underline cursor-pointer"
              >
                নম্বর পরিবর্তন করতে চান?
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
