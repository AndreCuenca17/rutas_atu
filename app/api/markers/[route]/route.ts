// app/api/markers/[route]/route.ts
import { readMarkersFromJson } from "@/lib/readJson";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const route = pathname.split("/").pop(); // obtiene el valor de [route]
  console.log("Parámetro recibido:", route);
  const fileName = `paraderos_${route}.json`;
  console.log("Nombre de archivo a buscar:", fileName);

  try {
    const markers = readMarkersFromJson(fileName);
    console.log("Markers encontrados:", markers.length);

    return NextResponse.json(markers);
  } catch (error) {
    console.error("Error completo:", error);
    return NextResponse.json(
      {
        error: "Route not found",
        details: error instanceof Error ? error.message : "Unknown error",
        fileName: `paraderos_${route}.json`,
      },
      { status: 404 }
    );
  }
}
