"use client";
import { useState, useEffect } from "react";
interface GeolocationState {
  coords: { lat: number; lng: number } | null;
  loading: boolean;
  error: string | null;
}
export function useGeolocation(): GeolocationState {
  const [coords, setCoords] = useState<GeolocationState["coords"]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocalización no soportada por el navegador");
      setLoading(false);
      return;
    }
    // Usar watchPosition para actualizar en tiempo real
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
    // Limpiar el watcher al desmontar
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  return { coords, loading, error };
}
