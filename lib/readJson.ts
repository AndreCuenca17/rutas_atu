import fs from "fs";
import path from "path";
import { Marker } from "@/types/marker";

export function readMarkersFromJson(filename: string): Marker[] {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, filename);

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const rawMarkers = JSON.parse(fileContent);

    // Determinar icono según el nombre del archivo
    let icono = "/paraderorojo.png"; 
    if (filename.includes("rojo")) {
      icono = "/paraderorojo.png";
    } else if (filename.includes("azul")) {
      icono = "/paraderoazul.png";
    } else if (filename.includes("morado")) {
      icono = "/paraderomorado.png";
    } else if (filename.includes("linea1")) {
      icono = "/estacionlinea1.png";
    } else if (filename.includes("linea2")) {
      icono = "/estacionlinea2.png";
    }

    return rawMarkers.map((item: any) => ({
      lat: Number(item.lat),
      lng: Number(item.lng),
      title: String(item.title),
      icono,
    }));
  } catch (error) {
    console.error(`Error detallado leyendo ${filename}:`, error);
    throw error; 
  }
}
