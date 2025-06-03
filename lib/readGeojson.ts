// ✅ Archivo: lib/geojsonToGraph.ts
import fs from "fs";
import path from "path";
import { Graph, NodeId, Node, Edge } from "@/types/graph";

export async function readGeojsonToGraph(): Promise<Graph> {
  const filePath = path.join(process.cwd(), "data/callePrincipal.geojson");
  const raw = fs.readFileSync(filePath, "utf-8");
  const geojson = JSON.parse(raw);

  const nodes: Map<NodeId, Node> = new Map();
  const adjList: Map<NodeId, Edge[]> = new Map();

  for (const feature of geojson.features) {
    if (feature.geometry?.type !== "LineString") continue;
    const coords = feature.geometry.coordinates;

    for (let i = 0; i < coords.length - 1; i++) {
      const [lon1, lat1] = coords[i];
      const [lon2, lat2] = coords[i + 1];

      const id1 = `${lat1},${lon1}`;
      const id2 = `${lat2},${lon2}`;

      nodes.set(id1, { lat: lat1, lng: lon1 });
      nodes.set(id2, { lat: lat2, lng: lon2 });

      const weight = haversine(lat1, lon1, lat2, lon2);

      if (!adjList.has(id1)) adjList.set(id1, []);
      if (!adjList.has(id2)) adjList.set(id2, []);

      adjList.get(id1)!.push({ from: id1, to: id2, weight });
      adjList.get(id2)!.push({ from: id2, to: id1, weight }); // bidireccional
    }
  }

  return { nodes, adjList };
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}