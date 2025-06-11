import { Graph } from '@/types/graph';
import { convertGeojsonToGraph } from './readGeojson';
import { fetchGeojsonFromDB } from './geojson';

let cachedGraph: Graph | null = null;

export async function getGraph(): Promise<Graph> {
  if (cachedGraph) return cachedGraph;

  const geojson = await fetchGeojsonFromDB();
  cachedGraph = await convertGeojsonToGraph(geojson); // <--- aquí el await necesario

  return cachedGraph;
}
