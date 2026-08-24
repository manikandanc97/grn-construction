import { NextResponse } from 'next/server';
import { getGoogleReviews } from '@/app/lib/services/googleReviews';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getGoogleReviews();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[API /api/reviews] Error handling reviews request:', error);
    return NextResponse.json(
      {
        summary: {
          rating: 4.9,
          reviewCount: 41,
          businessName: 'GRN Construction',
          businessAddress: 'Advocate, No.10 A, Vakil Nagarajan Street, near by Uma traders, Udumalaipettai Municipality, Tamil Nadu 642126',
          writeReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || 'https://maps.google.com/?q=GRN+Construction,+Advocate,+No.10+A,+Vakil+Nagarajan+Street,+near+by+Uma+traders,+Udumalaipettai+Municipality,+Tamil+Nadu+642126',
          viewAllReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || 'https://maps.google.com/?q=GRN+Construction,+Advocate,+No.10+A,+Vakil+Nagarajan+Street,+near+by+Uma+traders,+Udumalaipettai+Municipality,+Tamil+Nadu+642126',
          isConnected: false,
          source: 'fallback',
          lastFetched: new Date().toISOString(),
        },
        reviews: [],
        status: 'error',
        message: 'Temporarily unable to connect to Google Reviews.',
      },
      {
        status: 200, // Return 200 with fallback to prevent client crash
      }
    );
  }
}
