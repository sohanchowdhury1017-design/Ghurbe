import { BookingRecord } from '../types/travel';

export interface InvoiceCardData {
  bookingCode: string;
  packageTitle: string;
  travelerName: string;
  phone: string;
  email?: string;
  date: string;
  guestsCount: number;
  planType: 'single' | 'couple';
  totalPrice: number;
  advancePaid: number;
  senderPhone?: string;
  trxId?: string;
  bookedAt: string;
}

/**
 * Generates an ultra-crisp, high-resolution PNG image of the official booking invoice
 * using client-side HTML5 Canvas (zero external dependencies).
 */
export async function generateInvoiceImage(data: InvoiceCardData): Promise<string> {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Outer Border & Decorative Frame
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, width - 12, height - 12);

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  // 1. Header Section (Deep Navy Gradient)
  const headerGrad = ctx.createLinearGradient(0, 0, width, 0);
  headerGrad.addColorStop(0, '#0F172A');
  headerGrad.addColorStop(0.5, '#1E293B');
  headerGrad.addColorStop(1, '#0C4A6E');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(20, 20, width - 40, 140);

  // Header Text
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('GOVERNMENT APPROVED TRAVEL AGENCY · BANGLADESH', 45, 52);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ঘুরবে ট্যুর অ্যান্ড ট্রাভেল', 45, 92);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('অফিসিয়াল ট্যুর বুকিং ও পেমেন্ট রিসিট (ইনভয়েস)', 45, 120);

  // Invoice Code on Header Right
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('বুকিং কোড / INVOICE NO', width - 45, 55);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 24px monospace';
  ctx.fillText(data.bookingCode, width - 45, 88);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`তারিখ: ${data.bookedAt}`, width - 45, 115);
  ctx.textAlign = 'left';

  // 2. Status Strip
  ctx.fillStyle = '#FEF3C7';
  ctx.fillRect(20, 160, width - 40, 48);
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 160, width - 40, 48);

  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('⏳ পেমেন্ট স্ট্যাটাস: যাচাই প্রক্রিয়াধীন (PENDING VERIFICATION)', 45, 190);

  ctx.fillStyle = '#B45309';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('বিকাশ বাংলা কিউআর / 01711085960', width - 45, 190);
  ctx.textAlign = 'left';

  // 3. Customer & Tour Details Grid
  // Box 1: Traveler Details
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(40, 225, 345, 155);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(40, 225, 345, 155);

  ctx.fillStyle = '#0284C7';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('👤 ভ্রমণকারীর বিবরণ', 55, 250);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('নাম:', 55, 280);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.travelerName, 120, 280);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ফোন:', 55, 312);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.phone, 120, 312);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ইমেইল:', 55, 344);
  ctx.fillStyle = '#334155';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.email || 'N/A', 120, 344);

  // Box 2: Tour Details
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(415, 225, 345, 155);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(415, 225, 345, 155);

  ctx.fillStyle = '#0284C7';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🏖️ ট্যুর প্যাকেজ তথ্য', 430, 250);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('প্যাকেজ:', 430, 280);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.packageTitle.slice(0, 26), 505, 280);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('তারিখ:', 430, 312);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.date, 505, 312);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('প্ল্যান:', 430, 344);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.planType === 'couple' ? 'কাপল প্যাকেজ (২ জন)' : `সিঙ্গেল প্ল্যান (${data.guestsCount} জন)`, 505, 344);

  // 4. Financial Breakdown Table
  const tableTop = 405;
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(40, tableTop, 720, 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('হিসাবের বিবরণ (FINANCIAL BREAKDOWN)', 55, tableTop + 24);
  ctx.textAlign = 'right';
  ctx.fillText('টাকার পরিমাণ (BDT)', 740, tableTop + 24);
  ctx.textAlign = 'left';

  // Row 1: Total Price
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(40, tableTop + 38, 720, 42);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(40, tableTop + 38, 720, 42);

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`মোট প্যাকেজ মূল্য (${data.planType === 'couple' ? 'কাপল' : `${data.guestsCount} জন`})`, 55, tableTop + 65);
  ctx.textAlign = 'right';
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(`৳ ${data.totalPrice.toLocaleString('en-IN')}`, 740, tableTop + 65);
  ctx.textAlign = 'left';

  // Row 2: Advance Paid
  ctx.fillStyle = '#F0FDF4';
  ctx.fillRect(40, tableTop + 80, 720, 44);
  ctx.strokeStyle = '#BBF7D0';
  ctx.strokeRect(40, tableTop + 80, 720, 44);

  ctx.fillStyle = '#166534';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('পরিশোধিত অগ্রিম বুকিং মানি (বিকাশ বাংলা কিউআর):', 55, tableTop + 108);
  ctx.textAlign = 'right';
  ctx.font = '900 18px monospace';
  ctx.fillStyle = '#15803D';
  ctx.fillText(`৳ ${data.advancePaid.toLocaleString('en-IN')}`, 740, tableTop + 108);
  ctx.textAlign = 'left';

  // Row 3: Remaining Due
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(40, tableTop + 124, 720, 42);
  ctx.strokeStyle = '#E2E8F0';
  ctx.strokeRect(40, tableTop + 124, 720, 42);

  const due = Math.max(0, data.totalPrice - data.advancePaid);
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('অবশিষ্ট ব্যালেন্স:', 55, tableTop + 151);
  ctx.textAlign = 'right';
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#0369A1';
  ctx.fillText(`৳ ${due.toLocaleString('en-IN')}`, 740, tableTop + 151);
  ctx.textAlign = 'left';

  // 5. Payment Transaction Details Box (bKash 01711085960 + QR)
  const payBoxTop = 590;
  ctx.fillStyle = '#FDF2F8';
  ctx.fillRect(40, payBoxTop, 720, 150);
  ctx.strokeStyle = '#F472B6';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, payBoxTop, 720, 150);

  ctx.fillStyle = '#E2136E';
  ctx.font = '900 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('💳 বিকাশ পেমেন্ট ও ভেরিফিকেশন তথ্য', 55, payBoxTop + 30);

  // Merchant number highlight
  ctx.fillStyle = '#BE185D';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('বিকাশ পেমেন্ট / মার্চেন্ট নম্বর:', 55, payBoxTop + 62);
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 18px monospace';
  ctx.fillText('01711-085960 (বা অফিসিয়াল বাংলা কিউআর)', 280, payBoxTop + 62);

  ctx.fillStyle = '#BE185D';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('গ্রাহকের প্রেরক বিকাশ নম্বর:', 55, payBoxTop + 95);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(data.senderPhone || 'বিকাশ অ্যাপ থেকে', 280, payBoxTop + 95);

  ctx.fillStyle = '#BE185D';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('TrxID / লাস্ট ৪ ডিজিট:', 55, payBoxTop + 128);
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 17px monospace';
  ctx.fillText(data.trxId || 'WhatsApp এ স্ক্রিনশট পাঠাচ্ছি', 280, payBoxTop + 128);

  // 6. Guidelines & Terms Strip
  const guideTop = 760;
  ctx.fillStyle = '#F1F5F9';
  ctx.fillRect(40, guideTop, 720, 130);
  ctx.strokeStyle = '#CBD5E1';
  ctx.strokeRect(40, guideTop, 720, 130);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('📌 গুরুত্বপূর্ণ নির্দেশনা ও পিকআপ পয়েন্ট:', 55, guideTop + 28);

  ctx.fillStyle = '#475569';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('• পিকআপ পয়েন্ট: রংপুর, বগুড়া ও গাইবান্ধা। যাত্রার ১২ ঘণ্টা আগে গাইড যোগাযোগ করবেন।', 55, guideTop + 55);
  ctx.fillText('• পেমেন্ট রিকোয়েস্ট যাচাইয়ের পর অ্যাডমিন প্যানেল থেকে সিট নিশ্চিত করা হবে।', 55, guideTop + 80);
  ctx.fillText('• দ্রুত কনফার্মেশনের জন্য নিচের WhatsApp নম্বরে এই ইনভয়েস ও পেমেন্ট স্ক্রিনশট পাঠান।', 55, guideTop + 105);

  // 7. Footer Contact Bar & Seal
  const footerTop = 910;
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(20, footerTop, width - 40, 140);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ঘুরবে ট্রাভেল হেল্পলাইন ও কাস্টমার সাপোর্ট:', 45, footerTop + 35);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('📞 হটলাইন: ০৯৬৫৮-৮৬৫৫৯৩  |  📱 WhatsApp: ০১৯১১-০৫০২৭০', 45, footerTop + 70);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🌐 ওয়েবসাইট: ghurbe.com  |  অফিস: আর.কে রোড, রংপুর ও ধানমন্ডি, ঢাকা।', 45, footerTop + 105);

  // Verified Seal Stamp on Footer Right
  ctx.save();
  ctx.translate(width - 110, footerTop + 70);
  ctx.rotate(-0.1);
  ctx.strokeStyle = '#22C55E';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#22C55E';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GHURBE TOURS', 0, -20);
  ctx.font = '900 13px sans-serif';
  ctx.fillText('VERIFIED', 0, 2);
  ctx.font = 'bold 9px monospace';
  ctx.fillText('INVOICE', 0, 18);
  ctx.restore();

  return canvas.toDataURL('image/png', 0.95);
}

