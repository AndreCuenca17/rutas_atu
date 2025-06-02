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
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  // Cuando coords cambia de null a un objeto válido, lo volcamos en `center`
  useEffect(() => {
    if (coords) {
      setCenter(coords);
    }
  }, [coords]);

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
  const handleUserLocationChange = (newCenter: { lat: number; lng: number }) => {
    setCenter(newCenter);
  };

  return (
    <div className="w-full h-full">
      {center ? (
        <Map
          markers={markers}
          center={center}
          onUserLocationChange={handleUserLocationChange}
        />
      ) : (
        <p className="text-center mt-4">Esperando coordenadas…</p>
      )}
    </div>
  );
}
