import { db } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

type Row = {
  feature_id: string;
  geometry_type: 'Polygon' | 'LineString';
  lat: number;
  lng: number;
  coordinate_order: number;
  properties: string;
};

type Feature = {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'Polygon' | 'LineString';
    coordinates: number[][][] | number[][];
  };
  id: string;
};

type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
  generator: string;
  copyright: string;
  timestamp: string;
};

export async function fetchGeojsonFromDB(): Promise<FeatureCollection> {
  const [rows] = await db.query<RowDataPacket[] & Row[]>(`
    SELECT feature_id, geometry_type, lat, lng, properties, coordinate_order
    FROM geo_features
    ORDER BY feature_id, coordinate_order
  `);

  const featureMap = new Map<string, Feature>();

  rows.forEach((row) => {
    if (!featureMap.has(row.feature_id)) {
      const parsedProperties =
        typeof row.properties === 'string'
          ? JSON.parse(row.properties)
          : row.properties ?? {};

      featureMap.set(row.feature_id, {
        type: 'Feature',
        properties: parsedProperties,
        geometry: {
          type: row.geometry_type,
          coordinates: row.geometry_type === 'Polygon' ? [[]] : [],
        },
        id: row.feature_id,
      });
    }

    const coordinate: [number, number] = [row.lng, row.lat];
    const feature = featureMap.get(row.feature_id)!;

    if (feature.geometry.type === 'Polygon') {
      (feature.geometry.coordinates as number[][][])[0].push(coordinate);
    } else {
      (feature.geometry.coordinates as number[][]).push(coordinate);
    }
  });

  return {
    type: 'FeatureCollection',
    generator: 'next-api',
    copyright:
      'The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.',
    timestamp: new Date().toISOString(),
    features: Array.from(featureMap.values()),
  };
}
