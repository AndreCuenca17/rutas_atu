// Algoritmo de Dijkstra (versión con logs)
// --------------------------------------------------
// Tus interfaces:
// 
// export interface Node {
//   lat: number;
//   lng: number;
// }
//
// export type NodeId = string; // ej: "lat,lng"
//
// export interface Edge {
//   from: NodeId;
//   to: NodeId;
//   weight: number;
// }
//
// export interface Graph {
//   nodes: Map<NodeId, Node>;       // id -> coordenadas
//   adjList: Map<NodeId, Edge[]>;   // id -> conexiones salientes
// }

import { Graph, NodeId, Edge } from "@/types/graph";

interface DijkstraResult {
  path: NodeId[];
  distances: Map<NodeId, number>;
}

export function dijkstra(
  graph: Graph,
  start: NodeId,
  end: NodeId
): DijkstraResult {
  console.log("=== Iniciando Dijkstra ===");
  console.log(`Nodo inicio: ${start}`);
  console.log(`Nodo objetivo: ${end}`);

  // 1) Inicializar estructuras
  const distances = new Map<NodeId, number>();
  const previous = new Map<NodeId, NodeId | null>();
  const visited = new Set<NodeId>();

  // 1.a) Caso trivial: inicio == destino
  if (start === end) {
    console.log("El nodo de inicio y fin coinciden. Camino trivial.");
    distances.set(start, 0);
    return { path: [start], distances };
  }

  // 2) Inicializar todas las distancias a Infinity y previous a null
  console.log("Inicializando distancias a Infinity y previous a null...");
  for (const nodeId of graph.nodes.keys()) {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
  }
  distances.set(start, 0);
  console.log(`Distancia[${start}] = 0`);

  // 3) Bucle principal: mientras queden nodos por “visitar”
  while (visited.size < graph.nodes.size) {
    // 3.1) Encontrar el nodo no visitado de menor distancia
    let current: NodeId | null = null;
    let minDistance = Infinity;

    for (const [nodeId, dist] of distances.entries()) {
      if (!visited.has(nodeId) && dist < minDistance) {
        minDistance = dist;
        current = nodeId;
      }
    }

    // 3.2) Si ya no hay ningún nodo alcanzable, salimos
    if (current === null || minDistance === Infinity) {
      console.log("No hay más nodos alcanzables. Terminando bucle principal.");
      break;
    }

    console.log(`Seleccionado nodo actual: ${current} con distancia = ${minDistance}`);
    // 3.3) Marcamos current como visitado
    visited.add(current);
    console.log(`Marcado como visitado: ${current}`);

    // 3.4) Si current es el destino, terminamos
    if (current === end) {
      console.log("Nodo objetivo alcanzado. Terminando bucle principal.");
      break;
    }

    // 4) Relajar cada arista saliente de “current”
    const neighbors: Edge[] = graph.adjList.get(current) ?? [];
    console.log(`Vecinos de ${current}:`, neighbors.map(e => `${e.to}(peso=${e.weight})`));

    for (const edge of neighbors) {
      const currentDist = distances.get(current)!;
      const alt = currentDist + edge.weight;
      const prevDist = distances.get(edge.to) ?? Infinity;

      console.log(
        `→ Evaluando arista ${current} → ${edge.to} (peso=${edge.weight}): ` +
        `distancia actual a ${edge.to} = ${prevDist}, posible nueva = ${alt}`
      );

      if (alt < prevDist) {
        distances.set(edge.to, alt);
        previous.set(edge.to, current);
        console.log(
          `  Actualizo: Distancia[${edge.to}] = ${alt}, Previous[${edge.to}] = ${current}`
        );
      }
    }
  }

  // 5) Reconstruir el camino desde “end” hacia “start”
  console.log("Reconstruyendo camino final...");
  const path: NodeId[] = [];
  let cursor: NodeId | null = end;

  while (cursor !== null) {
    path.unshift(cursor);
    cursor = previous.get(cursor) ?? null;
  }

  // 6) Si el camino resultante no comienza en `start`, entonces no existe ruta
  if (path.length === 0 || path[0] !== start) {
    console.log("No se encontró ruta válida desde el inicio hasta el objetivo.");
    return { path: [], distances };
  }

  console.log("Camino encontrado:", path);
  console.log("Distancias finales:", Array.from(distances.entries()));
  console.log("=== Dijkstra terminado ===");

  return { path, distances };
}