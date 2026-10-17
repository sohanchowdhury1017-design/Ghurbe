/**
 * Utility to download official vCard (.vcf)
 * Saves contact directly to user's phone contacts as "Ghurbe Tours & Travel"
 */
export const downloadGhurbeContactCard = () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Travel;Ghurbe Tours &;;;
FN:Ghurbe Tours & Travel
ORG:Ghurbe Tours & Travel Bangladesh
TITLE:Official Tour Operator
TEL;TYPE=CELL,VOICE,WHATSAPP:+8801911050270
TEL;TYPE=WORK,VOICE:09658865593
EMAIL;TYPE=WORK:ghurbebd@gmail.com
URL:https://ghurbe.com
NOTE:Official WhatsApp: 01911050270 | Hotline: 09658865593 | bKash Payment: 01711085960
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Ghurbe_Tours_and_Travel.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const OFFICIAL_WHATSAPP_NUMBER = '01911050270';
export const OFFICIAL_WHATSAPP_INTERNATIONAL = '8801911050270';
export const OFFICIAL_BKASH_NUMBER = '01711085960';
export const OFFICIAL_HOTLINE = '09658-865593';

/**
 * Generates direct official WhatsApp message link
 */
export const getWhatsAppLink = (messageText?: string) => {
  const text = messageText || 'আসসালামু আলাইকুম! ঘুরবে ট্রাভেলস, আমি ট্যুর প্যাকেজ ও বুকিং তথ্য জানতে চাই।';
  return `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_INTERNATIONAL}&text=${encodeURIComponent(text)}`;
};
