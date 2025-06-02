"use client";
import dynamic from "next/dynamic";
import { Marker } from "@/types/marker";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapClientWrapper({ markers }: { markers: Marker[] }) {
  return <Map markers={markers} />;
}