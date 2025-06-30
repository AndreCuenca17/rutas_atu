"use client";

import React, { useState } from "react";
import {
  Code,
  TrendingUp,
  Clock,
  Activity,
  BarChart3,
  AlertCircle,
  Info,
  Zap,
  X,
} from "lucide-react";

// Definición de tipos
interface CodeLine {
  id: number;
  code: string;
  complexity: string;
  explanation: string;
  type:
    | "declaración"
    | "condición"
    | "partition"
    | "empty"
    | "recursión"
    | "bracket"
    | "return"
    | "asignación"
    | "bucle"
    | "swap"
    | "algoritmo";
}

interface CodeAnalysis {
  title: string;
  description: string;
  code: CodeLine[];
  summary: {
    overall: string;
    partition?: string;
    queue?: string;
    relaxation?: string;
    reconstruction?: string;
    recursión?: string;
    worstCase?: string;
  };
}

const AnalisisComplejidad: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const codeAnalysis: CodeAnalysis = {
    title: "Algoritmo Dijkstra",
    description:
      "Implementación de Dijkstra usando cola de prioridad (heap binario) en TypeScript",
    code: [
      {
        id: 1,
        code: "class PriorityQueue {",
        complexity:
          "O(1) – Declarar la clase es constante, no depende de datos",
        explanation: "Declaración de clase de cola de prioridad",
        type: "declaración",
      },
      {
        id: 2,
        code: "  private heap: Array<{ key: NodeId; priority: number }> = [];",
        complexity: "O(1) – Inicializar el array es instantáneo",
        explanation: "Inicialización del heap interno",
        type: "asignación",
      },
      { id: 3, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 4,
        code: "  isEmpty(): boolean {",
        complexity: "O(1) – Chequeo de longitud de array es constante",
        explanation: "Método para verificar si la cola está vacía",
        type: "declaración",
      },
      {
        id: 5,
        code: "    return this.heap.length === 0;",
        complexity: "O(1) – Leer longitud de array es O(1)",
        explanation: "Comprueba longitud del array",
        type: "return",
      },
      { id: 6, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 7, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 8,
        code: "  enqueue(key: NodeId, priority: number): void {",
        complexity: "O(log n) – Inserción puede recorrer altura log n",
        explanation: "Inserción en heap (heapify-up)",
        type: "algoritmo",
      },
      {
        id: 9,
        code: "    this.heap.push({ key, priority });",
        complexity: "O(1) – push agrega al final sin recorrido",
        explanation: "Inserta al final del array",
        type: "asignación",
      },
      {
        id: 10,
        code: "    this.heapifyUp(this.heap.length - 1);",
        complexity: "O(log n) – Reorganiza el heap hacia arriba",
        explanation: "Reordena el heap hacia arriba",
        type: "algoritmo",
      },
      { id: 11, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 12, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 13,
        code: "  dequeue(): { key: NodeId; priority: number } | undefined {",
        complexity: "O(log n) – Eliminar mínimo y reorganizar heap",
        explanation: "Eliminación del elemento mínimo (heapify-down)",
        type: "algoritmo",
      },
      {
        id: 14,
        code: "    if (this.isEmpty()) return undefined;",
        complexity: "O(1) – Chequear vacío es inmediato",
        explanation: "Verifica si está vacío",
        type: "condición",
      },
      {
        id: 15,
        code: "    this.swap(0, this.heap.length - 1);",
        complexity: "O(1) – Intercambio directo de dos posiciones",
        explanation: "Intercambio de elementos",
        type: "swap",
      },
      {
        id: 16,
        code: "    const min = this.heap.pop();",
        complexity: "O(1) – pop del array es tiempo constante",
        explanation: "Remueve el último elemento",
        type: "asignación",
      },
      {
        id: 17,
        code: "    this.heapifyDown(0);",
        complexity: "O(log n) – Reorganiza el heap hacia abajo",
        explanation: "Reordena el heap hacia abajo",
        type: "algoritmo",
      },
      {
        id: 18,
        code: "    return min;",
        complexity: "O(1) – Retornar variable es inmediato",
        explanation: "Devuelve el elemento mínimo",
        type: "return",
      },
      { id: 19, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 20, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 21,
        code: "  private heapifyUp(idx: number): void {",
        complexity: "O(log n) – Subir el elemento puede llegar a la raíz",
        explanation: "Restaura propiedad del heap hacia arriba",
        type: "algoritmo",
      },
      {
        id: 22,
        code: "    if (idx <= 0) return;",
        complexity: "O(1) – Comparación con raíz es constante",
        explanation: "Caso base: raíz del heap",
        type: "condición",
      },
      {
        id: 23,
        code: "    const parentIdx = Math.floor((idx - 1) / 2);",
        complexity: "O(1) – Calcular índice de padre es aritmética simple",
        explanation: "Calcula índice del padre",
        type: "asignación",
      },
      {
        id: 24,
        code: "    if (this.heap[parentIdx].priority > this.heap[idx].priority) {",
        complexity: "O(1) – Comparar prioridades es acceso a 2 posiciones",
        explanation: "Compara prioridades padre-hijo",
        type: "condición",
      },
      {
        id: 25,
        code: "      this.swap(parentIdx, idx);",
        complexity: "O(1) – swap es intercambio constante",
        explanation: "Intercambia elementos si es necesario",
        type: "swap",
      },
      {
        id: 26,
        code: "      this.heapifyUp(parentIdx);",
        complexity: "O(log n) – Llamada recursiva puede llegar a raíz",
        explanation: "Llamada recursiva hacia arriba",
        type: "algoritmo",
      },
      {
        id: 27,
        code: "    }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      { id: 28, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 29, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 30,
        code: "  private heapifyDown(idx: number): void {",
        complexity: "O(log n) – Desciende hasta una hoja en el peor caso",
        explanation: "Restaura propiedad del heap hacia abajo",
        type: "algoritmo",
      },
      {
        id: 31,
        code: "    const leftIdx = 2 * idx + 1;",
        complexity: "O(1) – Calcular hijo izquierdo es aritmética simple",
        explanation: "Calcula índice hijo izquierdo",
        type: "asignación",
      },
      {
        id: 32,
        code: "    const rightIdx = 2 * idx + 2;",
        complexity: "O(1) – Calcular hijo derecho es aritmética simple",
        explanation: "Calcula índice hijo derecho",
        type: "asignación",
      },
      {
        id: 33,
        code: "    let smallest = idx;",
        complexity: "O(1) – Asignación simple",
        explanation: "Asume que el padre es el menor",
        type: "asignación",
      },
      { id: 34, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 35,
        code: "    if (",
        complexity: "O(1) – Inicio de comparación con hijo izquierdo",
        explanation: "Inicio de comparación con hijo izquierdo",
        type: "condición",
      },
      {
        id: 36,
        code: "      leftIdx < this.heap.length &&",
        complexity: "O(1) – Comparar índice con tamaño heap es constante",
        explanation: "Verifica que hijo izquierdo exista",
        type: "condición",
      },
      {
        id: 37,
        code: "      this.heap[leftIdx].priority < this.heap[smallest].priority",
        complexity: "O(1) – Comparar prioridades es acceso directo",
        explanation: "Compara prioridades",
        type: "condición",
      },
      {
        id: 38,
        code: "    ) {",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      {
        id: 39,
        code: "      smallest = leftIdx;",
        complexity: "O(1) – Actualizar variable es instantáneo",
        explanation: "Actualiza índice del menor",
        type: "asignación",
      },
      {
        id: 40,
        code: "    }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      { id: 41, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 42,
        code: "    if (",
        complexity: "O(1) – Inicio de comparación con hijo derecho",
        explanation: "Inicio de comparación con hijo derecho",
        type: "condición",
      },
      {
        id: 43,
        code: "      rightIdx < this.heap.length &&",
        complexity: "O(1) – Comparar índice con tamaño heap es constante",
        explanation: "Verifica que hijo derecho exista",
        type: "condición",
      },
      {
        id: 44,
        code: "      this.heap[rightIdx].priority < this.heap[smallest].priority",
        complexity: "O(1) – Comparar prioridades es acceso directo",
        explanation: "Compara prioridades",
        type: "condición",
      },
      {
        id: 45,
        code: "    ) {",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      {
        id: 46,
        code: "      smallest = rightIdx;",
        complexity: "O(1) – Asignación simple",
        explanation: "Actualiza índice del menor",
        type: "asignación",
      },
      {
        id: 47,
        code: "    }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      { id: 48, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 49,
        code: "    if (smallest !== idx) {",
        complexity: "O(1) – Comparar índices es constante",
        explanation: "Verifica si hay que intercambiar",
        type: "condición",
      },
      {
        id: 50,
        code: "      this.swap(idx, smallest);",
        complexity: "O(1) – Intercambio de elementos en heap",
        explanation: "Intercambia elementos",
        type: "swap",
      },
      {
        id: 51,
        code: "      this.heapifyDown(smallest);",
        complexity: "O(log n) – heapify-down desciende hasta hoja",
        explanation: "Llamada recursiva hacia abajo",
        type: "algoritmo",
      },
      {
        id: 52,
        code: "    }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      { id: 53, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 54, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 55,
        code: "  private swap(i: number, j: number): void {",
        complexity: "O(1) – Intercambiar dos elementos es instantáneo",
        explanation: "Intercambia dos elementos del heap",
        type: "swap",
      },
      {
        id: 56,
        code: "    const tmp = this.heap[i];",
        complexity: "O(1) – Asignar variable temporal",
        explanation: "Variable temporal para intercambio",
        type: "asignación",
      },
      {
        id: 57,
        code: "    this.heap[i] = this.heap[j];",
        complexity: "O(1) – Asignación en array",
        explanation: "Mueve elemento j a posición i",
        type: "asignación",
      },
      {
        id: 58,
        code: "    this.heap[j] = tmp;",
        complexity: "O(1) – Asignación en array",
        explanation: "Completa el intercambio",
        type: "asignación",
      },
      { id: 59, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 60, code: "}", complexity: "", explanation: "", type: "bracket" },
      { id: 61, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 62,
        code: "export function dijkstra(",
        complexity: "O(1) – Declarar función es constante",
        explanation: "Inicio de función dijkstra",
        type: "declaración",
      },
      {
        id: 63,
        code: "  graph: Graph,",
        complexity: "O(1) – Asignar parámetro es instantáneo",
        explanation: "Grafo de entrada",
        type: "declaración",
      },
      {
        id: 64,
        code: "  start: NodeId,",
        complexity: "O(1) – Asignar parámetro es instantáneo",
        explanation: "Nodo origen",
        type: "declaración",
      },
      {
        id: 65,
        code: "  end: NodeId",
        complexity: "O(1) – Asignar parámetro es instantáneo",
        explanation: "Nodo destino",
        type: "declaración",
      },
      {
        id: 66,
        code: "): DijkstraResult {",
        complexity: "O(1) – Declarar tipo de retorno es constante",
        explanation: "Tipo de retorno",
        type: "declaración",
      },
      {
        id: 67,
        code: "  const distances = new Map<NodeId, number>();",
        complexity: "O(1) – Crear mapa vacío es independiente de V",
        explanation: "Inicializa mapa de distancias",
        type: "asignación",
      },
      {
        id: 68,
        code: "  const previous = new Map<NodeId, NodeId | null>();",
        complexity: "O(1) – Crear mapa vacío es independiente de V",
        explanation: "Inicializa mapa de predecesores",
        type: "asignación",
      },
      {
        id: 69,
        code: "  const visited = new Set<NodeId>();",
        complexity: "O(1) – Crear set vacío es constante",
        explanation: "Conjunto de nodos visitados",
        type: "asignación",
      },
      { id: 70, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 72,
        code: "  if (start === end) {",
        complexity: "O(1) – Comparar dos nodos es inmediato",
        explanation: "Caso trivial de mismo nodo",
        type: "condición",
      },
      {
        id: 73,
        code: "    distances.set(start, 0);",
        complexity: "O(1) – Asignar valor en mapa es constante",
        explanation: "Distancia cero a sí mismo",
        type: "asignación",
      },
      {
        id: 74,
        code: "    return { path: [start], distances };",
        complexity: "O(1) – Devolver resultado es constante",
        explanation: "Retorna camino trivial",
        type: "return",
      },
      { id: 75, code: "  }", complexity: "", explanation: "", type: "bracket" },
      { id: 76, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 78,
        code: "  for (const nodeId of graph.nodes.keys()) {",
        complexity: "O(V) – Recorre todos los nodos del grafo",
        explanation: "Inicializa todas las distancias",
        type: "bucle",
      },
      {
        id: 79,
        code: "    distances.set(nodeId, Infinity);",
        complexity: "O(1) – Asignación constante por nodo",
        explanation: "Asigna Infinity a cada nodo",
        type: "asignación",
      },
      {
        id: 80,
        code: "    previous.set(nodeId, null);",
        complexity: "O(1) – Asignación constante por nodo",
        explanation: "Sin predecesor inicial",
        type: "asignación",
      },
      { id: 81, code: "  }", complexity: "", explanation: "", type: "bracket" },
      {
        id: 82,
        code: "  distances.set(start, 0);",
        complexity: "O(1) – Asignación constante",
        explanation: "Distancia del nodo inicio a 0",
        type: "asignación",
      },
      { id: 83, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 85,
        code: "  const pq = new PriorityQueue();",
        complexity: "O(1) – Crear la cola de prioridad es constante",
        explanation: "Crea la cola de prioridad",
        type: "asignación",
      },
      {
        id: 86,
        code: "  pq.enqueue(start, 0);",
        complexity: "O(log V) – Insertar nodo inicial en la cola",
        explanation: "Inserta el nodo inicio",
        type: "algoritmo",
      },
      { id: 87, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 88,
        code: "  while (!pq.isEmpty()) {",
        complexity:
          "O((V+E) log V) – Cada nodo y arista procesados con operaciones en la cola",
        explanation: "Repite hasta procesar todos los nodos",
        type: "bucle",
      },
      {
        id: 89,
        code: "    const extracted = pq.dequeue();",
        complexity: "O(log V) – Eliminar nodo mínimo de la cola",
        explanation: "Extrae el nodo con menor distancia",
        type: "algoritmo",
      },
      {
        id: 90,
        code: "    if (!extracted) break;",
        complexity: "O(1) – Verificación constante",
        explanation: "Guard clause si cola está vacía",
        type: "condición",
      },
      { id: 91, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 92,
        code: "    const currentNode = extracted.key;",
        complexity: "O(1) – Asignación constante",
        explanation: "Nodo actual procesado",
        type: "asignación",
      },
      {
        id: 93,
        code: "    const distFromHeap = extracted.priority;",
        complexity: "O(1) – Asignación constante",
        explanation: "Distancia almacenada en la entrada",
        type: "asignación",
      },
      { id: 94, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 96,
        code: "    if (visited.has(currentNode)) continue;",
        complexity: "O(1) – Verificar set es constante",
        explanation: "Ignora nodos ya visitados",
        type: "condición",
      },
      { id: 97, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 99,
        code: "    const realDist = distances.get(currentNode)!;",
        complexity: "O(1) – Leer valor de mapa es constante",
        explanation: "Distancia real desde start",
        type: "asignación",
      },
      {
        id: 100,
        code: "    if (distFromHeap > realDist) continue;",
        complexity: "O(1) – Comparación constante",
        explanation: "Descarta entradas obsoletas",
        type: "condición",
      },
      { id: 101, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 103,
        code: "    visited.add(currentNode);",
        complexity: "O(1) – Agregar elemento al set es constante",
        explanation: "Marca como procesado",
        type: "asignación",
      },
      { id: 104, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 106,
        code: "    if (currentNode === end) break;",
        complexity: "O(1) – Comparación constante",
        explanation: "Detiene al llegar a destino",
        type: "condición",
      },
      { id: 107, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 109,
        code: "    const neighbors: Edge[] = graph.adjList.get(currentNode) || [];",
        complexity: "O(1) – Acceder lista de adyacencia es constante",
        explanation: "Lista de adyacencia",
        type: "asignación",
      },
      {
        id: 110,
        code: "    for (const edge of neighbors) {",
        complexity:
          "O(E) en total – Cada arista se revisa una vez a lo largo del algoritmo",
        explanation: "Revisa cada arista saliente",
        type: "bucle",
      },
      {
        id: 111,
        code: "      const nextNode = edge.to;",
        complexity: "O(1) – Asignación constante",
        explanation: "Nodo destino de la arista",
        type: "asignación",
      },
      {
        id: 112,
        code: "      const alt = realDist + edge.weight;",
        complexity: "O(1) – Suma simple es constante",
        explanation: "Distancia alternativa",
        type: "asignación",
      },
      {
        id: 113,
        code: "      const prevDist = distances.get(nextNode) ?? Infinity;",
        complexity: "O(1) – Obtener valor del mapa es constante",
        explanation: "Distancia anterior al nodo",
        type: "asignación",
      },
      {
        id: 114,
        code: "      if (alt < prevDist) {",
        complexity: "O(1) – Comparación constante",
        explanation: "Comprueba mejora de ruta",
        type: "condición",
      },
      {
        id: 115,
        code: "        distances.set(nextNode, alt);",
        complexity: "O(1) – Asignar en mapa es constante",
        explanation: "Actualiza la distancia",
        type: "asignación",
      },
      {
        id: 116,
        code: "        previous.set(nextNode, currentNode);",
        complexity: "O(1) – Asignar en mapa es constante",
        explanation: "Guarda el predecesor",
        type: "asignación",
      },
      {
        id: 117,
        code: "        pq.enqueue(nextNode, alt);",
        complexity: "O(log V) – Insertar actualización de distancia en cola",
        explanation: "Reinserta en cola prioridad",
        type: "algoritmo",
      },
      {
        id: 118,
        code: "      }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      {
        id: 119,
        code: "    }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      {
        id: 120,
        code: "  }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      { id: 121, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 123,
        code: "  const path: NodeId[] = [];",
        complexity: "O(V) – En el peor caso el camino tiene hasta V nodos",
        explanation: "Inicializa array de camino",
        type: "asignación",
      },
      {
        id: 124,
        code: "  let cursor: NodeId | null = end;",
        complexity: "O(1) – Asignación constante",
        explanation: "Empieza reconstrucción desde destino",
        type: "asignación",
      },
      {
        id: 125,
        code: "  while (cursor !== null) {",
        complexity:
          "O(V) – Reconstrucción del camino puede recorrer hasta V nodos",
        explanation: "Agrega nodos al camino hasta la fuente",
        type: "bucle",
      },
      {
        id: 126,
        code: "    path.push(cursor); // Insertar al final",
        complexity: "O(1) – Agregar a un array es constante",
        explanation: "Incluye nodo en el camino",
        type: "asignación",
      },
      {
        id: 127,
        code: "    cursor = previous.get(cursor) ?? null;",
        complexity: "O(1) – Leer valor del mapa es constante",
        explanation: "Avanza al predecesor",
        type: "asignación",
      },
      {
        id: 128,
        code: "  }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      {
        id: 129,
        code: "  path.reverse(); // Invertir una sola vez al final",
        complexity: "O(V) – Invertir array de longitud V es lineal",
        explanation: "Invierte el camino al orden correcto",
        type: "algoritmo",
      },
      { id: 130, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 132,
        code: "  if (path.length === 0 || path[0] !== start) {",
        complexity: "O(1) – Verificar longitud y primer elemento es constante",
        explanation: "Verifica ruta válida",
        type: "condición",
      },
      {
        id: 133,
        code: "    return { path: [], distances };",
        complexity: "O(1) – Devolver resultado es constante",
        explanation: "Retorna vacío si no hay ruta",
        type: "return",
      },
      {
        id: 134,
        code: "  }",
        complexity: "",
        explanation: "",
        type: "bracket",
      },
      { id: 135, code: "", complexity: "", explanation: "", type: "empty" },
      {
        id: 136,
        code: "  return { path, distances };",
        complexity: "O(1) – Devolver resultado final es constante",
        explanation: "Devuelve resultado final",
        type: "return",
      },
      { id: 137, code: "}", complexity: "", explanation: "", type: "bracket" },
    ],
    summary: {
      overall: "O((V + E) log V)",
      queue: "O(log V) por operación en cola de prioridad",
      relaxation: "O(E) recorre todas las aristas",
      reconstruction: "O(V) reconstruye el camino",
    },
  };

  const getComplexityColor = (complexity: string): string => {
    if (!complexity) return "";
    if (complexity.includes("O(1)"))
      return "bg-green-100 text-green-800 border-green-200";
    if (complexity.includes("O(log n)"))
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (
      complexity.includes("O(n)") &&
      !complexity.includes("log") &&
      !complexity.includes("²")
    )
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (complexity.includes("O(n log n)"))
      return "bg-orange-100 text-orange-800 border-orange-200";
    if (complexity.includes("O(n²)"))
      return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleLineClick = (lineId: number, hasCode: boolean): void => {
    if (hasCode) {
      setSelectedLine(selectedLine === lineId ? null : lineId);
    }
  };

  const getSelectedLineData = (): CodeLine | undefined => {
    return selectedLine
      ? codeAnalysis.code.find((l) => l.id === selectedLine)
      : undefined;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Activity className="text-blue-600" size={30} />
            {codeAnalysis.title}
          </h1>
          <p className="text-gray-600 text-lg">{codeAnalysis.description}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Code Section - Takes up 2 columns */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-800 text-white p-4 flex items-center gap-3">
                <Code size={20} />
                <h2 className="text-lg font-semibold">
                  Código del algoritmo en el lenguaje de programación:
                  Javascript / Typescript
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden whitespace-pre">
                  {codeAnalysis.code.map((line: CodeLine) => (
                    <div
                      key={line.id}
                      className={`flex items-center hover:bg-gray-800 transition-colors duration-200 ${
                        selectedLine === line.id
                          ? "bg-gray-800 border-l-4 border-blue-500"
                          : ""
                      } ${line.code.trim() ? "cursor-pointer" : ""}`}
                      onClick={() =>
                        handleLineClick(line.id, !!line.code.trim())
                      }
                    >
                      {/* Line Number */}
                      <div className="w-12 text-gray-500 text-sm text-center py-2 select-none">
                        {line.id}
                      </div>

                      {/* Code */}
                      <div className="flex-1 py-2 pr-4">
                        <code className="text-green-400 font-mono text-sm">
                          {line.code || "\u00A0"}
                        </code>
                      </div>

                      {/* Complexity Badge */}
                      {line.complexity && (
                        <div className="flex items-center gap-2 px-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getComplexityColor(
                              line.complexity
                            )}`}
                          >
                            {line.complexity}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Modal for Code Explanation */}
                {selectedLine && getSelectedLineData() && (
                  <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedLine(null)}
                  >
                    <div
                      className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Modal Header */}
                      <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <Info className="text-blue-600" size={24} />
                          <h3 className="text-xl font-semibold text-gray-800">
                            Análisis de Línea {selectedLine}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedLine(null)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="p-6">
                        {/* Code Line Display */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Código:
                          </h4>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <code className="text-green-400 font-mono text-sm">
                              {getSelectedLineData()?.code || "\u00A0"}
                            </code>
                          </div>
                        </div>

                        {/* Complexity Badge */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Complejidad Temporal:
                          </h4>
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getComplexityColor(
                              getSelectedLineData()?.complexity || ""
                            )}`}
                          >
                            {getSelectedLineData()?.complexity}
                          </span>
                        </div>

                        {/* Explanation */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Explicación:
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {getSelectedLineData()?.explanation}
                          </p>
                        </div>

                        {/* Line Type */}
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Tipo de Operación:
                          </h4>
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                            {getSelectedLineData()?.type?.replace("_", " ")}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => setSelectedLine(null)}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Overall Complexity */}
            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">
                💡 Instrucciones
              </h4>
              <p className="text-gray-700 text-sm">
                Haz clic en cualquier línea de código para ver su análisis
                detallado de complejidad y explicación.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-blue-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">
                  Complejidad General
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-orange-800 font-semibold">
                    Complejidad Total
                  </div>
                  <div className="text-orange-700 text-sm">
                    {codeAnalysis.summary.overall}
                  </div>
                </div>
              </div>
            </div>

            {/* Component Analysis */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-purple-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">
                  Análisis por Componentes
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-yellow-800 font-semibold">
                    Operaciones en Cola de Prioridad
                  </div>
                  <div className="text-yellow-700 text-sm">
                    {codeAnalysis.summary.queue}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-blue-800 font-semibold">Relajación de aristas</div>
                  <div className="text-blue-700 text-sm">
                    {codeAnalysis.summary.relaxation}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-purple-800 font-semibold">Reconstrucción del camino</div>
                  <div className="text-purple-700 text-sm">
                    {codeAnalysis.summary.reconstruction}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-gray-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Leyenda</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-200 border border-green-300 rounded"></div>
                  <span className="text-black">O(1) - Constante</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
                  <span className="text-black">O(log n) - Logarítmica</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded"></div>
                  <span className="text-black">O(n) - Lineal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-200 border border-orange-300 rounded"></div>
                  <span className="text-black">
                    O(n log n) - Lineal-logarítmica
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
                  <span className="text-black">O(n²) - Cuadrática</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisComplejidad;
