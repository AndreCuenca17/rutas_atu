// lib/readJson.ts
import fs from "fs";
import path from "path";
import { Marker } from "@/types/marker";

export function readMarkersFromJson(filename: string): Marker[] {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, filename);
    
    console.log("Buscando archivo en ruta completa:", filePath); // Debug
    console.log("¿Existe el archivo?", fs.existsSync(filePath)); // Debug
    
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const rawMarkers = JSON.parse(fileContent);

    return rawMarkers.map((item: any) => ({
      lat: Number(item.lat),
      lng: Number(item.lng),
      title: String(item.title),
    }));
  } catch (error) {
    console.error(`Error detallado leyendo ${filename}:`, error);
    throw error; // Re-lanzar el error para que se capture en la API
  }
}