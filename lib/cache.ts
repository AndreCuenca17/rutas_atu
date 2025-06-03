import { readGeojsonToGraph } from "./readGeojson";
import { Graph } from "@/types/graph";

let cachedGraph: Graph | null = null;

export async function getGraph(): Promise<Graph> {
  if (cachedGraph) return cachedGraph;
  cachedGraph = await readGeojsonToGraph();
  return cachedGraph;
}