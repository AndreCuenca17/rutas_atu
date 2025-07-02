import { NextResponse } from "next/server";
import { getGraph } from "@/lib/cache";
import { findClosestNode } from "@/lib/closestNode";
import { dijkstra } from "@/lib/dijkstra";
import { NodeId } from "@/types/graph";

export async function POST(req: Request) {
  try {
    const { origin, destination } = await req.json();
    const graph = await getGraph();

    const start: NodeId = findClosestNode(graph, origin.lat, origin.lng);
    const end: NodeId = findClosestNode(
      graph,
      destination.lat,
      destination.lng
    );

    let path = [];
    try {
      const result = dijkstra(graph, start, end);
      path = result.path;
    } catch (err) {
      console.error("[API] Error en Dijkstra:", err);
      return NextResponse.json(
        { error: "No se encontró ruta posible entre los nodos." },
        { status: 404 }
      );
    }

    // Retornar la ruta como array de coordenadas (lat, lng)
    const coords = path
      .map((id) => {
        const node = graph.nodes.get(id);
        if (!node) return null;
        return { lat: node.lat, lng: node.lng };
      })
      .filter(Boolean);

    return NextResponse.json({
      route: coords,
      start,
      end,
    });
  } catch {
    return NextResponse.json(
      { error: "Error calculando ruta" },
      { status: 500 }
    );
  }
}
