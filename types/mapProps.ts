// types/mapProps.ts

import { Marker } from "./marker";

export interface MapProps {
  markers: Marker[];
  /** Centro inicial del mapa; si no está, Map espera a que lo reciba. */
  center?: {
    lat: number;
    lng: number;
  };
  /**
   * Callback opcional que se invoca cuando el usuario arrastra el marcador de su ubicación.
   * Recibe el nuevo { lat, lng }.
   */
  onUserLocationChange?: (newCenter: { lat: number; lng: number }) => void;
  /**
   * Ruta a graficar en el mapa, como array de puntos {lat, lng}
   */
  route?: { lat: number; lng: number }[];
  /**
   * Color de la ruta a graficar (hex o nombre CSS)
   */
  routeColor?: string;
  /**
   * Callback que se invoca cuando el usuario selecciona un destino en el buscador.
   */
  onSearchLocationChange?: (
    location: { lat: number; lng: number } | null
  ) => void;
}
