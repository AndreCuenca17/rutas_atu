// components/Map.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapProps } from "@/types/mapProps";

const Map = ({ markers, center, onUserLocationChange }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!center) return; // Esperamos a que center esté definido

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "quarterly",
        libraries: ["places"],
      });

      const { Map: GoogleMap } = await loader.importLibrary("maps");
      const options: google.maps.MapOptions = {
        center,
        zoom: 14,
        mapId: "map",
      };

      const mapObj = new GoogleMap(mapRef.current as HTMLElement, options);
      setMapInstance(mapObj);

      // 1) Pintar marcadores “normales” (p. ej. paraderos)
      const { AdvancedMarkerElement } =
        (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;
      markers.forEach((markerData) => {
        new AdvancedMarkerElement({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: mapObj,
          title: markerData.title,
        });
      });

      // 2) Agregar marcador de usuario, ahora arrastrable
      const userMarker = new google.maps.Marker({
        position: center,
        map: mapObj,
        title: "Tu ubicación",
        draggable: true, // Hace el marcador arrastrable
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,              // tamaño del círculo
          fillColor: "#4285F4",  // color de relleno (azul Google)
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2,
        },
      });

      // 3) Escuchar cuando termine de arrastrar
      userMarker.addListener("dragend", () => {
        const newPos = userMarker.getPosition();
        if (newPos && onUserLocationChange) {
          const newLat = newPos.lat();
          const newLng = newPos.lng();
          // Notificamos al wrapper que la ubicación cambió
          onUserLocationChange({ lat: newLat, lng: newLng });
        }
      });
    };

    initMap();
  }, [center, markers, onUserLocationChange]);

  return (
    <div className="w-full h-full">
      {!center && (
        <p className="text-center mt-4">Obteniendo ubicación del dispositivo…</p>
      )}
      <div
        ref={mapRef}
        className={`w-full h-full ${!center ? "hidden" : ""}`}
      />
    </div>
  );
};

export default Map;
