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
}
