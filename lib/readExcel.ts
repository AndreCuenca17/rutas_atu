// Conversión del .xlsx a JSON para usarlo con el mapa.

import * as XLSX from "xlsx";
import { Marker } from "@/types/marker";

export function readMarkersFromExcel(file: Buffer): Marker[] {
  const workbook = XLSX.read(file, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<{ GPS: string; Estacion: string }>(sheet);

  return rows.map(row => {
    // GPS: "lat,lng"
    const [latStr, lngStr] = row.GPS.split(",");
    return {
      lat: parseFloat(latStr),
      lng: parseFloat(lngStr),
      title: row.Estacion,
    };
  });
}