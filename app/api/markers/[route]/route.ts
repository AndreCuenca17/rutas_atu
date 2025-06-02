// app/api/markers/[route]/route.ts
import { readMarkersFromJson } from "@/lib/readJson";
import { NextResponse } from "next/server";

export async function GET(
  request: Request, 
  { params }: { params: { route: string } }
) {
  try {
    console.log("Parámetro recibido:", params.route); // Debug
    const fileName = `paraderos_${params.route}.json`;
    console.log("Nombre de archivo a buscar:", fileName); // Debug
    
    const markers = readMarkersFromJson(fileName);
    console.log("Markers encontrados:", markers.length); // Debug
    
    return NextResponse.json(markers);
  } catch (error) {
    console.error("Error completo:", error); // Debug mejorado
    return NextResponse.json({ 
      error: 'Route not found',
      details: error instanceof Error ? error.message : 'Unknown error',
      fileName: `paraderos_${params.route}.json`
    }, { status: 404 });
  }
}