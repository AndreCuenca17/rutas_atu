// hooks/useGeojson.ts
"use client";
import { useEffect, useState } from "react";
import {
  getGeojsonFromCache,
  saveGeojsonToCache,
} from "@/lib/browserGeojsonCache";

export function useGeojson() {
  const [geojson, setGeojson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // 1. Buscar en cache
        const cached = await getGeojsonFromCache();
        if (cached) {
          setGeojson(cached);
          setLoading(false);
          return;
        }
        // 2. Si no hay cache, pedir al backend
        const res = await fetch("/api/geojson");
        if (!res.ok) throw new Error("No se pudo obtener el geojson");
        const data = await res.json();
        if (!cancelled) {
          setGeojson(data);
          setLoading(false);
        }
        // 3. Guardar en cache
        await saveGeojsonToCache(data);
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Error desconocido");
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return { geojson, loading, error };
}
