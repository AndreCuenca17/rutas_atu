// Tu implementación manual del algoritmo de Dijkstra.

import { Graph, NodeId } from "@/types/graph";

interface DijkstraResult {
  path: NodeId[];
  distances: Map<NodeId, number>;
}

export function dijkstra(
  graph: Graph,
  start: NodeId,
  end: NodeId
): DijkstraResult {
  const distances = new Map<NodeId, number>();
  const previous = new Map<NodeId, NodeId | null>();
  const visited = new Set<NodeId>();

  // Inicializar distancias
  graph.nodes.forEach((_, nodeId) => {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
  });
  distances.set(start, 0);

  while (visited.size < graph.nodes.size) {
    // Buscar el nodo no visitado con menor distancia
    let current: NodeId | null = null;
    let minDist = Infinity;
    for (const [nodeId, dist] of distances) {
      if (!visited.has(nodeId) && dist < minDist) {
        minDist = dist;
        current = nodeId;
      }
    }

    if (!current || current === end) break;
    visited.add(current);

    const neighbors = graph.adjList.get(current) || [];
    for (const edge of neighbors) {
      const alt = (distances.get(current) || Infinity) + edge.weight;
      if (alt < (distances.get(edge.to) || Infinity)) {
        distances.set(edge.to, alt);
        previous.set(edge.to, current);
      }
    }
  }

  // Reconstruir camino
  const path: NodeId[] = [];
  let node: NodeId | null = end;
  while (node && previous.has(node)) {
    path.unshift(node);
    node = previous.get(node) || null;
  }

  if (path.length === 0 || path[0] !== start) {
    return { path: [], distances }; // No se encontró ruta
  }

  return { path, distances };
}
