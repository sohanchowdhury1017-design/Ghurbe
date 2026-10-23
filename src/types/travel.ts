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
  archived?: boolean;
  seatsLeft?: number;
  totalSeats?: number;
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
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'rocket' | 'card' | 'cash';
  paymentStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookedAt: string;
  emergencyContact?: string;
  notes?: string;
  transactionId?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  guests?: string;
  message: string;
  createdAt: string;
  status?: 'new' | 'replied' | 'archived';
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

export interface BlogSubsection {
  title: string;
  description: string;
}

export interface BlogSection {
  number?: string;
  heading: string;
  subheading?: string;
  body: string[];
  subsections?: BlogSubsection[];
  highlights?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  destination: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  coverImage: string;
  imageAlt?: string;
  summary: string;
  content: string[];
  sections?: BlogSection[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    primaryKeywords?: string[];
    secondaryKeywords?: string[];
  };
  disclaimer?: string;
  tips: string[];
  bestTimeToVisit: string;
  budgetGuide: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  slug: string;
  department: string;
  phone?: string;
  email?: string;
  avatar: string;
  experience: string;
  bio: string;
  specialty: string;
  personalWebsite?: {
    url: string;
    label: string;
  };
}
