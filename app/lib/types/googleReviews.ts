export interface GoogleReviewPhoto {
  url: string;
  label?: string;
  thumbnailUrl?: string;
}

export interface GoogleOwnerReply {
  comment: string;
  updatedAt?: string;
}

export interface GoogleReview {
  id: string;
  reviewerName: string;
  reviewerPhoto?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string; // ISO 8601 string
  updatedAt?: string;
  relativeTime?: string; // e.g. "3 months ago"
  reviewPhotos?: GoogleReviewPhoto[];
  ownerReply?: GoogleOwnerReply;
  googleMapsUri?: string;
}

export interface GoogleReviewSummary {
  rating: number;
  reviewCount: number;
  businessName: string;
  businessAddress: string;
  writeReviewUrl: string;
  viewAllReviewsUrl: string;
  isConnected: boolean;
  source: 'business_profile_api' | 'places_api' | 'verified_google_profile' | 'fallback';
  lastFetched: string;
}

export interface ReviewsApiResponse {
  summary: GoogleReviewSummary;
  reviews: GoogleReview[];
  status: 'connected' | 'unconfigured' | 'error';
  message?: string;
}
