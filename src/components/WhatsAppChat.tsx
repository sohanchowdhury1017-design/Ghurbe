import React from 'react';

export const WhatsAppChat: React.FC = () => {
  const rawNumber = '8801911050270';
  const defaultMessage = encodeURIComponent('আসসালামু আলাইকুম! ঘুরবে ট্যুর অ্যান্ড ট্রাভেল, আমি ট্যুর প্যাকেজ ও বুকিং বিষয়ে তথ্য জানতে চাই।');
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-18 sm:bottom-6 right-3 sm:right-6 z-40">
      {/* Ghurbe Official Agency Logo with WhatsApp Badge - Ultra-clean, beautiful & professional */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#25D366] ring-4 ring-emerald-500/15 p-1.5 flex items-center justify-center cursor-pointer"
        title="Ghurbe Tours & Travel - WhatsApp: 01911-050270"
        aria-label="WhatsApp"
      >
        {/* Official Agency Logo Image */}
        <img
          src="https://res.cloudinary.com/b5z0n3sl/image/upload/v1791744358/ghurbe_bd_logo.png"
          alt="ঘুরবে ট্যুর অ্যান্ড ট্রাভেল লোগো"
          className="w-full h-full object-contain rounded-full transition-transform group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Crisp Mini WhatsApp Badge at corner */}
        <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#25D366] text-white flex items-center justify-center border-2 border-white shadow-md transition-transform group-hover:scale-110">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.855 2.791.856 3.183 0 5.768-2.586 5.769-5.766.001-3.18-2.585-5.765-5.769-5.765zm3.385 8.136c-.141.396-.725.753-1.026.797-.282.042-.647.074-1.921-.456-1.579-.656-2.597-2.26-2.676-2.366-.079-.104-.643-.855-.643-1.632 0-.777.407-1.16.552-1.319.145-.158.316-.197.422-.197.106 0 .211.002.304.007.098.005.23-.037.359.273.132.316.45 1.096.489 1.176.039.079.066.172.013.277-.052.106-.079.172-.158.264-.079.092-.166.205-.237.276-.079.079-.161.164-.069.322.092.158.411.677.882 1.096.607.541 1.119.708 1.277.787.158.079.25.066.342-.039.092-.106.395-.461.501-.619.105-.158.211-.132.355-.079.145.053.918.433 1.076.512.158.079.263.118.303.185.039.066.039.382-.102.778zM12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.662 1.442 5.176L2 22l4.981-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
        </span>
      </a>
    </div>
  );
};
