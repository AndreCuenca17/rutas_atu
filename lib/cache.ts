import { Graph } from "@/types/graph";
import { convertGeojsonToGraph, GeoJson, GeoJsonFeature } from "./readGeojson";
import { fetchGeojsonFromDB } from "./geojson";

let cachedGraph: Graph | null = null;

export async function getGraph(): Promise<Graph> {
  if (cachedGraph) return cachedGraph;

  const geojson = await fetchGeojsonFromDB();
  // Ya no es necesario filtrar, todos los features son LineString
  const safeGeojson: GeoJson = {
    type: "FeatureCollection",
    features: geojson.features as GeoJsonFeature[],
  };
  cachedGraph = convertGeojsonToGraph(safeGeojson);

  return cachedGraph;
}
