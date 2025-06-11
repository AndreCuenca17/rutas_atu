import { NextResponse } from 'next/server';
import { fetchGeojsonFromDB } from '@/lib/geojson';

export async function GET() {
  try {
    const geojson = await fetchGeojsonFromDB();
    return NextResponse.json(geojson);
  } catch (error) {
    console.error('GeoJSON API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
