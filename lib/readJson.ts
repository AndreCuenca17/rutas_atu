import fs from "fs";
import path from "path";
import { Marker } from "@/types/marker";

export function readMarkersFromJson(filename: string): Marker[] {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const rawMarkers = JSON.parse(fileContent);

  return rawMarkers.map((item: any) => ({
    lat: Number(item.lat),
    lng: Number(item.lng),
    title: String(item.title),
  }));
}