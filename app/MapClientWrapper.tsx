// components/MapClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Marker } from "@/types/marker";

// Cargamos el componente Map de forma dinámica en el cliente (sin SSR)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface Props {
  markers: Marker[];
}

export default function MapClientWrapper({ markers }: Props) {
  const { coords, loading, error } = useGeolocation();
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [route, setRoute] = useState<{ lat: number; lng: number }[] | null>(
    null
  );

  // Cuando coords cambia de null a un objeto válido, lo volcamos en `center`
  useEffect(() => {
    if (coords) {
      setCenter(coords);
    }
  }, [coords]);

  // Calcular la ruta más corta automáticamente
  useEffect(() => {
    const getShortestRoute = async () => {
      if (!center || markers.length === 0) return;
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
      // Llamar a la API para obtener la ruta más corta
      const res = await fetch("/api/shortest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: center,
          destination: { lat: closestStop.lat, lng: closestStop.lng },
          corredor: "rojo"
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setRoute(data.route);
      } else {
        setRoute(null);
      }
    };
    getShortestRoute();
  }, [center, markers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Cargando ubicación…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Error al obtener ubicación: {error}</p>
      </div>
    );
  }

  // Función que pasamos a Map para recibir actualizaciones cuando el usuario arrastre su marcador
  const handleUserLocationChange = (newCenter: {
    lat: number;
    lng: number;
  }) => {
    setCenter(newCenter);
  };

  return (
    <div className="w-full h-full">
      {center ? (
        <Map
          markers={markers}
          center={center}
          onUserLocationChange={handleUserLocationChange}
          route={route || undefined}
        />
      ) : (
        <p className="text-center mt-4">Esperando coordenadas…</p>
      )}
    </div>
  );
}
