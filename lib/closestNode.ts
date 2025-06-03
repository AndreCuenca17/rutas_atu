import { Graph, NodeId } from "@/types/graph";

export function findClosestNode(graph: Graph, lat: number, lng: number): NodeId {
  let closest: NodeId | null = null;
  let minDist = Infinity;

  for (const [id, node] of graph.nodes) {
    const dist = Math.hypot(lat - node.lat, lng - node.lng); // simple distancia euclidiana
    if (dist < minDist) {
      minDist = dist;
      closest = id;
    }
  }

  if (!closest) throw new Error("No se encontró nodo cercano");
  return closest;
}