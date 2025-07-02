// components/MapClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useGeojson } from "@/hooks/useGeojson";
import { Marker } from "@/types/marker";
import { useRoute } from "@/context/RouteContext";

// Cargamos el componente Map de forma dinámica en el cliente (sin SSR)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface Props {
  markers: Marker[];
}

export default function MapClientWrapper({ markers }: Props) {
  const { coords, error } = useGeolocation();
  const { currentRoute } = useRoute();
  const { geojson } = useGeojson();
  // Centro por defecto (Lima)
  const DEFAULT_CENTER = { lat: -12.0464, lng: -77.0428 };
  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    DEFAULT_CENTER
  );
  const [route, setRoute] = useState<{ lat: number; lng: number }[] | null>(
    null
  );
  const [hasLocation, setHasLocation] = useState(false);
  // Nuevo: estado para el destino buscado
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getRouteColor = (route: string) => {
    if (route === "rojo") return "#fc020b";
    if (route === "azul") return "#0066d2";
    if (route === "morado") return "#4d0b55";
    if (route === "linea1") return "#0ed145";
    if (route === "linea2") return "#ffca18";
    return "#000000";
  };
  const routeColor = getRouteColor(currentRoute);

  // Cuando coords cambia, actualiza el centro y marca que ya hay ubicación
  useEffect(() => {
    if (coords) {
      setCenter(coords);
      setHasLocation(true);
    }
  }, [coords]);

  // Calcular la ruta más corta automáticamente usando geojson cacheado
  useEffect(() => {
    const getShortestRoute = async () => {
      if (!center || markers.length === 0 || !geojson) return;
      // Encontrar el paradero más cercano
      let minDist = Infinity;
      let closestStop = markers[0];
      for (const stop of markers) {
        const dist = Math.hypot(center.lat - stop.lat, center.lng - stop.lng);
        if (dist < minDist) {
          minDist = dist;
          closestStop = stop;
        }
      }
      // Calcular ruta en el cliente usando el geojson cacheado
      try {
        // Importar dinámicamente para evitar SSR issues
        const { convertGeojsonToGraph } = await import("@/lib/readGeojson");
        const { findClosestNode } = await import("@/lib/closestNode");
        const { dijkstra } = await import("@/lib/dijkstra");
        const graph = convertGeojsonToGraph(geojson);
        const start = findClosestNode(graph, center.lat, center.lng);
        const end = findClosestNode(graph, closestStop.lat, closestStop.lng);
        const result = dijkstra(graph, start, end);
        const coords = result.path
          .map((id) => {
            const node = graph.nodes.get(id);
            if (!node) return undefined;
            return { lat: node.lat, lng: node.lng };
          })
          .filter((n): n is { lat: number; lng: number } => !!n);
        setRoute(coords);
      } catch {
        setRoute(null);
      }
    };
    getShortestRoute();
  }, [center, markers, currentRoute, geojson]);

  // Nuevo: calcular ruta al destino buscado si existe searchLocation
  useEffect(() => {
    const getRouteToSearchLocation = async () => {
      if (!center || !searchLocation || markers.length === 0 || !geojson)
        return;
      try {
        const { convertGeojsonToGraph } = await import("@/lib/readGeojson");
        const { findClosestNode } = await import("@/lib/closestNode");
        const { dijkstra } = await import("@/lib/dijkstra");
        const graph = convertGeojsonToGraph(geojson);
        // 1. Encontrar el paradero de inicio más cercano al usuario
        let minDistUser = Infinity;
        let idxStart = 0;
        markers.forEach((stop, idx) => {
          const dist = Math.hypot(center.lat - stop.lat, center.lng - stop.lng);
          if (dist < minDistUser) {
            minDistUser = dist;
            idxStart = idx;
          }
        });
        // 2. Tramo a pie: usuario -> primer paradero
        const userNode = findClosestNode(graph, center.lat, center.lng);
        const startStop = markers[idxStart];
        const startStopNode = findClosestNode(
          graph,
          startStop.lat,
          startStop.lng
        );
        const walkToStart = dijkstra(graph, userNode, startStopNode);
        const walkToStartCoords = walkToStart.path
          .map((id) => {
            const node = graph.nodes.get(id);
            if (!node) return undefined;
            return { lat: node.lat, lng: node.lng };
          })
          .filter((n): n is { lat: number; lng: number } => !!n);
        // 3. Encontrar el paradero del corredor más cercano al destino
        let minDistToDest = Infinity;
        let idxEnd = idxStart;
        for (let i = idxStart; i < markers.length; i++) {
          const stop = markers[i];
          const dist = Math.hypot(
            searchLocation.lat - stop.lat,
            searchLocation.lng - stop.lng
          );
          if (dist < minDistToDest) {
            minDistToDest = dist;
            idxEnd = i;
          }
        }
        // 4. Ruta del corredor: unir todos los paraderos desde idxStart hasta idxEnd usando el grafo
        let corredorCoords: { lat: number; lng: number }[] = [];
        for (let i = idxStart; i < idxEnd; i++) {
          const from = markers[i];
          const to = markers[i + 1];
          const fromNode = findClosestNode(graph, from.lat, from.lng);
          const toNode = findClosestNode(graph, to.lat, to.lng);
          const tramo = dijkstra(graph, fromNode, toNode);
          const tramoCoords = tramo.path
            .map((id) => {
              const node = graph.nodes.get(id);
              if (!node) return undefined;
              return { lat: node.lat, lng: node.lng };
            })
            .filter((n): n is { lat: number; lng: number } => !!n);
          if (corredorCoords.length > 0 && tramoCoords.length > 0) {
            tramoCoords.shift();
          }
          corredorCoords = [...corredorCoords, ...tramoCoords];
        }
        // 5. Tramo a pie: paradero final -> destino
        const endStop = markers[idxEnd];
        const endStopNode = findClosestNode(graph, endStop.lat, endStop.lng);
        const destNode = findClosestNode(
          graph,
          searchLocation.lat,
          searchLocation.lng
        );
        const walkToDest = dijkstra(graph, endStopNode, destNode);
        const walkToDestCoords = walkToDest.path
          .map((id) => {
            const node = graph.nodes.get(id);
            if (!node) return undefined;
            return { lat: node.lat, lng: node.lng };
          })
          .filter((n): n is { lat: number; lng: number } => !!n);
        // 6. Unir todos los tramos y agregar el destino final
        const finalCoords = [
          ...walkToStartCoords,
          ...corredorCoords,
          ...walkToDestCoords,
          { lat: searchLocation.lat, lng: searchLocation.lng },
        ];
        setRoute(finalCoords);
      } catch {
        setRoute(null);
      }
    };
    getRouteToSearchLocation();
  }, [searchLocation, center, markers, geojson]);

  // Función que pasamos a Map para recibir actualizaciones cuando el usuario arrastre su marcador
  const handleUserLocationChange = (newCenter: {
    lat: number;
    lng: number;
  }) => {
    setCenter(newCenter);
    setHasLocation(true);
  };

  return (
    <div className="w-full h-full relative">
      {/* Overlay de carga solo si no hay ubicación */}
      {!hasLocation && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <p>Cargando ubicación…</p>
        </div>
      )}
      {/* El mapa siempre está montado, solo cambia el centro */}
      <Map
        markers={markers}
        center={center}
        onUserLocationChange={handleUserLocationChange}
        route={route || undefined}
        routeColor={routeColor}
        onSearchLocationChange={setSearchLocation}
      />
      {/* Error de ubicación */}
      {error && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow z-20">
          Error al obtener ubicación: {error}
        </div>
      )}
    </div>
  );
}
