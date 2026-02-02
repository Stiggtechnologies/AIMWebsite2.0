import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceTag = searchParams.get('service');
    const personaTag = searchParams.get('persona');
    const featured = searchParams.get('featured');
    const transparency = searchParams.get('transparency');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = supabase
      .from('reviews')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (serviceTag) {
      query = query.contains('service_tags', [serviceTag]);
    }

    if (personaTag) {
      query = query.contains('persona_tags', [personaTag]);
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (transparency === 'true') {
      query = query.eq('show_in_transparency', true);
    }

    const { data: reviews, error } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reviews: reviews || [],
      count: reviews?.length || 0
    });
  } catch (error) {
    console.error('Error in reviews API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
