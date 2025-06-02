import { NodeId, Graph } from "@/types/graph";

export function findClosestNode(graph: Graph, lat: number, lng: number): NodeId {
  let closest: NodeId = "";
  let minDist = Infinity;

  for (const [id, node] of graph.nodes) {
    const dist = Math.sqrt((node.lat - lat) ** 2 + (node.lng - lng) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closest = id;
    }
  }

  return closest;
}