/**
 * Download the generated dataUrl as a PNG image file
 */
export function downloadInvoiceImageFile(dataUrl: string, bookingCode: string): void {
  try {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Ghurbe_Invoice_${bookingCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to trigger invoice download', err);
  }
}

/**
 * Format a neat, structured ASCII text invoice for WhatsApp message
 */
export function formatWhatsAppInvoiceText(booking: BookingRecord, senderNum?: string, transactionId?: string): string {
  return `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃   🌿 *ঘুরবে ট্যুর অ্যান্ড ট্রাভেল*   ┃
┃       *অফিসিয়াল বুকিং ইনভয়েস*       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🧾 *ইনভয়েস কোড:* ${booking.bookingCode}
🏖️ *ট্যুর প্যাকেজ:* ${booking.packageTitle}
📅 *যাত্রার তারিখ:* ${booking.date}
👤 *যাত্রীর নাম:* ${booking.travelerName}
📱 *মোবাইল নম্বর:* ${booking.phone}
👥 *সদস্য:* ${booking.roomType === 'couple' ? 'কাপল প্যাকেজ (২ জন)' : `${booking.guestsCount} জন`}
──────────────────────────────────────
💰 *মোট প্যাকেজ বিল:* ৳ ${booking.totalPrice.toLocaleString('en-IN')}
💳 *পরিশোধিত বুকিং মানি:* ৳ ${booking.advancePaid.toLocaleString('en-IN')}
📱 *পেমেন্ট নম্বর:* বিকাশ 01711-085960 / বাংলা কিউআর
📱 *প্রেরক বিকাশ নম্বর:* ${senderNum || 'বিকাশ অ্যাপ থেকে'}
🔢 *TrxID / লাস্ট ৪ ডিজিট:* ${transactionId || 'পেমেন্ট সম্পন্ন'}
──────────────────────────────────────
📸 *(আমি ইনভয়েস ছবি / পেমেন্টের স্ক্রিনশট বা লাস্ট ৪ ডিজিট পাঠাচ্ছি, অনুগ্রহ করে যাচাই করে বুকিং কনফার্ম করুন)*`;
}
