// interface del grafo nodo

export interface Node {
  lat: number;
  lng: number;
}

export type NodeId = string; // ej: "lat,lng" como clave

export interface Edge {
  from: NodeId;
  to: NodeId;
  weight: number;
}

export interface Graph {
  nodes: Map<NodeId, Node>;         // id -> coordenadas
  adjList: Map<NodeId, Edge[]>;     // id -> conexiones salientes
}
