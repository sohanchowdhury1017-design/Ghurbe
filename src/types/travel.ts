export interface TourItinerary {
  day: number;
  title: string;
  description: string;
  meals: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  englishTitle: string;
  slug: string;
  category: 'hills' | 'sea' | 'haor' | 'forest' | 'heritage' | 'domestic';
  categoryLabel: string;
  division?: string;
  duration: {
    days: number;
    nights: number;
    textBn: string;
  };
  price: number;
  originalPrice?: number;
  couplePrice?: number;
  coupleOriginalPrice?: number;
  rating: number;
  reviewCount: number;
  location: string;
  badge?: string;
  isHighlighted?: boolean;
  highlightBadge?: string;
  coverImage: string;
  gallery: string[];
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  itinerary: TourItinerary[];
  includes: string[];
  excludes: string[];
  departureDates: string[];
  pickupPoint: string;
  groupSize: string;
  departureLocation?: string;
  departureDateText?: string;
  sightseeingSpots?: string[];
  whyChooseUs?: string[];
  seatNotice?: string;
  tagline?: string;
  targetAudience?: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  packageId: string;
  packageTitle: string;
  travelerName: string;
  phone: string;
  email: string;
  date: string;
  guestsCount: number;
  roomType: 'standard' | 'deluxe' | 'couple' | 'tent';
  totalPrice: number;
  advancePaid: number;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cash';
  paymentStatus: 'confirmed' | 'pending';
  bookedAt: string;
  emergencyContact?: string;
  notes?: string;
}

export interface SearchFilterState {
  destination: string;
  date: string;
  travelers: number;
  category: string;
  maxPrice: number;
}

export interface TravelerReview {
  id: string;
  author: string;
  role: string;
  avatar: string;
  destination: string;
  rating: number;
  date: string;
  text: string;
}
