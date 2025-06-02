"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Marker {
  lat: number;
  lng: number;
  title: string;
}

interface MapProps {
  markers: Marker[];
}

const Map = ({ markers }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "quarterly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      const location = { lat: -12.0464, lng: -77.0428 };
      const options: google.maps.MapOptions = {
        center: location, // Centro de Lima
        zoom: 14,
        mapId: "map",
      };

      const map = new Map(mapRef.current as HTMLElement, options);

      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      markers.forEach((markerData) => {
        new AdvancedMarkerElement({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: map,
          title: markerData.title,
        });
      });
    };

    initMap();
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default Map;
