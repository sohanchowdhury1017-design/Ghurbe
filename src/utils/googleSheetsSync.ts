import { BookingRecord, ContactMessage } from '../types/travel';

const GOOGLE_SHEET_KEY = 'ghurbe_google_sheet_url';

export const getGoogleSheetUrl = (): string => {
  try {
    return localStorage.getItem(GOOGLE_SHEET_KEY) || '';
  } catch {
    return '';
  }
};

export const setGoogleSheetUrl = (url: string): void => {
  try {
    localStorage.setItem(GOOGLE_SHEET_KEY, url.trim());
  } catch (e) {
    console.error('Failed to save Google Sheet URL:', e);
  }
};

/**
 * Sends a booking record to the configured Google Sheet via Apps Script Webhook.
 * Uses no-cors mode to ensure request succeeds from any browser/domain without CORS blocking.
 */
export const syncBookingToGoogleSheet = async (booking: BookingRecord): Promise<boolean> => {
  const url = getGoogleSheetUrl();
  if (!url) return false;

  try {
    const payload = {
      action: 'new_booking',
      type: 'booking',
      bookingCode: booking.bookingCode,
      travelerName: booking.travelerName,
      phone: booking.phone,
      email: booking.email || '',
      packageTitle: booking.packageTitle,
      date: booking.date,
      guestsCount: booking.guestsCount,
      roomType: booking.roomType,
      totalPrice: booking.totalPrice,
      advancePaid: booking.advancePaid,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      transactionId: booking.transactionId || '',
      bookedAt: booking.bookedAt,
      notes: booking.notes || '',
    };

    // Google Apps Script redirects with 302, mode: 'no-cors' allows submission from browser without CORS failure
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.warn('Google Sheets booking sync failed:', error);
    return false;
  }
};

/**
 * Sends a contact inquiry/message to the configured Google Sheet via Apps Script Webhook.
 */
export const syncMessageToGoogleSheet = async (message: ContactMessage): Promise<boolean> => {
  const url = getGoogleSheetUrl();
  if (!url) return false;

  try {
    const payload = {
      action: 'new_message',
      type: 'message',
      name: message.name,
      phone: message.phone,
      email: message.email || '',
      destination: message.destination || '',
      guests: message.guests || '',
      message: message.message,
      createdAt: message.createdAt,
    };

    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.warn('Google Sheets message sync failed:', error);
    return false;
  }
};

/**
 * Complete Google Apps Script template for the user to copy-paste into Google Sheet
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ঘুরবে (Ghurbe) — Google Sheets অটোমেটিক সিঙ্ক স্ক্রিপ্ট
 * -------------------------------------------------------------
 * ১. Google Sheet খুলে ওপরে Extensions > Apps Script-এ যান।
 * ২. পেজের সকল কোড মুছে এই কোডটি পেস্ট করুন।
 * ৩. Deploy > New deployment > Select type: Web app
 * ৪. Execute as: Me (আপনার ইমেইল)
 * ৫. Who has access: Anyone (যেকোনো ব্যক্তি)
 * ৬. Deploy ক্লিক করে полученную Web app URL কপি করে Ghurbe Admin-এ পেস্ট করুন।
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    if (data.type === 'booking' || data.action === 'new_booking') {
      var bookingSheet = sheet.getSheetByName('Bookings');
      if (!bookingSheet) {
        bookingSheet = sheet.insertSheet('Bookings');
        bookingSheet.appendRow([
          'বুকিং কোড', 'যাত্রীর নাম', 'ফোন নম্বর', 'ইমেইল', 'প্যাকেজের নাম',
          'ভ্রমণের তারিখ', 'যাত্রী সংখ্যা', 'রুমের ধরন', 'মোট ভাড়া (৳)',
          'অগ্রিম পরিশোধ (৳)', 'পেমেন্ট মেথড', 'পেমেন্ট স্ট্যাটাস', 'ট্রানজেকশন আইডি',
          'বুকিংয়ের সময়', 'বিশেষ নোট'
        ]);
        bookingSheet.getRange(1, 1, 1, 15).setBackground('#0284c7').setFontColor('#ffffff').setFontWeight('bold');
        bookingSheet.setFrozenRows(1);
      }
      
      bookingSheet.appendRow([
        data.bookingCode,
        data.travelerName,
        "'" + data.phone,
        data.email,
        data.packageTitle,
        data.date,
        data.guestsCount,
        data.roomType,
        data.totalPrice,
        data.advancePaid,
        data.paymentMethod,
        data.paymentStatus,
        data.transactionId || '',
        data.bookedAt,
        data.notes || ''
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Booking recorded' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'message' || data.action === 'new_message') {
      var msgSheet = sheet.getSheetByName('Messages');
      if (!msgSheet) {
        msgSheet = sheet.insertSheet('Messages');
        msgSheet.appendRow(['তারিখ ও সময়', 'গ্রাহকের নাম', 'ফোন নম্বর', 'ইমেইল', 'আকাঙ্ক্ষিত গন্তব্য', 'যাত্রী সংখ্যা', 'বার্তা/মেসেজ']);
        msgSheet.getRange(1, 1, 1, 7).setBackground('#10b981').setFontColor('#ffffff').setFontWeight('bold');
        msgSheet.setFrozenRows(1);
      }
      
      msgSheet.appendRow([
        data.createdAt || new Date().toLocaleString('bn-BD'),
        data.name,
        "'" + data.phone,
        data.email || '',
        data.destination || '',
        data.guests || '',
        data.message
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Message recorded' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'ignored' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Ghurbe Google Sheets Webhook is Active and Ready!");
}

// এই ফাংশনটি একবার Run করলে শিটে স্বয়ংক্রিয়ভাবে Bookings ও Messages ট্যাব ও কলাম হেডার তৈরি হয়ে যাবে এবং পারমিশন গ্রান্ট হবে
function initialSetup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var bookingSheet = sheet.getSheetByName('Bookings');
  if (!bookingSheet) {
    bookingSheet = sheet.insertSheet('Bookings');
    bookingSheet.appendRow([
      'বুকিং কোড', 'যাত্রীর নাম', 'ফোন নম্বর', 'ইমেইল', 'প্যাকেজের নাম',
      'ভ্রমণের তারিখ', 'যাত্রী সংখ্যা', 'রুমের ধরন', 'মোট ভাড়া (৳)',
      'অগ্রিম পরিশোধ (৳)', 'পেমেন্ট মেথড', 'পেমেন্ট স্ট্যাটাস', 'ট্রানজেকশন আইডি',
      'বুকিংয়ের সময়', 'বিশেষ নোট'
    ]);
    bookingSheet.getRange(1, 1, 1, 15).setBackground('#0284c7').setFontColor('#ffffff').setFontWeight('bold');
    bookingSheet.setFrozenRows(1);
  }
  var msgSheet = sheet.getSheetByName('Messages');
  if (!msgSheet) {
    msgSheet = sheet.insertSheet('Messages');
    msgSheet.appendRow(['তারিখ ও সময়', 'গ্রাহকের নাম', 'ফোন নম্বর', 'ইমেইল', 'আকাঙ্ক্ষিত গন্তব্য', 'যাত্রী সংখ্যা', 'বার্তা/মেসেজ']);
    msgSheet.getRange(1, 1, 1, 7).setBackground('#10b981').setFontColor('#ffffff').setFontWeight('bold');
    msgSheet.setFrozenRows(1);
  }
  Logger.log('Ghurbe Setup completed successfully!');
}
`;
