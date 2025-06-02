// Funciones para leer y convertir archivos .geojson en estructuras de grafo.

import { Graph, Node, NodeId, Edge } from "@/types/graph";

export async function readGeojsonAsGraph(filePath: string): Promise<Graph> {
  const res = await fetch(filePath);
  const data = await res.json();

  const nodes: Map<NodeId, Node> = new Map();
  const adjList: Map<NodeId, Edge[]> = new Map();

  let edgeCount = 0;

  for (const feature of data.features) {
    const geometry = feature.geometry;
    const properties = feature.properties || {};

    if (geometry.type === "LineString") {
      const coordinates = geometry.coordinates;

      for (let i = 0; i < coordinates.length - 1; i++) {
        const [lon1, lat1] = coordinates[i];
        const [lon2, lat2] = coordinates[i + 1];

        const node1Id = `${lat1},${lon1}`;
        const node2Id = `${lat2},${lon2}`;

        // Añadir nodos
        nodes.set(node1Id, { lat: lat1, lng: lon1 });
        nodes.set(node2Id, { lat: lat2, lng: lon2 });

        // Calcular peso
        const weight = properties.length ?? 1;

        // Añadir arista en ambas direcciones (si deseas grafo no dirigido)
        if (!adjList.has(node1Id)) adjList.set(node1Id, []);
        adjList.get(node1Id)?.push({ from: node1Id, to: node2Id, weight });

        if (!adjList.has(node2Id)) adjList.set(node2Id, []);
        adjList.get(node2Id)?.push({ from: node2Id, to: node1Id, weight });

        edgeCount++;
      }
    }
  }

  console.log(`✅ Grafo cargado con ${nodes.size} nodos y ${edgeCount} aristas.`);
  return { nodes, adjList };
}