// components/Map.tsx
"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { MapProps } from "@/types/mapProps";

const Map = ({
  markers,
  center,
  onUserLocationChange,
  route,
  routeColor,
  onSearchLocationChange,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const markerObjectsRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  // 1. Agregar input de búsqueda y lógica de Autocomplete
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Inicializar el mapa solo una vez
  useEffect(() => {
    if (mapInstance || !mapRef.current) return;
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "quarterly",
      libraries: ["places"],
    });
    loader.importLibrary("maps").then(({ Map: GoogleMap }) => {
      const options: google.maps.MapOptions = {
        center: center,
        zoom: 15,
        mapId: "map",
      };
      const mapObj = new GoogleMap(mapRef.current as HTMLElement, options);
      setMapInstance(mapObj);
    });
  }, [mapInstance]);

  // Inicializar Autocomplete cuando el mapa esté listo
  useEffect(() => {
    if (
      !mapInstance ||
      !window.google ||
      autocompleteRef.current ||
      !searchInputRef.current
    )
      return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInputRef.current,
      {
        fields: ["geometry", "name", "formatted_address"],
        types: ["geocode", "establishment"],
        componentRestrictions: { country: "pe" },
      }
    );
    // Cuando el usuario selecciona un lugar en el buscador
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        if (onSearchLocationChange) {
          onSearchLocationChange({ lat, lng });
        }
      }
    });
    autocompleteRef.current = autocomplete;
  }, [mapInstance, onSearchLocationChange]);

  // Actualizar centro del mapa si cambia
  useEffect(() => {
    if (mapInstance && center) {
      mapInstance.panTo(center); // animación suave
      if (userMarkerRef.current) {
        userMarkerRef.current.setPosition(center);
      }
    }
  }, [center, mapInstance]);

  // Actualizar marcadores de paraderos
  useEffect(() => {
    if (!mapInstance) return;
    // Limpiar marcadores anteriores
    markerObjectsRef.current.forEach((m) => m.setMap(null));
    markerObjectsRef.current = [];
    const getIconSize = (zoom: number) => {
      if (zoom >= 17) return 36;
      if (zoom >= 15) return 28;
      if (zoom >= 13) return 20;
      return 16;
    };
    const zoom = mapInstance.getZoom() || 15;
    markers.forEach((markerData) => {
      const iconSize = getIconSize(zoom);
      const marker = new google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map: mapInstance,
        title: markerData.title,
        icon: markerData.icono
          ? {
              url: markerData.icono,
              scaledSize: new google.maps.Size(iconSize, iconSize),
            }
          : undefined,
      });
      markerObjectsRef.current.push(marker);
    });
    // Actualizar tamaño de iconos al cambiar el zoom
    const zoomListener = mapInstance.addListener("zoom_changed", () => {
      const zoom = mapInstance.getZoom() || 15;
      const iconSize = getIconSize(zoom);
      markerObjectsRef.current.forEach((marker, idx) => {
        const markerData = markers[idx];
        if (markerData && markerData.icono) {
          marker.setIcon({
            url: markerData.icono,
            scaledSize: new google.maps.Size(iconSize, iconSize),
          });
        }
      });
      // Icono de usuario
      if (userMarkerRef.current) {
        userMarkerRef.current.setIcon({
          url: "/ubicacionactual.png",
          scaledSize: new google.maps.Size(iconSize + 4, iconSize + 4),
        });
      }
    });
    return () => {
      google.maps.event.removeListener(zoomListener);
    };
  }, [markers, mapInstance]);

  // Actualizar marcador de usuario
  useEffect(() => {
    if (!mapInstance || !center) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
    const marker = new google.maps.Marker({
      position: center,
      map: mapInstance,
      title: "Tu ubicación",
      draggable: true,
      icon: {
        url: "/ubicacionactual.png",
        scaledSize: new google.maps.Size(32, 32),
      },
    });
    marker.addListener("dragend", () => {
      const newPos = marker.getPosition();
      if (newPos && onUserLocationChange) {
        onUserLocationChange({ lat: newPos.lat(), lng: newPos.lng() });
      }
    });
    userMarkerRef.current = marker;
    return () => {
      marker.setMap(null);
    };
  }, [center, mapInstance, onUserLocationChange]);

  // Actualizar polyline de la ruta
  useEffect(() => {
    if (!mapInstance) return;
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    // Cerrar InfoWindow anterior si existe
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
      infoWindowRef.current = null;
    }
    if (route && route.length > 1) {
      const polyline = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: routeColor || "#FF0000",
        strokeOpacity: 1,
        strokeWeight: 4,
      });
      polyline.setMap(mapInstance);
      polylineRef.current = polyline;

      // Calcular distancia total y mostrar InfoWindow como antes
      let totalMeters = 0;
      for (let i = 1; i < route.length; i++) {
        const lat1 = route[i - 1].lat;
        const lng1 = route[i - 1].lng;
        const lat2 = route[i].lat;
        const lng2 = route[i].lng;
        // Haversine
        const R = 6371e3;
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        totalMeters += R * c;
      }
      // Tiempo estimado caminando (5 km/h = 1.39 m/s)
      const seconds = totalMeters / 1.39;
      const minutes = Math.round(seconds / 60);
      // Mostrar info en el mapa con estilo similar a Google Maps Directions
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="display:flex;align-items:center;gap:8px;min-width:120px;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;">
            <div style="display:flex;flex-direction:column;">
              <span style="font-size:19px;font-weight:600;color:#222;line-height:1;user-select:none;">${minutes} min</span>
              <span style="font-size:15px;color:#444;line-height:1.2;user-select:none;">a pie, 5 km/h</span>
            </div>
          </div>
          <div style="font-size:13px;color:#222;margin-top:2px;padding-bottom:4px;user-select:none;">Distancia: ${(
            totalMeters / 1000
          ).toFixed(2)} km</div>
          <style>
            .gm-ui-hover-effect {
              top: 0px !important;
              right: 30px !important;
              width: 20px !important;
              height: 20px !important;
            }
            .gm-ui-hover-effect > span {
              font-size: 16px !important;
            }
            .gm-style-iw, .gm-style-iw * {
              user-select: none !important;
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
            }
            .gm-ui-hover-effect:focus, .gm-ui-hover-effect:active {
              outline: none !important;
              box-shadow: none !important;
            }
          </style>
        `,
      });
      // Mostrar en el punto medio de la ruta
      const midIdx = Math.floor(route.length / 2);
      infoWindow.setPosition(route[midIdx]);
      infoWindow.open(mapInstance);
      infoWindowRef.current = infoWindow;
    }
  }, [route, mapInstance, routeColor]);

  // Ajustar fitBounds solo cuando cambian los markers o la ubicación
  const prevMarkersRef = useRef<null | string>(null);
  const prevCenterRef = useRef<null | { lat: number; lng: number }>(null);
  useEffect(() => {
    if (!center || !markers || markers.length === 0 || !mapInstance) return;
    const markersKey = JSON.stringify(markers.map((m) => [m.lat, m.lng]));
    const centerChanged =
      !prevCenterRef.current ||
      prevCenterRef.current.lat !== center.lat ||
      prevCenterRef.current.lng !== center.lng;
    const markersChanged = prevMarkersRef.current !== markersKey;
    if (!centerChanged && !markersChanged) return;
    prevMarkersRef.current = markersKey;
    prevCenterRef.current = center;
    let minDist = Infinity;
    let closestStop = markers[0];
    for (const stop of markers) {
      const dist = Math.hypot(center.lat - stop.lat, center.lng - stop.lng);
      if (dist < minDist) {
        minDist = dist;
        closestStop = stop;
      }
    }
    const threshold = 0.01;
    if (minDist > threshold) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(center.lat, center.lng));
      bounds.extend(new google.maps.LatLng(closestStop.lat, closestStop.lng));
      const targetCenter = bounds.getCenter();
      mapInstance.panTo(targetCenter);
      window.setTimeout(() => {
        mapInstance.fitBounds(bounds);
      }, 400);
    } else {
      mapInstance.panTo(center);
    }
  }, [center, markers, mapInstance]);

  // Marcar el destino final con una estrella y hacerlo draggable
  useEffect(() => {
    if (!mapInstance || !route || route.length === 0) return;
    // Eliminar marcador anterior si existe
    if ((window as any).finalDestMarker) {
      (window as any).finalDestMarker.setMap(null);
    }
    const last = route[route.length - 1];
    const marker = new google.maps.Marker({
      position: last,
      map: mapInstance,
      title: "Destino",
      draggable: true,
      icon: {
        url: "/estrella.png",
        scaledSize: new google.maps.Size(40, 40),
      },
      zIndex: 9999,
    });
    marker.addListener("dragend", () => {
      const newPos = marker.getPosition();
      if (newPos && onSearchLocationChange) {
        onSearchLocationChange({ lat: newPos.lat(), lng: newPos.lng() });
      }
    });
    (window as any).finalDestMarker = marker;
    return () => {
      marker.setMap(null);
      (window as any).finalDestMarker = null;
    };
  }, [mapInstance, route, onSearchLocationChange]);

  return (
    <div className="w-full h-full">
      {/* Buscador de destino */}
      <div className="absolute z-20 left-1/2 top-4 -translate-x-1/2 w-full max-w-md flex justify-center">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="¿A dónde quieres ir?"
          className="w-full rounded-lg border px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
          style={{ maxWidth: 400, color: "#111", background: "#fff" }}
        />
      </div>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default Map;
