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
} from "lucide-react";

// Definición de tipos
interface CodeLine {
  id: number;
  code: string;
  complexity: string;
  explanation: string;
  type:
    | "declaration"
    | "condition"
    | "partition"
    | "empty"
    | "recursion"
    | "bracket"
    | "return"
    | "assignment"
    | "loop"
    | "swap"
    | "algorithm";
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
    recursion?: string;
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
      complexity: "O(1)",
      explanation: "Declaración de clase de cola de prioridad",
      type: "declaration",
    },
    {
      id: 2,
      code: "  private heap: Array<{ key: NodeId; priority: number }> = [];",
      complexity: "O(1)",
      explanation: "Inicialización del heap interno",
      type: "assignment",
    },
    { id: 3, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 4,
      code: "  isEmpty(): boolean {",
      complexity: "O(1)",
      explanation: "Método para verificar si la cola está vacía",
      type: "declaration",
    },
    {
      id: 5,
      code: "    return this.heap.length === 0;",
      complexity: "O(1)",
      explanation: "Comprueba longitud del array",
      type: "return",
    },
    { id: 6, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 7, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 8,
      code: "  enqueue(key: NodeId, priority: number): void {",
      complexity: "O(log n)",
      explanation: "Inserción en heap (heapify-up)",
      type: "algorithm",
    },
    {
      id: 9,
      code: "    this.heap.push({ key, priority });",
      complexity: "O(1)",
      explanation: "Inserta al final del array",
      type: "assignment",
    },
    {
      id: 10,
      code: "    this.heapifyUp(this.heap.length - 1);",
      complexity: "O(log n)",
      explanation: "Reordena el heap hacia arriba",
      type: "algorithm",
    },
    { id: 11, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 12, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 13,
      code: "  dequeue(): { key: NodeId; priority: number } | undefined {",
      complexity: "O(log n)",
      explanation: "Eliminación del elemento mínimo (heapify-down)",
      type: "algorithm",
    },
    {
      id: 14,
      code: "    if (this.isEmpty()) return undefined;",
      complexity: "O(1)",
      explanation: "Verifica si está vacío",
      type: "condition",
    },
    {
      id: 15,
      code: "    this.swap(0, this.heap.length - 1);",
      complexity: "O(1)",
      explanation: "Intercambio de elementos",
      type: "swap",
    },
    {
      id: 16,
      code: "    const min = this.heap.pop();",
      complexity: "O(1)",
      explanation: "Remueve el último elemento",
      type: "assignment",
    },
    {
      id: 17,
      code: "    this.heapifyDown(0);",
      complexity: "O(log n)",
      explanation: "Reordena el heap hacia abajo",
      type: "algorithm",
    },
    {
      id: 18,
      code: "    return min;",
      complexity: "O(1)",
      explanation: "Devuelve el elemento mínimo",
      type: "return",
    },
    { id: 19, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 20, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 21,
      code: "  private heapifyUp(idx: number): void {",
      complexity: "O(log n)",
      explanation: "Restaura propiedad del heap hacia arriba",
      type: "algorithm",
    },
    {
      id: 22,
      code: "    if (idx <= 0) return;",
      complexity: "O(1)",
      explanation: "Caso base: raíz del heap",
      type: "condition",
    },
    {
      id: 23,
      code: "    const parentIdx = Math.floor((idx - 1) / 2);",
      complexity: "O(1)",
      explanation: "Calcula índice del padre",
      type: "assignment",
    },
    {
      id: 24,
      code: "    if (this.heap[parentIdx].priority > this.heap[idx].priority) {",
      complexity: "O(1)",
      explanation: "Compara prioridades padre-hijo",
      type: "condition",
    },
    {
      id: 25,
      code: "      this.swap(parentIdx, idx);",
      complexity: "O(1)",
      explanation: "Intercambia elementos si es necesario",
      type: "swap",
    },
    {
      id: 26,
      code: "      this.heapifyUp(parentIdx);",
      complexity: "O(log n)",
      explanation: "Llamada recursiva hacia arriba",
      type: "algorithm",
    },
    { id: 27, code: "    }", complexity: "", explanation: "", type: "bracket" },
    { id: 28, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 29, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 30,
      code: "  private heapifyDown(idx: number): void {",
      complexity: "O(log n)",
      explanation: "Restaura propiedad del heap hacia abajo",
      type: "algorithm",
    },
    {
      id: 31,
      code: "    const leftIdx = 2 * idx + 1;",
      complexity: "O(1)",
      explanation: "Calcula índice hijo izquierdo",
      type: "assignment",
    },
    {
      id: 32,
      code: "    const rightIdx = 2 * idx + 2;",
      complexity: "O(1)",
      explanation: "Calcula índice hijo derecho",
      type: "assignment",
    },
    {
      id: 33,
      code: "    let smallest = idx;",
      complexity: "O(1)",
      explanation: "Asume que el padre es el menor",
      type: "assignment",
    },
    { id: 34, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 35,
      code: "    if (",
      complexity: "O(1)",
      explanation: "Inicio de comparación con hijo izquierdo",
      type: "condition",
    },
    {
      id: 36,
      code: "      leftIdx < this.heap.length &&",
      complexity: "O(1)",
      explanation: "Verifica que hijo izquierdo exista",
      type: "condition",
    },
    {
      id: 37,
      code: "      this.heap[leftIdx].priority < this.heap[smallest].priority",
      complexity: "O(1)",
      explanation: "Compara prioridades",
      type: "condition",
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
      complexity: "O(1)",
      explanation: "Actualiza índice del menor",
      type: "assignment",
    },
    { id: 40, code: "    }", complexity: "", explanation: "", type: "bracket" },
    { id: 41, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 42,
      code: "    if (",
      complexity: "O(1)",
      explanation: "Inicio de comparación con hijo derecho",
      type: "condition",
    },
    {
      id: 43,
      code: "      rightIdx < this.heap.length &&",
      complexity: "O(1)",
      explanation: "Verifica que hijo derecho exista",
      type: "condition",
    },
    {
      id: 44,
      code: "      this.heap[rightIdx].priority < this.heap[smallest].priority",
      complexity: "O(1)",
      explanation: "Compara prioridades",
      type: "condition",
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
      complexity: "O(1)",
      explanation: "Actualiza índice del menor",
      type: "assignment",
    },
    { id: 47, code: "    }", complexity: "", explanation: "", type: "bracket" },
    { id: 48, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 49,
      code: "    if (smallest !== idx) {",
      complexity: "O(1)",
      explanation: "Verifica si hay que intercambiar",
      type: "condition",
    },
    {
      id: 50,
      code: "      this.swap(idx, smallest);",
      complexity: "O(1)",
      explanation: "Intercambia elementos",
      type: "swap",
    },
    {
      id: 51,
      code: "      this.heapifyDown(smallest);",
      complexity: "O(log n)",
      explanation: "Llamada recursiva hacia abajo",
      type: "algorithm",
    },
    { id: 52, code: "    }", complexity: "", explanation: "", type: "bracket" },
    { id: 53, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 54, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 55,
      code: "  private swap(i: number, j: number): void {",
      complexity: "O(1)",
      explanation: "Intercambia dos elementos del heap",
      type: "swap",
    },
    {
      id: 56,
      code: "    const tmp = this.heap[i];",
      complexity: "O(1)",
      explanation: "Variable temporal para intercambio",
      type: "assignment",
    },
    {
      id: 57,
      code: "    this.heap[i] = this.heap[j];",
      complexity: "O(1)",
      explanation: "Mueve elemento j a posición i",
      type: "assignment",
    },
    {
      id: 58,
      code: "    this.heap[j] = tmp;",
      complexity: "O(1)",
      explanation: "Completa el intercambio",
      type: "assignment",
    },
    { id: 59, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 60, code: "}", complexity: "", explanation: "", type: "bracket" },
    { id: 61, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 62,
      code: "export function dijkstra(",
      complexity: "O(1)",
      explanation: "Inicio de función dijkstra",
      type: "declaration",
    },
    {
      id: 63,
      code: "  graph: Graph,",
      complexity: "O(1)",
      explanation: "Grafo de entrada",
      type: "declaration",
    },
    {
      id: 64,
      code: "  start: NodeId,",
      complexity: "O(1)",
      explanation: "Nodo origen",
      type: "declaration",
    },
    {
      id: 65,
      code: "  end: NodeId",
      complexity: "O(1)",
      explanation: "Nodo destino",
      type: "declaration",
    },
    {
      id: 66,
      code: "): DijkstraResult {",
      complexity: "O(1)",
      explanation: "Tipo de retorno",
      type: "declaration",
    },
    {
      id: 67,
      code: "  const distances = new Map<NodeId, number>();",
      complexity: "O(V)",
      explanation: "Inicializa distancias a Infinity",
      type: "assignment",
    },
    {
      id: 68,
      code: "  const previous = new Map<NodeId, NodeId | null>();",
      complexity: "O(V)",
      explanation: "Inicializa mapa de predecesores",
      type: "assignment",
    },
    {
      id: 69,
      code: "  const visited = new Set<NodeId>();",
      complexity: "O(1)",
      explanation: "Conjunto de nodos visitados",
      type: "assignment",
    },
    { id: 70, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 72,
      code: "  if (start === end) {",
      complexity: "O(1)",
      explanation: "Caso trivial de mismo nodo",
      type: "condition",
    },
    {
      id: 73,
      code: "    distances.set(start, 0);",
      complexity: "O(1)",
      explanation: "Distancia cero a sí mismo",
      type: "assignment",
    },
    {
      id: 74,
      code: "    return { path: [start], distances };",
      complexity: "O(1)",
      explanation: "Retorna camino trivial",
      type: "return",
    },
    { id: 75, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 76, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 78,
      code: "  for (const nodeId of graph.nodes.keys()) {",
      complexity: "O(V)",
      explanation: "Inicializa todas las distancias",
      type: "loop",
    },
    {
      id: 79,
      code: "    distances.set(nodeId, Infinity);",
      complexity: "O(1)",
      explanation: "Asigna Infinity a cada nodo",
      type: "assignment",
    },
    {
      id: 80,
      code: "    previous.set(nodeId, null);",
      complexity: "O(1)",
      explanation: "Sin predecesor inicial",
      type: "assignment",
    },
    { id: 81, code: "  }", complexity: "", explanation: "", type: "bracket" },
    {
      id: 82,
      code: "  distances.set(start, 0);",
      complexity: "O(1)",
      explanation: "Distancia del nodo inicio a 0",
      type: "assignment",
    },
    { id: 83, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 85,
      code: "  const pq = new PriorityQueue();",
      complexity: "O(1)",
      explanation: "Crea la cola de prioridad",
      type: "assignment",
    },
    {
      id: 86,
      code: "  pq.enqueue(start, 0);",
      complexity: "O(log V)",
      explanation: "Inserta el nodo inicio",
      type: "algorithm",
    },
    { id: 87, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 88,
      code: "  while (!pq.isEmpty()) {",
      complexity: "O((V+E) log V)",
      explanation: "Repite hasta procesar todos los nodos",
      type: "loop",
    },
    {
      id: 89,
      code: "    const extracted = pq.dequeue();",
      complexity: "O(log V)",
      explanation: "Extrae el nodo con menor distancia",
      type: "algorithm",
    },
    {
      id: 90,
      code: "    if (!extracted) break;",
      complexity: "O(1)",
      explanation: "Guard clause si cola está vacía",
      type: "condition",
    },
    { id: 91, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 92,
      code: "    const currentNode = extracted.key;",
      complexity: "O(1)",
      explanation: "Nodo actual procesado",
      type: "assignment",
    },
    {
      id: 93,
      code: "    const distFromHeap = extracted.priority;",
      complexity: "O(1)",
      explanation: "Distancia almacenada en la entrada",
      type: "assignment",
    },
    { id: 94, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 96,
      code: "    if (visited.has(currentNode)) continue;",
      complexity: "O(1)",
      explanation: "Ignora nodos ya visitados",
      type: "condition",
    },
    { id: 97, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 99,
      code: "    const realDist = distances.get(currentNode)!;",
      complexity: "O(1)",
      explanation: "Distancia real desde start",
      type: "assignment",
    },
    {
      id: 100,
      code: "    if (distFromHeap > realDist) continue;",
      complexity: "O(1)",
      explanation: "Descarta entradas obsoletas",
      type: "condition",
    },
    { id: 101, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 103,
      code: "    visited.add(currentNode);",
      complexity: "O(1)",
      explanation: "Marca como procesado",
      type: "assignment",
    },
    { id: 104, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 106,
      code: "    if (currentNode === end) break;",
      complexity: "O(1)",
      explanation: "Detiene al llegar a destino",
      type: "condition",
    },
    { id: 107, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 109,
      code: "    const neighbors: Edge[] = graph.adjList.get(currentNode) || [];",
      complexity: "O(1)",
      explanation: "Lista de adyacencia",
      type: "assignment",
    },
    {
      id: 110,
      code: "    for (const edge of neighbors) {",
      complexity: "O(deg(v))",
      explanation: "Revisa cada arista saliente",
      type: "loop",
    },
    {
      id: 111,
      code: "      const nextNode = edge.to;",
      complexity: "O(1)",
      explanation: "Nodo destino de la arista",
      type: "assignment",
    },
    {
      id: 112,
      code: "      const alt = realDist + edge.weight;",
      complexity: "O(1)",
      explanation: "Distancia alternativa",
      type: "assignment",
    },
    {
      id: 113,
      code: "      const prevDist = distances.get(nextNode) ?? Infinity;",
      complexity: "O(1)",
      explanation: "Distancia anterior al nodo",
      type: "assignment",
    },
    {
      id: 114,
      code: "      if (alt < prevDist) {",
      complexity: "O(1)",
      explanation: "Comprueba mejora de ruta",
      type: "condition",
    },
    {
      id: 115,
      code: "        distances.set(nextNode, alt);",
      complexity: "O(1)",
      explanation: "Actualiza la distancia",
      type: "assignment",
    },
    {
      id: 116,
      code: "        previous.set(nextNode, currentNode);",
      complexity: "O(1)",
      explanation: "Guarda el predecesor",
      type: "assignment",
    },
    {
      id: 117,
      code: "        pq.enqueue(nextNode, alt);",
      complexity: "O(log V)",
      explanation: "Reinserta en cola prioridad",
      type: "algorithm",
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
    { id: 120, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 121, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 123,
      code: "  const path: NodeId[] = [];",
      complexity: "O(V)",
      explanation: "Inicializa array de camino",
      type: "assignment",
    },
    {
      id: 124,
      code: "  let cursor: NodeId | null = end;",
      complexity: "O(1)",
      explanation: "Empieza reconstrucción desde destino",
      type: "assignment",
    },
    {
      id: 125,
      code: "  while (cursor !== null) {",
      complexity: "O(V)",
      explanation: "Agrega nodos al camino hasta la fuente",
      type: "loop",
    },
    {
      id: 126,
      code: "    path.push(cursor); // Insertar al final",
      complexity: "O(1)",
      explanation: "Incluye nodo en el camino",
      type: "assignment",
    },
    {
      id: 127,
      code: "    cursor = previous.get(cursor) ?? null;",
      complexity: "O(1)",
      explanation: "Avanza al predecesor",
      type: "assignment",
    },
    { id: 128, code: "  }", complexity: "", explanation: "", type: "bracket" },
    {
      id: 129,
      code: "  path.reverse(); // Invertir una sola vez al final",
      complexity: "O(V)",
      explanation: "Invierte el camino al orden correcto",
      type: "algorithm",
    },
    { id: 130, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 132,
      code: "  if (path.length === 0 || path[0] !== start) {",
      complexity: "O(1)",
      explanation: "Verifica ruta válida",
      type: "condition",
    },
    {
      id: 133,
      code: "    return { path: [], distances };",
      complexity: "O(1)",
      explanation: "Retorna vacío si no hay ruta",
      type: "return",
    },
    { id: 134, code: "  }", complexity: "", explanation: "", type: "bracket" },
    { id: 135, code: "", complexity: "", explanation: "", type: "empty" },
    {
      id: 136,
      code: "  return { path, distances };",
      complexity: "O(1)",
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

                {/* Code Explanation */}
                {selectedLine && getSelectedLineData() && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="text-blue-600 mt-1" size={16} />
                      <div>
                        <p className="text-blue-800 font-medium">
                          Línea {selectedLine}:{" "}
                          {getSelectedLineData()?.complexity}
                        </p>
                        <p className="text-blue-700 text-sm mt-1">
                          {getSelectedLineData()?.explanation}
                        </p>
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
                    Función Partition
                  </div>
                  <div className="text-yellow-700 text-sm">
                    {codeAnalysis.summary.partition}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-blue-800 font-semibold">Recursión</div>
                  <div className="text-blue-700 text-sm">
                    {codeAnalysis.summary.recursion}
                  </div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-red-800 font-semibold">Peor Caso</div>
                  <div className="text-red-700 text-sm">
                    {codeAnalysis.summary.worstCase}
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
                  <span>O(1) - Constante</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
                  <span>O(log n) - Logarítmica</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded"></div>
                  <span>O(n) - Lineal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-200 border border-orange-300 rounded"></div>
                  <span>O(n log n) - Lineal-logarítmica</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
                  <span>O(n²) - Cuadrática</span>
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisComplejidad;
