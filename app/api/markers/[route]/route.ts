// app/api/markers/[route]/route.ts
import { readMarkersFromJson } from "@/lib/readJson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ route: string }> }
) {
  try {
    // Resolvemos la promesa de params
    const { route } = await params;
    console.log("Parámetro recibido:", route); // Debug

    // Creamos el nombre del archivo a buscar
    const fileName = `paraderos_${route}.json`;
    console.log("Nombre de archivo a buscar:", fileName); // Debug
    
    // Leemos los marcadores desde el archivo
    const markers = readMarkersFromJson(fileName);
    console.log("Markers encontrados:", markers.length); // Debug
    
    // Retornamos los marcadores como respuesta en formato JSON
    return NextResponse.json(markers);
  } catch (error) {
    
    console.error("Error completo:", error); // Debug mejorado
    return NextResponse.json({ 
      error: 'Route not found',
      details: error instanceof Error ? error.message : 'Unknown error',
      fileName: `paraderos_${error instanceof Error && error.message.includes('route') ? 'unknown' : ''}.json`
    }, { status: 404 });
  }
}