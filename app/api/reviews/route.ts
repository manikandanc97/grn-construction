import { NextResponse } from 'next/server';
import { getGoogleReviews } from '@/app/lib/services/googleReviews';
import { COMPANY } from '@/app/lib/constants';

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
          rating: COMPANY.rating || 4.9,
          reviewCount: COMPANY.reviewCount || 41,
          businessName: COMPANY.name || 'GRN Construction',
          businessAddress: COMPANY.address.full,
          writeReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || COMPANY.reviewUrl || COMPANY.mapUrl,
          viewAllReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || COMPANY.mapUrl,
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
