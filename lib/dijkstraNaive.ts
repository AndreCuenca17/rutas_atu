import { Graph, NodeId, Edge } from "@/types/graph";

interface DijkstraResult {
  path: NodeId[];
  distances: Map<NodeId, number>;
}

export function dijkstraNaive(
  graph: Graph,
  start: NodeId,
  end: NodeId
): DijkstraResult {
  const distances = new Map<NodeId, number>();
  const previous = new Map<NodeId, NodeId | null>();
  const visited = new Set<NodeId>();

  // Inicializar distancias
  for (const nodeId of graph.nodes.keys()) {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
  }
  distances.set(start, 0);

  while (visited.size < graph.nodes.size) {
    // Encontrar el nodo no visitado con menor distancia
    let minNode: NodeId | null = null;
    let minDist = Infinity;
    for (const [nodeId, dist] of distances.entries()) {
      if (!visited.has(nodeId) && dist < minDist) {
        minDist = dist;
        minNode = nodeId;
      }
    }

    if (minNode === null) {
      // No quedan nodos alcanzables
      break;
    }

    // Si llegamos al destino, terminar
    if (minNode === end) {
      break;
    }

    visited.add(minNode);

    // Relajar aristas adyacentes
    const neighbors: Edge[] = graph.adjList.get(minNode) || [];
    for (const edge of neighbors) {
      const alt = distances.get(minNode)! + edge.weight;
      if (alt < (distances.get(edge.to) ?? Infinity)) {
        distances.set(edge.to, alt);
        previous.set(edge.to, minNode);
      }
    }
  }

  // Reconstruir camino
  const path: NodeId[] = [];
  let cursor: NodeId | null = end;
  while (cursor !== null) {
    path.push(cursor);
    cursor = previous.get(cursor) ?? null;
  }
  path.reverse();

  if (path.length === 0 || path[0] !== start) {
    return { path: [], distances };
  }

  return { path, distances };
}
