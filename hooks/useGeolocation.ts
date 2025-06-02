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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 }
    );
  }, []);
  return { coords, loading, error };
}
