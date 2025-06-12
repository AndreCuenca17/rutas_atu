import { Graph } from "@/types/graph";
import { convertGeojsonToGraph, GeoJson, GeoJsonFeature } from "./readGeojson";
import { fetchGeojsonFromDB } from "./geojson";

let cachedGraph: Graph | null = null;

export async function getGraph(): Promise<Graph> {
  if (cachedGraph) return cachedGraph;

  const geojson = await fetchGeojsonFromDB();
  // Filtrar y transformar solo los features tipo LineString
  const features: GeoJsonFeature[] = geojson.features
    .filter((f) => f.geometry.type === "LineString")
    .map((f) => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: f.geometry.coordinates as number[][],
      },
      properties: f.properties,
    }));
  const safeGeojson: GeoJson = { type: "FeatureCollection", features };
  cachedGraph = convertGeojsonToGraph(safeGeojson);

  return cachedGraph;
}
