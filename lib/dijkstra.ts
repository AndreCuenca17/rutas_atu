// Archivo: dijkstra.ts

import { Graph, NodeId, Edge } from "@/types/graph";

/**
 * PriorityQueue mínima que almacena pares { key: NodeId, priority: number }.
 * Implementado como heap binario en un array. No implementa decreaseKey nativo;
 * cuando la prioridad de un nodo mejora, se vuelve a insertar una nueva entrada.
 * Al extraer, se descartan las entradas obsoletas comparando con el Map de distancias.
 */
class PriorityQueue {
  private heap: Array<{ key: NodeId; priority: number }> = [];

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  enqueue(key: NodeId, priority: number): void {
    this.heap.push({ key, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  dequeue(): { key: NodeId; priority: number } | undefined {
    if (this.isEmpty()) return undefined;
    this.swap(0, this.heap.length - 1);
    const min = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  private heapifyUp(idx: number): void {
    if (idx <= 0) return;
    const parentIdx = Math.floor((idx - 1) / 2);
    if (this.heap[parentIdx].priority > this.heap[idx].priority) {
      this.swap(parentIdx, idx);
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown(idx: number): void {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let smallest = idx;

    if (
      leftIdx < this.heap.length &&
      this.heap[leftIdx].priority < this.heap[smallest].priority
    ) {
      smallest = leftIdx;
    }

    if (
      rightIdx < this.heap.length &&
      this.heap[rightIdx].priority < this.heap[smallest].priority
    ) {
      smallest = rightIdx;
    }

    if (smallest !== idx) {
      this.swap(idx, smallest);
      this.heapifyDown(smallest);
    }
  }

  private swap(i: number, j: number): void {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }
}

interface DijkstraResult {
  path: NodeId[];
  distances: Map<NodeId, number>;
}

/**
 * Dijkstra eficiente con cola de prioridad.
 * - graph: grafo con nodos (Map<NodeId, Node>) y lista de adyacencia (Map<NodeId, Edge[]>)
 * - start: NodeId de origen
 * - end:   NodeId de destino
 *
 * Devuelve:
 *   { path: NodeId[], distances: Map<NodeId, number> }
 *   - path: arreglo con la ruta más corta desde start hasta end (vacío si no hay ruta)
 *   - distances: mapa de distancias mínimas desde start a cada nodo
 */
export function dijkstra(
  graph: Graph,
  start: NodeId,
  end: NodeId
): DijkstraResult {
  const distances = new Map<NodeId, number>();
  const previous = new Map<NodeId, NodeId | null>();
  const visited = new Set<NodeId>();

  // Caso trivial: inicio == destino
  if (start === end) {
    distances.set(start, 0);
    return { path: [start], distances };
  }

  // Inicializar distancias y previous
  for (const nodeId of graph.nodes.keys()) {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
  }
  distances.set(start, 0);

  // Crear priority queue e insertar nodo inicial
  const pq = new PriorityQueue();
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const extracted = pq.dequeue();
    if (!extracted) break;

    const currentNode = extracted.key;
    const distFromHeap = extracted.priority;

    // Si ya visitado, ignorar
    if (visited.has(currentNode)) continue;

    // Si la distancia en heap no coincide con la real, es obsoleta
    const realDist = distances.get(currentNode)!;
    if (distFromHeap > realDist) continue;

    // Marcar como visitado
    visited.add(currentNode);

    // Si llegamos al destino, podemos terminar
    if (currentNode === end) break;

    // Relajar aristas adyacentes
    const neighbors: Edge[] = graph.adjList.get(currentNode) || [];
    for (const edge of neighbors) {
      const nextNode = edge.to;
      const alt = realDist + edge.weight;
      const prevDist = distances.get(nextNode) ?? Infinity;
      if (alt < prevDist) {
        distances.set(nextNode, alt);
        previous.set(nextNode, currentNode);
        pq.enqueue(nextNode, alt);
      }
    }
  }

  // Reconstruir el camino desde "end" hacia "start"
  const path: NodeId[] = [];
  let cursor: NodeId | null = end;
  while (cursor !== null) {
    path.unshift(cursor);
    cursor = previous.get(cursor) ?? null;
  }

  // Si no llegó a start, no existe ruta válida
  if (path.length === 0 || path[0] !== start) {
    return { path: [], distances };
  }

  return { path, distances };
}